---
title: "Copy-on-Write (CoW) for Agentic Software Systems"
date: "2026-03-19"
preview image: "CoW.png"
description: "Blog Article about my work on CoW at trail"
draft: "false"
external url: "https://www.trail-ml.com/blog/agent-cow"
---

Copy-on-Write (CoW) enables database-level isolation for agentic workflows, so users can review and approve agent outputs before they permanently affect production data. Agent changes are written to a separate 'changes' table, but appear merged with 'base' (production) data in the agent's view. At the end of a session, the user can selectively commit agent changes to the main database. This article introduces a CoW implementation to a SQL database, as well as a worked example of CoW in a farm Inventory Management System.