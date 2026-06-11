# Helix SDK — Documentation

## Overview

Helix SDK is a lightweight TypeScript client for interacting with the Helix API. It handles auth, retries, and request lifecycle out of the box.

**Site:** [https://example.com](https://example.com)

---

## Installation

```bash
npm install helix-sdk
```

---

## Configuration

Create a `helix.config.ts` at your project root:

```ts
import { defineConfig } from 'helix-sdk';

export default defineConfig({
  apiUrl: 'https://api.yourapp.com',
  timeout: 5000,
  auth: {
    strategy: 'jwt',
    tokenKey: 'helix_token',
  },
});
```

> **Note:** Environment variables prefixed with `HELIX_` override config file values (e.g. `HELIX_API_URL`).

---

## Usage

```ts
import { HelixClient } from 'helix-sdk';

const client = new HelixClient();

const data = await client.get('/users/me');
console.log(data);
```

---

## API Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `apiUrl` | `string` | — | Base URL for all requests |
| `timeout` | `number` | `10000` | Request timeout in ms |
| `auth.strategy` | `"jwt" \| "session" \| "none"` | `"none"` | Auth strategy |
| `auth.tokenKey` | `string` | `"token"` | localStorage key for JWT |

Full reference: [https://example.com/docs/api](https://example.com/docs/api)

---

## Changelog

- **v1.2.0** — Added session auth strategy
- **v1.1.0** — Retry logic with exponential backoff
- **v1.0.0** — Initial release
