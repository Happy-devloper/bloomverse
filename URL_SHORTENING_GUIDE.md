# Sharing and privacy

Bloomverse creates share links locally using the `?b=` URL parameter. It does
not send bouquet details to third-party URL-shortening services.

The link contains the bouquet, recipient and sender names, and message as
Base64-encoded data. Base64 is not encryption; anyone with the link can decode
and read those values. Avoid putting sensitive or confidential information in
a bouquet message.

If a future feature requires private share links, implement it with a
server-side storage and access-control design. Do not place encryption keys or
private API credentials in a `VITE_*` environment variable: Vite bundles those
values into client-side JavaScript.
