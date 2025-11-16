---
title: "Ethics, Technology + Public Policy for Practitioners Course Reflection"
date: "2025-11-07"
preview image: "etpp.jpg"
tags: ["jo's tech ponderings"]
description: "Reflection from the Ethics, Technology + Public Policy for Practitioners course"
draft: "false"
---

Over the past couple months, I’ve taken part in the Ethics, Technology \+ Public Policy for Practitioners course from Stanford University. It’s a part-time, online course for people who work in industry but are interested in the intersections of these fields. 

The best parts taught me about the AI governance landscape, and gave me a chance to meet so many new people working in responsible tech. The hardest parts involved me waking up at 2am to 4am every Thursday for the past 8 weeks to attend the weekly live lecture (and yet, still sitting here writing about how it was all worthwhile\!). 

Overall, it was a really cool experience and I’m really grateful for the chance to have been a part of it. It's easy to get stuck in the echo chambers of your own professional and social circles, but this course exposed me to new perspectives and problem areas related to responsible tech – some of which I will explore in this post. 

I’ve divided this reflection into three parts:

* pt 1\. talks about “The Ones Who Walk Away From Omelas” by Ursula K LeGuin \[1\] – which is the initial ethical conundrum that was used to frame the course.   
* pt 2\. looks at how technical approaches to solving social problems can run into challenges, particularly in defining human values in technical terms and in trying to come up with technical replicas (and/or replacements) of human processes.   
* pt 3\. is a rapid fire of some interesting topics I learned about in this course, which I hope to keep getting a better understanding of going forward. 

There is so much I could reflect on from this course -- both from the lectures and my interactions with other participants. I've chosen to focus on these areas because they are most relevant to my professional practice (but stay tuned, and I'll likely have some more content related to the other sections in the near future :).

—

**pt 1\. Omelas**

The course starts with a reading called “The Ones Who Walk Away From Omelas” by Ursula K LeGuin \[1\]. It starts by describing Omelas, a utopia where everyone is happy and fulfilled in every possible way. There was no crown-ruler, police, nor violence; just joy, wisdom, and beauty everywhere. This perfect place seems too good to be true, until you learn that the entire collective happiness of Omelas is predicated on the misery and suffering of one innocent child. The child is kept permanently locked in a filthy, dark cellar, neglected and suffering. The citizens, who are all aware of the circumstances of this child, know that if the child were ever comforted or released, "all the prosperity and beauty and delight of Omelas would wither and be destroyed" \[1\]. So they are faced with the dilemma: to continue to live in Omelas despite this, or to be “the ones who walk away”. 

Yes, it's very dark. But of course it raises some questions: what would you do if you were an Omela – would you stay, or leave? Is it okay for one person to suffer so that everyone else can be happy? What if it weren’t a child, but someone or something else?

It's easy to look from the outside and wonder how the citizens of Omelas could possibly justify this to themselves. But so many of us, particularly in western countries, do this kind of mental calculus every day. We’re aware that our happiness comes at the expense of others, but find ways to rationalize it \-- whether by distributing the blame (ie. individually, I cannot do anything to change this circumstance, so it is not 'my fault' for allowing it to persist and continuing to benefit from it), or by convincing ourselves that acknowledging its existence (in the Omelas' case, the existence of the child) and showing compassion (ie. by 'honouring' it in our work and lives) is enough.

In this story, the child embodies the costs of the people’s happiness. In the real world, those costs are often less obvious or clear-cut \-- the negative externalities underpinning our comforts are hidden to ease our guilt about their existence. For example, many AI models rely on data-annotation centers that impose harsh, emotionally and physically exhausting working conditions. Without these annotations, models would be significantly less accurate \-- but this step is often concealed within the AI development pipeline, and many are unaware it is even taking place \[2\]. As beneficiaries of these systems, we often choose not to see or acknowledge those practices (ie. the mindset of “ignorance is bliss”) so that we can feel better about the comforts that the resulting technologies afford.

I tend to believe that the real world is not just one “Omelas” – it’s more like many different iterations of this story layered on top of one another. Making it ‘better’ could look different in each one:

1. Sometimes it makes sense to stay – to use any available levers to change the system: pushing for better policies, building tools that reduce exploitation, or finding ways to redistribute the costs of progress more fairly.  
2. Other times it makes sense to walk away: that might mean boycotting companies or institutions whose values you can’t accept, or some technologies could be avoided altogether.

In any case, it involves someone deciding that harm to others (people, animals, the planet) can’t be rationalized as 'worthwhile' for their personal happiness – and accepting that they might need to collectively share those sacrifices amongst themselves instead. It also has to involve deciding to do something about it.

This course took us down a couple possible paths for what that ‘something’ could look like – in the next section, I’ll focus mainly on our session on algorithmic fairness. 

—

**pt 2\. The promises and perils of algorithmic fairness**

As someone who works in AI governance and comes from a technical background, it can be tempting to look for solutions in the technology itself. If an AI system isn’t behaving “fairly,” there must be a rigorous definition of fairness that can be deterministically coded into the system to fix it. Similarly, if current policies are lacking in some way, then we should build an unbiased, controllable, technical system to address their shortcomings.

Arvind Narayanan and Mehran Sahami’s session on algorithmic decision-making and fairness focused on the challenges of encoding human values into technical systems — how metrics can give a skewed picture of a system’s quality, and why that limits the current usefulness of technology in solving these kinds of problems. 

I believe that technology can do a lot of good – for example, in drug development, renewable energy, assistive tools, and making education more widely available – but we need to be careful about *when* and *how* we develop and apply it. Technical systems and metrics are too often used as band-aids to hide underlying systemic problems. Companies may selectively share metrics or benchmarks they have optimized for (just today I learned of an AI Governance company offering ‘model trust scores’ to their clients), which give the illusion of fairness, even if those values don’t give the complete picture or guarantee a safe system. 

Coming from a technical background, it can be hard to accept that this is not enough. We’ve built mathematical models that match physical systems to incredible precision, and learned how to calculate all the forces in a bridge so as to ensure its safety – why can’t this be true here too? But we have objective measurements for physical systems in ways that we just don’t (yet?) have for human ones. If you can’t clearly define fairness for humans, it’s going to be very difficult to define it for an ML model. 

We also talked about how technical models that try to replace human systems can fail – the main example was around automating policymaking:

*“Many people, especially technologists, have an intuitive mental model that goes something like this. First, policy makers specify the goals, values, and objectives of the system. Then they formulate a policy that, based on the evidence available, best achieves the specified objectives. This policy is then shipped to the line workers who implement it faithfully.* 

*…*

*How administrators actually make policy: the values are not explicitly specified or agreed upon at the beginning, and the test of a good policy is simply that decision makers directly agree that it is good, rather than agreeing that it is the most appropriate means to an agreed objective.”* \[3\]

This example particularly resonated with me because, as a technical person working adjacent to public policy, I’ve often wondered whether technical systems could play a role in making policymaking more efficient and reliable.

But what this reading said, pretty unequivocally, was that this attempt to modularize/systemetize a human process just does not work in practice. The idealized, rational model doesn’t match how policies are actually made; and beyond that, when goals are difficult to specify, the job is often deferred to the technologists building the model (problematic in public sector contexts, where technologists do not have the authority to make these decisions), and they tend to gravitate towards defining values in a way that is technically advantageous. These kinds of issues arise again and again in the context of automation.

This doesn’t mean that AI can’t do any good – it just means we need to be careful about how we use it, and what we accept as “good.” In my experience, solutions that *augment* human systems tend to be far more effective than those that try to *fix* or *replace* them. If algorithms tend to mirror the systems they are trained on/exist within, we ask ourselves whether tech is the ‘right’ kind of solution/approach for that particular context – to make sure we’re not just addressing the symptoms rather than the underlying cause. 

—

**pt. 3\. Rapid fire topics of interest**

Finally, one of the main benefits of this course for me personally was to learn more about the broader landscape of responsible tech. These are some other interesting issues I learned more about, and which I hope to keep learning about in the future:

* Data supply chains and data scarcity: transparency and documentation of data supply chains, and the growing challenge of data limitations as more websites begin blocking crawlers (for example, through the Robots Exclusion Protocol via robots.txt files) \[4\].  
* Child Sexual Abuse Material (CSAM): How prevalent it is, particularly in schools (and the moral dilemmas that come with this). Also, the role that policy can play – how model developers may face legal consequences if their systems are prompted to produce CSAM, even in the context of testing or designing guardrails; and so many don’t devote resources towards doing this \[5\].   
* Privacy: how the use of large language models (LLMs) is pushing up against GDPR principles, particularly around *purpose limitation* (i.e., only using data for the purpose for which consent was explicitly given).  
* AI and the future of work: personal accounts of how AI is affecting different professional fields and reshaping people’s day-to-day work.  
* The interplay between Silicon Valley and the U.S. government: learned the term “liberaltarianism” (to describe the relationship in the \~2020-24 period), and how this relationship is evolving in the current political and economic landscape around AI in America.

Beyond these topics, I learned about all the different roles people are playing in helping to make tech better for the world -- I had some really infomative and inspirational conversations with other participants in the course. I honestly came into the course feeling a bit jaded about the potential for public policy to mitigate risks in what feels like an ever-more-powerful AI industry. I still see this as a daunting challenge, but am heartened to know that many of the people I had the chance to interact with through this course are working on making things better. 

So thank you very, very much to all the course facilitators, lecturers, and other participants for all of the time and energy you put into making this course worthwhile (again, even at 2am!) -- and of course to trail for their support in allowing me to participate. 

—

**Sources:**

\[1\] [https://shsdavisapes.pbworks.com/f/Omelas.pdf](https://shsdavisapes.pbworks.com/f/Omelas.pdf)   
\[2\] [https://www.bloomsbury.com/us/feeding-the-machine-9781639734979/](https://www.bloomsbury.com/us/feeding-the-machine-9781639734979/)   
\[3\] What if algorithmic fairness is a category error? Arvind Narayanan (Draft: August 2, 2025\)  
\[4\] [https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html](https://www.nytimes.com/2024/07/19/technology/ai-data-restrictions.html)   
\[5\] [https://hai.stanford.edu/policy/white-paper-rethinking-privacy-ai-era-policy-provocations-data-centric-world](https://hai.stanford.edu/policy/white-paper-rethinking-privacy-ai-era-policy-provocations-data-centric-world) 

