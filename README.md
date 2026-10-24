# ShadowChat — frontend starter

A responsive React + TypeScript + Vite frontend concept for a private close-friends messaging space.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Build for production with `npm run build`.

## What works in this starter

- Responsive welcome/landing page and chat dashboard
- Friend/conversation selection and local search
- Local-session message composition, emoji insertion, and sample reactions
- Invite panel with a demo ID, quick settings, mute toggle, and accessible feedback toasts
- Animated states, reduced-motion support, keyboard focus styles, responsive mobile layout

## Important security and functionality status

This is **frontend-only**. The chat examples are illustrative fixtures, and messages typed in the dashboard are held only in React state for the current browser session. The displayed user ID is a demo placeholder. There is no real registration, authentication, backend, database, WebSocket transport, file upload, push notification, or end-to-end encryption. The typing indicator and example presence statuses are visual preview elements, not live signals. Do not deploy this as a real private messaging service or describe it as encrypted.

## Recommended implementation milestones

1. Add server-side authentication and secure session cookies; never trust a client-supplied user ID.
2. Add PostgreSQL migrations for users, devices, public identity keys, friend requests, friendships, conversations, encrypted message envelopes, and session metadata.
3. Add authorization-checked WebSocket messaging, pagination, deduplication, delivery/read receipts, and presence privacy controls.
4. Select and integrate a maintained, well-reviewed E2EE protocol implementation. Do not invent cryptography. Define device enrollment, identity verification, key rotation, recovery, forward secrecy, and multi-device semantics before claiming E2EE.
5. Add rate limits, validation, secure headers, CSRF protections where relevant, audit-safe logs, tests, security review, and deployment configuration.
6. Add secure file sharing only after authenticated upload, content validation, size limits, and per-conversation access checks are implemented.

## Project layout

```text
shadowchat/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    └── styles.css
```
