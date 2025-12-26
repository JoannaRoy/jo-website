import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/card";
import { Collapsible } from "@/components/collapsible";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { PageGrid } from "@/components/item-grids";
import { MovingMap } from "@/components/moving-map";
import { PictureCard } from "@/components/picture-card";
import { ScribbleBackground } from "@/components/scribble-background";
import { TabScroll } from "@/components/tab-scroll";
import { photosFromGlob } from "@/utils/media";


const TORONTO: [number, number] = [-79.3832, 43.6532];
const MUNICH: [number, number] = [11.582, 48.1351];

const movingToGermanyImages = import.meta.glob("@/blog_data/preview_images/moving_to_germany/*.{jpg,jpeg,png,gif,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const movingToGermanyPhotos = photosFromGlob(movingToGermanyImages);

function BackToBlogButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:translate-x-[-4px] duration-200 group"
      type="button"
    >
      <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" title="Back to Blog Home" />
      <span className="text-base md:text-lg font-semibold">Back to Blog</span>
    </button>
  );
}

function TipsForMovingTitle() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-5 md:gap-6 mb-6 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 m-0 font-adventure">
        Tips for Moving Abroad
      </h1>
    </div>
  );
}

function IntroAndMapSection() {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-6 mb-6">
      <Card className="flex-1">
        <p className="mt-3 text-gray-700">				
          If you have the means to do it, I would always recommend moving to a new country for
          a while. When I moved, I could never have predicted all the ways I'd grow up and
          learn from this experience, and I believe anyone who moves abroad would have
          parallels. So this post is somewhere in between a reflection (for myself) and
          advice/tips (for others) about moving to a new country. 
        </p>
        <p className="mt-3 text-gray-700">								
          I originally made it as a 
          static blog post, but realized that (a) I had a looot to say, and (b) it makes more sense 
          to keep this somewhere I can update later (I'm only 1.25 ish years into living abroad, 
          so I'm sure I will have more to say next year around this time). Talking to 
          people who moved abroad has been immensely helpful for me, so this is my
          way of (hopefully) doing the same for others. Enjoy!
        </p>
      </Card>
      <Card>
        <div className="w-full rounded-2xl">
          <MovingMap
            className="w-auto h-auto"
            from={TORONTO}
            to={MUNICH}
            fromLabel="Toronto, Canada"
            toLabel="Munich, Germany"
          />
        </div>
      </Card>
    </div>
  );
}

function HowIGotHereCard() {
  return (
    <Card title="How I Got Here 🇩🇪" className="md:col-span-8">
      <p className="my-3">
        I want to say that my decision to move to Munich, Germany was planned and
        deliberate. Up until graduating, I’d followed a pretty traditional path — in high
        school, I knew I’d attend university. I was good at science and math, and my dad
        was an engineer, so naturally that was what I studied. But coming out of school,
        the paths were much less well-defined. Having kept my options as open as possible
        up until that point, it was daunting to pick a specific job and career to focus
        on. Success is also much less well-defined outside of academic settings — classes
        have clear metrics for your progress and performance, but ‘succeeding’ in your
        career can look very different for different people. I had no idea ‘where I saw
        myself in ten years’ (I still do not).
      </p>
      <p className="my-3">												
        I lived in Toronto my whole life, and aside from two years of university, I always
        lived in my childhood home. I had always wanted to explore different parts of the
        world, beyond just visiting — I wanted to live there, get to know people there, and
        experience (not just touristy) things I wouldn’t have the chance to at home. I
        tried to do this at various points during my undergrad, but opportunities were
        seriously limited by COVID, and the ones I did get (first in Calgary, then in
        Singapore) were both cancelled or shifted to remote for this same reason. By the
        end of my degree, my world just felt a bit small — I felt restless and wanted to
        see the world and grow in ways you just won’t if you stay in the place you were
        born and raised.
      </p>
      <p className="my-3">
        So I applied to trail (my current job) on a bit of a whim. I was scrolling through
        a Slack channel, which I had been added to during a Responsible AI conference I’d
        attended earlier that year, and saw a posting for a software engineering role. I
        applied, and feel extremely (extremely) lucky for how things have worked out since.
        I (albeit a tad naïvely) moved to a new continent in a place where I did not yet
        speak the language, which of course comes with many ups and downs -- but overall, I
        am (so far) extremely glad I did it.
      </p>
      <p className="my-3">
        Below, I will go into those ups and downs, and (some of) the things I've learned
        while navigating them.
      </p>
    </Card>
  );
}

function WhatYouLearnCard() {
  return (
    <Card title="What You Learn 🤓" className="md:col-span-4">
      <div className="flex flex-col gap-3">
        <Collapsible summary="It forces you to become more comfortable in unfamiliar environments">
          <p className="m-0">
            Even if a country 'seems similar' to your home country, there are almost
            certainly differences that you will notice/become more apparent as you spend
            more time there. In my case, this meant getting used to Bavarian traditions and
            German communication, as well as other less country-specific differences, such
            as grocery store layouts/selection (you will almost inevitably miss your
            favourite/go-to foods from home), visa and government processes, knowing which
            stores sell which items, how to make friends in the new place, etc. Many of the
            things you wouldn't think twice about at home become more daunting just because
            they are less familiar -- what used to be small wins now feel like bigger 
            accomplishments. And yet, somehow you will figure out how to navigate it. 
            Getting more comfortable with handling this does wonders for your self efficacy, 
            resilience, and general ability to take on future challenges.
          </p>
        </Collapsible>

        <Collapsible summary="Starting over / building from the ground up">
          <p className="m-0">
            When you move, you start from a blank slate, for better or for worse. Before you move, you/your 
            friends probably see you as a certain 'type' of person with certain personality 
            traits -- it can be surprising to see which of those stick, and which new ones 
            emerge, when you're in a completely new environment. Similarly, I remember 
            feeling like I'd worked so hard to get this 
            fancy engineering degree from a fancy program in Canada, but it felt like far fewer
            people recognized it (had heard of it) abroad. On the one hand, it can feel
            tiring/frustrating to have to 'prove myself' all over again, on the other hand
            I found this a good reminder for what I actually care about/am good at right
            now. Eg. I'm not just a good engineer because I have a fancy degree, I'm a good
            engineer because I paid attention/worked hard/carried forward the lessons I
            learned during that fancy degree into everything I do now. It's much better to
            believe (know) the latter is true than the former.
          </p>
        </Collapsible>

        <Collapsible summary="Getting to know people from all over the world">
          <p className="m-0">
            Prior to moving, I had a pretty well-established group of friends (and family,
            of course) in Canada. Because of how long I'd lived there, 'my people' often
            grew up under very similar circumstances/shared many of the same life
            experiences and/or interests as me. Moving abroad strips most of this away
            (again, for better or for worse) -- you <em>have</em> to constantly put yourself
            out there to make new friends, and this means getting to know all sorts of
            people with all sorts of interests from all sorts of countries. My book
            club (more on that later), for example, has ~12 consistent people, spanning 40
            years in age and from 8 different countries. I've learned so much about the
            world through the people I've met -- and it's always a good reminder that your
            own experiences/culture/environment are only a tiny tiny piece of an much,
            much, much bigger picture. This, in turn, makes you a more well-rounded,
            humble, and curious person.
          </p>
        </Collapsible>
      </div>
    </Card>
  );
}

function WhatsToughCard() {
  return (
    <Card title="What’s Tough 🙁" className="md:col-span-4">
      <div className="flex flex-col gap-3">
        <Collapsible summary="Feeling old friendships fade">
          <p className="m-0">
            There is definitely excitement around new friendships you are building in your new place, but they’re not as
            deep (just yet). In my first few months in Germany, I felt like I kept having
            the same superficial conversations over and over and over. Like all of my
            social interactions had been reduced to: “Hello”, “I’m Joanna”, “I’m from
            Canada, where are you from?”, “what do you do for work?” etc etc. Then after
            that meetup / hike / language cafe was done, I would not see that person again
            90% of the time. It felt like I was putting myself out there so often, but
            having so little real connection to other people. 
          </p>
          <p className="mt-3">
            I missed my friends, how
            close we used to be, and how comfortable we were around each other. It's hard to
            watch those dynamics between shift as we each move on with our respective
            lives, even though we know we are both on paths that are very good for us —
            daily conversations slowly turn to sporadic catch up calls, which are lovely
            but miss so much of the crux of what the friendship used to be.
          </p>
        </Collapsible>

        <Collapsible summary="Missing family">
          <p className="m-0">
            And wondering why I would go so far away when you can lose people in an instant
            and it feels like we should spend as much time together as possible. I care a
            lot about family - I was always close with my parents and brother growing up,
            so it feels weird to move away from them and I often question whether I will
            regret doing so later. Conversely, I know that my visits home are 100x as
            special than ever before, and that I’ll never ever take my family or friends for
            granted. For example, I wonder if I would talk to my mum so often if I were
            still in Toronto, or whether I would ‘put it off till later’ knowing that she’s
            only a subway ride away.
          </p>
        </Collapsible>

        <Collapsible summary="Having grown up differently than those around me">
          <p className="m-0">
            When I'm in Toronto, it's more likely that the people I'm around/talking to share
            a similar set of experiences from their upbringing. Even if you didn't grow up
            together, you have a base level of understanding with each other from having
            been raised under similar circumstances. Moving abroad, there are far fewer
            shared experiences to draw from -- even the pandemic is not necessarily common
            ground since every country handled (and therefore experienced) it quite
            differently. Because of this, it sometimes feels like I have to give more
            context, and can be frustrating when someone doesn't understand why I feel a
            certain way (eg. if that feeling comes from something I experienced before
            moving, which they would be unfamiliar with).
          </p>
          <p className="mt-3">
            That said, I often find myself
            highlighting many of my Canadian memories/stories with a lot of pride -- sharing
            them with people who haven't heard of them before makes me (a) realize how lucky
            I was to grow up how I did, and (b) feel very patriotic about my country! And
            beyond that, it forces me to connect with people over different parts of my
            personality than I would normally turn to in Canada, which inherently helps me
            develop new/more parts of myself :)
          </p>
        </Collapsible>

        <Collapsible summary="The language barrier">
          <p className="m-0">																																																
            I did the somewhat naïve thing of moving to a place where I spoke next to none 
            of the local language. For anyone thinking of doing the same, I would really 
            (really) recommend learning the basics first (eg. getting at least to A2 level) 
            because:
            <ol type="a" className="list-[lower-alpha] pl-6">
              <li>It will help you adjust to the new environment much more quickly,</li>
              <li>You will learn more of the language faster when you arrive (immersion is hugely 
                helpful for learning a language, but works much better when you have some basic 
                vocabulary to go off of), and</li>
              <li>It just seems like the more responsible/respectful (?) thing to do (more on that below).</li>
            </ol>
          </p>
          <p className="mt-3">
            Of course I have picked up a good amount of German basics since moving (the goal 
            is to get to B1 this year!) but that took time, and I still have so much 
            to learn before I can have proper conversations (ie. beyond ordering food, 
            introducing myself, giving/asking for directions, etc).
          </p>
          <p className="mt-3">
            I often feel badly that people need to switch to English to communicate with me.
            I know it takes extra effort for them to switch to my language, and I also know
            it limits how much we are able to connect with one another. This sounds small,
            but it's surprising how much this guilt builds up and affects other parts of
            life (everything just feels a bit harder). From the relatively small (in the 
            early days, I was always nervous about doing laundry for fear of not understanding the
            instructions on the machine, I have omitted ingredients from recipes because I
            was too scared to ask grocery store staff for help -- etc, etc, the list goes
            on) to more important (my bank didn't have any customer service in English -- I
            had a problem with my account and ultimately had to summon a trusted friend as
            a translator). 
          </p>
          <p className="mt-3">
            Beyond that, it took some time to adjust to not being able to
            understand much of what was being said around me — this is sometimes a bit
            isolating, but it can also be a bit fun to imagine what people might be talking
            about, or to try to understand bits of what they’re saying (I have learned a 
            lot this way, and with some context can follow pretty well now!). Another plus is 
            that I can never get bored while walking home, since I always have street signs 
            to look at and quiz myself on which ones I understand :D
          </p>
        </Collapsible>

        <Collapsible summary="Just generally feeling more alone in the new place">
          <p className="m-0">
            To be clear, this is not always a bad thing. I like having alone time where I
            can ponder new things while exploring new places and activities, and it can be
            nice to have a fresh start. 
          </p>
          <p className="mt-3">
            That said, it's destabilizing to be away from the
            people who know well and shared parts of your past. You are who you are partly
            because of your own internal compass but also because of the people around you —
            but in a new country, the people around you don’t know the version of you that
            existed before you came here, or the experiences that led to it. They’re
            missing big chunks of the puzzle, and sometimes that can mean a nice clean slate,
            but sometimes it can make you miss the comforts of people around you who{" "}
            <em className="italic">know</em> you and get you without you having to explain yourself. The people
            who you know you can trust and say vulnerable things to. So I miss being around
            people who shared those big, formative experiences.
          </p>
        </Collapsible>
      </div>
    </Card>
  );
}

function SomePicturesCard({
  hoveredPictures,
  setHoveredPictures,
}: {
  hoveredPictures: string;
  setHoveredPictures: (tabId: string) => void;
}) {
  const pictureTabs = [
    {
      id: "pictures",
      label: "Pictures",
      content: (position: string) => (
        <>
          {movingToGermanyPhotos.map((photo) => (
            <div
              key={`${photo.id}-${position}`}
              className="shrink-0 w-[220px] md:w-[280px] h-[220px] md:h-[280px]"
            >
              <PictureCard
                src={photo.src}
                alt={photo.alt}
                hoverLabel={photo.alt}
                isHighlighted={hoveredPictures === "pictures"}
              />
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <Card title="Some Pictures" className="md:col-span-8">
      <TabScroll
        tabs={pictureTabs}
        onTabHover={setHoveredPictures}
        showDescription={false}
        showTabs={false}
        backgroundVariant="transparent"
        contentClassName="px-0 py-2"
        tabsBarClassName="mb-3 pr-0"
      />
    </Card>
  );
}

function ThingsThatHelpedMeAdjustCard() {
  return (
    <Card title="Things That Helped Me Adjust 🫡" className="md:col-span-4">
      <div className="flex flex-col gap-3">
        <Collapsible summary="BINJO">
          <p className="my-2">
            I started putting a{" "}
            <Link to="/binjo-archive/2025#archive-content" className="underline">
              BINJO card
            </Link>{" "} on my website, with a (somewhat
            random/disjointed) set of goals for the year. Every time I made progress towards
            one of them, I update the card -- and when I get all five goals in a
            row/column/diagonal (yes, you guessed it -- BINJO!), I treat myself to a prize
            :). This activity turned out to be incredibly valuable for a couple of reasons:
          </p>
          <ol className="mt-3 list-decimal pl-5 space-y-3">
            <li>
              <p className="m-0">
                <strong>Motivation:</strong> Many of the goals I set out involved pushing
                myself to do things that were slightly out of my comfort zone -- having them
                in the BINJO gave me the extra bit of motivation I needed to actually do them.
                This includes both individual activities (eg. reading X number of books,
                running X kms, etc), and group ones (eg. hosting X number of events, sending X
                postcards);
              </p>
            </li>
            <li>
              <p className="m-0">
                <strong>Exploring:</strong> the items often helped me explore my new country --
                I took two day trips per month in 2025, a friend took me clubbing for my first
                time (it is big over here! haha), partook in a triathlon organized by a colleague,
                swim (regularly, now) in the Munich olympic pool, tried a dance class, and so
                on. I imagine I would have done some of them without the BINJO, but I would
                likely not have gone out of my way to make them happen, and yet I was so so
                glad to have done each one;
              </p>
            </li>
            <li>
              <p className="m-0">
                <strong>Rebuilding routines:</strong> When you move, many of your
                routines/regular structures and places you rely on are no longer there (this 
                was also true for me generally post-university). You
                have to readjust -- find your new favourite spots (grocery stores, running routes,
                cafes, parks, etc) and things to do. The BINJO gave me a semi-structured way
                to 'throw things at the wall and see what sticks';
              </p>
            </li>
            <li>
              <p className="m-0">
                <strong>Conversation starter:</strong> It's a great conversation starter! I
                often talk to my friends and colleagues about my progress and upcoming items.
                Often, people will offer tips and/or words of encouragement for completing
                them, and sometimes are interested in doing them with me :). I recently
                published the 2026 edition{" "}
                <a
                  href="https://www.j-roy.com/binjo"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  here
                </a>{" "}
                -- prior to posting it, I was surprised at how many friends were asking me
                about it/when it would come out/what items would be included (everyone was
                excited for the launch day!) -- it felt like it had become something (albeit
                relatively small) that people could come together around. Many have also asked
                me for the template I used, so I posted it as an npm component{" "}
                <a
                  href="https://www.npmjs.com/package/react-binjo"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  here
                </a>
                .
              </p>
            </li>
          </ol>
        </Collapsible>
        <Collapsible summary="Finding somewhere to volunteer">
          <p className="my-2">																																																
            Taking part in extracurriculars was a big part of my undergrad experience -- they helped me 
            feel part of something bigger than myself, built up my leadership skills, introduced me to 
            many of my closest friends, and were always something I could look forward/escape to when
            other parts of life weren't going so well. Because of this, I wanted to continue
            with 'extracurriculars' (in some form) after uni -- and volunteering was a nice way to do so. 
            Of course, the main purpose of volunteering is to help others, but it can be pretty beneficial 
            for you too :) 
          </p>
          <p className="my-2">
            I found the <Link to="https://www.redi-school.org/" className="underline">ReDI School of 
            Digital Integration</Link>, a non-profit tech school teaching computer skills to 
            (mainly female-identifying) newcomers to Germany, about a month before moving to Munich. I did a short interview 
            with them online (while in Toronto), then started teaching the fall semester of their 
            coding course ~2 weeks after arriving in Germany. Starting so soon after moving was 
            immensely helpful for me because it:
            <ol className="mt-3 list-[lower-alpha] pl-5 space-y-3">
              <li>introduced me to people, </li>
              <li>gave me something to do on weekends, </li>
              <li>allowed me to help other people (when you first move, it feels like you are 
                constantly <i>asking</i> people for help with everything -- so doing the 
                opposite becomes especially important)</li>
              <li>since ReDI is specifically tailored towards newcomers to Germany, I have gotten to know some pretty 
            amazing people who have needed to overcome much bigger hurdles than I have since moving. I'd like to 
            think I've taught some useful coding skills, but I'm also consistently inspired by 
            the students and everything they're able to do/learn in such a short time despite these 
            sometimes challenging circumstances.</li>
            </ol>
          </p>
          <p className="my-2">
            I still teach regularly with ReDI's Intro to Coding and Digital Design course, and have 
            met some really great people (both other volunteers + students) -- it's a great program
            for students and volunteers alike. Getting involved with something like this helped me 
            meet more people/feel a bigger sense of purpose after moving, so I'd 100% recommend 
            doing something similar if you can.
          </p>
        </Collapsible>
        <Collapsible summary="Starting a group (in my case: a book club :)">
          <p className="my-2">
            I'd wanted to join a book club for some time prior to moving, but didn't have
            time because of school and other commitments (I also just didn't know
            of many happening amongst people I knew). When I moved to Munich, I tried to join
            some existing book clubs through an app called Meetup, but found they were often
            already 'full' (ie. had a recurring group of people who consistently went, so
            the events didn't have open/extra places).
          </p>
          <p className="my-2">
            So I decided to start one myself. I created a group on Meetup called 'Munich
            Book Club' and, within a week or so, had over 150 users join. This is of course
            way too many people to have in a book club, so each event was limited to ~10-12
            attendees. We met at a cafe downtown, and ended up getting a pretty regular
            crowd of returning members.
          </p>
          <p className="my-2">
            My favourite part about this book club is how it exposes me to people who I
            probably never would have spent time with otherwise. We all come from very
            different backgrounds and have relatively different (including literary)
            interests. There are people from all over the world -- we initially connected
            over whichever book we read each month, but have also had many good conversations
            about topics completely unrelated to books.
          </p>
          <p className="my-2">
            I was nervous about bringing so many people together when I didn't know them and
            had no way to guarantee that we would get along/enjoy our time together, but it
            worked out surprisingly well (plus, I loved reading their book suggestions!).
            Now, we have a relatively active group chat and a monthly meeting that I
            consistently look forward to and enjoy :).
          </p>
          <p className="my-2">																								
            Of course, it doesn't need to be a book club. Another international friend of
            mine started a badminton club, or you could start a hiking club/running/crafts
            club/etc etc etc. It doesn't really matter what the group is doing, as long as
            it's something that interests you. If you can find a platform to share
            it, there will likely be more people interested than you expect -- and you will
            automatically have common ground to discuss with them :)
          </p>
        </Collapsible>
        <Collapsible summary="Connecting with other people who moved abroad">
          <p className="my-2">
            This tip is probably more common/traditional than the ones above, but it has
            really helped me so I wanted to highlight it anyways. When you move abroad, you
            will automatically feel more connected to anyone else who has (or who is
            currently) moving abroad.
          </p>
          <p className="my-2">
            In the months before I left Canada, I told pretty much everyone that I'd be
            moving to Munich -- this led to many "oh! I have a cousin/friend/uncle/etc who
            lives in Germany. I can introduce you!" And so they did, and I have made a
            couple of pretty good friends that way.
          </p>
          <p className="my-2">																								
            It doesn't only need to be people living in your country/city (having friends
            living in different countries means you can go visit them and vice versa!) --
            Many of the ups and downs I discussed above are common/location-agnostic
            experiences, and talking to others who have navigated them previously can be
            immensely helpful, both (a) to figure out how to navigate them yourself, and
            (b) to feel less alone/crazy for finding them challenging. This is, of course,
            exactly what I'm trying to do with this article :).
          </p>
        </Collapsible>
        <Collapsible summary="Inviting friends and family to visit">
          <p className="my-2">
            When people come to visit you in your new location, you will start to see how much
            progress you've made. Their confusion with transit, directions, language,
            culture/customs, etc will likely all remind you of yourself when you first
            arrived -- but you will no longer be confused: instead, you'll be able to
            explain things and show them around :)
          </p>
          <p className="my-2">		
            It's easy to miss that kind of progress
            because it happens slowly and you're not always aware of it, but seeing it
            in other people is a good reminder of how far you've come.
          </p>
          <p className="my-2">
            Beyond this, even if there are barriers to visiting your home country, being
            around other people who know it well/lived there too can make you feel much
            closer to home. It's always nice to have a familiar face/someone who knows the
            'old' you.
          </p>
        </Collapsible>
        <Collapsible summary="Choosing your job (or program) wisely">
          <p className="my-2">
            You spend a lot of time at work, so of course it also influences your experience
            abroad -- When I moved, I got incredibly lucky with the job I found myself in.
            I immediately clicked with the team, and consider them to be some of my closest
            friends in Germany -- it's been a chance to work with nice, smart, driven people
            who not only let me be my silly self, but who I have learned a ton from in my
            time here so far. They were extremely welcoming and supportive, both with the
            'living in a new country' side of things (getting a visa, learning german,
            finding a place to live, introducing me to friends/people with similar
            interests), as well as the professional/software engineering side of things.
          </p>
          <p className="my-2">
            All of this went a really long way to make a new country feel more like 'home'.
            Of course, I realize that 'clicking' with a team at work often comes down to
            luck -- it's hard to predict how well you'll fit in anywhere -- but I think
            it's definitely worth a second thought if an interview for a job abroad felt
            off/not right somehow. I imagine that having trouble at work would have made
            life abroad much tougher to navigate.
          </p>
        </Collapsible>
      </div>
    </Card>
  );
}

function WhatILikeAboutGermanyCard() {
  return (
    <Card title="What I Like About Germany 🙂" className="md:col-span-4">
      <div className="flex flex-col gap-3">
        <Collapsible summary="Germans have a reputation for being a bit cold and direct — and while I sometimes notice this, I also appreciate how this makes the nice conversations more genuine">
          <p className="m-0">
            Coming from Canada, which is notoriously polite and apologetic (sorry) --
            this was an especially jarring shift, but one I have come to appreciate over
            time. If someone tells you something, you know they mean it and aren’t just
            saying it from a place of politeness or performative courtesy. If someone offers
            help, or says they’d love to grab coffee sometime, you can bet they’ll actually
            reach out to arrange it. Someone once said to me that “Germans can be like
            coconuts” (in the NICEST way) — people can seem reserved/blunt/direct at first,
            and this can be hard to swallow or take you aback (the hard shell of the
            coconut); but once you get to know them, people are friendly and the honesty
            seems to lead to deeper, more meaningful connections in the long run (the soft
            inside of the coconut). Eg. I have many german friends who are still close with
            people they met in kindergarten; and many others who have gone well out of their
            way to help me navigate various parts of being in a new country.
          </p>
        </Collapsible>

        <Collapsible summary="Nice little interactions">
          <p className="m-0">
            Moving abroad means you'll inevitably spend more time alone and/or feeling like
            an outsider. This makes once-small interactions/connections with people feel
            more special. For example: People saying hi and bye as they enter and exit the
            waiting room at my Dr’s office, whereas in Toronto it's always dead quiet; or
            the grandma who heard my music through my headphones at the gym, and started
            smiling at me and dancing to it in the changing room; someone helping me learn
            a new word or phrase in German; conversations with people in my book
            club/running groups/etc; the list goes on.
          </p>
        </Collapsible>

        <Collapsible summary="Slowly watching this new place start to feel like home">
          <p className="m-0">
            I don’t know if Munich fully feels like ‘my home’ yet, but every once in a while
            I have moments where I am very glad to get to live here. Walking home or running
            through Olypark while the sun is setting or rising (its so beautiful!), taking a
            weekend trip to the Alps, seeing all the people in the park or at cafes on a
            nice sunny day. These are the really, really lovely parts of being here that I
            hope not to take for granted. Beyond that, sometimes when I go on a trip, I
            notice myself longing to be back in Munich — for my routines and friends. It
            can be scary to feel like <em>neither</em> Toronto nor Munich is home, but it is
            also cool to think they <em>both</em> sort of are.
          </p>
        </Collapsible>
      </div>
    </Card>
  );
}

function ClosingCard() {
  return (
    <Card title="Closing" className="md:col-span-8">
      <p className="my-2">																								
        Moving abroad has been a challenging but equally rewarding experience: I have 
        responsibilities now that I did not have before, and I have overcome things
        that I wasn’t sure I’d be able to on my own. I sometimes think about how proud
        little Jo would be of me. I used to get soo homesick, feeling like summer camp away from my
        parents was terrifying haha — but now here I am on a different continent 'alone', and
        figuring myself out just fine. 
      </p>
      <p className="my-2">
        So: if I haven't made it clear enough, I'm very very grateful to have had this 
        opportunity abroad and highly recommend it to anyone who has the chance. While 
        it can be a bit isolating at times, going out of your way to do things that will 
        help you connect with people is so worthwhile, and will help you grow in more 
        ways you can imagine. Even if you don't do a BINJO, you can (and should) try 
        new things -- the best part of being in a new country is that people are
        unlikely to recognize you if you totally embarass yourself in the process :D
      </p>
      <p className="my-2">												
        I hope that 
        these tips and lessons have been useful, but of course, if I missed something or if you're considering going 
        abroad and want someone to talk to, you can always reach out :)
      </p>
    </Card>
  );
}

export default function TipsForMoving() {
  const [hoveredPictures, setHoveredPictures] = useState<string>("pictures");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/blog");
  };

  return (
    <PageGrid columns={1}>
      <div className="relative overflow-hidden p-4 md:p-8 mx-auto w-full h-full font-body text-sm sm:text-base">
        <ScribbleBackground
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
          strokeWidth={54}
          strokeColours={["#000000", "#DD0000", "#FFCE00"]}
          opacity={0.6}
        />
        <div className="relative z-10 p-5 md:p-8">
          <BackToBlogButton onClick={handleBackClick} />
          <TipsForMovingTitle />
          <IntroAndMapSection />

          <div className="grid grid-cols-1 md:grid-cols-8 gap-5 md:gap-6">
            <HowIGotHereCard />
            <WhatYouLearnCard />
            <WhatILikeAboutGermanyCard />
            <SomePicturesCard hoveredPictures={hoveredPictures} setHoveredPictures={setHoveredPictures} />
            <WhatsToughCard />
            <ThingsThatHelpedMeAdjustCard />
            <ClosingCard />
          </div>
        </div>
        </div>
    </PageGrid>
  );
}
