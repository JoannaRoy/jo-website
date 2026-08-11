---
title: "AI Agent Governance: Runtime Enforcement with trail"
date: "2026-08-11"
preview image: "agent_governance.jpg"
description: "Blog Article about my work on CoW at trail"
draft: "false"
external url: "https://www.trail-ml.com/blog/ai-agent-governance-runtime-enforcement-with-trail"
---

Runtime enforcement allows organizations to set permissions on agents' actions, in this case when making calls to MCP servers. All agent calls from the organization are routed through one central gateway, with permissions enforced on each tool call. This helps safeguard agent sessions against prompt injection, unintended exposure of PII, and agents taking actions beyond the scope of their workflow. MCPs can be imported into a centralized registry within trail, permissions configured, then published to the gateway to be enforced.
