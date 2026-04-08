**CARE WELL MEDICAL CENTRE**

Chittaranjan Park, South Delhi \| Dr. Sandeep Bhasin

**WEBSITE REDEVELOPMENT --- REQUIREMENTS BRIEF**

*Platform · UI/UX · Service & Blog Pages · Lead Generation · SEO · Core
Web Vitals · CMS*

Version 1.0 \| March 2026 \| For: Website Developer

# 1. PROJECT OVERVIEW & OBJECTIVES

Full website redevelopment for Care Well Medical Centre --- 127+ service
pages, blog, lead generation, SEO, and a self-managed headless CMS. The
clinic team must be able to edit ALL content, SEO fields, images, and
redirects independently --- no developer needed after launch.

  -----------------------------------------------------------------------
  **Objective**             **Requirement**
  ------------------------- ---------------------------------------------
  Primary Goal              Convert visitors into consultation leads ---
                            target 5%+ conversion rate

  SEO Goal                  Google Page 1 for cosmetic surgery & vitiligo
                            keywords --- Delhi NCR

  CMS Goal                  100% self-managed --- content, SEO, images,
                            redirects --- zero developer dependency

  Language                  English (primary) + Hindi bilingual pages for
                            regional SEO

  Scale                     127+ service pages, 200+ blog articles --- no
                            performance loss at scale
  -----------------------------------------------------------------------

# 2. RECOMMENDED TECH STACK

  -----------------------------------------------------------------------
  **Layer**     **Technology**         **Reason**
  ------------- ---------------------- ----------------------------------
  Framework     Next.js 14 (App        SSR/SSG for SEO, image
                Router)                optimization, API routes,
                                       file-based routing

  Language      TypeScript             Type safety, fewer bugs, easier
                                       long-term maintenance

  Styling       Tailwind CSS           Tiny CSS bundle, design tokens,
                                       rapid responsive development

  Animation     Framer Motion          Scroll animations, page
                                       transitions, micro-interactions

  Forms         React Hook Form + Zod  Fast async validation --- no UI
                                       blocking

  CMS           Sanity.io (Headless)   Browser editor, custom SEO fields,
                                       redirect manager, image CDN

  Deploy        Vercel + Cloudflare    Edge CDN, \<100ms TTFB India, DDoS
                                       protection

  Analytics     GA4 + GTM + Clarity    Conversion tracking, heatmaps,
                                       Meta Pixel via GTM

  SEO Tools     next-seo +             Auto sitemap, meta tags,
                next-sitemap + JSON-LD Schema.org structured data
  -----------------------------------------------------------------------

# 3. DESIGN SYSTEM

  ------------------------------------------------------------------------
  **Token**        **Value & Usage**           **Typography**
  ---------------- --------------------------- ---------------------------
  Primary Blue     #1557A0 --- buttons,        Headings: Plus Jakarta Sans
                   headings, nav active        Bold

  Deep Navy        #0A2E52 --- hero overlay,   Body: Inter Regular,
                   footer                      16-18px, line-height 1.75

  Teal             #0B7B6B --- accents, icons, Load via next/font
                   hover states                (self-hosted, zero latency)

  Warm White       #FAFBFE --- page background Min font size on mobile:
                                               16px (Google requirement)

  Surface Gray     #F6F7F9 --- card &          Spacing: 4px base unit ---
                   alternating bg              8/16/24/32/48/64/96px

  Alert Orange     #B54708 --- urgency,        Section padding: 96px
                   limited slots               desktop / 48px mobile
  ------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **UX Principles**
  -----------------------------------------------------------------------
  Animations: Scroll-triggered fade-up (Framer Motion, 0.5s staggered).
  Hover: 150ms ease. Button press: scale 0.97.

  Respect prefers-reduced-motion. Disable heavy animations on devices
  with \<4GB RAM (deviceMemory API).

  Skeleton screens for ALL dynamic content --- never a blank white flash.
  Zero dead ends on any page.

  No auto-playing video with sound. Muted background video only, with
  visible pause control.
  -----------------------------------------------------------------------

# 4. NAVIGATION & GLOBAL ELEMENTS

  -----------------------------------------------------------------------
  **Element**        **Specification**
  ------------------ ----------------------------------------------------
  Navbar             70px desktop / 60px mobile. Transparent on hero →
                     white+shadow on scroll. Logo \| Nav links \|
                     WhatsApp icon + \'Book Free Consultation\' CTA
                     button (right).

  Mega Menu          \'Services\' opens 5-column grid: Hair \| Skin &
                     Vitiligo \| Face \| Body \| Therapies. Each column:
                     top 5 services + \'View All\' link.

  Mobile Nav         Hamburger → full-screen drawer. Click-to-call at top
                     of drawer.

  WhatsApp Bubble    Fixed bottom-right, every page, always visible.
                     Pre-filled message based on current page.

  Call Button        Fixed bottom-left on mobile only. Click-to-call.
                     Never hidden.

  Hello Bar          Thin rotating top bar: \'Free consultation ---
                     Limited slots.\' Closeable by user.

  Footer             4 cols: Logo+Map \| Quick Links \| Top Services \|
                     Hours+Social. Bottom: Copyright + Medical
                     Disclaimer + MBBS Reg No.
  -----------------------------------------------------------------------

# 5. SERVICE PAGE DESIGN (One reusable React template --- covers all 127+ pages)

Build ONE component. Content populates from Sanity CMS. Layout stays
fixed --- only content changes per service.

  -----------------------------------------------------------------------
  **Block**           **Specification**
  ------------------- ---------------------------------------------------
  HERO BANNER         65vh. Clinic-owned photo + navy gradient overlay.
                      LEFT: Breadcrumb + H1 \'\[Service\] in Delhi\' +
                      tagline + 2 CTAs (Book \| WhatsApp). RIGHT
                      (desktop): \'Quick Facts\' floating card ---
                      procedure time, recovery period, anaesthesia type,
                      pain scale, results timeline.

  STICKY SIDEBAR      Desktop: 280px fixed right panel (appears after
                      hero scroll). Contents: 3-field form (Name, Mobile,
                      Treatment pre-selected) + Call + WhatsApp + clinic
                      hours. MOBILE: Fixed bottom bar --- \[Call\]
                      \[WhatsApp\] \[Book Now\] --- 3 equal buttons. This
                      drives 40--60% of service page conversions.

  WHAT IS \[SERVICE\] 350--450 words plain-language explanation. Custom
                      illustration (right desktop). 3-point insight
                      callout box.

  HOW IT WORKS        5-step horizontal timeline (desktop) / vertical
                      (mobile): Consultation → Assessment → Procedure →
                      Recovery → Results. YouTube video thumbnail
                      (lite-youtube-embed, NOT iframe --- click to play
                      in modal).

  BEFORE & AFTER      4--6 drag-to-compare sliders. Filter tabs for
                      sub-types. Patient: initials, age, gender, months
                      post-procedure. Consent notice visible. CTA: \'Get
                      Similar Results →\'

  AM I A CANDIDATE?   2-column card: Green list (good candidate) vs
                      Orange list (not ideal). Ends with quiz CTA.
                      Pre-qualifies visitors, improves lead quality
                      significantly.

  PRICING SECTION     Show range only --- \'Starting from ₹X,XXX\'. NEVER
                      fixed prices. 3 cost factors explained. EMI
                      mention. CTA: \'Get Personalized Quote\'. Value
                      stack: what\'s included.

  FAQ ACCORDION       Min 8--10 Q&As. FAQPage JSON-LD schema mandatory
                      (generates Google rich snippets). Conversational
                      question style. Last FAQ always: \'How to book at
                      Care Well?\' with address + phone.

  RELATED SERVICES    3--4 cards linking to related service pages.
                      Reduces bounce rate, increases session depth.

  FINAL CTA STRIP     Full-width navy/teal bg. Headline + \[Book Free
                      Consultation\] + \[Call Now\]. WhatsApp link below.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **5B. Category Hub Pages**
  -----------------------------------------------------------------------
  Category Hub Pages (Hair / Face / Body / Skin / Therapies): Each
  category gets its own hub page. Contains: category hero + all
  sub-services as icon cards + \'Which is right for me?\' comparison
  table + category-level Before/After gallery + combined FAQ + 3 related
  blog articles. These rank for broad keywords and funnel visitors into
  specific service pages.

  -----------------------------------------------------------------------

# 6. BLOG PAGE DESIGN

## ▸ 6A --- Blog Listing Page (/blog/)

Editorial header \'Expert Insights by Dr. Sandeep Bhasin\' + search bar.
Category filter tabs: All \| Hair \| Vitiligo \| Face \| Body \|
Therapies \| Anti-Aging \| Hindi. 1 featured hero article. 3-column card
grid (desktop) → 1 column (mobile). Card: thumbnail + category tag +
title + 2-line excerpt + author + date + read time. Desktop sidebar:
popular posts + Dr. Bhasin bio + Book CTA. \'Load More\' button --- no
page reload.

## ▸ 6B --- Blog Article Page

  -----------------------------------------------------------------------
  **Section**        **Specification**
  ------------------ ----------------------------------------------------
  Header             Breadcrumb + H1 + author photo + Dr. Bhasin byline +
                     date + last updated + read time + share buttons
                     (WhatsApp, Facebook, X, copy link).

  Table of Contents  Sticky left panel (desktop) tracking H2 sections.
                     Active section highlighted. Mobile: collapsible
                     \'Jump to section\' dropdown.

  Article Body       Max 680px line width. Inter 17px, line-height 1.75.
                     One image every 300--400 words. Pull quotes. Info
                     callout boxes. Bold key medical terms.

  Mid-Article CTA    After \~40% of article: inline box --- \'Have
                     questions? Book a free 15-min consultation →\'

  Sticky Sidebar     Right: mini consultation form (Name + Phone + Book).
                     Popular articles. Dr. Bhasin byline card. After 50%
                     scroll: heading changes to \'Still have questions?
                     Ask Dr. Bhasin\'

  Article Footer     Author box: large photo + full credentials + \'Book
                     Consultation →\'. Social share bar. 3 related
                     article cards. Full-width bottom CTA strip.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **6C --- Blog SEO: Content Cluster Strategy**
  -----------------------------------------------------------------------
  Blog SEO: Topic cluster model. 1 pillar article (3,000--5,000 words)
  per major topic + 5--10 cluster articles (1,000--2,000 words) linking
  back to pillar AND relevant service page. Clusters: Hair Transplant \|
  Vitiligo \| Face Surgery \| Body Contouring \| HBOT & IV Therapies \|
  Anti-Aging. Every article: BlogPosting + BreadcrumbList + Author
  JSON-LD schema.

  -----------------------------------------------------------------------

# 7. LEAD GENERATION & CONVERSION

## ▸ Form Rules --- Non-Negotiable

  -----------------------------------------------------------------------
  Max 3 fields on any primary form: Name \| Mobile \| Treatment Interest
  (dropdown pre-set to current page service).
  -----------------------------------------------------------------------
  Submit button text: \'Claim My Free Slot\' / \'Get Free Consultation\'
  --- NEVER \'Submit\'.

  Below every form: \'🔒 100% Private \| Response within 2 hours \| No
  spam\'.

  After submission: Thank-you page with \'Continue on WhatsApp\' button
  --- highest conversion continuation step.

  Every form records source page URL + UTM parameters in hidden field ---
  for lead attribution.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Visitor Stage**   **Mechanism**
  ------------------- ---------------------------------------------------
  Just browsing       Exit-intent popup (30s delay mobile / cursor-leave
                      desktop): \'Get FREE 15-min call --- 5 slots
                      left.\' Name + Phone only.

  Reading &           Mid-article CTA box + Treatment Finder Quiz
  researching         trigger + blog sidebar form.

  Actively            Sticky sidebar lead form + Pricing section CTA +
  considering         Cost Estimator tool.

  Ready to book       Hero CTA + Final CTA strip + WhatsApp +
                      Click-to-call.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Power Feature**     **How It Works**
  --------------------- -------------------------------------------------
  Treatment Finder Quiz 5 questions → result GATED behind phone number →
                        personalized service recommendation. Pure React
                        state --- no backend. Placement: homepage + 30s
                        popup + sidebar on service pages.

  Cost Estimator Tool   Select procedure → grade → price range shown only
                        after phone entered. Dedicated page
                        /cost-estimator/. Ranks for \'hair transplant
                        cost Delhi 2026\'.

  EMI Calculator        JS widget: select amount + tenure → shows monthly
                        EMI. Link to 0% EMI partners. No backend
                        required.

  WhatsApp Auto-Bot     WATI/AiSensy: auto-reply with quick-reply buttons
                        \[Hair\]\[Vitiligo\]\[Face\]\[Body\] within
                        seconds of first message.
  -----------------------------------------------------------------------

Lead Backend: All forms → Google Sheets (real-time). Email alert
(SendGrid). WhatsApp alert to clinic owner\'s phone for every new lead.

# 8. SEO ARCHITECTURE

  -----------------------------------------------------------------------
  **Requirement**       **Implementation**
  --------------------- -------------------------------------------------
  SSR/SSG               SSG (generateStaticParams) for all service + blog
                        pages. ISR (revalidate:60) for CMS-updated
                        content. Never client-side render SEO pages.

  Sitemap               Auto-generated via next-sitemap on every build.
                        Submit to Google Search Console within 24h of
                        launch.

  Schema Markup         JSON-LD on every page:
                        LocalBusiness+MedicalClinic (home) \| Physician
                        (about) \| MedicalProcedure (service) \| FAQPage
                        (FAQ sections) \| BlogPosting (blog) \|
                        BreadcrumbList (all inner pages) \|
                        AggregateRating (home+service).

  Canonical URLs        Self-referencing canonical on every page --- no
                        exceptions.

  Hreflang              English (en-IN) + Hindi (hi-IN) page pairs tagged
                        correctly.

  301 Redirects         Crawl existing site with Screaming Frog. Map ALL
                        old URLs → new URLs. Configure in Next.js
                        redirects config AND Sanity redirect manager.
                        Zero 404s after migration.

  Meta Tags             Title: \[KW\] in Delhi \| \[Secondary KW\] \|
                        Care Well. Meta desc: 155 chars --- keyword +
                        trust signal + location + CTA. Custom OG image
                        1200x630px per page.

  Image SEO             All images: WebP, descriptive alt text with
                        keyword, lazy loading (except hero). Alt text =
                        required field in Sanity CMS.
  -----------------------------------------------------------------------

# 9. CORE WEB VITALS --- FIX REQUIREMENTS

Targets: LCP \< 2.5s \| CLS \< 0.1 \| INP \< 200ms \| TTFB \< 600ms \|
PageSpeed Mobile \> 85 \| Desktop \> 95

  --------------------------------------------------------------------------
  **Metric**   **Cause**          **Fix**
  ------------ ------------------ ------------------------------------------
  LCP          Slow hero image    next/image with fetchPriority=\'high\' +
                                  loading=\'eager\'. WebP \< 150KB. Preload
                                  in next/head. Serve from Vercel/Sanity CDN
                                  only.

  LCP          Google Fonts       Self-host ALL fonts via next/font.
               latency            font-display:swap. Load only needed
                                  weights (400,600,700). Zero external font
                                  requests.

  LCP          Slow TTFB          Vercel region: ap-south-1 (Mumbai). SSG
                                  for service/blog pages. ISR for dynamic
                                  content. Cloudflare CDN in front.

  CLS          Images without     Every image: explicit width + height.
               dimensions         next/image enforces this. No plain \<img\>
                                  tags.

  CLS          Dynamic content    Hello bar, cookie banner, popups: in
               injected           initial SSR HTML or fixed/absolute
                                  positioned. Never push page content down.

  CLS          CSS animations     Animate only transform + opacity. Never
                                  width, height, margin, padding.

  INP          Large JS bundles   Dynamic import (next/dynamic, ssr:false)
                                  for FAQ, gallery, quiz, video modal. No
                                  chunk \> 100KB gzipped.

  INP          Scroll event       All scroll listeners: {passive:true}.
               handlers           Debounce/throttle heavy scroll logic.

  INP          Third-party        GTM: strategy=\'afterInteractive\'.
               scripts            WhatsApp widget + Chat:
                                  strategy=\'lazyOnload\'. YouTube: use
                                  lite-youtube-embed (NOT standard iframe).
                                  Google Reviews: fetch at build time via
                                  Places API → static HTML.
  --------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Pre-Launch CWV Checklist --- Screenshots Required Before Final
  Payment**
  -----------------------------------------------------------------------
  \[ \] PageSpeed Mobile \> 85 --- Homepage + 2 service pages
  (screenshots with URL visible)

  \[ \] PageSpeed Desktop \> 95 --- Homepage (screenshot)

  \[ \] LCP \< 2.5s \| CLS \< 0.1 \| INP \< 200ms --- documented before
  handover

  \[ \] Zero render-blocking resources in PageSpeed report

  \[ \] All images WebP. Hero loads \< 1s. All third-party scripts async
  (verified in DevTools Network tab)

  \[ \] Bundle Analyzer: no JS chunk \> 100KB gzipped. Google Search
  Console: zero Mobile Usability errors.
  -----------------------------------------------------------------------

# 10. CMS --- FULL SELF-MANAGEMENT (Sanity.io)

Clinic team manages EVERYTHING below from a browser --- zero developer
involvement after launch.

  -----------------------------------------------------------------------
  **Content Tasks (No Developer)**    **SEO Tasks (No Developer)**
  ----------------------------------- -----------------------------------
  Add / edit any service page text or Edit page title tag on any page
  images                              

  Publish new blog articles           Edit meta description on any page

  Update homepage hero, stats,        Edit OG title + OG image (social
  announcements                       share preview)

  Add before/after photo pairs to     Change URL slug → auto 301-redirect
  gallery                             applied

  Add / edit / reorder testimonials   Toggle any page to noindex / index

  Edit navigation links and footer    Edit image alt text on any image
  content                             

  Schedule content to publish at      Add / manage 301 redirects (From
  future date                         URL + To URL)

  Preview changes before publishing   SEO dashboard: see all pages
  (live)                              missing title/desc/OG
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **CMS Configuration Requirements**
  -----------------------------------------------------------------------
  Redirects Manager: Dedicated Sanity document --- From URL + To URL +
  Type (301/302). Team adds row → Publish → Next.js middleware applies
  live. Unlimited redirects.

  Image Pipeline: Sanity auto-generates WebP, resizes for all
  breakpoints, serves via CDN. Focal-point crop editor. Alt text =
  required field --- upload fails without it.

  Roles: Admin (full access) \| Editor (content only) \| SEO Manager (SEO
  fields only).

  Version History: Every edit logged. Roll back to any previous version
  in one click.

  Draft & Preview: Save as draft, preview live before publishing --- no
  surprises.
  -----------------------------------------------------------------------

# 11. VISITOR ENGAGEMENT

  -----------------------------------------------------------------------
  **Feature**           **Specification**
  --------------------- -------------------------------------------------
  Before/After Gallery  /gallery/ --- masonry grid, category filter
                        (Hair/Face/Body/Skin/Vitiligo), drag-to-compare
                        slider, lightbox expand with treatment details +
                        CTA, consent notice, ImageObject schema, Load
                        More button.

  Video Integration     lite-youtube-embed only --- thumbnail displayed,
                        full player loads on click. Never iframe.
                        Auto-pull latest videos via YouTube Data API.

  Social Proof          Google Reviews fetched via Places API at build
                        time (ISR) --- static HTML, zero JS. Aggregate
                        4.9★ rating on homepage + service pages.

  Internal Discovery    3--4 Related Service cards at bottom of every
                        service page. 3 \'You might also read\' articles
                        at bottom of every blog post. Breadcrumb on all
                        inner pages.

  EMI Calculator        JS widget on surgical pages: select amount +
                        tenure → monthly EMI shown. No backend.

  Patient Counter       Animated homepage counter \'X patients treated
                        this month.\' Updated monthly in CMS.
  -----------------------------------------------------------------------

# 12. TOP BEST IDEAS (Competitors do not have these)

  -----------------------------------------------------------------------
  **Idea**              **What It Does & Why**
  --------------------- -------------------------------------------------
  Treatment Finder Quiz 5-question quiz gates result behind phone number.
                        Delivers personalized service recommendation.
                        Conversion rate 40--70% higher than plain forms.
                        Build: pure React state, no backend.

  Cost Estimator + Lead Interactive tool: procedure → grade → price range
  Gate                  revealed after phone entered. Page
                        /cost-estimator/ ranks for \'hair transplant cost
                        Delhi 2026\'. Captures highest-intent visitors.

  Hindi SEO Layer       60% of Delhi health searches are Hindi --- 95% of
                        competitors are English-only. Hindi versions of
                        top 20 service pages with separate Hindi URL
                        slugs + hreflang tags. Zero-competition rankings.

  Hyperlocal Area Pages Pages: /hair-transplant-faridabad/
                        /vitiligo-treatment-noida/ etc. Area terms rank
                        faster than Delhi (less competition). Include
                        travel directions and distance from each area.

  Dr. Bhasin Authority  /about/dr-bhasin/ with full credentials, media
  Hub                   logos, Physician JSON-LD schema. Monthly Q&A
                        blog + YouTube. Patients 3x more likely to book
                        when doctor credentials are visually clear.
  -----------------------------------------------------------------------

# 13. DEVELOPER HANDOVER --- WHAT MUST BE DELIVERED

  -----------------------------------------------------------------------
  **Deliverable**       **Specification**
  --------------------- -------------------------------------------------
  Next.js 14 codebase   TypeScript + App Router + Tailwind CSS.
                        Documented. GitHub repo with dev/staging/main
                        branches.

  Sanity Studio         All schemas: service pages, blog, gallery,
  configured            testimonials, nav, redirects, SEO fields,
                        settings. Clinic manages 100% without touching
                        code.

  All page templates    Homepage \| Service page \| Category hub \| Blog
                        listing \| Blog article \| Gallery \| About \|
                        Contact \| Thank-you \| Cost Estimator \|
                        /book-consultation/

  Schema markup         JSON-LD on all page types. Validated --- zero
                        errors in Google Rich Results Test.

  GA4 + GTM configured  All conversion events firing. Verified in GA4
                        real-time view before handover.

  301 redirects         All old site URLs mapped + redirected. Zero 404s.
                        Configured in Next.js AND Sanity.

  PageSpeed evidence    Mobile \> 90 + Desktop \> 95 screenshots with URL
                        visible --- before final payment release.

  CMS training          2-hour recorded session: content editing, SEO
                        fields, image upload, redirect management, blog
                        publishing.

  Post-launch support   3 months. Bug fixes within 48h. Scope: build
                        issues --- not new features.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **FINAL NOTE TO DEVELOPER**
  -----------------------------------------------------------------------
  The clinic team are medical professionals --- not developers. The CMS
  must be intuitive enough that any team member

  can manage content, SEO, images, and redirects confidently from Day 1
  of training --- with zero developer involvement.

  Any deviation from this specification must be approved in writing
  before implementation.

  Contact: Dr. Sandeep Bhasin \| Care Well Medical Centre \| Chittaranjan
  Park, South Delhi
  -----------------------------------------------------------------------

*Care Well Medical Centre • Website Redevelopment Brief v1.0 • March
2026*
