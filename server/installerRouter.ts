import { z } from "zod";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { installers } from "../drizzle/schema";
import { makeRequest, GeocodingResult } from "./_core/map";
import { notifyOwner } from "./_core/notification";

// Geocode an address string → { lat, lng } or null
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const result = await makeRequest<GeocodingResult>("/maps/api/geocode/json", {
      address,
    });
    if (result.status === "OK" && result.results.length > 0) {
      const loc = result.results[0].geometry.location;
      return { lat: loc.lat, lng: loc.lng };
    }
    return null;
  } catch {
    return null;
  }
}

export const installerRouter = router({
  // List all approved installers (for the map + directory)
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db
      .select()
      .from(installers)
      .where(eq(installers.approved, "approved"));
    return rows.map((r) => ({
      id: r.id,
      companyName: r.companyName,
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      website: r.website,
      city: r.city,
      province: r.province,
      country: r.country,
      lat: r.lat ? parseFloat(r.lat) : null,
      lng: r.lng ? parseFloat(r.lng) : null,
      capabilities: r.capabilities,
      equipment: r.equipment,
      areasServed: r.areasServed,
      maxTravelDistance: r.maxTravelDistance,
    }));
  }),

  // Submit a new installer sign-up (geocodes the address automatically)
  submit: publicProcedure
    .input(
      z.object({
        companyName: z.string().min(1),
        contactName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        website: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional().default("Canada"),
        capabilities: z.string().optional(),
        equipment: z.string().optional(),
        areasServed: z.string().optional(),
        maxTravelDistance: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      // Build a geocodeable address string
      const addressParts = [
        input.address,
        input.city,
        input.province,
        input.postalCode,
        input.country,
      ]
        .filter(Boolean)
        .join(", ");

      const coords = addressParts ? await geocodeAddress(addressParts) : null;

      await db.insert(installers).values({
        companyName: input.companyName,
        contactName: input.contactName ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        website: input.website ?? null,
        address: input.address ?? null,
        city: input.city ?? null,
        province: input.province ?? null,
        postalCode: input.postalCode ?? null,
        country: input.country ?? "Canada",
        lat: coords ? String(coords.lat) : null,
        lng: coords ? String(coords.lng) : null,
        capabilities: input.capabilities ?? null,
        equipment: input.equipment ?? null,
        areasServed: input.areasServed ?? null,
        maxTravelDistance: input.maxTravelDistance ?? null,
        approved: "pending",
      });

      // Notify the site owner of the new sign-up
      await notifyOwner({
        title: `New Installer Sign-Up: ${input.companyName}`,
        content: `${input.contactName ?? "Unknown contact"} from ${input.companyName} has submitted an installer sign-up.\n\nCity: ${input.city ?? "N/A"}, ${input.province ?? ""}\nEmail: ${input.email ?? "N/A"}\nPhone: ${input.phone ?? "N/A"}\n\nPlease review and approve in the admin panel.`,
      });

      return { success: true };
    }),
});
