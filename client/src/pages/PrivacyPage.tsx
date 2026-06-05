import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const LAST_UPDATED = "June 1, 2025";
const COMPANY = "Canadian Wholesale Sign Group";
const EMAIL = "sales@canadianwholesalesigns.ca";
const PHONE = "519.498.5825";
const ADDRESS = "6 Nicholas Beaver Rd, Guelph, ON N1H 6H9";

export default function PrivacyPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-forest-dark text-bone py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
          <p className="text-bone/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-stone prose-headings:font-serif prose-headings:text-forest-dark prose-a:text-sage prose-a:no-underline hover:prose-a:underline max-w-none">

          <p>
            {COMPANY} ("CMSG", "we", "our", or "us") is committed to protecting the privacy of our
            wholesale trade partners, website visitors, and prospective customers. This Privacy Policy
            explains what personal information we collect, how we use it, with whom we share it, and
            the choices available to you. By using our website at{" "}
            <a href="https://canadianwholesalesigns.ca">canadianwholesalesigns.ca</a> (the "Site"),
            you agree to the practices described here.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information you provide directly</h3>
          <p>
            When you submit a quote request, contact form, installer sign-up, or any other form on
            the Site, we collect the information you enter. This may include your name, job title,
            company name, email address, phone number, mailing or billing address, and any artwork
            files or project details you upload. We also collect the product type, dimensions, colour
            specifications, and installation preferences you enter in our quote forms.
          </p>

          <h3>Information collected automatically</h3>
          <p>
            When you visit the Site, our servers and analytics tools automatically record certain
            technical information. This includes your IP address, browser type and version, operating
            system, referring URL, pages viewed, time spent on pages, and the date and time of your
            visit. We use this data in aggregate form to understand how visitors use the Site and to
            improve its performance.
          </p>

          <h3>Cookies and similar technologies</h3>
          <p>
            The Site uses cookies — small text files stored on your device — to maintain session
            state, remember preferences, and collect anonymised analytics data. You can control
            cookie behaviour through your browser settings. Disabling cookies may affect certain
            features of the Site, such as form pre-fill functionality.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To respond to quote requests, inquiries, and customer service communications.</li>
            <li>To process and fulfil orders placed through our wholesale trade portal.</li>
            <li>To send transactional emails such as order confirmations and shipping updates.</li>
            <li>To maintain and improve the Site and our services.</li>
            <li>To comply with applicable laws and regulations, including Canadian privacy law.</li>
            <li>
              With your consent, to send periodic marketing communications about new products,
              promotions, or industry news. You may withdraw this consent at any time.
            </li>
          </ul>
          <p>
            We do not sell, rent, or trade your personal information to third parties for their own
            marketing purposes.
          </p>

          <h2>3. How We Share Your Information</h2>
          <p>
            We may share your information with trusted service providers who assist us in operating
            the Site and delivering our services — for example, email delivery services, cloud
            storage providers, and analytics platforms. These providers are contractually obligated
            to handle your information only as directed by us and in accordance with applicable
            privacy law.
          </p>
          <p>
            We may also disclose your information where required by law, court order, or government
            authority, or where we believe disclosure is necessary to protect the rights, property,
            or safety of CMSG, our customers, or the public.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfil the purposes described
            in this Policy, or as required by law. Quote request data and order records are typically
            retained for seven years to comply with Canadian tax and commercial record-keeping
            requirements. Artwork files uploaded for a specific project are retained for 90 days
            after project completion and then securely deleted unless you request otherwise.
          </p>

          <h2>5. Your Rights Under Canadian Privacy Law</h2>
          <p>
            CMSG operates in Canada and is subject to the <em>Personal Information Protection and
            Electronic Documents Act</em> (PIPEDA) and applicable provincial privacy legislation.
            You have the right to:
          </p>
          <ul>
            <li>Request access to the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Withdraw consent to certain uses of your information.</li>
            <li>Request deletion of your information, subject to legal retention obligations.</li>
            <li>File a complaint with the Office of the Privacy Commissioner of Canada.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact our Privacy Officer using the contact
            details below.
          </p>

          <h2>6. Security</h2>
          <p>
            We implement industry-standard technical and organisational measures to protect your
            personal information against unauthorised access, disclosure, alteration, and
            destruction. These include encrypted data transmission (TLS/HTTPS), access controls, and
            secure cloud storage. No method of transmission over the internet is completely secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for the
            privacy practices of those sites and encourage you to review their privacy policies
            before providing any personal information.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or applicable law. We will post the revised Policy on this page with an updated "Last
            updated" date. Continued use of the Site after changes are posted constitutes your
            acceptance of the revised Policy.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our privacy practices,
            please contact our Privacy Officer:
          </p>
          <address className="not-italic bg-stone-100 rounded-xl p-6 text-sm leading-relaxed">
            <strong>{COMPANY}</strong><br />
            Attn: Privacy Officer<br />
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
