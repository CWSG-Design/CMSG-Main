import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";
import { storagePut } from "./storage";

const RECIPIENT = "sales@canadianwholesalesigns.ca";

/**
 * Sends an email via the Manus Forge email API.
 * Falls back to owner notification if email sending fails.
 */
async function sendEmail(subject: string, htmlBody: string, textBody: string): Promise<boolean> {
  const baseUrl = ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`;
  const endpoint = new URL("v1/email/send", baseUrl).toString();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: RECIPIENT,
        subject,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Email] Send failed (${response.status}): ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Error sending email:", err);
    return false;
  }
}

export const emailRouter = router({
  /** Upload artwork/logo files for a quote and return their storage URLs */
  uploadArtwork: publicProcedure
    .input(
      z.object({
        files: z.array(
          z.object({
            name: z.string(),
            type: z.string(),
            data: z.string(), // base64-encoded file content
          })
        ).max(10, "Maximum 10 files per quote"),
      })
    )
    .mutation(async ({ input }) => {
      const results: { name: string; url: string; key: string }[] = [];

      for (const file of input.files) {
        const buffer = Buffer.from(file.data, "base64");
        const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const { key, url } = await storagePut(
          `quote-artwork/${safeFileName}`,
          buffer,
          file.type || "application/octet-stream",
        );
        results.push({ name: file.name, url, key });
      }

      return { files: results };
    }),

  /** Contact form submission */
  sendContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const subject = `[CMSG Contact] ${input.subject || "New message"} — ${input.name}`;

      const htmlBody = `
        <h2 style="color:#1a3a2a;font-family:sans-serif;">New Contact Form Submission</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;width:140px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #e5e0d8;">${input.name}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e5e0d8;"><a href="mailto:${input.email}">${input.email}</a></td></tr>
          ${input.phone ? `<tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #e5e0d8;">${input.phone}</td></tr>` : ""}
          ${input.company ? `<tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;">Company</td><td style="padding:8px 12px;border-bottom:1px solid #e5e0d8;">${input.company}</td></tr>` : ""}
          ${input.subject ? `<tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;">Subject</td><td style="padding:8px 12px;border-bottom:1px solid #e5e0d8;">${input.subject}</td></tr>` : ""}
          <tr><td style="padding:8px 12px;background:#f5f0e8;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px 12px;white-space:pre-wrap;">${input.message}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px;">Sent from the CMSG website contact form.</p>
      `;

      const textBody = `New Contact Form Submission\n\nName: ${input.name}\nEmail: ${input.email}${input.phone ? `\nPhone: ${input.phone}` : ""}${input.company ? `\nCompany: ${input.company}` : ""}${input.subject ? `\nSubject: ${input.subject}` : ""}\n\nMessage:\n${input.message}`;

      const sent = await sendEmail(subject, htmlBody, textBody);

      // Always also send an owner notification as a reliable fallback
      await notifyOwner({
        title: `Contact Form: ${input.name} (${input.email})`,
        content: textBody,
      }).catch(() => {});

      return { success: sent || true };
    }),

  /** Quote form submission */
  sendQuote: publicProcedure
    .input(
      z.object({
        // Step 1 — Contact info
        companyName: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        jobTitle: z.string().optional(),
        email: z.string().email(),
        phone: z.string().optional(),
        billingAddress: z.string().optional(),
        // Step 2 — Product type
        illumination: z.string().optional(),
        signTypes: z.array(z.string()).optional(),
        mounting: z.string().optional(),
        // Step 3 — Sign details
        signText: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        letterHeight: z.string().optional(),
        logoWidth: z.string().optional(),
        logoHeight: z.string().optional(),
        installationType: z.string().optional(),
        installationLocation: z.string().optional(),
        faceGraphics: z.string().optional(),
        ledType: z.string().optional(),
        logoBoxStyle: z.string().optional(),
        // Step 4 — Colors
        acrylicColor: z.string().optional(),
        graphicsColor: z.string().optional(),
        trimCapColor: z.string().optional(),
        returnColor: z.string().optional(),
        racewayColo: z.string().optional(),
        // Step 5 — Extras
        hangerBar: z.boolean().optional(),
        remotePowerSupply: z.boolean().optional(),
        additionalInstructions: z.string().optional(),
        // Artwork file URLs (uploaded separately)
        artworkUrls: z.array(z.object({ name: z.string(), url: z.string() })).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const subject = `[CMSG Quote Request] ${input.companyName} — ${input.firstName} ${input.lastName}`;

      const row = (label: string, value: string | undefined | boolean) => {
        if (value === undefined || value === "" || value === null) return "";
        const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
        return `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:200px;">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8;">${display}</td></tr>`;
      };

      const htmlBody = `
        <h2 style="color:#1a3a2a;font-family:sans-serif;">New Quote Request</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:700px;">
          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Contact Information</td></tr>
          ${row("Company", input.companyName)}
          ${row("Name", `${input.firstName} ${input.lastName}`)}
          ${row("Job Title", input.jobTitle)}
          ${row("Email", input.email)}
          ${row("Phone", input.phone)}
          ${row("Billing Address", input.billingAddress)}

          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Product Type</td></tr>
          ${row("Illumination", input.illumination)}
          ${row("Sign Types", input.signTypes?.join(", "))}
          ${row("Mounting", input.mounting)}

          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Sign Details</td></tr>
          ${row("Sign Text", input.signText)}
          ${row("Overall Width", input.width)}
          ${row("Overall Height", input.height)}
          ${row("Letter Height", input.letterHeight)}
          ${row("Logo Width", input.logoWidth)}
          ${row("Logo Height", input.logoHeight)}
          ${row("Installation Type", input.installationType)}
          ${row("Installation Location", input.installationLocation)}
          ${row("Face Graphics", input.faceGraphics)}
          ${row("LED Type", input.ledType)}
          ${row("Logo Box Style", input.logoBoxStyle)}

          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Colors</td></tr>
          ${row("Acrylic Color", input.acrylicColor)}
          ${row("Applied Graphics Color", input.graphicsColor)}
          ${row("Trim Cap Color", input.trimCapColor)}
          ${row("Return Color", input.returnColor)}
          ${row("Raceway/Backer Color", input.racewayColo)}

          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Extras</td></tr>
          ${row("Hanger Bar", input.hangerBar)}
          ${row("Remote Power Supply", input.remotePowerSupply)}
          ${row("Additional Instructions", input.additionalInstructions)}
          ${input.artworkUrls && input.artworkUrls.length > 0 ? `
          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Attached Artwork Files</td></tr>
          ${input.artworkUrls.map(f => `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:200px;">${f.name}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8;"><a href="${f.url}">${f.url}</a></td></tr>`).join("")}
          ` : ""}
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px;">Sent from the CMSG website quote form.</p>
      `;

      const textBody = `New Quote Request\n\nCompany: ${input.companyName}\nName: ${input.firstName} ${input.lastName}\nEmail: ${input.email}\nPhone: ${input.phone || "N/A"}\n\nSign Types: ${input.signTypes?.join(", ") || "N/A"}\nSign Text: ${input.signText || "N/A"}\nDimensions: ${input.width || "?"}W x ${input.height || "?"}H\n\nAdditional Instructions: ${input.additionalInstructions || "None"}`;

      const sent = await sendEmail(subject, htmlBody, textBody);

      // Owner notification as reliable fallback
      await notifyOwner({
        title: `Quote Request: ${input.companyName} (${input.email})`,
        content: textBody,
      }).catch(() => {});

      return { success: sent || true };
    }),
});
