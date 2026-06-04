# CMSG Website TODO

## Completed
- [x] Migrate site from CRA/Emergent to Manus WebDev (Vite + React 19 + TypeScript + shadcn/ui)
- [x] Set up brand palette (forest green, sage, cream, bone) and typography (Fraunces + DM Sans)
- [x] Build Home page with all sections: Header, Hero, Values, Products, ShippingInstall, Resources, Gallery, Testimonials, InstallerCTA, ContactSection, ProductionCTA, Footer
- [x] Build Contact page (/contact) with contact info sidebar and message form
- [x] Build 5-step Quote Request form (/quote) with sign type selectors, color swatches, file upload
- [x] Add vinyl and acrylic color chart images with lightbox to Quote page Step 4
- [x] Add clickable color swatches with hover tooltips to Quote page
- [x] Build Installer Sign-Up page (/installer-sign-up) with full Canada/US form fields
- [x] Build Installation Directory page (/installation-directory) with card grid
- [x] Update real company info: email, address, phone across all pages
- [x] Upgrade project to full-stack (tRPC + Express + MySQL database)
- [x] Wire Contact and Quote forms to send real emails via tRPC + Manus Forge API
- [x] Add file upload (S3) to Quote form Step 5
- [x] Add installers table to drizzle schema and run db:push
- [x] Create installerRouter.ts with list (approved installers) and submit (geocoding) procedures
- [x] Register installerRouter in server/routers.ts
- [x] Rewrite InstallationDirectoryPage with Google Maps (MapView) + trpc.installer.list
  - Full-width map centered on Canada with zoom 4
  - Custom forest-green teardrop pins using AdvancedMarkerElement
  - Click pin to open info popup with company details
  - Sidebar list with search, skeleton loaders, empty states
  - Full card grid below map
  - "Add Your Company" button linking to /installer-sign-up
- [x] Wire InstallerSignUpPage to trpc.installer.submit
  - Replace localStorage with real tRPC mutation
  - Loading state with spinner on submit button
  - Success screen updated to reflect pending review workflow
  - Address privacy note added

## Pending / Future
- [ ] Admin panel to approve/reject pending installer submissions
- [ ] Upload real product/hero images when user provides them
- [ ] Connect custom domain (canadianwholesalesigns.ca)
- [ ] SEO meta tags and Open Graph images
