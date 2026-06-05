import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";
import { storagePut, storageGetSignedUrl } from "./storage";

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
        // ── Step 1: Your Info ──
        companyName: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        jobTitle: z.string().optional(),
        email: z.string().email(),
        phone: z.string().optional(),
        billingAddress: z.string().optional(),
        isTradeCustomer: z.string().optional(),
        numSigns: z.string().optional(),
        inHandDate: z.string().optional(),
        installDate: z.string().optional(),
        // ── Step 2: Product Selection ──
        signTypes: z.array(z.string()).optional(),
        // ── Step 3: Sign Details ──
        illumination: z.string().optional(),
        mounting: z.string().optional(),
        signText: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        letterHeight: z.string().optional(),
        secondaryLetterHeight: z.string().optional(),
        panelWidth: z.string().optional(),
        panelHeight: z.string().optional(),
        logoWidth: z.string().optional(),
        logoHeight: z.string().optional(),
        installationType: z.string().optional(),
        installationLocation: z.string().optional(),
        faceGraphics: z.string().optional(),
        ledType: z.string().optional(),
        logoBoxStyle: z.string().optional(),
        printMaterial: z.string().optional(),
        // ── Step 4: Colors ──
        acrylicColor: z.string().optional(),
        graphicsColor: z.string().optional(),
        trimCapColor: z.string().optional(),
        returnColor: z.string().optional(),
        racewayColor: z.string().optional(),
        // ── Step 5: Extras ──
        hangerBar: z.string().optional(),
        racewayLocation: z.string().optional(),
        extras: z.array(z.string()).optional(),
        additionalInstructions: z.string().optional(),
        // Artwork file keys (uploaded separately via uploadArtwork)
        artworkFiles: z.array(z.object({ name: z.string(), key: z.string() })).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const subject = `[CMSG Quote Request] ${input.companyName} — ${input.firstName} ${input.lastName}`;

      // Resolve presigned download URLs for each uploaded file so the email
      // contains real clickable links (not relative /manus-storage/ paths).
      const artworkLinks: { name: string; signedUrl: string }[] = [];
      if (input.artworkFiles && input.artworkFiles.length > 0) {
        for (const f of input.artworkFiles) {
          try {
            const signedUrl = await storageGetSignedUrl(f.key);
            artworkLinks.push({ name: f.name, signedUrl });
          } catch (err) {
            console.warn(`[Quote] Could not sign URL for ${f.name}:`, err);
            artworkLinks.push({ name: f.name, signedUrl: `(URL unavailable for ${f.name})` });
          }
        }
      }

      const row = (label: string, value: string | undefined | null | boolean) => {
        if (value === undefined || value === "" || value === null) return "";
        const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
        return `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:220px;vertical-align:top;">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8;white-space:pre-wrap;">${display}</td></tr>`;
      };

      const section = (title: string) =>
        `<tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">${title}</td></tr>`;

      const htmlBody = `
        <h2 style="color:#1a3a2a;font-family:sans-serif;margin-bottom:4px;">New Quote Request</h2>
        <p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:0;">Submitted via the CMSG website quote form.</p>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:720px;border:1px solid #e5e0d8;">

          ${section("Contact Information")}
          ${row("Company", input.companyName)}
          ${row("Name", `${input.firstName} ${input.lastName}`)}
          ${row("Job Title", input.jobTitle)}
          ${row("Email", `<a href="mailto:${input.email}">${input.email}</a>`)}
          ${row("Phone", input.phone)}
          ${row("Billing Address", input.billingAddress)}
          ${row("Trade Customer?", input.isTradeCustomer)}
          ${row("Number of Signs", input.numSigns)}
          ${row("In-Hand Date", input.inHandDate)}
          ${row("Installation Date", input.installDate)}

          ${section("Product Selected")}
          ${row("Product", input.signTypes?.join(", "))}

          ${section("Sign Details")}
          ${row("Illumination", input.illumination)}
          ${row("Mounting", input.mounting)}
          ${row("Sign Text", input.signText)}
          ${row("Overall Width (in)", input.width)}
          ${row("Overall Height (in)", input.height)}
          ${row("Main Letter Height (in)", input.letterHeight)}
          ${row("Secondary Letter Height (in)", input.secondaryLetterHeight)}
          ${row("Panel Width (in)", input.panelWidth)}
          ${row("Panel Height (in)", input.panelHeight)}
          ${row("Logo Width (in)", input.logoWidth)}
          ${row("Logo Height (in)", input.logoHeight)}
          ${row("Installation Type", input.installationType)}
          ${row("Installation Location", input.installationLocation)}
          ${row("Face Graphics", input.faceGraphics)}
          ${row("LED Type", input.ledType)}
          ${row("Logo Box Style", input.logoBoxStyle)}
          ${row("Print Material", input.printMaterial)}

          ${section("Colors")}
          ${row("Acrylic Color", input.acrylicColor)}
          ${row("Applied Vinyl Color(s)", input.graphicsColor)}
          ${row("Trim Cap Color", input.trimCapColor)}
          ${row("Return Color", input.returnColor)}
          ${row("Raceway / Backer Color", input.racewayColor)}

          ${section("Extras & Customizations")}
          ${row("Hanger Bar", input.hangerBar)}
          ${row("Raceway Location", input.racewayLocation)}
          ${input.extras && input.extras.length > 0 ? row("Other Customizations", input.extras.join(", ")) : ""}
          ${row("Additional Instructions", input.additionalInstructions)}

          ${artworkLinks.length > 0 ? `
          ${section("Attached Artwork Files")}
          ${artworkLinks.map(f => `<tr>
            <td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:220px;">${f.name}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #e5e0d8;word-break:break-all;">
              <a href="${f.signedUrl}" style="color:#1a3a2a;">Download / View File</a>
            </td>
          </tr>`).join("")}
          ` : ""}

        </table>
        <p style="font-family:sans-serif;font-size:11px;color:#aaa;margin-top:20px;">
          File download links expire after 7 days. Reply to this email if you need files re-sent.
        </p>
      `;

      // Plain-text fallback (comprehensive)
      const lines = [
        "=== CMSG QUOTE REQUEST ===",
        "",
        "--- Contact ---",
        `Company: ${input.companyName}`,
        `Name: ${input.firstName} ${input.lastName}`,
        `Job Title: ${input.jobTitle || "—"}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone || "—"}`,
        `Address: ${input.billingAddress || "—"}`,
        `Trade Customer: ${input.isTradeCustomer || "—"}`,
        `# of Signs: ${input.numSigns || "—"}`,
        `In-Hand Date: ${input.inHandDate || "—"}`,
        `Install Date: ${input.installDate || "—"}`,
        "",
        "--- Product ---",
        `Product: ${input.signTypes?.join(", ") || "—"}`,
        "",
        "--- Sign Details ---",
        `Illumination: ${input.illumination || "—"}`,
        `Mounting: ${input.mounting || "—"}`,
        `Sign Text: ${input.signText || "—"}`,
        `Overall: ${input.width || "?"}W × ${input.height || "?"}H in`,
        `Main Letter Height: ${input.letterHeight || "—"} in`,
        `Secondary Letter Height: ${input.secondaryLetterHeight || "—"} in`,
        `Panel: ${input.panelWidth || "?"}W × ${input.panelHeight || "?"}H in`,
        `Logo: ${input.logoWidth || "?"}W × ${input.logoHeight || "?"}H in`,
        `Installation Type: ${input.installationType || "—"}`,
        `Installation Location: ${input.installationLocation || "—"}`,
        `Face Graphics: ${input.faceGraphics || "—"}`,
        `LED Type: ${input.ledType || "—"}`,
        `Logo Box Style: ${input.logoBoxStyle || "—"}`,
        `Print Material: ${input.printMaterial || "—"}`,
        "",
        "--- Colors ---",
        `Acrylic: ${input.acrylicColor || "—"}`,
        `Vinyl: ${input.graphicsColor || "—"}`,
        `Trim Cap: ${input.trimCapColor || "—"}`,
        `Return: ${input.returnColor || "—"}`,
        `Raceway/Backer: ${input.racewayColor || "—"}`,
        "",
        "--- Extras ---",
        `Hanger Bar: ${input.hangerBar || "—"}`,
        `Raceway Location: ${input.racewayLocation || "—"}`,
        `Other: ${input.extras?.join(", ") || "—"}`,
        `Notes: ${input.additionalInstructions || "—"}`,
      ];

      if (artworkLinks.length > 0) {
        lines.push("", "--- Artwork Files ---");
        artworkLinks.forEach(f => lines.push(`${f.name}: ${f.signedUrl}`));
      }

      const textBody = lines.join("\n");

      const sent = await sendEmail(subject, htmlBody, textBody);

      // Owner notification as reliable fallback
      await notifyOwner({
        title: `Quote: ${input.companyName} — ${input.signTypes?.join(", ") || "Unknown product"}`,
        content: textBody,
      }).catch(() => {});

      return { success: sent || true };
    }),
  /** Signage Needs Assessment submission */
  sendAssessment: publicProcedure
    .input(
      z.object({
        answers: z.record(z.string(), z.string()),
        recommendations: z.array(z.string()),
        businessName: z.string(),
        contactName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        city: z.string().optional(),
        preferredContact: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const questionLabels: Record<string, string> = {
        goal: 'Goal',
        businessType: 'Business Type',
        location: 'Sign Location',
        illumination: 'Night Visibility',
        existing: 'Existing Signage',
        installation: 'Installation',
        stage: 'Purchase Stage',
      };

      const answerRows = Object.entries(input.answers)
        .map(([k, v]) => `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:200px">${questionLabels[k] ?? k}</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${v}</td></tr>`)
        .join('');

      const recItems = input.recommendations.length
        ? input.recommendations.map((r: string) => `<li style="margin:4px 0">${r.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</li>`).join('')
        : '<li>No specific recommendations generated</li>';

      const emailSubject = `[CMSG Assessment] ${input.businessName}`;

      const htmlBody = `
        <h2 style="color:#1a3a2a;font-family:sans-serif;margin-bottom:4px;">Signage Needs Assessment</h2>
        <p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:0;">Submitted via the CMSG website assessment tool.</p>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e0d8;">
          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Contact</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold;width:200px">Business</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${input.businessName}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold">Contact Name</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${input.contactName}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold">Email</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8"><a href="mailto:${input.email}">${input.email}</a></td></tr>
          ${input.phone ? `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold">Phone</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${input.phone}</td></tr>` : ''}
          ${input.city ? `<tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold">City</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${input.city}</td></tr>` : ''}
          <tr><td style="padding:6px 12px;background:#f5f0e8;font-weight:bold">Preferred Contact</td><td style="padding:6px 12px;border-bottom:1px solid #e5e0d8">${input.preferredContact ?? 'Email'}</td></tr>
          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Assessment Answers</td></tr>
          ${answerRows}
          <tr><td colspan="2" style="padding:10px 12px;background:#1a3a2a;color:#fff;font-weight:bold;font-size:15px;">Recommended Products</td></tr>
          <tr><td colspan="2" style="padding:10px 12px"><ul style="margin:0;padding-left:20px">${recItems}</ul></td></tr>
        </table>
      `;

      const textLines = [
        `[CMSG Assessment] ${input.businessName}`,
        `Contact: ${input.contactName} | ${input.email}${input.phone ? ' | ' + input.phone : ''}${input.city ? ' | ' + input.city : ''}`,
        `Preferred Contact: ${input.preferredContact ?? 'Email'}`,
        '',
        '--- Assessment Answers ---',
        ...Object.entries(input.answers).map(([k, v]) => `${questionLabels[k] ?? k}: ${v}`),
        '',
        '--- Recommended Products ---',
        ...input.recommendations.map((r: string) => r.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())),
      ];

      const sent = await sendEmail(emailSubject, htmlBody, textLines.join('\n'));
      await notifyOwner({
        title: `Assessment: ${input.businessName} — Stage: ${input.answers.stage ?? 'unknown'}`,
        content: textLines.join('\n'),
      }).catch(() => {});
      return { success: sent || true };
    }),

});
