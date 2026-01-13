# Contributing to Qurious

Thank you for your interest in contributing to Qurious! We're excited to have you join our community of researchers, developers, and open-source enthusiasts working to make research more accessible.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our community standards. We are committed to providing a welcoming and inclusive environment for everyone.

### Our Standards

- Be respectful and considerate in your communication
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community and project
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (installed via Corepack)
- Git
- A code editor (we recommend VS Code)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/qurious.git
   cd qurious
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/QuriousAI/qurious.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Set up Convex**:
   ```bash
   pnpm run convex:login
   ```

6. **Configure environment variables**:
   - Copy `.env.example` to `.env.local` in `apps/web`
   - Add your Convex URL and other required variables

7. **Start the development server**:
   ```bash
   pnpm dev
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots or GIFs if applicable
- Your environment (OS, Node version, browser, etc.)
- Any relevant error messages or logs

**Use the bug report template** when creating a new issue.

### Suggesting Features

We love feature suggestions! When proposing a new feature:

- Check if the feature has already been suggested
- Provide a clear description of the problem it solves
- Explain how the feature would work
- Consider how it fits into the existing project architecture
- Include mockups or examples if applicable

**Use the feature request template** when creating a new issue.

### Contributing Code

We welcome code contributions of all sizes! Here are some ways to contribute:

- Fix bugs listed in the issues
- Implement features from the roadmap
- Improve documentation
- Add tests to improve coverage
- Refactor code for better performance or readability
- Fix typos or improve clarity in comments

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following prefixes:

- `feature/` - New features (e.g., `feature/paper-annotations`)
- `fix/` - Bug fixes (e.g., `fix/search-crash`)
- `docs/` - Documentation changes (e.g., `docs/api-endpoints`)
- `refactor/` - Code refactoring (e.g., `refactor/database-queries`)
- `test/` - Adding or updating tests (e.g., `test/search-integration`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

### Keeping Your Fork Updated

Regularly sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Working on an Issue

1. **Comment on the issue** to let others know you're working on it
2. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** following our commit guidelines
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** against the `main` branch

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid using `any` type; prefer specific types or `unknown`
- Use interfaces for object shapes, types for unions/intersections
- Export types alongside implementations

### React Components

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use descriptive prop names with TypeScript interfaces
- Implement proper error boundaries where appropriate

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system (shadcn/ui)
- Maintain responsive design principles
- Ensure accessibility (ARIA labels, keyboard navigation, etc.)

### Code Quality

- Write clean, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principles
- Use meaningful variable and function names

### Testing

- Write tests for new features and bug fixes
- Maintain or improve test coverage
- Run tests before submitting a PR:
  ```bash
  pnpm test
  ```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples

```bash
feat(search): add semantic search filtering

fix(chat): resolve message streaming issue

docs(readme): update installation instructions

refactor(api): simplify paper fetching logic
```

### Best Practices

- Use the imperative mood ("add feature" not "added feature")
- Keep the subject line under 72 characters
- Reference issues and PRs in the footer (e.g., "Closes #123")
- Explain the "why" in the body, not just the "what"

## Pull Request Process

### Before Submitting

- [ ] Ensure your code follows our coding standards
- [ ] Run tests and ensure they pass
- [ ] Update documentation if needed
- [ ] Add or update tests for your changes
- [ ] Rebase your branch on the latest `main`
- [ ] Check that your commits follow our commit guidelines

### PR Description

When opening a PR, include:

1. **What** - A clear description of what changes you made
2. **Why** - The reason for these changes (link to issue if applicable)
3. **How** - A brief explanation of your approach
4. **Testing** - How you tested your changes
5. **Screenshots** - If applicable, add before/after screenshots

### Review Process

- At least one maintainer review is required
- Address all review comments and feedback
- Be open to suggestions and constructive criticism
- CI/CD checks must pass before merging
- Maintain a respectful and collaborative tone

### After Approval

Once approved, a maintainer will merge your PR. Thank you for your contribution!

## Community

### Get Help

If you need help or have questions:

- **Discord**: Join our [Discord server](https://discord.gg/nQrrQThpBn)
- **Twitter/X**: Follow us [@QuriousAI_](https://x.com/QuriousAI_)
- **GitHub Discussions**: Ask questions in our discussions forum
- **Issues**: Create an issue with the "question" label

### Stay Updated

- Watch the repository for updates
- Join our Discord for announcements
- Follow our blog and social media

### Recognition

All contributors will be:

- Added to our Contributors section
- Recognized in release notes for significant contributions
- Given credit in relevant documentation

## License

By contributing to Qurious, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Qurious! Your efforts help make research more accessible to everyone. 🚀

**Questions?** Reach out on [Discord](https://discord.gg/nQrrQThpBn) or open a discussion on GitHub.
