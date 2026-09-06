---
title: "Popping the Bubble: Surfacing Diverse Perspectives on Social Media (Implementation)"
date: "2026-09-03"
preview image: "sample_spectrum.png"
description: "Given a social media post on a particular topic, present the user with alternative perspectives on that topic, as expressed in other posts on the platform."
draft: "false"
---

---

In an earlier post ([Popping the Bubble: Surfacing Diverse Perspectives on Social Media (Proposal)](/blog/03_chatJTP/sm_polarization_proposal)), I described my plans for a project aiming to surface more diverse perspectives on social media, by appending text to polarizing posts (similar to Community Notes on X) that represents alternative stances and arguments on the topic. At the time of writing that post, I had not yet implemented anything, so it was mainly speculation for some potential implementations I thought seemed promising.  

Since then, I have built a version of the system, which I will describe in the post below. Anecdotally, I found the system worked quite well (!) on a ~10k post corpus of Mastodon data and I am looking into cost-effective ways of hosting this demo version online :) 

In the post below, I will describe my implementation of the project so far, and plans for evaluation (to be done at some point, I don't have the resources for now). I have repeated some content (part of the introduction) from the original post, so that this version can be read independently from the earlier one. As before, my hope is to document my progress, and to gather some feedback on my plans for next steps. If you find this project interesting, are working on anything similar, or have feedback on any of the points below, please do send me an email (joannaroy6[at]gmail.com)! Regardless, thanks for reading :)

---

## 1. Introduction

Social media often gives rise to echo chambers –- whether steered by algorithms or self-selection [1] – where the content a user sees largely aligns with their existing values and beliefs, and tends to amplify more extreme versions of them. The evidence on how widespread this effect is remains mixed, but for the subset of users who do end up in reinforced bubbles, the effects can be meaningful [2, 3, 4, 5]. Feeds that consistently reaffirm what we already believe risk leading to polarization and eroding our ability to think critically: to question our assumptions, examine our beliefs from different angles, and form reasoned, independent opinions.

Limiting echo chambers online (in the context of this project, on social media), and using AI to *scaffold* critical thinking rather than replace it, would therefore be beneficial. Broadly, the goal of this project is to design a system which, given a social media post about a topic that is polarized strongly towards one stance, will present the user with stances and arguments expressed by other users about this topic. 

We accomplish this by constructing an 'Argument Graph' that organizes extracted arguments from all posts made on the platform and in a structured, queryable format. Then, given a polarizing post, we query representative statements for all other arguments on the same topic and append them to the post. **Figure 1** shows the structure of the Argument Graph. 

The main focus of this article will be on constructing and evaluating the graph itself, whose generation relies on topic clustering, generative social choice, preference embeddings, among other concepts (many of which I have learned in the making of this project!). While it is possible that a state-of-the-art LLM could accomplish this task quite well, this implementation does not rely on them. We sought to break the process down into small enough sub-tasks that each can be interpreted, independently evaluated and, when an LLM is needed, it doesn't need to be a frontier model. The demo version of this system was generated on open-source models, and cost less than 50 cents (for the 70B model) and 20 cents (for the 8B model) to generate for ~10k posts. This was important for a number of reasons: 
- **Cost**. Frontier models are expensive and energy-intensive, particularly if this project hopes to scale to any live social media platform -- locally-hostable (smaller), open-source models aren't tied to the pricing (or availability) of frontier labs and have a smaller environmental footprint.
- **Accessibility and privacy**. Relying on local models also keeps the project more accessible and privacy-preserving -- e.g., an admin of a Fediverse server could reliably generate the graph for their own platform, without ever having to send their users' posts off to a third party.
- **Interpretability**. The ability to examine intermediate outputs makes the system more trustworthy and enables more robust evaluation at each step. The resulting graph, topics, and slate statements are also independently useful -- they are informative for this topic, or in any other research problems that might benefit from structured opinion data.

With this in mind, the overarching goal of this system would ideally reduce polarization by pulling people more towards mutual understanding and fostering empathy, while increasing our ability to think critically about social media feeds. Upon seeing other users' opinions about the topic, it's possible the user continues to hold their initial stance, but also possible they do so in a less polarized way, or even take a new stance on the topic. Most algorithms *filter out* content such that peoples' feeds tend to be more aligned with their existing views -- this project intentionally *brings in* content that differs from or opposes their existing views, in hopes it will motivate people to question and refine them.

Here are some (of many) projects with similar goals that I have referenced:

* X introduced Community Notes, to “add helpful context to posts and keep people better informed” ([Community Notes: a collaborative way to add helpful context to posts and keep people better informed](https://communitynotes.x.com/guide/en/about/introduction))   
* Davide Eyenard of Mozilla.ai created a locally-hosted “Build your own timeline algorithm” tool for Fediverse users ([Build your own timeline algorithm \- SFSCON](https://www.sfscon.it/talks/build-your-own-timeline-algorithm/), [BYOTA GitHub](https://github.com/mozilla-ai/byota))  
* Ground news ([https://ground.news/](https://ground.news/)) shows “how thousands of outlets across the political spectrum cover the same story”. Similarly, the BBC tried to “encourage people to watch programmes and read news outside their comfort zones” in hopes of “punctur[ing] online ‘echo chambers’ that reinforce existing biases” ([BBC wages war on online echo chambers with ‘unbiased’ tech](https://www.telegraph.co.uk/business/2022/06/09/bbc-wages-war-online-echo-chambers-unbiased-tech/))

### 1.1. Contributions 

This work makes three main contributions:

1. **A structured map of social-media opinions**. We propose a pipeline that takes unstructured posts as inputs, and outputs a queryable hierarchy of topics, sub-topics, source arguments, and representative statements.

2. **An adaptation of generative social choice**. We modify Generative Social Choice [9] to use preference-embedding similarity as the $\mathrm{Disc}$ utility, enabling preference embedding-based clustering of $\mathrm{Gen}$ groups and making the ideal (for this $\mathrm{Disc}$ function) $\mathrm{Gen}$ utility for a fixed group geometrically computable.

3. **Evaluate PCA for surfacing disagreement axes in argument texts**. We evaluate using PCA in preference-embedding space to identify dominant disagreement axes and assign relative stance positions to arguments and generated statements.

### 1.2. System Demo

Below is a screen recording of a demo version of the system:
- The first tab allows you to enter a 'post' to see what the system would output on your text. 
- The second tab shows the generated argument graph -- clicking on the topics opens their respective subtopics and statement slates. 

<video title="Figure 1a. Screen recording of the demo: querying a post and browsing the argument graph. (I feel obligated to add a disclaimer that the views in this video are not necessarily my own, but rather they are collected from a random sampling of posts and/or used in this video as a demo/sample of what *could* realistically be a polarizing post on social media) | w=800" controls src="figures/demo_vid.mp4"></video>

Of course, the actual system would not look like this. It would ideally be embedded into a social media app (and the full graph would not be visible, as it would be much larger and more overwhelming). Also, the sample post I offered was quite short, but I imagine this being useful when someone has done a very polarizing post (eg. a rant post about something) -- so that people reading it can also see the alternative discussions that are going on. 

Unfortunately, hosting this system online would have relatively high hosting costs due to the embedder requirement in the query step, so I only have the recording for now. At some point in the future, I may host only the graph part on its own since this would be more sustainable. 

If you are reading this and would like a demo, but the site is not up, please send me a message using the email in the footer :D. 

## 2. System Design

The overall goal of the system is as follows: 

> *Given a social media post on a particular topic, present the user with alternative perspectives on that topic, as expressed in other posts on the platform.*

Execution is split into two phases:

1. *Batch phase:* This phase happens asynchronously, and is a prerequisite for the *query phase*. Arguments made in other posts on the platform are classified according to topic and sub-topic, and organized into a graph; **Figure 1** summarizes the resulting structure, and Section 2.1 describes the pipeline in detail. 
2. *Query phase:* This phase uses the graph generated in the *batch phase* to present the user with alternative perspectives on a given post. **Figure 2** shows a sample flow, and Section 2.2 describes the execution.

![Argument graph structure.](argument_graph.png "Figure 1. Argument graph structure. | w=600")

### 2.1. Batch Phase

#### Stage 1: Argument extraction

> *Inputs:* Raw social media posts, extracted from the Mastodon API.  
> *Outputs:* A dictionary of arguments, with their respective posts' topic sentences.

The first stage of the pipeline parses posts into their respective arguments, since arguments are the atomic unit for the graph. 

A single post can make more than one argument about its topic---splitting by argument enables (i) clustering of similar arguments between posts later in the pipeline, while also (ii) cleaning the data for subsequent steps by stripping posts of extra wording unrelated to the arguments themselves, and filtering out posts without any arguments at all. 

**Implementation:** The LLM is prompted with a post and instructions to extract relevant arguments. Additionally, the LLM assigns a *topic sentence* to each post (a short label summarizing the main topic discussed in the post), which is used alongside the argument text in *Stage 2: Topic and sub-topic clustering*. JSON-schema constrained generation is used to ensure a consistent output format between posts. The full prompt and argument schema can be found in *Appendix A*.

#### Stage 2: Topic and sub-topic clustering

> *Inputs:* A dictionary of posts, with their respective arguments and topic sentences.
> *Outputs:* Clusters of arguments, grouped according to *topic* and *sub-topic*.

The goal of this step is to cluster the arguments extracted in *Stage 1: Argument extraction* according to their respective topics (a group of statements which broadly relate to one another) and sub-topics (a range of arguments about the same, focused issue, each taking a slightly different stance).

**Implementation:** This step happens in three phases. 

1. *Topic clustering:* Each argument, along with its associated topic sentence, is passed to BERTopic [6] for high-level topic assignment.
2. *Sub-topic semantic clustering:* Within each topic, arguments are further clustered by semantic similarity via UMAP and HDBSCAN (following BERTopic), tuned finer grained than for topic clustering. Semantic embeddings are used so that arguments similar in topic but different in stance are grouped together. HDBSCAN outliers are reassigned to their nearest non-outlier centroid via cosine distance. 
3. *Principal Component Analysis:* Ideally, each sub-topic cluster should discuss one issue, and contain arguments ranging from one extreme stance to the other. In other words, it should have a single dominant axis along which arguments agree/disagree with one another. However, semantically coherent clusters can mix more than one issue, and should be split if this is the case.

   We therefore estimate an *axis of disagreement* by (i) embedding each argument in the cluster with a preference embedder [7], and (ii) applying PCA to the resulting $N \times 768$ matrix and taking PC1 as this axis.

   This use of PCA follows Pol.is [8], which maps participants in a 2D opinion space obtained from a participants $\times$ comments vote matrix and, in its Uber case study, observed that PC1 aligned with the dominant pro/anti division. Because we lack votes, preference embeddings of arguments stand in for that vote matrix.

   If the PC1/PC2 variance ratio falls below a threshold, the cluster is treated as mixing multiple issues and recursively re-clustered (UMAP + HDBSCAN) up to a maximum depth. Further evaluation for this choice is provided in Section 3.1.

#### Stage 3: Slate generation

> *Inputs:* Arguments from each sub-topic cluster.  
> *Outputs:* A slate of representative statements per sub-topic (default `GSC_SLATE_SIZE = 6`) covering the cluster's opinion subgroups proportionally.

The massive scale of social media posts makes it infeasible to display *all* alternative arguments alongside each post. Instead, we generate a slate of $k$ representative statements per sub-topic.

**Implementation:** This step draws on generative social choice (GSC) [9] and largely follows the democratic process in that work, and therefore also inherits the BJR guarantee when assuming ideal $\mathrm{Disc}$ and $\mathrm{Gen}$. Our implementation differs from Fish et al. [9] in that each generated statement stands for a cohesive group of arguments within a sub-topic, rather than a cohesive group of participants. Further evaluation of the modifications made in this implementation are explored in Section 3. Evaluation. 

The implementation is modified correspondingly as follows (illustrated in Algorithm 2):

1. **$\mathrm{Gen}$ step:** Fish et al. [9] divide this step into two subtasks: (i) identifying a group of agents likely to agree on a statement and (ii) generating a statement that maximizes the minimum utility ($\mathrm{Disc}$ value) within that group. They implement subtask (i) by clustering LLM-generated feature embeddings representing each agent and subtask (ii) by prompting an LLM to generate the statement. Here, we replace subtask (i) with clustering the preference embeddings of arguments. Further evaluation for this choice is provided in Section 3.2.

   For a cluster of arguments $C \subseteq A$, the $\mathrm{Gen}$ step returns a statement representing $C$:

   $$
   \mathrm{Gen}(C) \;:=\; \alpha_C,
   \tag{1}
   $$

   produced by prompting an LLM with the arguments in $C$ and instructing it to maximize the minimum utility $\min_{a \in C} \hat{u}_a(\alpha_C)$.

   Originally I used k-means clustering, but then decided to try something more tailored to the preference embedding space/$\mathrm{Disc}$ function we sought to maximize, illustrated in Algorithm 1.

**Algorithm 1: Farthest-First Cluster Seeding**

```text
seeds = [preference embedding of an arbitrary argument]

while len(seeds) < k:
    for each remaining argument a:
        distance(a) = distance from a to its nearest center already in seeds
    next_seed = the preference embedding of the remaining argument with the largest distance(a)
    add next_seed to seeds

return seeds
```

2. **$\mathrm{Disc}$ step:** Fish et al. [9] implement this step using an LLM to predict a user's likely rating of a statement based on their prior ratings and responses. Here, we instead use the cosine similarity between the preference embedding of each generated slate statement and those of the corresponding arguments [7], with greater similarity indicating higher utility.

   Let $\phi$ denote the preference encoder and $t$ denote any text. We define the unit-norm embedding $E_t \in \mathcal{S}^{d-1}$, where $d=768$, as

   $$
   E_t = \frac{\phi(t)}{\Vert \phi(t) \Vert_2}.
   \tag{2}
   $$

   For an argument $a$ and a statement $\alpha$, the $\mathrm{Disc}$ score is the cosine similarity of their preference embeddings:

   $$
   \begin{aligned}
   \mathrm{Disc}(a,\alpha) &:= \hat{u}_a(\alpha) \\
   &= \left\langle E_a, E_\alpha \right\rangle \\
   &= \cos\angle\!\left(\phi(a),\phi(\alpha)\right)
   \in [-1,1].
   \end{aligned}
   \tag{3}
   $$

**Algorithm 2: Slate Generation Algorithm**

```text
for each sub-topic:
    k_remaining = K
    arguments_remaining = all arguments in the sub-topic
    slate = []

    while k_remaining > 0:
        q = ceil(number of arguments_remaining / k_remaining)  # quota
        split arguments_remaining into k_remaining clusters using preference embeddings
        generate one statement for each cluster

        for each generated statement:
            find the q remaining arguments with the highest cosine similarity to it
            score it by its minimum similarity to those q arguments

        choose the statement with the highest score and add it to the slate
        remove the q arguments represented by the chosen statement
        k_remaining = k_remaining - 1

    return slate
```

#### Stage 4: Stance scoring

> *Inputs:* Slate statements, plus the persisted PC1 parameters for each sub-topic.  
> *Outputs:* A continuous `stance_score` (z-scored) on every slate statement.

The goal of this step is to sort the claims in each sub-topic slate, such that they read as a continuum of stances when presented to the user. 

**Implementation:** The embedding of each generated slate statement is projected onto the PC1 axis of its sub-topic cluster; each score represents the statement's distance from the center of the axis. The rationale for this step is explored further in Section 3.1. 

Using the same mechanism in the query phase, the input post's stance can also be located relative to the presented generated statements.

### 2.2. Query Phase

![Example query flow.](query_flow.png "Figure 2. Example query flow. Yellow boxes indicate user-facing interface states; blue boxes indicate embedding and projection steps used to retrieve topics and position the post along the selected stance axis. | w=600")

The flow for this phase is outlined in **Figure 2**. The query phase reuses the graph produced during the batch phase: semantic embedding is used for topic retrieval, while preference embedding is used after topic selection to locate the input post relative to the selected sub-topic's stance axis.

## 3. Evaluation

This section describes evaluations of the system's quality. Some evaluations require a user study (which I do not currently have the resources for), so have not been run yet and are marked with a 🟡. The other evaluations, which were possible to complete on my own, are included below and marked with a 🟢. All evaluations are using a dataset of Mastodon posts described in Section 3.0 below. 

This section focuses primarily on load-bearing decisions where concepts were being modified slightly from their intended application:
- Sections 3.1-3.3 focus on evaluation of the modified Generative Social Choice algorithm.
- Sections 3.4-3.5 focus on the use of Principal Component Analysis with preference embeddings.
- Section 3.6 presents some suggestions for evaluating the impact of the system as a whole. For example, if we assume that all components of the system work exactly as designed, how could we evaluate the impact that it has on polarization in online spaces?

### 3.0 Dataset and Models

To evaluate the system, a dataset of 10,916 unique public Mastodon statuses were collected from `mastodon.social` through its unauthenticated hashtag-timeline endpoint. Reblogs, replies, posts shorter than 20 visible characters, and posts marked with a language other than English were excluded. Seventeen timelines were queried:

```text
ai, aisafety, carnivore, climate, climatechange, democracy, disinformation, environment, fakenews, fossilfuels, housing, immigration, politics, remotework, returntooffice, tech, vegan
```

Post timestamps range from 20 February 2016 to 29 June 2026, and the breakdown of status posts per queried topic tag are visualized in **Figure 3** (one post can contain multiple tags - 2,994 posts contain at least two of the 17 queried tags - so the counts overlap between posts).

![Dataset topic spread.](figures/dataset_tag_spread.png "Figure 3. Breakdown of status posts per tag for the Mastodon.py dataset of 10,916 statuses.  | w=600")

The full pipeline was executed twice, using Meta-Llama-3.1-8B-Instruct-Turbo and Llama-3.3-70B-Instruct-Turbo models run via Deepinfra's serverless models. 

### 3.1 Generative Social Choice (Disc Step): Preference Embedder Disc Utility 🟡

> *Evaluation Question:* How does the preference $\mathrm{Disc}$ function compare against human judgements for how well a statement represents the group's position? 

This evaluation question is motivated by the use of the preference embedder for the $\mathrm{Disc}$ utility calculation in *Stage 3: Slate generation*. 

First, there is a subtle difference between this work and the original work by Blair et al.: The $\mathrm{Disc}$ function in Blair et al. seeks to predict exactly how well each *person* in that group would score the $\mathrm{Gen}$ statement; whereas the $\mathrm{Disc}$ function in this work seeks to predict how well each *argument* in that group is represented by the $\mathrm{Gen}$ statement. So, in drawing this parallel, we are effectively treating each argument as a person with a single belief (whatever is stated in the post) and predicting how that theoretical person would score the $\mathrm{Gen}$ statement, asking "How well would a person who made argument X (and had no other concrete opinions) feel represented by the generated argument Y?". 

**Rationale**: Ideally, the Blair et al. $\mathrm{Disc}$ utility score calculation would perfectly predict how each member of each group would score the $\mathrm{Gen}$ statement. In this work, the ideal $\mathrm{Disc}$ utility score calculation would perfectly predict how well each argument is represented by the $\mathrm{Gen}$ statement. 

**Evaluation Plan**: Therefore, we can evaluate it by asking people to rate how well a given $\mathrm{Gen}$ statement represents a given argument, and compare the human ratings against the preference embedder ratings. 
1. Sample generated-statement/argument pairs across the full range of DISC scores.
2. Include both arguments assigned to the statement and arguments assigned to other statements.
3. Show each pair to multiple human annotators without revealing its DISC score.
4. Ask annotators to rate how well the generated statement represents the argument's position.

**Measures**:
- Correlation between DISC scores and average human ratings.
- Difference in human ratings between low-, medium-, and high-DISC pairs.
- Agreement between annotators.
- Comparison with cosine similarity from an ordinary semantic embedder.

This test is not perfect -- the ideal way to evaluate it would only be possible if "a person who made argument X (and had no other concrete opinions)" actually existed and could give a rating to the statement -- but I believe that, on average, using scores from other humans can approximate this closely enough. 

The quality of the preference embedder certainly also part of the required validation, so we additionally rely on the general verification in the original work. 

### 3.2 Generative Social Choice (Disc and Gen Steps): Quality of Generated Statements 🟢

> *Evaluation Question:* How close are the $\mathrm{Gen}$ statement utilities to the ideal $\mathrm{Disc}$ utilities. 

This evaluation question is motivated by the $\mathrm{Disc}$ and $\mathrm{Gen}$ steps of *Stage 3: Slate generation*. The goal is to determine how close we can come to generating (with $\mathrm{Gen}$) an optimal (as defined by $\mathrm{Disc}$) statement for each group. 

**Rationale**: Using preference encoder distances as $\mathrm{Disc}$ -- rather than an LLM predicting participants' likely ratings from their context, as in Fish et al. [9] -- means the idealized $\mathrm{Gen}$ utility for each cluster can be computed. The encoding of this ideal statement sits at the point which minimizes the maximum distance from all argument encodings in the cluster.

For each argument $a$ in cluster $C$, let $E_a$ be its unit-length preference encoding and $\lambda_a$ be the weight assigned to it. We find the optimal weights by solving

$$
\lambda^\star
= \mathop{\mathrm{arg\,min}}_{\{\lambda_a\}_{a \in C}}
\left\Vert \sum_{a \in C} \lambda_a E_a \right\Vert_2 .
\tag{4}
$$

The weights are constrained such that $\lambda_a \geq 0$ for every argument and $\sum_{a \in C}\lambda_a=1$.
The optimal statement encoding is the resulting weighted average normalized to unit length:

$$
E_C^\star
= \frac{\sum_{a \in C}\lambda_a^\star E_a}
{\left\Vert\sum_{a \in C}\lambda_a^\star E_a\right\Vert_2}.
\tag{5}
$$

$E_C^\star$ is the direction on the unit sphere maximizing the minimum $\mathrm{Disc}$ score across $C$, and the corresponding ideal utility is the norm minimized in (4), before that renormalization step:

$$
u^\star
= \min_{a \in C}\mathrm{Disc}(a,\alpha_C^\star)
= \left\Vert \sum_{a \in C} \lambda_a^\star E_a \right\Vert_2 .
\tag{6}
$$

**Measures**: To evaluate the quality of generated statements relative to this optimal, we measure the difference between the ideal utility $u^\star$ (eq. 6) and the realized utility $u = \min_{a \in C}\mathrm{Disc}(a,\mathrm{Gen}(C))$ -- using the actual LLM-generated statement -- for each cluster.

The results of this evaluation are included in **Figure 4** and **Figure 5** below. 

![Generated statement utility against the ceiling (8B).](figures/statement-utility-gap-8b.png "Figure 4. Generated statement utility against the ceiling its group allows (Llama-3.1-8B-Instruct-Turbo). | w=600")

![Generated statement utility against the ceiling (70B).](figures/statement-utility-gap-70b.png "Figure 5. Generated statement utility against the ceiling its group allows (Llama-3.3-70B-Instruct-Turbo). | w=600") 

I will reserve a full, formal analysis for if (when?) I write a paper on this topic. But some preliminary observations from this data were that:
- The gaps between optimal (u*) and actual (u) deteriorated with each round (see **Figure 6** below). This is expected since intuitively, as the arguments in a given group become increasingly different from one another, it is more difficult to generate a single representative statement. What I find interesting is how closely the 8B and 70B curves follow one another -- it suggests that just 'using a better model' won't just solve the problem, but perhaps there are improvements to the system design (eg. subtopic clustering granularity) which could be more impactful. 
- Similarly, the mean gaps between optimal (u*) and actual (u) $\mathrm{Disc}$ statements were 0.163 and 0.135 for the 8B and 70B parameter models, respectively (which seems a relatively small difference, although I know that is not a rigorous statement whatsoever) -- and anecdotally, I could not discern much difference in quality between the model outputs. 

![Generated statement utility by round and by group tightness.](figures/round-utility-by-model.png "Figure 6. Generated statement utility by candidate count (left) and by group tightness (right), Llama-3.3-70B against Llama-3.1-8B. | w=600")

### 3.3 Generative Social Choice (Gen Step): Clustering Algorithm 🟢

> *Evaluation Question:* How close does the clustering algorithm come to finding the best quota-sized ($\mathrm{\frac{N}{K}}$) group under the preference-embedding DISC objective?

This evaluation question is motivated by the use of the argument clustering (over preference embeddings) in the $\mathrm{Gen}$ step of *Stage 3: Slate generation*. The goal is to determine how close the clustering algorithm is to an 'ideal/optimal' algorithm (relative to our defined $\mathrm{Disc}$ function). This is important because, even if we can generate an ideal statement for each group (as discussed in Section 3.2), the overall output can only be optimal if the groups themselves are also ideal. 

**Rationale**: The ideal clustering algorithm would group together the arguments which are most likely to be well-represented by a $\mathrm{Gen}$ statement together -- here, the ideal clustering algorithm would group arguments such that the optimal $\mathrm{Disc}$ utility is maximized. Since the optimal $\mathrm{Disc}$ score per cluster is computable (see Section 3.2), we can determine the ideal set of clusters by iterating over all possible cluster combinations for a given subtopic, and checking which one results in the highest combination of optimal $\mathrm{Disc}$ scores. 

**Evaluation Plan**:  At each GSC round:

1. Let $S$ be the remaining arguments and $q$ the round's quota.
2. Enumerate every subset $T \subseteq S$ containing exactly $q$ arguments.
3. For each $T$, compute its theoretical maximum minimum utility $\gamma(T)$.
4. Let $T^\star$ be the subset with the highest $\gamma(T)$.
5. Compare $T^\star$ with the best group proposed by the clustering algorithm, $\widehat{T}$.

This is, of course, very computationally expensive to compute since there are so many possible groupings for a given sub-topic -- so we will use a subtopics containing less than 30 arguments for this evaluation. For the 8B parameter model run, this included 91 of 182 sub-topics; and for the 70B parameter model run, this included 98 of 188 subtopics.

**Measures**: 
- Optimal utility: $\gamma(T^\star)$.
- Best utility found by clustering: $\gamma(\widehat{T})$.
- Additive regret: $\gamma(T^\star)-\gamma(\widehat{T})$.
- Ratio: $\gamma(\widehat{T})/\gamma(T^\star)$.

Once again, this test is not perfect for a couple of reasons:
1. The optimal $\mathrm{Disc}$ score is not necessarily achievable, since we have no guarantee that this ideal point on the preference embedding graph corresponds to a real statement. Therefore, the optimal *achievable* configuration could differ from the calculated one. 
2. This evaluation doesn't show the 'perfect' way to cluster arguments *generally* such that the $\mathrm{Disc}$ score of the resulting $\mathrm{Gen}$ statement can be minimized, it only applies for this dataset and $\mathrm{Disc}$ score calculation. However, it is valuable validation on a sufficiently large data set. 

The results of this evaluation are included in **Figure 7** and **Figure 8** below. 

![Clustering versus exhaustive search (8B).](figures/exhaustive-group-search-8b.png "Figure 7. Clustering versus exhaustive search for the best quota-sized group (Llama-3.1-8B-Instruct-Turbo). | w=600")

![Clustering versus exhaustive search (70B).](figures/exhaustive-group-search-70b.png "Figure 8. Clustering versus exhaustive search for the best quota-sized group (Llama-3.3-70B-Instruct-Turbo). | w=600") 

These results are relatively consistent between models, which is expected since LLMs are not used for this step. Interestingly, when we compared these results to a k-means baseline, the k-means clustering generally outperformed our algorithm (see **Figure 9** below) -- so I suppose we will shift to k-means for future iterations of this pipeline. That said, the median $\gamma(\widehat{T})/\gamma(T^\star)$ ratios of our algorithm vs k-means were 98.7% vs 99.9%, respectively -- so neither seemed to be a notable detriment to performance. 

![Farthest-point clustering versus a k-means baseline.](figures/clustering-baseline-comparison.png "Figure 9. Farthest-point clustering versus a k-means baseline. | w=600")

### 3.4 PC1 as Axis of Disagreement 🟡

> *Evaluation Question:* Within a focused sub-topic, is preference structure approximately one-dimensional, and does unsupervised PC1 recover that dimension? 

This evaluation question comes primarily from the sub-topic cluster splitting step of *Stage 2: Topic and sub-topic clustering*, which seeks to isolate a set of arguments within each topic that each lie along a common axis. 

Ideally, each sub-topic would contain claims along the full 'polarized spectrum'. That said, deducing the various 'polarized spectrums' from a cluster of posts is not so straightforward. 

This implementation draws from similar work in Pol.is \[8\], with some important distinctions. Namely, Pol.is performs PCA on their Participants x Comment Votes matrix (where each row is a participant on the platform, and each column corresponds to a comment participants have voted on with -1/0/+1). This work instead performs PCA on an Arguments x Preference Embedding matrix. 

**Rationale**: Aside from the analogous matricies (participants ~ arguments, votes ~ preference embeddings), there is reason to believe that preference information may not require all 768 embeddings dimensions -- in the preference embedding paper \[7\], Blair et al. show that preference information is available in a low-dimensional linear subspace. It seems possible that, for a sufficiently focused subtopic cluster, this information could be available in 1-2 dimensions (ie. a single agree/disagree axis) -- similar to how we colloquially refer to stances as 'left-leaning' or 'right-leaning'. 

**Evaluation Plan**: The evaluation would follow a similar method to what Blair et al \[7\] used in their work to arrive at the ~20 dimension threshold. In their work, they freeze the original 768-dimension encoder, and learn an r-dimensional linear projection, sweeping through dimensions of $\mathrm{r \in \{1, 2, 5, 10, 20, 50, 100\}}$. 

$$
\mathrm{projected\_embedding}(x) = L^\top\, \mathrm{embedding}(x) \in \mathbb{R}^r
$$

They use a dataset of (anchor, preferred, non-preferred) triplets. For each labeled triplet, they train $\mathrm{L}$ with gradient descent so that the preferred statement is closer to the anchor after projection. The projected space utility function:

$$
U(v, j) = - \left\| \mathrm{L}^\top \psi(a_v) - \mathrm{L}^\top \psi(x_j) \right\|^2
$$

where $a_v$ is the anchor, $x_j$ is either the preferred or non-preferred statement, and $\psi(\cdot)$ denotes the embedding function. They use the Bradley–Terry loss:

$$
L = -\log\, \sigma \left( U(a, p) - U(a, n) \right)
$$

where $\sigma$ converts the utility difference into a probability.

Then, they evaluate and compare the accuracy at all the $\mathrm{r}$ ranks to determine how well the preference information is captured.

We would follow a very similar process:
1. Select a representative set of sufficiently large sub-topic clusters spanning low, medium, and high PC1/PC2 ratios. (this is the piece that requires participants, to generate the dataset)
2. For each cluster, have humans label triplets: "Taking argument A as the reference, is argument B or argument C closer to A in stance?"
3. Train $\mathrm{L}$ for ranks $\mathrm{r \in \{1, 2, 5, 10, 20, 50\}}$. 
4. Evaluate and compare the accuracy at each of the $\mathrm{r}$ ranks.

Higher accuracy in 1-2 dimensions (and little improvement in higher dimensions) would support our assumption -- but we still need to check whether the PC1 dimension is the same as the L dimension. 

The possible conclusions would be:
- Rank 1 approximately equals rank 20: the cluster is approximately one-dimensional.
- Supervised rank 1 works but PC1 does not: a stance axis exists, but PCA does not recover it.
- PC1 approximately equals supervised rank 1: PC1 successfully recovers the available one-dimensional axis without labels.
- Higher ranks clearly outperform rank 1: the cluster contains multiple preference dimensions.
- All methods perform poorly: the preference embeddings do not adequately represent the human stance judgments.

### 3.5 Projections onto the Axis of Disagreement 🟡

> *Evaluation Question:* Does ordering arguments by their PC1 projection match human judgments of where those arguments lie along the sub-topic's stance axis? 

This question is motivated by *Stage 4: Stance scoring*, where we present arguments to the user in order of their projection onto the PC1 dimension. 

**Rationale**: Essentially, we need to determine whether the order along the PC1 axis actually contains useful information. This step is highly related to the previous evaluation of *PC1 as Axis of Disagreement*. 

**Evaluation Plan**: To evaluate this, we will compare the projection ordering to annotator orderings of the statements. For a sample of sub-topic clusters:

1. Show each cluster's arguments to multiple human annotators in randomized order.
2. Ask annotators to arrange them from one stance extreme to the other.
3. Allow annotators to mark arguments as off-axis or a cluster as not meaningfully orderable along one axis.
4. Sort the same arguments by their PC1 projection.
5. Compare the human and PC1 orderings.

**Measures**: 
- Spearman correlation between the human and PC1 orderings.
- Pairwise ordering accuracy: how often PC1 places two arguments in the same relative order as humans.
- Agreement between human annotators.
- Percentage of arguments marked off-axis and clusters marked not orderable.

### 3.6 Effects on Polarization 🟡

> *Evaluation Question:* What impact does the system have on polarization in online spaces?

This is the trickiest question, and I honestly would love to source some ideas from people with a stronger background in social sciences/anthropology/political sciences/psychology/etc (if that is you, please reach out!). That said, my preliminary idea to evaluate this aspect was to deploy the system on some smaller social media platform (so long as it is large enough to give rise to echo chambers), for example on a Fediverse server that tends to discuss polarizing topics. For half the users, append posts with alternative perspectives (as outputted by this system), and leave the rest of the posts un-annotated. Observe the posting patterns of each group (I wonder if it's possible to come up with 'polarization' scores or similar), as well as the feed patterns (are they more likely to end up in echo chambers?). Perhaps there are other patterns that would differ between the groups, or perhaps the groups continue do not diverge at all -- regardless, it would be an environment and scale in which we could observe to understand the impacts (or lackthereof) of this system in a real-world context.

## 4. System Limitations and Areas for Future Work

- *Emergence of new topics*: BERTopic is currently used for the topic clustering step (in *Stage 2: Topic and sub-topic clustering*). Once an initial BERTopic model is trained on existing posts, new posts can be assigned to existing topic clusters without re-clustering (using BERTopic's `transform()` method), but this does not account for posts that discuss entirely new topics. To capture these, we would need to re-cluster all posts periodically, and therefore re-run the full pipeline on all posts again, which is expensive and not feasible for real social media platforms. 
- *Hyperparameter configuration*: There are currently several hyperparameters, both generally and at each stage of the pipeline whose optimal values are likely dependent on a variety of factors including the dataset, and potentially even between topic clusters (see *Appendix B: Configurable Hyperparameters*). I have used default values which I believe are reasonable for a proof of concept design, but of course there could be significant work done to understand the role of each parameters and which would be most impactful if optimized.
- *Cluster exclusivity*: In the current design, arguments can only be assigned to a single cluster. However, it is possible that arguments apply to multiple clusters discussing a similar topic from different angles. A simple example of this would be two clusters -- (1) cats vs dogs, and (2) cats are superior pets -- where there are likely overlapping arguments about cats which could belong to both clusters. 
- *Limited support for multi-argument chains* Taking arguments as the base unit assumes that arguments do not build off one another. This is probably an acceptable approximation for platforms like Mastodon and X, where users are generally making short posts with few reasoned arguments. Other data sources may require more parsing and potentially a modified graph structure. 
- *Gameability*: It is still possible that someone seeking to amplify a particular message could overwhelm the platform by making several posts in their desired 'direction', potentially skewing the slate towards their desired perspectives. This would be mitigated with a larger dataset, which would be more challenging to influence in a meaningful way. 

## References

\[1\] “Don’t blame the algorithm: Polarization may be inherent in social media.” Accessed: Mar. 22, 2026. [Online]. Available: https://www.science.org/content/article/don-t-blame-algorithm-polarization-may-be-inherent-social-media

\[2\] A. Ross Arguedas, C. T. Robertson, R. Fletcher, and R. K. Nielsen, “Echo chambers, filter bubbles, and polarisation: a literature review,” Reuters Institute for the Study of Journalism, 2022. doi: 10.60625/RISJ-ETXJ-7K60.

\[3\] M. Ahmmad, K. Shahzad, A. Iqbal, and M. Latif, “Trap of Social Media Algorithms: A Systematic Review of Research on Filter Bubbles, Echo Chambers, and Their Impact on Youth,” *Societies*, vol. 15, no. 11, Oct. 2025, doi: 10.3390/soc15110301.

\[4\] M. Cinelli, G. De Francisci Morales, A. Galeazzi, W. Quattrociocchi, and M. Starnini, “The echo chamber effect on social media,” *Proc. Natl. Acad. Sci.*, vol. 118, no. 9, p. e2023301118, Mar. 2021, doi: 10.1073/pnas.2023301118.

\[5\] K. Ludwig, P. Müller, N. Nikolajevic, and A. Grote, “Putting ‘filter bubble’ effects to the test: evidence on the polarizing impact of ideology-based news recommendation from two experiments in Germany and the U.S.,” *Inf. Commun. Soc.*, vol. 28, no. 13, pp. 2321–2340, Oct. 2025, doi: 10.1080/1369118X.2024.2435998.

\[6\] Grootendorst, M. 2022. BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure. arXiv:2203.05794.

\[7\] Blair, C.; Procaccia, A. D.; and Tambe, M. 2026. Embeddings for Preferences, Not Semantics. arXiv:2605.08360.

\[8\] Small, C. 2021. Polis: Escalar de La Deliberación Mediante El Mapeo de Espacios de Opinión de Alta Dimensión. RECERCA. Revista de Pensament i Anàlisi.

\[9\] Fish, S.; Gölz, P.; Parkes, D. C.; Procaccia, A. D.; Rusak, G.; Shapira, I.; and Wüthrich, M. 2025. Generative Social Choice. arXiv:2309.01291.

## Appendix A: Argument Extraction Prompt

```python
ARGUMENT_SCHEMA = {
    "type": "object",
    "properties": {
        "post_topic": {"type": "string"},
        "arguments": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {"text": {"type": "string"}},
                "required": ["text"],
                "additionalProperties": False,
            },
        },
    },
    "required": ["post_topic", "arguments"],
    "additionalProperties": False,
}
```

```python
ARGUMENT_PROMPT = """You are extracting opinion arguments from social media posts.

A argument is a position the author takes that another reader could agree or disagree with: an opinion, preference, recommendation, judgment, or stance.

Skip posts that do not express any opinion. This includes factual updates, status updates, greetings, jokes without stance, neutral observations, and pure questions. For those, return an empty list of arguments.

For each post, return:
- "post_topic": a short phrase (1-5 words) naming the broad subject the post discusses. This should be a category or topic name, not a stance. Use the same phrase for every post about the same subject so similar posts cluster together.
- "arguments": a list of objects with "text" set to the argument as a concise, self-contained sentence that names its subject.

Examples:

Post: "Carbon taxes just hurt working families. The rich can afford it, everyone else suffers."
Output: {"post_topic": "carbon taxes", "arguments": [{"text": "Carbon taxes disproportionately burden lower-income families"}]}

Post: "Cats are way better than dogs. Lower maintenance and they don't bark."
Output: {"post_topic": "cats versus dogs", "arguments": [{"text": "Cats are preferable to dogs because they require less maintenance"}, {"text": "Cats are preferable to dogs because dogs are noisy"}]}

Post: "Remote work is great for focus but I miss whiteboard sessions."
Output: {"post_topic": "remote work", "arguments": [{"text": "Remote work improves focus"}, {"text": "Remote work makes whiteboard collaboration harder"}]}

Post: "Had a great lunch today"
Output: {"post_topic": "lunch", "arguments": []}

Post: "Just deployed v3.2 to production"
Output: {"post_topic": "deployment", "arguments": []}

Post: "Should I get a cat or a dog?"
Output: {"post_topic": "cats versus dogs", "arguments": []}"""
```

## Appendix B: Configurable Hyperparameters

### Shared paths & runtime

| Parameter | Role |
|-----------|------|
| `DB_PATH` | SQLite database file — source of truth for topics, sub-topics, claims, slates, and stance scores. |
| `TEST_DATA_PATH` | Default input fixture when no `--data` path is passed. |
| `SOURCE_TEST_DATA_PATH` | Legacy fixture path; reserved, not currently read by any stage. |
| `GROUND_TRUTH_PATH` | Reserved path for manual evaluation fixtures; not read by the pipeline. |
| `MASTODON_FIXTURE_BASE_URL` | Default Mastodon instance when fetching a new fixture. |
| `FIXTURE_ACCOUNT_CREATED_AT` | Reserved timestamp for synthetic fixture metadata; not currently used. |
| `LOG_LEVEL` **env** | Python logging verbosity (`DEBUG`, `INFO`, …). |

### LLM backend

| Parameter | Role |
|-----------|------|
| `LLM_PROVIDER` **env** | Backend selector: `llamafile` (local llama.cpp server) or `openai` (any OpenAI-compatible hosted endpoint). |
| `LLM_BASE_URL` **env** | Chat-completions base URL for the chosen provider. |
| `LLM_MODEL` **env** | Default model id for all LLM calls unless a stage-specific override is set. |
| `LLM_API_KEY` **env** | API key for hosted providers; unused for local llamafile. |
| `LLM_CONCURRENCY` **env** | Max parallel in-flight LLM requests (`ThreadPoolExecutor` workers). Raise for hosted batches; keep at 1 for single-slot local llamafile. |
| `LLM_MODEL_FRAMING` **env** | Model for sub-topic label + `polarity_target` framing. Lets axis discovery use a stronger model than cheaper stages. |
| `LLM_MODEL_GEN` **env** | Model for GSC GEN statement synthesis. Lets slate generation use a stronger oracle independently. |

### Embedding models

| Parameter | Role |
|-----------|------|
| `TOPIC_EMBEDDING_MODEL` | Semantic sentence-transformer. Groups text by *subject* for clustering and post→topic centroid matching. Input is always `claim.text \| claim.topic_sentence`. |
| `PREFERENCE_EMBEDDING_MODEL` | Preference-tuned embedder. Opinion geometry — PCA axis discovery, GEN/DISC representation scoring, and z-score projection all run in this space. |
| `PREFERENCE_EMBEDDING_DEVICE` | Torch device for the preference model (`cpu` or `cuda`). |
| `PIPELINE_CPU_THREADS` | Caps Torch intra-op threads so CPU embedding batches stay predictable. |

### Stage 2 — Topic clustering

| Parameter | Role |
|-----------|------|
| `TOPIC_MODEL_PATH` | Directory where the fitted BERTopic model is saved between runs (used when retraining, not at query time). |
| `UMAP_N_NEIGHBORS` | UMAP local neighbourhood size before HDBSCAN. Larger → smoother global structure; smaller → finer local detail. |
| `UMAP_N_COMPONENTS` | UMAP output dimensionality fed to HDBSCAN. |
| `UMAP_MIN_DIST` | UMAP minimum distance in embedded space. `0.0` keeps clusters tight (good for HDBSCAN). |
| `UMAP_METRIC` | Distance metric for UMAP (matches L2-normalised sentence embeddings). |
| `UMAP_RANDOM_STATE` | UMAP seed for reproducible topic assignments across runs on the same fixture. |
| `HDBSCAN_MIN_CLUSTER_SIZE` | Minimum claims per topic cluster. Primary knob for topic granularity — higher → fewer, broader topics. |
| `HDBSCAN_MIN_SAMPLES` | HDBSCAN core-point density threshold. Works with `min_cluster_size` to control outlier sensitivity. |

### Stage 3 — Sub-topic clustering

| Parameter | Role |
|-----------|------|
| `SUBTOPIC_UMAP_N_NEIGHBORS` | UMAP neighbours within a single topic's claim pool. |
| `SUBTOPIC_UMAP_N_COMPONENTS` | UMAP dimensionality for within-topic clustering. |
| `SUBTOPIC_UMAP_MIN_DIST` | UMAP minimum distance (same rationale as stage 2). |
| `SUBTOPIC_UMAP_METRIC` | UMAP distance metric. |
| `SUBTOPIC_UMAP_RANDOM_STATE` | UMAP seed for reproducible sub-topic splits. |
| `SUBTOPIC_HDBSCAN_MIN_CLUSTER_SIZE` | Minimum claims per sub-topic candidate. Lower than stage 2 because per-topic pools are small. |
| `SUBTOPIC_HDBSCAN_MIN_SAMPLES` | HDBSCAN density threshold for sub-topic candidates. |
| `SUBTOPIC_REASSIGN_OUTLIERS` | If `True` (current default), HDBSCAN `-1` outliers are reassigned to the nearest sub-topic centroid; if `False`, outliers are dropped. |
| `SUBTOPIC_MERGE_SIMILARITY` | Cosine-similarity threshold for merging sub-topic clusters whose semantic centroids are nearly identical (post-HDBSCAN, pre-persist). |

### Stage 4 — Axis discovery

| Parameter | Role |
|-----------|------|
| `SUBTOPIC_MIN_PC1_PC2_RATIO` | Quality gate: if a pool's PC1/PC2 variance ratio falls below this, the pool is treated as multi-axis and recursively re-clustered in semantic space (stage-3-style UMAP+HDBSCAN). Higher → stricter gate, more splits. |
| `SUBTOPIC_MAX_DEPTH` | Maximum recursion depth for multi-axis splits. Caps how many times a pool can be subdivided. |
| `SUBTOPIC_MIN_SIZE_TO_RECURSE` | Minimum claim count before a pool is eligible for recursive split. Pools smaller than this are kept as-is or dropped. |
| `SUBTOPIC_ENDPOINT_SAMPLE_SIZE` | Number of +PC1 and −PC1 endpoint claims shown to the framing LLM when writing the sub-topic label and `polarity_target`. |
| `SUBTOPIC_FRAME_MERGE_SIMILARITY` | Post-framing merge threshold: sub-topics whose labels or `polarity_target` embeddings exceed this cosine similarity are combined. |

### Stage 5 — Slate generation (GSC)

| Parameter | Role |
|-----------|------|
| `GSC_SLATE_SIZE` | Target number of representative statements (`k`) per sub-topic slate. Each round of the GEN/DISC loop adds one statement until the slate is full. |
| `GSC_GEN_ENSEMBLE_RANDOM` | Extra random nearest-neighbour preference clusters per GEN round, on top of the balanced partition seed. Paper-style ensemble: more candidates → better maximin DISC score, at the cost of extra LLM calls per round. |
| `GSC_CLUSTER_PCA_DIMS` | Number of top principal components used as the geometry for GEN candidate clustering (preference embeddings are projected onto this subspace before claims are grouped into candidate blocs). DISC scoring stays in full preference space. |