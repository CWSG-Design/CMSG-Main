import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const LAST_UPDATED = "June 1, 2025";
const COMPANY = "Canadian Wholesale Sign Group";
const EMAIL = "sales@canadianwholesalesigns.ca";
const PHONE = "519.498.5825";
const ADDRESS = "6 Nicholas Beaver Rd, Guelph, ON N1H 6H9";

export default function AccessibilityPage() {
  return (
    <main className="bg-cream min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-forest-dark text-bone py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-sage font-semibold mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Accessibility Statement</h1>
          <p className="text-bone/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-stone prose-headings:font-serif prose-headings:text-forest-dark prose-a:text-sage prose-a:no-underline hover:prose-a:underline max-w-none">

          <p>
            {COMPANY} ("CMSG") is committed to ensuring that our website is accessible to all users,
            including people with disabilities. We strive to meet or exceed the requirements of the
            <em> Accessibility for Ontarians with Disabilities Act</em> (AODA) and the Web Content
            Accessibility Guidelines (WCAG) 2.1 at Level AA.
          </p>

          <h2>Our Commitment</h2>
          <p>
            We believe that every visitor to our website deserves an equal and inclusive experience.
            Accessibility is an ongoing priority at CMSG. We regularly review our website to
            identify and address barriers, and we incorporate accessibility considerations into
            every new feature and design update.
          </p>

          <h2>Measures We Have Taken</h2>
          <p>
            To support accessibility, CMSG has implemented the following measures on this website:
          </p>
          <ul>
            <li>
              <strong>Semantic HTML:</strong> Pages are built with meaningful HTML elements
              (headings, landmarks, lists) so that screen readers can navigate content logically.
            </li>
            <li>
              <strong>Keyboard navigation:</strong> All interactive elements — navigation menus,
              form fields, buttons, and links — are reachable and operable using a keyboard alone.
              Visible focus indicators are maintained throughout.
            </li>
            <li>
              <strong>Colour contrast:</strong> Text and interactive elements are designed to meet
              WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text).
            </li>
            <li>
              <strong>Alternative text:</strong> Meaningful images include descriptive alt text.
              Decorative images are marked so that assistive technologies skip them.
            </li>
            <li>
              <strong>Responsive design:</strong> The website is fully responsive and usable on
              devices of all sizes, including mobile phones and tablets.
            </li>
            <li>
              <strong>Form accessibility:</strong> All form inputs are associated with visible
              labels. Error messages are descriptive and linked to the relevant field.
            </li>
            <li>
              <strong>Reduced motion:</strong> Animations respect the user's
              <code>prefers-reduced-motion</code> system setting and are suppressed when requested.
            </li>
          </ul>

          <h2>Known Limitations</h2>
          <p>
            While we work continuously to improve accessibility, some areas of the website may not
            yet fully meet WCAG 2.1 AA standards. Known limitations include:
          </p>
          <ul>
            <li>
              Some third-party embedded content (such as map integrations) may not be fully
              accessible. We are working with our providers to address these gaps.
            </li>
            <li>
              Older PDF documents linked from the Resources section may not be fully tagged for
              screen reader access. We are progressively updating these documents.
            </li>
          </ul>
          <p>
            We are actively working to resolve these issues and welcome your feedback to help us
            prioritise improvements.
          </p>

          <h2>Compatibility</h2>
          <p>
            This website is designed to be compatible with the following assistive technologies
            and browsers:
          </p>
          <ul>
            <li>NVDA and JAWS screen readers with Chrome or Firefox on Windows</li>
            <li>VoiceOver with Safari on macOS and iOS</li>
            <li>TalkBack with Chrome on Android</li>
            <li>Keyboard-only navigation in all modern browsers</li>
          </ul>

          <h2>Feedback and Contact</h2>
          <p>
            We welcome feedback on the accessibility of our website. If you experience any barriers,
            encounter content that is not accessible, or need information in an alternative format,
            please contact us. We aim to respond to accessibility-related requests within five
            business days.
          </p>
          <address className="not-italic bg-stone-100 rounded-xl p-6 text-sm leading-relaxed">
            <strong>{COMPANY}</strong><br />
            Attn: Accessibility Coordinator<br />
            {ADDRESS}<br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
            {PHONE}
          </address>

          <h2>Formal Complaints</h2>
          <p>
            If you are not satisfied with our response to your accessibility concern, you may
            contact the <a href="https://www.ontario.ca/page/accessibility-directorate-ontario" target="_blank" rel="noopener noreferrer">Accessibility Directorate of Ontario</a> or
            the <a href="https://www.chrc-ccdp.gc.ca/" target="_blank" rel="noopener noreferrer">Canadian Human Rights Commission</a>.
          </p>

          <h2>Technical Specifications</h2>
          <p>
            This website relies on the following technologies for conformance with WCAG 2.1:
            HTML5, CSS3, WAI-ARIA, and JavaScript. These technologies are relied upon for
            conformance.
          </p>

        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-12 text-sm text-stone-500">
        <Link to="/" className="hover:text-forest-dark transition-colors">← Back to Home</Link>
      </div>

      <Footer />
    </main>
  );
}
