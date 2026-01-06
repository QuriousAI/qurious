<p align="center">
  <img src="https://drive.google.com/thumbnail?id=1G9RrViccJTHWPf9Momk3qMf62VQg-hIy&sz=w1000" alt="Qurious Banner" />
</p>

<h1 align="center">Qurious</h1>

<p align="center">
  <strong>AI-powered research discovery, summarization, and organization.</strong>
  <br/>
  <strong>Open source alternative to Consensus & SciSpace.</strong>
</p>

<p align="center">
  <a href="https://app.getqurious.xyz"><b>Live Demo</b></a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a>
</p>

<p align="center">
  <a href="https://app.getquriousai.xyz" target="_blank">
    <img alt="Product" src="https://img.shields.io/badge/Product-F04438">
  </a>
  <img src="https://img.shields.io/github/stars/QuriousAI/qurious" />
  <img src="https://img.shields.io/github/forks/QuriousAI/qurious" />
  <img src="https://img.shields.io/github/issues/QuriousAI/qurious" />
  <img src="https://img.shields.io/github/license/QuriousAI/qurious" />
  <img src="https://img.shields.io/github/last-commit/QuriousAI/qurious" />
  <img src="https://img.shields.io/github/commit-activity/m/QuriousAI/qurious" />
  <a href="https://discord.gg/FngNHpbcY7" target="_blank">
    <img src="https://img.shields.io/discord/1452750255937421344?logo=discord" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=QuriousAI_" target="_blank">
    <img src="https://img.shields.io/twitter/follow/QuriousAI_?logo=X" />
  </a>
  <a href="https://github.com/QuriousAI/qurious/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  </a>
</p>

---

## What is Qurious?

**Qurious** is an AI-powered research assistant that helps researchers, students, and curious minds **find, understand, and organize scientific literature faster**.

---

## Features

- **Semantic Research Search** – Search papers by meaning, not keywords.
- **Chat with Papers** – Ask questions and get grounded, contextual answers.
- **AI Summaries & Insights** – Auto-generated summaries and key takeaways.
- **Lists & Research Folders** – Organize papers into collections.
- **Personal Annotations** – Add notes and insights per paper.

---

## Architecture

### Tech Stack

- **Tooling:** Turborepo, Git
- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend:** Convex
- **AI:** Vercel AI SDK
- **Auth:** Clerk
- **Analytics:** PostHog
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm (via Corepack)

---

### Installation

```bash
pnpm install
```

This installs all workspace dependencies and tooling.

### One-time setup (Convex)

```bash
pnpm run convex:login
```

### Environment Configuration

Create a .env.local file in apps/web:

```bash
CONVEX_URL=your_convex_url_here
```

### Run locally

Run all services:

```bash
pnpm dev
```

Run without browser or web API apps:

```bash
pnpm dev:no-ui

or 

pnpm dev --filter=!browser-app --filter=!web-api
```

Run Convex backend only:

```bash
pnpm convex:dev
```

### Testing

```bash
pnpm test
```

### Roadmap

To be added.

### License

MIT License. See the [LICENSE](LICENSE) file for details.

### Community & Links

Website: https://quriousai.xyz

Twitter/X: https://x.com/QuriousAI

Discord: https://discord.gg/nQrrQThpBn