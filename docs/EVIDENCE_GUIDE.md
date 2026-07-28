# Evidence privacy and publishing guide

## Access-control rule

Hiding an asset in the interface is not access control. Any file under `public/`
is directly addressable by URL, even when no image, video, or link is rendered.
Client Component props are also serialized into the React Server Component
payload, so private metadata must be filtered on the server before it reaches a
client boundary.

Only an evidence record explicitly marked `privacy: "public"` may:

- have its asset stored under `public/evidence/`;
- use a public `/evidence/...` source path;
- be passed to a Client Component;
- appear in a gallery or homepage preview.

Evidence marked `privacy: "redact"` or `privacy: "private"` must remain under
`private/evidence/`. This directory is ignored by Git and is not served by
Next.js.

## Staging unreviewed evidence

Place each unreviewed file in:

`private/evidence/<experience>/`

Use:

`YYYY-MM-DD-short-description.ext`

Use lowercase words separated by hyphens. Avoid names, email addresses, student
IDs, or other private details in filenames. Do not create a public source path
or public caption before approval if either would reveal sensitive information.

Examples of private staging paths:

- `private/evidence/nasa-space-apps/2025-10-05-team-award.jpg`
- `private/evidence/boxing/2025-09-18-heavy-bag-training.mp4`

The `/private/evidence/` rule in `.gitignore` prevents these assets from being
committed accidentally. Do not force-add them to Git.

## Recommended formats

- Images: WebP or AVIF when practical, otherwise JPEG or PNG.
- Video: compressed MP4 using H.264 for broad browser compatibility.
- Documents: PDF only when public release is appropriate and the file has been
  redacted.
- Do not publish original phone video exports. Compress them first and remove
  unnecessary metadata.

## Dimensions and compression

- Use images at roughly 1600 to 2400 pixels on the longest edge.
- Preserve the original aspect ratio.
- Aim for less than 500 KB per image where quality allows.
- Use a stable video resolution such as 1280 × 720 or 1920 × 1080.
- Keep videos short and compressed. Provide a poster image when possible.
- Videos must not autoplay with sound.

## Alt text and captions

Alt text explains what is visible and why it matters. Describe the evidence,
not the filename. Do not include information that should remain private.

Captions add context such as the event, date, or relevance to the reflection.
Only state facts supported by the portfolio record. Review alt text, captions,
dates, filenames, and credits as part of the same privacy approval as the asset.

## Privacy review

Before approval:

1. Remove or blur faces of minors unless public use is explicitly authorised.
2. Remove names, email addresses, signatures, student IDs, QR codes, schedules,
   and private participant information.
3. Review certificates and confirmations for personal data.
4. Remove document and image metadata when appropriate.
5. Keep records as `privacy: "redact"` while a file still needs review.
6. Use `privacy: "private"` for files that must never be published.
7. Confirm that the final filename, alt text, caption, date, credit, poster, and
   transcript are safe to publish.

## Publish an approved image

1. Complete the privacy review and create the final redacted image in
   `private/evidence/<experience>/`.
2. Copy, do not move, the approved image to
   `public/evidence/<experience>/YYYY-MM-DD-short-description.webp`.
3. Update its server-side record in `data/cas-evidence.server.ts`:
   - set `src` to `/evidence/<experience>/<filename>`;
   - verify the real width and height;
   - add only approved alt text and caption;
   - change `privacy` to `"public"`.
4. Run `npm run lint` and `npm run build`.
5. Inspect the experience gallery and verify that no unapproved private
   metadata appears in the rendered HTML, RSC payload, or client bundle.
6. Keep or archive the private source according to the evidence-retention
   policy. Never place an unreviewed source file under `public/`.

## Publish an approved video

1. Complete the privacy review and compression in
   `private/evidence/<experience>/`.
2. Prepare an approved poster and captions or transcript when required.
3. Copy only the approved MP4, poster, and caption files to the matching
   `public/evidence/<experience>/` directory.
4. Update the server-side media record with public `/evidence/...` paths and
   approved metadata, then set `privacy: "public"`.
5. Run `npm run lint` and `npm run build`.
6. Verify keyboard-accessible controls, poster loading, captions, and the
   absence of private metadata from public output.

## Architecture guarantee

`data/cas-evidence.server.ts` is marked `server-only`. Its selectors return:

- only records explicitly marked `privacy: "public"` for galleries;
- non-sensitive aggregate status flags for “Awaiting redaction,” “Awaiting
  upload,” and “Projected” states.

Client Components must never import the raw server evidence module. UI-level
filtering may remain as defence in depth, but server filtering is the access
control boundary.
