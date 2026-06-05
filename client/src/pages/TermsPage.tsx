import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const LAST_UPDATED = "June 1, 2025";
const COMPANY = "Canadian Wholesale Sign Group";
const EMAIL = "sales@canadianwholesalesigns.ca";
const PHONE = "519.498.5825";
const ADDRESS = "6 Nicholas Beaver Rd, Guelph, ON N1H 6H9";

export default function TermsPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-forest-dark text-bone py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms of Service</h1>
          <p className="text-bone/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-stone prose-headings:font-serif prose-headings:text-forest-dark prose-a:text-sage prose-a:no-underline hover:prose-a:underline max-w-none">

          <p>
            Please read these Terms of Service ("Terms") carefully before using the website located
            at <a href="https://canadianwholesalesigns.ca">canadianwholesalesigns.ca</a> (the "Site")
            or placing any order with {COMPANY} ("CMSG", "we", "our", or "us"). By accessing the
            Site or submitting a quote request or purchase order, you agree to be bound by these
            Terms. If you do not agree, please do not use the Site.
          </p>

          <h2>1. Wholesale Trade Only</h2>
          <p>
            CMSG is a <strong>wholesale-only</strong> supplier. Access to pricing, product
            specifications, and ordering is restricted to verified sign shops, print shops, and
            licensed sign contractors. By using the Site, you represent and warrant that you are
            purchasing for resale or installation on behalf of a trade business, and not for personal
            or end-consumer use. CMSG reserves the right to decline or cancel any order that does
            not meet this requirement.
          </p>

          <h2>2. Quotes and Orders</h2>
          <p>
            All quote requests submitted through the Site are non-binding until confirmed in writing
            by a CMSG sales representative. Prices quoted are valid for 30 days from the date of
            the written confirmation unless otherwise stated. CMSG reserves the right to adjust
            pricing to reflect changes in material costs, currency fluctuations, or supply chain
            conditions prior to order acceptance.
          </p>
          <p>
            An order is accepted only upon CMSG's written order confirmation and receipt of any
            required deposit. CMSG may decline to accept any order at its sole discretion.
          </p>

          <h2>3. Artwork and Specifications</h2>
          <p>
            You are solely responsible for the accuracy of all artwork, copy, dimensions, colour
            specifications, and other production details you provide. CMSG will manufacture signs
            to the specifications submitted. We are not liable for errors in customer-supplied
            artwork or specifications. Before production begins, a digital proof will be provided
            for your approval. Production commences only after written approval is received.
          </p>
          <p>
            By submitting artwork to CMSG, you represent and warrant that you have all necessary
            rights, licences, and permissions to use the artwork, including any trademarks, logos,
            or copyrighted material. You agree to indemnify and hold CMSG harmless from any claims
            arising from the artwork you supply.
          </p>

          <h2>4. Production Lead Times</h2>
          <p>
            Lead times quoted are estimates and commence from the date of written order confirmation
            and receipt of approved artwork. CMSG will make reasonable efforts to meet quoted lead
            times but is not liable for delays caused by circumstances beyond our reasonable
            control, including material shortages, carrier delays, or force majeure events.
          </p>

          <h2>5. Shipping and Risk of Loss</h2>
          <p>
            All shipments are made FOB our facility in Guelph, Ontario. Risk of loss or damage
            passes to you upon delivery to the carrier. CMSG will arrange shipping on your behalf
            using our preferred carriers unless you specify otherwise. Freight charges are invoiced
            at cost. You are responsible for inspecting shipments upon receipt and reporting any
            visible damage to the carrier and to CMSG within 48 hours of delivery.
          </p>

          <h2>6. Payment Terms</h2>
          <p>
            Payment terms are as agreed in your account application or as stated on the order
            confirmation. Standard terms for new accounts require a 50% deposit at order
            confirmation and the balance prior to shipment. Approved accounts may be extended net
            30 terms. Overdue balances accrue interest at 2% per month (24% per annum). CMSG
            reserves the right to place accounts on hold for overdue balances.
          </p>

          <h2>7. Returns, Defects, and Warranty</h2>
          <p>
            CMSG warrants that products will be free from defects in materials and workmanship
            under normal use for a period of <strong>one year</strong> from the date of shipment.
            This warranty does not cover damage caused by improper installation, misuse, exposure
            to conditions outside the product's rated specifications, or normal wear and tear.
          </p>
          <p>
            Warranty claims must be submitted in writing within the warranty period, accompanied
            by photographs documenting the defect. CMSG's sole obligation under this warranty is,
            at our election, to repair or replace the defective product. We do not accept returns
            of custom-manufactured products unless the product is defective.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, CMSG's total liability to you for
            any claim arising out of or relating to these Terms or any order shall not exceed the
            amount paid by you for the specific product giving rise to the claim. In no event shall
            CMSG be liable for any indirect, incidental, special, consequential, or punitive
            damages, including lost profits or loss of business, even if advised of the possibility
            of such damages.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            All content on the Site, including text, images, product photography, logos, and design
            elements, is the property of CMSG or its licensors and is protected by Canadian and
            international copyright and trademark law. You may not reproduce, distribute, or create
            derivative works from Site content without our prior written consent.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Province of Ontario and the federal laws of
            Canada applicable therein, without regard to conflict of law principles. Any dispute
            arising under these Terms shall be subject to the exclusive jurisdiction of the courts
            of Ontario.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            CMSG may update these Terms from time to time. We will post the revised Terms on this
            page with an updated "Last updated" date. Your continued use of the Site after changes
            are posted constitutes your acceptance of the revised Terms.
          </p>

          <h2>12. Contact</h2>
          <p>For questions about these Terms, please contact us:</p>
          <address className="not-italic bg-stone-100 rounded-xl p-6 text-sm leading-relaxed">
            <strong>{COMPANY}</strong><br />
            {ADDRESS}<br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
            {PHONE}
          </address>

        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-12 text-sm text-stone-500">
        <Link to="/" className="hover:text-forest-dark transition-colors">← Back to Home</Link>
      </div>

      <Footer />
    </main>
  );
}
