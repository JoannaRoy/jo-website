---
title: "Popping the Bubble: Surfacing Diverse Perspectives on Social Media"
date: "2026-03-21"
preview image: "sm_polarization_project_system_diagram.png"
description: "system to append notes to post with diverse opinons"
draft: "false"
---


---

This post describes a project I've been thinking about for some time, but working on more recently. In it, I talk about my plans for a system aiming to surface more diverse perspectives on social media, by appending text to polarizing posts (similar to Community Notes on X) that represents alternative stances and arguments on the topic.

The motivation for this project came from a couple main sources:

1. My undergraduate [thesis](https://drive.google.com/file/d/1j1DaO1o1wGZsUfhPt3kLwBFOKchimnIM/view), which explored a subset of these topics.  
2. Three topics from the 2025 Cooperative AI Summer School:   
i. Gradual Disempowerment (presented in [this talk](https://youtu.be/AmtKdoeYGn0?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-) by Nora Ammann).  
ii. Polis & The Collective Intelligence Project (presented in [this talk](https://youtu.be/hvVoPHDRofE?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-) by Audrey Tang and Zarinah Agnew).  
iii. Generative Social Choice (presented in [this talk](https://youtu.be/wS8YgEiXWOY?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-) by Ariel Procaccia).

I'm posting this mainly to document the work so far, but also because I'd love to hear ideas and feedback on the design so far! If you have any thoughts, please do reach out (my contact information is in the website footer :).  

---

## Introduction & Motivation

Social media and algorithms risk increasing polarization in online spaces – by favouring content that aligns with our existing values and beliefs (and tending to amplify more extreme versions of it), algorithms can produce feeds that largely confirm what we already think, and can gradually lead to polarized ‘echo chambers’ in certain corners of the internet.

Content that consistently confirms our pre-existing opinions risks eroding our ability to think critically – to question our assumptions, examine our beliefs from different angles, and form reasoned, independent opinions. 

This ability to independently shape our knowledge, beliefs, and understanding is called epistemic agency [1], and is essential to meaningful participation in democratic societies. Our vote (be it with ballots, our wallets, or our actions) means nothing if the opinions behind it were shaped for us rather than formed by us. Compromising our epistemic agency therefore risks undermining many systems (e.g. healthcare, education, the economy) that depend on our collective human input. 

This is a core argument of gradual disempowerment [2] (see the [paper](https://arxiv.org/abs/2501.16946) and [summer school talk](https://youtu.be/AmtKdoeYGn0?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-)): that delegating decision making power to AI models could slowly disempower humans over time, leaving us with less and less agency over systems that shape our lives. Without our collective, democratic input, these systems will tend to serve us less well, resulting in a world that is harder to live in for most people, likely favouring a few powerful actors. 

Limiting echo chambers online, and using AI to *scaffold* critical thinking skills rather than replace them, would therefore be very beneficial – and is what this project will try to do.

Broadly, the goal of this project is to design a system which, given a social media post about a topic that is polarized strongly towards one stance, will append a short text outlining alternative stances and arguments expressed by other users about this topic. 

Most algorithms *filter out* content such that peoples’ feeds tend to be *more* *aligned* with their existing views. This project tries to *bring in* content that *differs* or *opposes* peoples’ existing views, in hopes it will motivate people to question and refine them. 

Upon seeing other users’ opinions about the topic, it’s possible the user continues to hold their initial stance, but also possible they do so in a less polarized way, or even take a new stance on the topic. Regardless, people should decide independently with which stance they align, not by default from the only stance and set of arguments they were algorithmically shown. 

This system would ideally reduce polarization by pulling people more towards mutual understanding and more fostering empathy, while increasing our ability to think critically and exercise genuine epistemic agency over opinions we form online.

This blog post outlines my plans and current progress for the project, in hopes of documenting it and getting feedback. I’ll first talk about the overall system design and what aspects I’ve prioritised, and then go through each component’s design and discuss what I’ve tested so far. 

My goal is to balance drawing from academic research with building something practically usable and useful. An ideal outcome is a proof-of-concept system that is open-source (can be downloaded and run locally by anyone), works well on a subset of topics, and is theoretically scalable to many topics and users (i.e. with more resources and infrastructure, could theoretically work on a real social media platform). 

## System Design

Below is a diagram that broadly outlines how I expect the system to be built. 

![System overview](sm_polarization_project_system_diagram.png "High-level pipeline: topic extraction, stance and argument clustering, statement generation, and user interface. | w=1000")

The flow goes:

1. A user makes a post on the platform, which expresses their stance(s) on a certain topic by making a set of arguments.   
2. First, we will determine which topic(s) the user is discussing in their post. Then, we will extract their stance(s) on that topic, and the argument(s) they used to support each stance.   
3. Next, we will look at all the other stances and arguments that have been made by other users about that topic. The goal of this step is to collect a few key arguments that are representative of each stance except the users.  
4. Once we have the set of alternative stances and representative arguments, we will present them to the user. 

This process can be separated into four components – topic extraction, stance and argument clustering, statement generation, and user interface – each of which I will go deeper into in the sections below. Notably, I have not yet done a full implementation of any component (only initial tests on some), so each approach is subject to change as I implement it and potentially discover unforeseen limitations.

I also want to highlight that, while it is possible that a state-of-the-art LLM could accomplish each step of this flow quite well (detect topics in a post; classify its arguments; and, given a set of posts with contrasting stances, come up with a summary of alternate views), I believe it is more than worthwhile to explore alternatives for the following reasons:

1) First, each sub-problem problem is well enough scoped that I believe a well-designed, less resource-intensive system *can* solve it well. Calling an LLM for every social media post, of which there are billions per day, would be excessive and wasteful – just because an LLM *can* do a lot of it doesn’t mean it *should* or is the best way of doing so.  
2) Doing so would require a model with sufficient capabilities, most of which are not currently possible to host locally. Running the system locally is less expensive (than calling frontier APIs), unconstrained by rate limits, privacy-preserving, and gives the user full control over the pipeline – so it’s a priority for this project.

For this proof-of-concept, my hope is to build a system that works for Fediverse users, since posts are queryable through the Mastodon API: while scrolling through their feed, users select a post that is polarizing, and see a statement appended to it that represents alternative views on the topic. 

Here are some (of many) projects with similar goals that I have referenced:

* X introduced Community Notes, to “add helpful context to posts and keep people better informed” ([Community Notes: a collaborative way to add helpful context to posts and keep people better informed](https://communitynotes.x.com/guide/en/about/introduction))   
* Davide Eyenard of Mozilla.ai created a locally-hosted “Build your own timeline algorithm” tool for Fediverse users ([Build your own timeline algorithm \- SFSCON](https://www.sfscon.it/talks/build-your-own-timeline-algorithm/), [BYOTA GitHub](https://github.com/mozilla-ai/byota))  
* Ground news ([https://ground.news/](https://ground.news/)) shows “how thousands of outlets across the political spectrum cover the same story”. Similarly, the BBC tried to “encourage people to watch programmes and read news outside their comfort zones” in hopes of “puncturing online ‘echo chambers’ that reinforce existing biases” ([BBC wages war on online echo chambers with ‘unbiased’ tech](https://www.telegraph.co.uk/business/2022/06/09/bbc-wages-war-online-echo-chambers-unbiased-tech/))

### Topic Clustering

**Inputs**: Social media posts covering a range of topics.  
**Outputs**: Topic clusters, which can be used to inform stance & argument detection.

The goal of this step is straightforward: given a stream of social media posts, group together posts that discuss the same topic. These groupings form the unit of analysis for the next step, stance and argument detection, which operates within a topic cluster (not across the full post corpus).

I’ll use BERTopic, a topic modelling framework that pairs transformer-based sentence embeddings with a clustering pipeline. I explored a number of alternatives in my undergraduate [thesis](https://drive.google.com/file/d/1j1DaO1o1wGZsUfhPt3kLwBFOKchimnIM/view), and found BERTopic consistently performed best on short, noisy social media text, and is fully runnable locally.

On a high level, BERTopic works by first embedding posts into a 768-dimensional embedding space → then using UMAP dimensionality reduction to go from 768 to \~5 dimensions → followed by HDBSCAN density clustering in that reduced dimension. Lastly, it passes text from the resulting clusters through class-based TF-IDF, an algorithm that extracts the most important terms from each cluster, which are then used to label the topic for the cluster. These cluster labels, alongside the set of posts mapped to each cluster, is what will be passed to the next step of the pipeline.

![Topic clustering](topic_clustering.png "Topic clustering with BERTopic: embeddings → UMAP → HDBSCAN → c-TF-IDF labels for each cluster. | w=1000")

One big limitation of this approach is handling emerging topics. Once an initial BERTopic model is trained on existing posts, new posts can be assigned to existing topic clusters without re-clustering — BERTopic's `transform()` method handles this efficiently. But this approach misses posts that discuss entirely new topics – to capture these, we would need to re-cluster all posts periodically, which is expensive and probably not feasible for real social media platforms. For this proof-of-concept, I’ll do batch re-clustering runs at regular intervals, and leave better/more adaptive online clustering for future work.

### Stance and Argument Detection

**Inputs**: A set of posts, which have been clustered according to topic during the previous step.  
**Outputs**: A query-able set of argument groupings within each topic. 

This section has been the most interesting (to me) part of the project so far - this component is arguably one of the most important in the system: the quality with which we can classify (and query) arguments will largely determine the quality of our system’s output. That said, there is no clear ‘out of the box’ solution for this problem, so I have explored a couple potential approaches and will elaborate on each in this section. In **Appendix A**, I outline the first two approaches I considered – using the Polis architecture, and using opinion embeddings paired with LSTMs – and the limitations I found with each. 

Ultimately, I decided to build an argument knowledge graph, inspired by the Argument Web [9] project. My graph would be a simplified version of this, since social media posts don’t tend to have the amount of information Argument Web was designed for (**Appendix B** has a more complete explanation of what I will use and what I will drop, with rationale), and would be structured roughly as follows: 

![Argument graph](argument_graph.png "Argument knowledge graph: posts, stances, argument instances, and argument clusters linked for querying. | w=1000")

The LLM steps in this section will be done using a small local LLM (e.g. Llama 3.1 8B), run using a llamafile. To make sure the LLM always returns well-formed structured output, I’ll use GBNF grammar-constrained sampling (supported by llama.cpp, which underlies llamafile).

The flow for this component would be:

1. **Argument Extraction:** Given a post, the LLM will read each post and return a list of arguments it makes, each with a polarity label. This step outputs information needed for `ArgumentInstance` nodes, and would look something like:

```json
{
  "arguments": [
    {
      "text": "Dogs are better pets because they are loyal and form strong bonds with their owners",
      "polarity": "support"
    },
    {
      "text": "Cats are lower maintenance and better suited to busy lifestyles",
      "polarity": "attack"
    }
  ]
}
```

This step happens per-post (ie. in real time).

2. **Argument and Stance Clustering**: Then, a cron job or similar will embed all unassigned ArgumentInstances using a sentence transformer (e.g all-MiniLM-L6-v2) and searches for the nearest existing `ArgumentCluster` centroid using some kind of similarity search (eg. cosine similarity, FAISS [10], or something else) — but only within matching polarity. We then derive the **StanceCluster**s from the `ArgumentCluster`s. If no sufficiently similar cluster exists, we can create a new `ArgumentCluster`, then re-derive the **StanceCluster** memberships accordingly.

All this information is stored in the graph database, which can be queried by the next component. 

I imagine that the granularity of the Argument and Stance Clustering step would need to be refined over time, and may not be consistent between topics. For this project, I’ll assume they’re consistent, but this is another topic that could be left to future work. 

### Statement Generation

**Inputs**: The post of interest (with its topic + argument), and the query-able set of arguments per topic from the previous step.   
**Outputs**: A statement summarizing alternative stances and arguments. 

For this component, I plan to use ideas from generative social choice (see the [paper](https://arxiv.org/abs/2309.01291) and related [summer school talk](https://youtu.be/wS8YgEiXWOY?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-) where I first learned of it) [11]. That said, doing so will pose similar challenges to what I discussed for Polis (see Appendix A) – on a high level, the paper is aiming to generate statements that are representative of *people*’s opinions about a topic, whereas for this project I would like to use the process to represent *posts* containing *stances* and *arguments* about a topic.

In the paper:

1. People write their opinions about a topic, then rank other written statements about that topic.  
2. A discriminative query DISC(i, α) predicts how well a new statement (α) would represent a certain person (i), given their statement and ratings – they implement this as a call to an LLM that returns their expected rating.  
3. A generative query GEN(S, r) then generates a statement that maximizes the minimum (rth highest) DISC(i, α) of a subgroup (S) who is likely to agree.  
4. This iterates k times. Each round, runs the generative query over the remaining "unrepresented" participants to find a statement, adds it to the slate, then uses the discriminative query to identify and remove the ~n/k participants (n is the total # of participants) best represented by that statement. Repeat until k statements are selected.

Of course, this project can’t follow that format exactly (we don’t have survey data), but we can try to adapt it to this setting. Two options I am considering (I will likely try implementing both and see which produces the better outputs):

* **Skip the discriminative query step.** That said, this drifts quite far from the method and invalidates the Balanced Justified Representation (BJR) guarantee from the paper. Essentially, this would amount to removing posts from the pool arbitrarily after each round – and would be similar to just doing one LLM call per cluster asking for a representative statement.  
* **Use a proxy for the discriminative step.** Rather than calling an LLM to score each post (as was done in the paper), we can embed the generated statement using the same sentence transformer used to build the argument clusters (in the *Stance and Argument Detection* component), and compute its cosine similarity to each `ArgumentCluster` centroid (in the graph database). Each post is then scored by its distance to the centroid of whichever cluster the statement lands closest to — posts whose arguments are most central to that cluster score highest. The ~n/k posts with the highest scores are removed from the pool, on the basis that they are the most faithfully represented by that statement. It would need to be formally validated if I wanted to show it met the BJR guarantee, but at a minimum it should be a better approximation than skipping the discriminative step entirely.

Once we have representative statements for each `ArgumentCluster`, we can combine them into a summary statement (what will ultimately be displayed to the user) with a single LLM call. 

### Software Infrastructure

**Inputs**: Outputs from all pipeline components above.  
**Outputs**: A running, locally-hostable system that fetches Fediverse posts, processes them through the pipeline, and presents generated statements to the user.

This project will specifically focus on Fediverse users since posts are publicly queryable through the Mastodon API via Mastodon.py. 

My initial plans for the infrastructure are:

| Component | Tool | Notes |
| :---- | :---- | :---- |
| **Data source** | [Mastodon.py](http://Mastodon.py) | Fetches posts via the Mastodon API. |
| **Backend** | Python + FastAPI | Works/integrates well with Mastodon API + other components. |
| **Storage** | SQLite | Easy to host locally. |
| **Argument graph** | Undecided, but likely [Kuzu](https://kuzudb.github.io/docs/) | Local graph DB; no separate server process needed. |
| **Embeddings** | all-MiniLM-L6-v2 via [llamafile](https://mozilla-ai.github.io/llamafile/) | Used across topic clustering, argument clustering, and statement generation. |
| **LLM inference** | Llama 3.1 8B via [llamafile](https://mozilla-ai.github.io/llamafile/) | Argument extraction and statement generation |
| **Frontend** | Undecided, maybe as a chrome extension or something like [marimo](https://github.com/marimo-team/marimo) | TBD, I have not explored many options in depth |

## Appendix

### Appendix A: Initial approaches considered for the stance and argument clustering step

This section outlines the two main approaches I considered for the second step in the pipeline, wherein posts discussing each topic need to be further broken down into arguments, each supporting a given stance. I considered using the Polis architecture, and using opinion embeddings paired with LSTMs – this appendix explains what I tried, and the limitations I found with each.

#### Polis

Initially, I wanted to use something similar to Polis (see the [platform](https://pol.is/signin) and [paper](https://www.demdis.sk/content/files/2022/11/Polis-manusript.pdf)), a platform for large-scale structured opinion gathering and consensus mapping. Notably, it was used as part of Taiwan's vTaiwan platform to deliberate national policy issues (as Audrey Tang discussed in the 2025 [summer school talk](https://youtu.be/hvVoPHDRofE?list=PL4gbzAVOpp7CVP42D1kHgaunoamRTESZ-)) and has roughly the following flow [12]:

1. Users post statements about a topic → those statements are then presented to other users on the platform, in such a way that boosts consensus-building comments.  
2. Users vote on statements, with options for agree, disagree, and pass. These votes are aggregated into a matrix with each row representing a post, and each column representing a user. Individual cells take on values of 1 (agree), -1 (disagree), and 0 (pass).   
3. Principal component analysis (PCA) is done to reduce the dimensionality of the matrix to 2D. K-means clustering is done to form ‘opinion groups’ in the 2D representation.   
4. Various consensus and representativeness metrics are calculated on the comments within each cluster, giving insights on where users agree, where they disagree, and what statements are most representative of a given cluster.

My initial hope was to use components from the Polis architecture in this project – specifically, using social media posts with their associated ‘likes’, as ‘statements’ and ‘votes respectively. Then, I could run the Polis algorithm within a given topic to generate opinion clusters, and use the Polis metrics to select a couple statements from each cluster which were most representative of that cluster. 

This approach had a couple key issues:

* **Most social media platforms do not have a clean mapping for ‘agree’, ‘disagree’, and ‘pass’ votes, which are essential to the Polis algorithm.** Without these, it becomes much harder to construct the matrix that PCA and k-means are ultimately performed on. Only some platforms, like Reddit and Youtube, have the concept of upvotes and downvotes, but I did not want to limit the scope so strictly at the outset.   
* **Running the Polis algorithm requires keeping a matrix of posts that users have liked/disliked/passed on for each topic.** Gathering and storing this level of detail about other users felt invasive and unnecessary. Additionally, most platform APIs (including Reddit and Youtube) don’t support this level of detail in information retrieval (for good reason).  
* **Along these same lines:** **Polis clusters represent groups of *users* who share a common opinion, but in my system, I want clusters to represent groups of *statements* that share a common argument.** This is a subtle but important difference, and one of the main reasons I decided to move away from this option.

To address the first limitation, I considered using only ‘likes’, with ‘viewed/ignored’ as a proxy for ‘pass/disagree’ but doing so limits the quality of the data (and getting data on which posts on a given topic were viewed, but not liked, by each user is complex). 

I also considered doing a custom ‘social media platform’ as a proof of concept for this project, but again (a) didn’t want to limit the project’s scope, and (b) doing so wouldn’t address the latter two concerns. I ultimately decided these limitations were enough to warrant exploring other options. 

#### Opinion Embeddings and LSTMs

I next wondered if I could cluster opinions in the same way BERTopic clusters topics. The key differences between opinions and topics are that similar opinions do not necessarily share similar semantics (you can express the same opinion using different vocabulary, which is especially true of short, messy social media posts) – and vice versa: opposing opinions do not necessarily use different vocabulary. 

Still, I had hoped that semantic information captured by the ordering of words in peoples’ posts would be enough to deduce their opinions – and that I would be able to fine-tune an embedding model for this particular task. I read some works that explored similar approaches [13, 14, 15] and ultimately explored two main paths: 

* **First, I considered using a contrastive learning objective (as in Bar-Haim et al [16]) to force embeddings to encode stance rather than just semantic information.** To train the model, each iteration encodes three posts: the post you're interested in, one post that agrees with it, and one post that disagrees with it. You reward the model for encoding the post close to one it agrees with and far from the one it disagrees with. This was promising for surfacing *stances*, but did not accomplish the goal of surfacing *arguments* for posts of unseen topics.   
* **I also tried using a synthetic dataset of (post, topic, arguments) to train a Recurrent Stick-Breaking Topic Model (as in Wang et al. [17]) to extract sub-arguments within a given topic.** In this architecture, a latent vector z is fed into a stick-breaking LSTM, which at each step outputs a break probability that determines how much of the remaining probability mass is allocated to the next cluster position — producing θ, a distribution over argument clusters. The idea is that the θ vector should represent the distribution of arguments within a given post. This had some success within a given topic cluster, but did not generalize well, and so was not scalable to social media platforms where new topics always emerge and stances are nuanced.

Arguments tend to be nuanced – two posts can share a broad stance while making completely different arguments – and I wasn’t convinced that a model (importantly: one that is runnable from someone’s laptop) could efficiently classify them in any reliable, scalable way.

### Appendix B: Argument Web Interface Components

This appendix explains the argument web interface components – what I plan to keep and what I plan to drop, with reasoning for each. 

The Argument Interchange Format defines several node types. I keep, simplify, or drop each as follows:

* **I-nodes** (information nodes — individual claims) are kept and renamed to `ArgumentInstance`. These represent a single argument extracted from a post. I add three fields AIF doesn't include: polarity (support/attack), source\_post\_id, and cluster\_id.  
* **RA-nodes** (support relationships) and **CA-nodes** (attack relationships) are simplified away. In full AIF, when one claim supports or attacks another, a dedicated intermediate node represents that relationship. For this project, I’ll just encode polarity directly onto the `ArgumentInstance` node.   
* **MA-nodes** (dialogue transitions) and **PA-nodes** (preference orderings) are dropped entirely, simply because social media posts don’t generally have enough information for this (both assume structured formal debate).  
* **L-nodes** (locution nodes — who said what) are handled by the **Post** node (and source\_post\_id reference on the `ArgumentInstance` node, so we won’t need a separate L-node type.  
* **Scheme classifications** (e.g. Appeal to Authority, Slippery Slope) are dropped, since reliably classifying argumentation schemes from informal social media text would require a much larger model and would introduce significant noise (and just isn’t needed here).

Also, I’ll use a graph database rather than the Argument Web database because graph dbs are easier to query efficiently (and there are options for hosting this locally).

Here is a table summary:

| AIF Component | Action | Reason |
| :---- | :---- | :---- |
| I-nodes | Keep, rename to ArgumentInstance | Direct equivalent; add polarity + cluster\_id fields |
| RA-nodes (support) | Simplify to edge property | No need for a node to represent a relationship |
| CA-nodes (attack) | Simplify to edge property | Same as above |
| MA-nodes | Ignore | Dialogue structure, not applicable |
| PA-nodes | Ignore | Preference ordering, not applicable |
| L-nodes | Optional (store as Post property for now) | Useful later for author-level analysis |
| Scheme classifications | Ignore | Too fine-grained for LLM extraction at scale |
| support/attack polarity labels | Keep (rename from for/against) | Direct OVA3 compatibility |
| AIFdb as graph backend | Replace with Kuzu or Neo4j | MySQL is not a graph database; poor traversal performance |
| OVA3 | Potentially use as dev tool | Annotation and visual inspection, not in pipeline |

## Sources

[1] M. Coeckelbergh, “Democracy, epistemic agency, and AI: political epistemology in times of artificial intelligence,” *AI Ethics*, vol. 3, no. 4, pp. 1341–1350, Nov. 2023, doi: 10.1007/s43681-022-00239-4.

[2] J. Kulveit, R. Douglas, N. Ammann, D. Turan, D. Krueger, and D. Duvenaud, “Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development,” Jan. 29, 2025, *arXiv*: arXiv:2501.16946. doi: 10.48550/arXiv.2501.16946.

[3] “Introduction.” Accessed: Mar. 19, 2026. [Online]. Available: https://communitynotes.x.com/guide/en/about/introduction

[4] “Note ranking algorithm.” Accessed: Mar. 19, 2026. [Online]. Available: https://communitynotes.x.com/guide/en/under-the-hood/ranking-notes#note-ranking-algorithm

[5] *twitter/communitynotes*. (Mar. 19, 2026). Python. X (fka Twitter). Accessed: Mar. 19, 2026. [Online]. Available: https://github.com/twitter/communitynotes

[6] “Ground News.” Accessed: Mar. 20, 2026. [Online]. Available: https://ground.news/landingV8/full-lp?utm_source=full-lp&utm_medium=animated-popup&utm_campaign=exp

[7] B. Woods, “BBC wages war on online echo chambers with ‘unbiased’ tech,” *The Telegraph*, Jun. 09, 2022. Accessed: Mar. 19, 2026. [Online]. Available: https://www.telegraph.co.uk/business/2022/06/09/bbc-wages-war-online-echo-chambers-unbiased-tech/

[8] M. Grootendorst, “BERTopic: Neural topic modeling with a class-based TF-IDF procedure,” Mar. 11, 2022, *arXiv*: arXiv:2203.05794. doi: 10.48550/arXiv.2203.05794.

[9] C. Reed *et al.*, “The Argument Web: an Online Ecosystem of Tools, Systems and Services for Argumentation,” *Philos. Technol.*, vol. 30, no. 2, pp. 137–160, Jun. 2017, doi: 10.1007/s13347-017-0260-8.

[10] “Faiss.” Accessed: Mar. 22, 2026. [Online]. Available: https://ai.meta.com/tools/faiss/

[11] S. Fish *et al.*, “Generative Social Choice,” Mar. 05, 2025, *arXiv*: arXiv:2309.01291. doi: 10.48550/arXiv.2309.01291.

[12] C. Small, “Polis: Escalar de la deliberación mediante el mapeo de espacios de opinión de alta dimensión,” *Recer. Rev. Pensam. Anàlisi*, Jul. 2021, doi: 10.6035/recerca.5516.

[13] H. Xu, S. Vucetic, and W. Yin, “OpenStance: Real-world Zero-shot Stance Detection,” in *Proceedings of the 26th Conference on Computational Natural Language Learning (CoNLL)*, A. Fokkens and V. Srikumar, Eds., Abu Dhabi, United Arab Emirates (Hybrid): Association for Computational Linguistics, Dec. 2022, pp. 314–324. doi: 10.18653/v1/2022.conll-1.21.

[14] H. Li, V. Schlegel, R. Batista-Navarro, and G. Nenadic, “Do You Hear The People Sing? Key Point Analysis via Iterative Clustering and Abstractive Summarisation,” May 25, 2023, *arXiv*: arXiv:2305.16000. doi: 10.48550/arXiv.2305.16000.

[15] J. Lawrence and C. Reed, “Argument Mining: A Survey,” *Comput. Linguist.*, vol. 45, no. 4, pp. 765–818, Jan. 2020, doi: 10.1162/coli_a_00364.

[16] R. Bar-Haim, L. Eden, R. Friedman, Y. Kantor, D. Lahav, and N. Slonim, “From Arguments to Key Points: Towards Automatic Argument Summarization,” in *Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics*, Online: Association for Computational Linguistics, 2020, pp. 4029–4039. doi: 10.18653/v1/2020.acl-main.371.

[17] H.-C. Wang, C. D. Putra, and C.-Y. Wu, “A recurrent stick breaking topic model for argument stance detection,” *Multimed. Tools Appl.*, vol. 83, no. 13, pp. 38241–38266, Oct. 2023, doi: 10.1007/s11042-023-16829-1.
