# Lighthouse Checklist for Future Restaurant Websites

This checklist is designed to help you avoid common Lighthouse issues and ensure your future restaurant websites are performant, accessible, and SEO-friendly from the start.

## ✅ Performance

- [ ] **Image Optimization**:
    - [ ] Compress all images using tools like `sharp` or online compressors.
    - [ ] Serve images in modern formats like WebP.
    - [ ] Resize images to their display dimensions.
- [ ] **CSS Optimization**:
    - [ ] Minify CSS in production builds.
    - [ ] Inline critical CSS for the initial viewport.
    - [ ] Defer non-critical CSS.
- [ ] **JavaScript Optimization**:
    - [ ] Minify JavaScript in production builds.
    - [ ] Defer or asynchronously load non-critical scripts.
    - [ ] Remove unused JavaScript code (code splitting).
- [ ] **Font Loading**:
    - [ ] Preload key fonts.
    - [ ] Use `font-display: swap` to avoid blocking text rendering.
- [ ] **Server & Network**:
    - [ ] Enable HTTP/2 on your server.
    - [ ] Use a Content Delivery Network (CDN) to serve assets.
    - [ ] Leverage browser caching for static assets.

## ♿ Accessibility (A11y)

- [ ] **Semantic HTML**:
    - [ ] Use appropriate HTML5 tags (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.).
- [ ] **ARIA Attributes**:
    - [ ] Ensure `[aria-*]` attributes match their corresponding roles.
    - [ ] Use `aria-current="page"` only on the active navigation link for the current page.
- [ ] **Interactive Elements**:
    - [ ] **Buttons**: All buttons must have an accessible name (visible text, `aria-label`, or `aria-labelledby`).
    - [ ] **Links**: All links must have a discernible name (visible text, `aria-label`, or `aria-labelledby`).
- [ ] **Color Contrast**:
    - [ ] All text must have a sufficient color contrast ratio against its background (at least 4.5:1 for normal text and 3:1 for large text).
- [ ] **Forms**:
    - [ ] All form inputs must have associated `<label>` tags.

## 👍 Best Practices

- [ ] **Secure Website**:
    - [ ] Serve all content over HTTPS.
- [ ] **Clean Console**:
    - [ ] Ensure there are no browser errors or warnings in the console.
- [ ] **Modern Dependencies**:
    - [ ] Keep all libraries and frameworks up-to-date.

## 🔍 SEO (Search Engine Optimization)

- [ ] **Metadata**:
    - [ ] **Title**: Every page must have a unique and descriptive `<title>` tag.
    - [ ] **Meta Description**: Every page must have a unique and concise `<meta name="description">` tag.
- [ ] **Content**:
    - [ ] **Links**: Ensure all links have descriptive anchor text.
- [ ] **Crawling & Indexing**:
    - [ ] Provide a `robots.txt` file to guide search engine crawlers.
    - [ ] Submit a `sitemap.xml` file to search engines.
