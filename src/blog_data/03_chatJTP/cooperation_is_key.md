---
title: "Cooperation is Key"
date: "2025-06-30"
preview image: "coop.png"
description: "How cooperative AI can benefit from cooperation with other disciplines"
draft: "false"
---

Cooperative AI is a (relatively new) sub-field of AI safety, focused on ensuring that AI agents interact 'well' (importantly: safely) with one another. This is becoming more important as AI agents are deployed in increasingly consequential settings, in which they are more and more likely to interact with each other. The textbook example of why we must study and take precautions in the area of cooperative AI is a 2010 market crash, wherein the algorithms deployed by various trading firms entered a dangerous feedback loop, which ultimately dropped the Dow Jones Industrial Average by 9% before humans intercepted to mitigate the damage.

I can't remember how I first learned of this area of research, but what interests me most about it is how much it intersects with other fields. In this post, I'll talk a bit about those overlaps, and why I think they are important to pay attention to (particularly since the concept of cooperative AI is still relatively new). 

As a caviat, I am still new to this field -- its part of AI safety/adjacent to my day-to-day work in AI governance, but what I know about it comes mostly from reading papers and watching talks in the area. I think its really interesting and would love to learn more (!) and did my best to make this post accurate, but just keep in mind that this is coming from a newbie :).

---

### Parallels in Cooperative AI

Most fields of research (and often, areas of life) can benefit from identifying common patterns, then using lessons you learned when you saw that pattern in one environment to help answer questions in the other. For example, asking ourselves:

1. If we distill this problem down to its bare-bones, what does it look like then?
2. Where else have we seen this structure before / in other areas?
3. Lets say we identify this pattern in area A and area B. then, what did we learn in area A that we can apply to area B and vice versa?

It seems like there is huge potential to do this in the field of cooperative AI. As a relatively new field, many problems are presented as ‘novel’ and/or ‘under-explored’. This may be true, but I wonder whether some subset are really just a problem of translation (ie. the knowledge is out there, we just have to find the resources and people who have it, and find a way to integrate those perspectives in this context).

Cooperative AI has parallels with many human and physical systems. Perhaps a more well-established field could give answers to some questions in cooperative AI, for example:

- _Political scientists → computational social choice_: decades of thinking about collective decision-making, fairness, and power dynamics can inform how AI agents aggregate preferences or resolve conflict.
- _Ethics → reward design in multi-agent systems_: ethicists have thought deeply (and for a long time) about trade-offs, moral dilemmas, and value alignment.
- _Negotiators → coordination and conflict resolution_: lessons from diplomacy, treaties, and mediation can inspire mechanisms for AI agents to cooperate even with partial trust.
- _Psychologists → modeling decision-making and social behavior_: if we understand why people make decisions, maybe this can give hints as to why AI models make certain decisions in certain situations, as well as how this can be mitigated / steered in a better direction if needed; given that AI is largely trained on human data, there are likely to be many parallels and we should leverage that where possible.
- _Team sports & games → cooperation (and competition) strategies_: how players coordinate, adapt, and specialize under shared goals is very analogous to collaborative multi-agent settings.
- _Neuroscientists → memory, attention, reasoning_: modeling how people store and access memories, make decisions, reason about those decisions so that we can accurately represent it (try to replicate it) in simulations.
- _Historians → multi-agent dynamics over time_: knowledge of how various wars / conflicts between many actors have played out in the past could be valuable to understanding and modelling agent conflict.
- _Urban planners → coordination in complex systems_: understanding how humans navigate shared spaces and infrastructure could help in multi-agent navigation or resource allocation.
- I'm sure many more

Likewise, perhaps cooperative AI can be the new tool needed to address unsolved problems in another area, for example:

- _Public policy → scenario planning & simulations_: multi-agent models can simulate the downstream effects of policy interventions.
- _Social media & polarization → modeling social dynamics_: using cooperative AI to better understand social dynamics in online spaces, what leads to polarization, and other social phenomena.
- _Climate negotiations → agent-based modeling of treaties_: cooperative AI could model how different actors negotiate and implement climate agreements.
- _Disaster response & logistics → coordination under pressure_: multi-agent cooperation is critical in simulations for emergency planning and evacuation preparation.

I am (almost completely) sure that some form(s) of interdisciplinary collaboration are already happening in the development of cooperative AI, but solving interdisciplinary problems is notoriously tricky, so I'm also (almost completely) sure that there is room for improvement -- and I believe this type of work would be well-worthwhile focusing our energy on.

Because of all these links, I would be really interested to see a review paper that identifies key problems in cooperative AI, highlights (some of) their respective overlap / parallels in other fields, then proposes some mechanisms for enabling collaboration between experts in both of these areas (such that their collaboration can be mutually beneficial / genuinely constructive). If this exists and I just haven't seen it, please send it over :D

### Computational Social Choice <-> Community Engagement

One parallel I find particularly interesting is that between computational social choice (a sub-field of cooperative AI) and community engagement (a field which I spent significant time thinking about in the later years of my undergraduate degree).

**Computational social choice** (as I currently understand it) is the study of how to best aggregate ‘votes’ (ie. actors' opinions / preferences / anything of that nature) to inform ‘decisions’ (ie. outcomes / results / etc -- in a wide variety of scenarios, beyond just elections, which we most commonly associate with the concept of voting). The methods are formal, mathematical, and often aim for provable guarantees (ie. no agent is incentivized to lie about their preferences).

Computational social choice is relevant to the field of cooperative AI for a couple of reasons:

1. Multi-agent systems often need to make ‘collaborative’ decisions — computational social choice can offer some mechanisms to do this, and seeks to understand the consequences of doing it one way vs another (as well as how this may vary between scenarios).
2. Reinforcement learning systems (in particular, those based off human feedback) often leverage ideas from computational social choice to aggregate feedback and incorporate it into their reward functions.
3. Probably many more that I don’t yet know about.

**Community engagement** (eg. in the context of research projects, product design, service design, etc) involves finding ways to represent the perspectives of people who will ultimately use a technology/product/service into the development of said technology/product/service. For example, my projects in this area involved:

- Finding ways to better integrate student perspectives into campus mental health research
- Exploring how to integrate community perspectives into hate speech interventions on social media (ie. the perspectives of those who are affected by the hate speech)

Community engagement is therefore relevant (and important) to consider in the development of new technologies. Many modern technologies are so-called ‘general purpose technologies’, designed by a relatively small group of individuals for use by a wide array of people in a wide variety of situations. The tricky part of designing such technologies is that it is next to impossible for designers to account for every scenario in which their technology will be used. It feels as if there are just too many voices -- that it's not feasible for all of them to be incorporated in a meaningful way.

Community engagement tries to address this problem by finding ways to 'translate' between the wide array of people who will use a piece of technology, and the people who are designing it. One way to think about it is as a way to shift power away from the concentrated/small set of people designing a piece of technology, towards groups who dont generally have much of a voice, if any, in those conversations. Another way to think about it is that community engagement in research/product design seeks to ‘take the burden’ off of researchers/engineers — giving them more reliable ways to make sure their technology suits the people who will actually use it, and hopefully minimize its unintented harm when it gets deployed into the world.

Both computational social choice and community engagement involve finding ways to best aggregate the perspectives of many actors in such a way that meaningfully represents their unique opinions and perspectives about the topic. Computational social choice can seem pretty abstract, so I think grounding it in areas like community engagement could help communicate its importance and applicability in contexts beyond simply. Community engagement can look very different depending on the field in which you apply it, so I’m interested to learn more about computational social choice, and how it could potentially be a mechanism to facilitate community engagement in the development of new technologies - particularly technologies related to AI and/or multi-agent systems.

---

To summarize, cooperative AI is an important area of AI safety. It has many links with other fields that would be worth exploring more to advance both the field of cooperative AI, and other fields where cooperative AI could have useful applications. Computational social choice and community engagement have some especially interesting overlaps that I hope to continue learning more about, and which I think could be important to technology development in general moving forward.

That said, we also need to keep in mind that parallels between two fields (or problems / challenges therewithin) do not mean that they are an exact match -- the outcome in one may not necessarily be the outcome in the other, nor is the solution to one problem necessarily the solution to the other. This includes being mindful of:

- Different definitions (ie. what “fairness” means in ethics vs in social choice)
- Different goals (ie. practical implementations vs theoretical elegance)
- Different methods of validation (ie. empirical case studies vs simulations vs formal proofs)

Approaches should not be copy & pasted betwen disciplines, and still need to be tested appropriately. Instead, these parallels can (and should) be used to ‘steer’ research directions, while remaining aware of confirmation biases this approach may introduce.

(this is a side-tangent, but I would argue that one of the biggest current downfalls/failures of AI governance and the EU AI Act right now is trying to regulate it the same way as we have approached regulation in other fields, without sufficiently acknowledging the differences between AI and those other fields with which we are drawing parallels. We are asking tech companies to fit themselves into a regulatory mold -- meanwhile, the rigidity this demands goes against core principles of most big tech firms, and seems unrealistic given the amount of power and momentum they currently hold. I'll probably come back to this can of worms in a later article -- but I did want to mention it here to underscore that this copy & paste approach is sneakier and probably more common than you might think).

_The main takeaway is not to blindly import solutions, but to let insights from one field inspire questions (and hopefully, answers) in another._

That's all I've got for now -- Next month, I'll be attending the Cooperative AI Summer School, an annual conference / lecture series for early-career (thats me :) researchers and professionals interested in the field. Because of this, these topics have been top-of-mind for me over the past couple weeks, and I hope these initial thoughts can be a good starting point for interesting conversations at the conference next month.
