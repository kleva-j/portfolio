---
title: "The TanStack npm Supply Chain Nightmare: How a Clever GitHub Workflow Hack Poisoned Millions of Downloads"
date: "May 2026"
dateTime: "2026-05-14"
category: "Engineer"
description: "A detailed breakdown of the May 2026 TanStack supply chain attack, how it exploited GitHub Actions, and practical steps every developer should take to protect their projects."
demo: false
draft: false
image: "/images/tanstack/Hryem.jpg"
---

On May 11, 2026, the open-source world woke up to one of its worst fears realized. Over 100 packages, collectively downloaded more than **50 million times per week**, were compromised in a sophisticated supply chain attack. No phishing. No stolen passwords or tokens. The malicious packages were even signed and published through npm’s trusted publishing system.

This wasn’t a brute-force attack—it was a precision strike on how modern open-source projects release code. Here’s the full story, why it worked, and what every developer should do to protect themselves.

### The Setup: TanStack’s Release Pipeline

Popular libraries in the TanStack ecosystem (think TanStack Query, Router, Table, etc.) use GitHub Actions for automated publishing. When a pull request merges to main, a workflow:

1. Requests a short-lived npm publish token from npm.
2. npm verifies a signed statement from GitHub about the workflow, repository, and branch.
3. The token is used briefly and discarded.

On paper, this is secure. In practice, a dangerous misconfiguration turned it into a trap.

**Key vulnerability**: The workflow used `pull_request_target` instead of the safer `pull_request` trigger.

### How the Attack Unfolded (Step by Step)

1. **The Fork & Ghost PR**  
   The attacker forked the TanStack repository and opened a pull request from the fork. They immediately closed it. No one reviewed it. No one merged it.

2. **Poisoning the Cache**  
   Because of `pull_request_target`, the workflow ran **with the full permissions of the base repository** (not the fork). The attacker’s code wrote a malicious file into GitHub Actions’ shared cache—the same cache used for dependency reuse across jobs.

3. **The Trigger**  
   Hours later, a legitimate PR merged to main. The poisoned cache activated. It grabbed the fresh npm publish token and published malicious versions of **84 TanStack packages**.

4. **The Worm Spreads**  
   Anyone running `npm install` on affected packages executed the malware. It scanned for npm publishing tokens on the developer’s machine and used them to poison _their_ packages.

   Victims included teams at Mistral AI, UiPath, OpenSearch, Guardrails AI, and Squawk. The attack jumped to Python packages via SDKs. Security firm Aikido later tracked **373 poisoned versions** across **169 packages**.

### The Malware: Ruthless and Persistent

This wasn’t a simple crypto miner. The payload was vicious:

- Scanned for valuable credentials.
- Embedded itself into Claude Code and VS Code extensions.
- Even after uninstalling bad packages, it could re-execute when opening the editor.
- Forged commits using the Claude Code GitHub app to blend in with legitimate AI-generated changes.
- Installed a **dead man’s switch**: A background process checking every 60 seconds if a stolen GitHub token was still valid. When the token expired, it would **nuke the user’s root/home directory**.

A self-destructing time bomb designed to punish defenders.

### Why This Attack Succeeded

Modern supply chain security focuses heavily on _secrets_ (tokens, keys). This attack targeted **trust and workflow configuration**—the plumbing that developers rarely scrutinize.

`pull_request_target` is powerful and sometimes necessary (e.g., for security scanning on external PRs), but it requires extremely careful configuration. Many projects copy-paste workflows without fully understanding the security model.

### How to Protect Yourself (Practical Defenses)

The best immediate upgrade: Switch to **pnpm 1 or higher** (or at least pnpm 9+ with strict settings). It ships with powerful protections enabled by default:

- **Minimum release age**: Refuses packages published in the last 24 hours (most malware gets caught and removed quickly).
- **Block exotic sub-dependencies**: Prevents dependencies pointing to arbitrary git repos or tarball URLs.
- **Approved builds / install script blocking**: Stops malicious `postinstall` scripts unless you explicitly whitelist them.

**Other best practices**:

- Audit your GitHub Actions workflows—especially triggers and permissions.
- Use `permissions` keys to follow the principle of least privilege.
- Consider tools like Socket, Socket Security, or Aikido for supply chain monitoring.
- For production, add runtime integrity checks and anomaly detection.

<Image
   src="/images/tanstack/OVLOZ.jpg"
   alt="TanStack Supply Chain Attack"
   width={1600}
   height={900}
   className="my-6 rounded-xl"
/>

### The Bigger Picture

Open source powers the internet, but its security model relies on thousands of maintainers doing everything right under immense pressure. As AI tools accelerate commit velocity and repositories grow more complex, these attacks will become more common and creative.

This incident highlights that **trust in the supply chain is fragile**. Even “best practice” publishing flows can hide subtle configuration landmines.

**Interactive Element**:  
Try this quick self-audit in your terminal:

```bash
# Check your current package manager settings
pnpm config list

# Or scan a project for risky dependencies
npm audit
# Better: Use pnpm with strict mode
```

What workflow or dependency in your stack worries you most right now? Drop it in the comments—I’d love to discuss hardening strategies.

### Stay Safe Out There

The “shy hallude” (as the original report humorously called it) reminds us that in software supply chains, the attacker only needs to win _once_. Defenders must win every single time.

Update your tools, review your CI, and consider switching to more opinionated package managers. Your future self (and your home directory) will thank you.

_This post is based on the detailed breakdown from The Code Report (May 14, 2026). Stay vigilant, keep shipping, and always verify your assumptions about trust._

---

What supply chain horror stories have you lived through? Let’s learn from them together.
