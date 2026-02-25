---
title: "Argument-Based Consistency (ArC) in Toxicity Explanations of LLMs"
date: "2025-06-23"
links:
  - label: "Paper"
    url: "https://arxiv.org/abs/2506.19113"
---

This work was motivated by my thesis project. If LLMs are to intervene in toxic conversations online, they must be able to reliably justify their stance for classifying a given post as toxic vs non-toxic. If we view their justifications as a series of arguments, we can use argumentation theory (from Informal Logic) to evaluate the soundness of these claims in justifying their stance. We developed a criterion, Argument-based Consistency (ArC), measurable along five dimensions: Non-Redundant Relevance, Post-Hoc Internal Reliance, Post-Hoc External Reliance, Individual Sufficiency, Individual Necessity. We then prompted various LLMs to classify texts as toxic vs non-toxic, and used this criterion to evaluate their justifications accordingly.
