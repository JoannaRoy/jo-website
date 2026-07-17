---
title: "Popping the Bubble: Surfacing Diverse Perspectives on Social Media"
date: "2026-07-17"
links:
  - label: "Blog Article"
    url: "https://www.j-roy.com/blog/03_chatJTP/sm_polarization_project"
  - label: "GitHub Repo"
    url: "https://github.com/JoannaRoy/sm-polarization-project"
---


This project aims to disrupt echo chambers on social media by explicitly bringing in alternative perspectives: given a social media post on a topic, will present the user with the set of alternative stances and arguments expressed by other users on the platform about this topic. Using topic modelling, and drawing from [generative social choice](https://arxiv.org/abs/2309.01291) and [polis](https://pol.is/home2) -- I construct an argument graph that organizes existing posts by topic, stance, and argument. At runtime, the graph is queried to identify relevant counterarguments and alternative viewpoints. Upon seeing other users’ opinions about the topic, it’s possible the user continues to hold their initial stance, but also possible they do so in a less polarized way, or even take a new stance on the topic. 
