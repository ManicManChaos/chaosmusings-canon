# Manic Musings of Chaos (Cannon)

This repo is a **clean-slate rebuild** of the MMOC frontend with the canon visual system (green-black + nude-pink + true gold) and a locked, minimal routing/auth surface.

## File Tree

```
repo-root/
  README.md
  jsconfig.json
  next.config.js
  package.json
  app/
    globals.css
    layout.js
    page.js
    auth/
      callback/
        page.js
  components/
    AppShell.js
    AssessmentView.js
    AuthProvider.js
    OpeningBook.js
    Sidebar.js
    Sidebar.module.css
    Weave.js
  lib/
    supabaseClient.js
  public/
    manifest.json
    flow/
      state-1-center.jpg
      state-2-auth.jpg
      state-3-arrival.jpg
    glyphs/
      ornate/
        glyph-book-infinity-shield.png
        glyph-book-quill-knot.png
        seal-aries.png
        seal-book-infinity.png
        seal-chalice.png
        seal-lexicon-az.png
        seal-prayer.png
        seal-scales.png
        seal-spiral.png
        sigil-eye.png
        sigil-sword.png
        strip-triad-sigils.png
    icons/
      assessment.svg
      directory.svg
      eye.svg
      intake.svg
      library.svg
      moments.svg
      ps.svg
      roidboy.svg
      summation.svg
      year.svg
      app/
        icon-120.png
        icon-167.png
        icon-180.png
```

## What changed (exact)

1. **Public is the source of truth for all imagery**
   - Opening sequence images live in `public/flow/`.
   - Icons/glyphs live in `public/icons/` and `public/glyphs/`.
   - No separate `/assets` folder is required.

2. **Supabase GitHub OAuth is wired end-to-end**
   - Client: `lib/supabaseClient.js`
   - Callback route: `app/auth/callback/page.js`
   - Gate triggers OAuth: `components/OpeningBook.js`

3. **App starts in a locked Gate → Auth → AppShell flow**
   - `app/page.js` renders `components/AppShell.js`.
   - If session exists, the gate is skipped.

4. **Canon palette and typography are locked in**
   - `app/globals.css` contains the only global tokens + layout styling.

## Why a new repo / new branch approach

A clean slate removes:
- duplicate/legacy files that were creating confusing “active vs unused” behavior,
- mixed asset locations,
- and inconsistent styles across deployments.

The goal is a single, predictable baseline you can **lock** and build forward## Glyph Directory (Current Wiring)

Navigation glyphs (Sidebar):
- today → /ui/glyphs/eye.svg
- intake → /ui/glyphs/intake.svg
- roidboy → /ui/glyphs/roidboy.svg
- moments → /ui/glyphs/moments.svg
- ps → /ui/glyphs/ps.svg
- summation → /ui/glyphs/summation.svg
- yearreview → /ui/glyphs/year.svg
- seal → /ui/glyphs/seal.svg

Topbar:
- library button → /ui/glyphs/directory.svg

Ornate section markers (Daily Hub):
- Assessment → /ui/ornate/ornate-assessment.png
- Intake → /ui/ornate/ornate-intake.png
- Context → /ui/ornate/ornate-context.png
- Summation → /ui/ornate/ornate-summation.png
