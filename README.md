<p align="center">
  <img src="assets/banner.png" alt="Qurious Banner" />
</p>

<h1 align="center">Qurious</h1>

<p align="center">
  <strong>AI-powered research discovery, summarization, and organization.</strong>
  <br/>
  <strong>Open source alternative to Consensus & SciSpace.</strong>
</p>

<p align="center">
  <a href="https://app.quriousai.xyz"><b>Live Demo</b></a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#contributors">Contributors</a>
</p>

<p align="center">
  <a href="https://app.quriousai.xyz" target="_blank">
    <img alt="Product Badge" src="https://img.shields.io/badge/Product-F04438">
  </a>
  <img alt="Stars Badge" src="https://img.shields.io/github/stars/QuriousAI/qurious" />
  <img alt="Forks Badge" src="https://img.shields.io/github/forks/QuriousAI/qurious" />
  <img alt="Issues Badge" src="https://img.shields.io/github/issues/QuriousAI/qurious" />
  <img alt="License Badge" src="https://img.shields.io/github/license/QuriousAI/qurious" />
  <img alt="Last Commit Badge" src="https://img.shields.io/github/last-commit/QuriousAI/qurious" />
  <img alt="Commit Activity Badge" src="https://img.shields.io/github/commit-activity/m/QuriousAI/qurious" />
  <a href="https://discord.gg/nQrrQThpBn" target="_blank">
    <img alt="Discord Badge" src="https://img.shields.io/discord/1452750255937421344?logo=discord" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=QuriousAI_" target="_blank">
    <img alt="Twitter Badge" src="https://img.shields.io/twitter/follow/QuriousAI_?logo=X" />
  </a>
  <a href="https://github.com/QuriousAI/qurious/pulls">
    <img alt="PR Badge" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  </a>
  
  <br>
  <br>
  
  
   <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=alert_status" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=bugs" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=code_smells" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=coverage" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=duplicated_lines_density" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=ncloc" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=reliability_rating" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=security_rating" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=sqale_index" />
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=sqale_rating" />  
  <img src="https://sonarcloud.io/api/project_badges/measure?project=QuriousAI_qurious&metric=vulnerabilities" />
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

---

## Contributors

Thank you to all the amazing people who have contributed to Qurious! 🎉

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<a href="https://github.com/QuriousAI/qurious/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=QuriousAI/qurious" />
</a>

<!-- ALL-CONTRIBUTORS-LIST:END -->

Made with [contrib.rocks](https://contrib.rocks).

### How to Contribute

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

---

## Roadmap

To be added.

---

## License

MIT License. See the [LICENSE](LICENSE) file for details.

---

## Community & Links

**Website:** [quriousai.xyz](https://quriousai.xyz)

**Twitter/X:** [@QuriousAI_](https://x.com/QuriousAI_)

**Discord:** [Join our server](https://discord.gg/nQrrQThpBn)

---

<p align="center">
  Made with ❤️ by the Qurious community
</p>