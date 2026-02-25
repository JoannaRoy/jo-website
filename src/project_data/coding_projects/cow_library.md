---
title: "Open-source Copy-on-Write (CoW) Library for PostgreSQL"
date: "2026-02-23"
links:
  - label: "GitHub"
    url: "https://github.com/trail-ml/agent-cow-python"
  - label: "Blog Post"
    url: "https://www.trail-ml.com/blog/agent-cow"
---

CoW enables database-level isolation for agentic workflows, particularly in software systems where agents interact directly with databases. Agent changes are written to a separate 'changes' table, but appear merged with 'base' (production) data in the agent's view. With CoW enabled, agents cannot directly write to production data — instead, users can review and selectively commit agent changes to the main database at the end of each session. CoW enables practical human oversight of agents in software systems, and reduces risk of unintentional (and potentially irreversible) agent harms (eg. from misalignment).
