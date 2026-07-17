---
title: "Copy-on-Write (CoW) Scoring"
date: "2026-05-23"
links:
  - label: "Paper"
    url: "https://arxiv.org/abs/2607.14336"
  - label: "CoW Scoring Library"
    url: "https://github.com/trail-ml/agent-cow-python/tree/main/agentcow/scoring"
  - label: "Poster"
    url: "https://drive.google.com/file/d/11qcreQmEH5wTjbqVg9vERmnLQi-q5JG8/view?usp=sharing"
---


CoW scoring evaluates AI agent performance on workflows in a given software application, using the CoW library to isolate and compare corresponding agent and ground-truth changes. A human records a ground truth (GT) session by executing an ideal workflow with CoW enabled, then pairs it with a prompt describing the workflow in enough detail that an agent could reproduce it. The agent attempts the workflow from the prompt under its own session_id. CoW scoring compares the agent's changes against the GT changes, evaluating how closely they match in both structure and content, at both session and operation granularity.