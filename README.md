# Your Speaking Space
SpeakUp — Premium Communication Practice MVP

## Supabase setup

Copy `.env.example` to `.env` and replace the placeholder values with the Supabase project URL, publishable key, and meeting URL. Keep `VITE_USE_MOCK_API=false` to write sessions and feedback to Supabase. Set it to `true` only when you intentionally want the browser-only mock flow.

Apply the SQL migration in `supabase/migrations/20260905000000_create_speakup_phase1.sql` to the same Supabase project before starting the app.

Frontend Build Specification — Human Psychology + Premium Product Experience

ROLE

You are building the frontend for SpeakUp, a premium communication-practice startup.

SpeakUp helps students, working professionals, and anyone who understands English but doesn't feel comfortable speaking it improve through short, comfortable, judgment-free conversations with another person.

The core idea:

You don't need another English course.
You need someone to talk to.

This is a Phase 1 validation MVP, but it must not look or feel like an MVP.

The product should feel like a polished startup that could be publicly launched tomorrow.

Think:

Premium SaaS

Calm technology

Human-centered design

Exceptional typography

Editorial-quality spacing

Subtle motion

Emotional warmth

High perceived trust

Extremely low friction

The goal is not to build more features.

The goal is to make the small number of features feel exceptionally good.

IMPORTANT PRODUCT PHILOSOPHY

SpeakUp is fundamentally different from:

English-learning apps

AI tutors

Interview-preparation products

Social networks

Video conferencing products

Online courses

Do not design it like any of these.

SpeakUp should feel like:

"A safe little moment where I can just talk."

The emotional progression should be:

Curiosity → Safety → Ease → Connection → Confidence → Small accomplishment

The user should never feel:

judged

tested

evaluated

academically assessed

overwhelmed

sold to

manipulated

pressured

HUMAN PSYCHOLOGY PRINCIPLES

Design the entire experience around these principles.

1. Reduce perceived effort

The experience should look easier than the user expects.

When someone lands on SpeakUp, their brain should immediately understand:

What is this?
A short conversation.

Why should I care?
I want to become more comfortable speaking.

What do I need to do?
Just click Practice Now.

How long will it take?
10 minutes.

This clarity is critical because perceived interaction cost affects whether users believe a product is worth their time.

2. Make the first action psychologically easy

"Practice Now" should feel like an invitation, not a commitment.

Avoid language such as:

Start learning

Begin your course

Take an assessment

Improve your score

Start your training

Prefer:

Practice Now

The CTA should communicate:

"You can just try it."

No account.

No signup.

No payment.

No complicated onboarding.

No questionnaire.

No commitment.

3. Create psychological safety

Many users will arrive with a hidden fear:

"What if I sound bad?"

The design should quietly answer:

"That's okay here."

Use microcopy throughout the product that reinforces safety without becoming cheesy.

Examples:

Landing:

"10 minutes. One conversation. No judgment."

Name entry:

"That's all we need to get started."

Searching:

"Finding someone who's ready to talk."

Session ready:

"You don't need to prepare anything."

Conversation:

"There's no right answer. Just keep the conversation going."

Completion:

"Nice work. You showed up and spoke."

Avoid childish motivational language.

Keep reassurance sophisticated and human.

4. Use curiosity instead of pressure

The website should make people want to explore.

Do NOT use:

countdowns on the landing page

fake urgency

"limited spots"

aggressive sales language

popups

discount banners

excessive CTA repetition

fake social proof

exaggerated claims

Instead use:

intriguing copy

visual storytelling

motion

conversational language

small moments of delight

The user should think:

"This looks interesting. Let me try it."

5. Build momentum

Once the user clicks Practice Now, remove distractions.

The flow should feel almost inevitable:

Landing
↓
Name
↓
Preparing
↓
Searching
↓
Ready
↓
Conversation

Each screen should have one primary action.

Never make the user wonder:

"What am I supposed to do now?"

6. Design for the "nervous first-time user"

Assume the first-time user may be:

a college student

someone preparing for their first job

a working professional

someone who understands English but hesitates while speaking

someone who has tried English courses before

someone embarrassed by making mistakes

The interface should therefore feel:

calm > exciting

human > technical

inviting > demanding

confident > flashy

VISUAL DIRECTION

The product must feel significantly more premium than a typical MVP.

Do not interpret "minimal" as "empty".

Minimal means:

Every element earns its place.

Use:

generous whitespace

strong typography

sophisticated spacing

precise alignment

subtle borders

restrained color

layered depth

elegant micro-interactions

carefully controlled motion

Avoid:

generic SaaS gradients

giant purple blobs

excessive glassmorphism

neon colors

excessive cards

cartoon illustrations

stock photography

excessive rounded rectangles

heavy drop shadows

excessive icons

dashboard layouts

template-looking sections

PREMIUM BRAND CHARACTER

SpeakUp should feel like a combination of:

calm confidence + human warmth + modern technology

Not:

AI startup + education platform + productivity dashboard

The interface should feel mature enough for a professional in their 30s while remaining approachable to a college student.

COLOR SYSTEM

Use a refined warm-neutral foundation rather than a cold white SaaS aesthetic.

Primary background

Use a warm near-white:

#F8F7F4

or a very close equivalent.

The goal is:

paper / studio / premium editorial

rather than:

generic SaaS white

Primary text

Deep charcoal:

#18181B

Avoid pure black.

Secondary text

Muted warm gray:

#68686F

Primary accent

Use a sophisticated indigo-violet / blue-violet.

Suggested base:

#5B5BD6

Supporting darker tone:

#4747B8

Use the accent selectively.

It should communicate:

confidence

intelligence

modernity

calm

trust

Do NOT make the entire interface purple.

Soft accent surface

Use an extremely subtle indigo-tinted background for selected states:

#F0F0FF

Success

Use a muted natural green:

#4F8A68

Not bright "success green".

Borders

Use extremely subtle warm gray borders.

Avoid visible heavy card outlines.

COLOR PSYCHOLOGY RULE

Color should guide attention rather than decorate the interface.

There should be an obvious visual hierarchy:

Primary CTA → key content → secondary actions → supporting information

The user's eye should naturally land on the intended next action.

TYPOGRAPHY

Use:

Inter or Geist

Prefer Geist if available.

Typography is one of the primary premium-design tools.

Use:

large confident hero typography

tight but comfortable headings

generous line height for body text

restrained font weights

precise letter spacing

Do not make everything bold.

HERO TYPOGRAPHY

Desktop hero:

Large:

clamp(3.5rem, 6vw, 6.5rem)

But prioritize visual balance rather than blindly following the number.

The headline should feel:

confident, editorial and memorable

Not like a marketing-template H1.

Use intentional line breaks:

You don't need another
English course.

You need someone to talk to.

The final line can use the accent color subtly.

Do not make the entire headline colorful.

BRAND MARK

Create a refined SpeakUp wordmark.

Keep it simple.

Potential treatment:

SpeakUp

with subtle typographic personality.

Optional small conversational mark / speech-line motif.

Do not create a generic chat bubble logo.

The brand should feel like a modern communication company rather than a messaging app.

LANDING PAGE EXPERIENCE

The landing page should be treated as an emotional introduction rather than a list of features.

HEADER

Minimal.

Left:

SpeakUp

Center/right:

How it works

Primary:

Practice Now

Header should remain visually light.

No:

login

signup

pricing

products dropdown

unnecessary navigation

The absence of clutter should itself communicate confidence.

HERO

Hero copy:

Eyebrow

10 minutes. One real conversation.

Headline

You don't need another English course.
You need someone to talk to.

Supporting text

Practice speaking in a comfortable, judgment-free conversation. No preparation. No tests. Just talk.

Primary CTA

Practice Now

Secondary CTA

See how it works

CTA PSYCHOLOGY

Primary CTA should be visually dominant.

Use a sophisticated indigo button.

Button characteristics:

medium-large

comfortable horizontal padding

slightly rounded, not pill-shaped

subtle shadow/depth

excellent hover state

tiny upward movement on hover

subtle scale on press

Hover:

translateY(-1px)

Press:

scale(0.98)

Add a subtle arrow/icon movement.

The interaction should feel tactile.

HERO VISUAL

Do not use stock images.

Do not use generic illustrations.

Create a custom visual representation of two people having a conversation.

Concept:

Two abstract human presence indicators.

For example:

Participant A
●

connected through a subtle flowing conversational line

to:

Participant B
●

The visual should communicate:

"Two humans. One conversation."

Use extremely subtle animation.

Possible animation:

line slowly pulses

small conversational particles travel between participants

participant circles gently breathe

connection becomes slightly brighter on hover

Motion should be slow and organic.

Never flashy.

IMPORTANT VISUAL PRINCIPLE

The hero visual should not look like a technical networking diagram.

It should feel human.

Think:

conversation energy

rather than:

data connection

MICRO-SOCIAL-PROOF WITHOUT FAKE CLAIMS

Do NOT invent numbers.

Do NOT use fake testimonials.

Instead use qualitative reassurance:

10 minutes

1 conversation

0 preparation

This communicates simplicity without making unsupported claims.

PROBLEM SECTION

Headline:

Knowing English isn't the same as speaking comfortably.

Then introduce three recognizable moments.

Instead of generic cards, make them feel like real thoughts.

Example:

"I know what I want to say...
I just can't find the words."

"I understand everything.
But when it's my turn to speak, I freeze."

"I wish I had someone
I could practice with."

Display these as elegant editorial statements.

Use subtle staggered reveal.

Do not create a card grid.

EMOTIONAL TRANSITION

After the problem section, shift the visual mood slightly brighter.

Introduce:

What if practice felt this simple?

Then:

Just show up and talk.

This creates a psychological transition from:

problem → possibility

HOW IT WORKS

Use a horizontal or flowing visual sequence.

01

Click Practice Now

02

Meet someone who's ready to talk

03

Use a prompt whenever you need one

04

Talk for 10 minutes

Avoid four generic cards.

Use typography, numbers and connecting lines.

The sequence should visually communicate:

forward momentum

INTERACTIVE HOW-IT-WORKS

When the user hovers over each step:

number becomes highlighted

connecting line animates

supporting text appears

relevant micro-visual changes

Keep motion subtle.

DEMO SECTION

This is one of the most important sections.

The user should visually understand the actual product before clicking Practice Now.

Headline:

It feels less like practice.
More like a conversation.

Create a premium mock conversation interface.

Show:

Two participants.

A subtle meeting area.

Conversation helper.

Timer.

Prompt.

Example:

09:42

Tell me about something you're currently working on.

Then:

Another idea

Then:

Tell me more about that.

The mockup should feel like a real product screen.

Do not make it look like a fake Dribbble dashboard.

DEMO ANIMATION

Create a subtle looping state sequence:

Searching

↓

connection line appears

↓

Someone's ready

↓

session UI appears

↓

Let's talk.

The animation should take approximately 6–10 seconds.

Use spring physics and opacity/position transitions.

Allow the animation to pause/reduce under reduced-motion preferences.

CTA SECTION

Do not simply repeat the hero.

Make the final CTA emotionally quieter.

Headline:

Ready to just start talking?

Supporting:

No preparation. No judgment. Just 10 minutes of conversation.

CTA:

Practice Now

Optional microcopy underneath:

Free to try · No account required

Only use this if it is actually true in the implementation.

LANDING PAGE SCROLL EXPERIENCE

Use scroll-based reveals sparingly.

Preferred:

opacity

20–30px translate

slight scale

stagger

Avoid:

dramatic parallax

spinning objects

text flying around

excessive scroll animations

The website should feel expensive because it is restrained.

PRACTICE FLOW

Once the user clicks Practice Now:

The visual environment should become quieter.

Remove marketing navigation.

Keep only:

SpeakUp

and optionally:

← Back

The user should feel:

"I'm already inside the experience."

NAME ENTRY

Headline:

Let's get you ready.

Supporting:

What should we call you?

Input:

Your name

Small reassurance:

That's all we need to get started.

CTA:

Continue

Use one single input.

Do not ask:

email

age

gender

location

experience

English level

goals

password

Reducing unnecessary fields reduces perceived effort and friction.

NAME ENTRY INTERACTION

When the input receives focus:

border transitions smoothly

subtle accent glow

label moves/changes state

CTA becomes active

When the user submits:

button compresses

page transitions

input content remains visually preserved during transition

Do not create artificial loading delays.

PREPARING STATE

Headline:

Getting things ready.

Supporting:

You won't need to prepare anything.

Visual:

Subtle animated conversational connection.

No spinner.

No progress bar unless technically meaningful.

Possible animation:

● ●

then:

● — · — ●

then:

● ───── ●

The connection gradually becomes stable.

This visually communicates preparation without making the user feel like they're waiting on a broken system.

SEARCHING STATE

Headline:

Finding your conversation...

Supporting:

Looking for someone who's ready to talk.

Use:

pulsing participant indicators

soft connecting lines

subtle ambient movement

Avoid:

"Loading..."

Avoid:

generic circular loaders.

The state should feel alive.

SESSION READY

When a session is found:

Do not immediately throw the CTA onto the screen.

Use a short reveal sequence:

Connection stabilizes.

Small success indicator appears.

Heading fades in.

Supporting text appears.

CTA arrives.

Headline:

Your conversation is ready.

Supporting:

You don't need to prepare anything. Just join and start talking.

CTA:

Join Session

Optional microcopy:

10 minutes · One conversation

JOIN SESSION

The frontend must NOT implement WebRTC.

Backend provides:

meeting_url

The frontend should open/join the supplied URL.

Never hardcode production meeting URLs.

Development mode may use:

VITE_MOCK_MEETING_URL

CONVERSATION EXPERIENCE

This is the most important product interface.

It should feel closer to:

a calm private room

than:

a dashboard

DESKTOP LAYOUT

Top:

SpeakUp

10-minute practice

Main:

Meeting experience.

Right:

Conversation helper.

Avoid excessive borders.

Use whitespace to create separation.

SESSION HEADER

Display:

SpeakUp

10-minute practice

Timer:

09:58

Timer should never dominate the experience.

TIMER PSYCHOLOGY

The timer exists to communicate:

"This won't take long."

It should NOT communicate:

"You're running out of time."

Therefore:

Normal:

09:58

At 2 minutes:

still calm.

At 30 seconds:

slightly emphasized.

Never turn aggressively red.

No alarm animation.

No stressful sound.

At zero:

smooth completion transition.

CONVERSATION HELPER

Headline:

Not sure what to say?

Then show ONE prompt.

Example:

Tell me about something you're currently working on.

Secondary:

Tell me more about that.

Button:

Another idea

Only one main idea at a time.

Never overwhelm the user with a prompt library.

PROMPT TRANSITION

When changing prompts:

Current prompt:

fade + slight upward movement

New prompt:

fade + slight upward movement

Use spring/ease-out.

No dramatic animations.

HUMAN COPY

Prompts should sound like something a person would actually ask.

Initial prompts:

How has your day been?

Tell me about yourself.

What do you currently do?

Tell me something interesting about where you live.

What are you currently learning?

What do you enjoy doing outside work?

What is something you've been excited about recently?

Tell me about a project you're working on.

Follow-ups:

Why?

Tell me more about that.

How did you get interested in it?

What happened next?

What do you like most about it?

Avoid robotic phrasing.

MOBILE CONVERSATION EXPERIENCE

On mobile:

The conversation helper becomes a bottom sheet.

Default:

Collapsed.

Show:

Not sure what to say?

Tapping opens:

Prompt

Follow-up

Another idea

The sheet should have:

smooth spring animation

clear drag/tap affordance

sufficient touch targets

no obstruction of the meeting experience

SESSION COMPLETION

When timer reaches zero:

Do not abruptly replace the interface.

Use a calm transition.

Fade meeting interface.

Bring forward:

Nice work.
You showed up and spoke.

Supporting:

Every conversation makes the next one a little easier.

CTA:

Give feedback

The emotional goal is:

small accomplishment

not:

performance result

IMPORTANT

Never show:

score

percentage

grade

pronunciation rating

English level

performance ranking

"mistakes"

AI analysis

This is not an assessment.

FEEDBACK EXPERIENCE

Headline:

How was your conversation?

Use a beautiful 5-star interaction.

Stars should have:

hover states

keyboard support

selected state

subtle spring animation

Do not make it childish.

COMFORT QUESTION

Did you feel comfortable speaking?

Options:

Very comfortable

Comfortable

Neutral

A little uncomfortable

Uncomfortable

Use segmented options / refined selection controls.

Do not use giant cards.

REPEAT QUESTION

Would you do another session?

Options:

Yes

Maybe

No

Keep the interaction lightweight.

OPTIONAL COMMENT

Label:

Anything you'd change for next time?

Placeholder:

Tell us anything that would make the next conversation better...

Make it clearly optional.

Do not pressure the user to write.

SEND FEEDBACK

CTA:

Send feedback

Button should feel like completing a conversation, not submitting a survey.

THANK YOU

Use a visually calm final screen.

Headline:

Thanks for practicing with us.

Supporting:

Your feedback helps us make every conversation better.

CTA:

Back to SpeakUp

Optional subtle visual:

Two conversational dots reconnecting.

This creates a visual bookend to the landing-page hero.

DESIGN SYSTEM

Create reusable components:

Button

Logo

ConversationPrompt

SessionTimer

SessionState

FeedbackRating

PageTransition

ConnectionAnimation

BottomSheet

Toast

EmptyState

ErrorState

Do not build one giant component.

MOTION SYSTEM

Use Framer Motion.

Motion should communicate:

entering

leaving

waiting

connecting

success

selection

completion

Use:

fade

translate

scale

spring

stagger

opacity

subtle blur where appropriate

Avoid:

excessive bouncing

constant movement

decorative animations everywhere

slow transitions that make the product feel sluggish

MOTION TIMING

Micro interaction:

120–220ms

UI transition:

250–450ms

Major state transition:

400–700ms

Hero ambient animation:

4–10s

Use easing/spring curves that feel physical.

REDUCED MOTION

Respect:

prefers-reduced-motion

When enabled:

remove decorative movement

shorten transitions

preserve state communication

never remove essential feedback

DEPTH SYSTEM

Use depth primarily through:

spacing

typography

subtle borders

tonal contrast

very soft shadows

Avoid heavy shadows.

Example:

0 8px 30px rgba(...)

should be extremely subtle.

Do not create floating-card overload.

BORDER RADIUS

Avoid making every element extremely rounded.

Use a restrained radius system.

Buttons:

medium radius.

Inputs:

medium radius.

Large surfaces:

moderate radius.

Cards:

only when genuinely useful.

Avoid the "everything is a pill" SaaS aesthetic.

INTERACTION DESIGN

Every clickable element should provide immediate feedback.

Buttons:

hover
active
focus
disabled
loading

Inputs:

default
focus
error
success

Cards/interactive elements:

hover
active

Never allow an interaction to feel broken or unresponsive.

ACCESSIBILITY

Include:

semantic HTML

keyboard navigation

visible focus states

proper ARIA labels

accessible form labels

sufficient contrast

touch targets at least approximately 44px

reduced-motion support

screen-reader-friendly state changes

RESPONSIVE DESIGN

Desktop

Large typography.

Generous whitespace.

Conversation interface optimized for wide screens.

Tablet

Reduce horizontal spacing.

Maintain hierarchy.

Mobile

Prioritize:

one-handed use

large tap targets

readable typography

no horizontal scrolling

bottom-sheet conversation helper

Never simply shrink the desktop UI.

The mobile experience should feel intentionally designed.

API ARCHITECTURE

Create:

services/api.ts

Supabase service operations:

createSession(participantName)

getSession(sessionId)

activateSession(sessionId)

completeSession(sessionId)

submitFeedback(feedback)

Expected session:

{
  id: string
  participant_name: string
  meeting_url: string
  status: "PREPARING" | "SEARCHING" | "READY" | "ACTIVE" | "COMPLETED"
  started_at: string | null
  completed_at: string | null
  created_at: string
}


Expected feedback:

{
  session_id: string
  rating: number
  comfort_level:
    | "very_comfortable"
    | "comfortable"
    | "neutral"
    | "uncomfortable"
    | "very_uncomfortable"
  repeat_interest: "yes" | "maybe" | "no"
  comment: string | null
}


Do not put API/business logic inside React components.

MOCK API

Support:

VITE_USE_MOCK_API=true

When true:

Use realistic simulated session state transitions.

When false:

Use the real Supabase client and database.

Mock behavior should simulate:

Preparing
→ Searching
→ Ready
→ Active
→ Completed

Do not use instant transitions in mock mode.

The simulated waiting period should allow the beautiful state animations to actually be experienced.

ERROR STATES

Errors must feel human and recoverable.

Session unavailable

Something went wrong while preparing your session.

CTA:

Try again

Meeting unavailable

We couldn't open your session.

CTA:

Try again

Network error

Looks like your connection was interrupted.

CTA:

Try again

Never expose raw API errors.

Never show:

500 Internal Server Error

Never blame the user.

VISUAL CONSISTENCY

Create a small design-token system.

Centralize:

colors

typography

spacing

radii

shadows

animation durations

Do not scatter arbitrary Tailwind values throughout the application.

The entire product should feel like one designed system.

LANDING → PRODUCT TRANSITION

This is important.

The marketing website and practice experience should feel like the same product.

When the user clicks Practice Now:

The transition should visually carry the brand into the product.

Possible approach:

CTA expands subtly

page fades

background tone remains consistent

SpeakUp logo remains anchored

next screen enters from the same visual axis

The user should feel:

"I'm moving deeper into the same experience."

Not:

"A completely different app just opened."

PSYCHOLOGICAL DESIGN RULES

Never make users feel watched.

Never make users feel evaluated.

Never make users feel stupid.

Never make users feel behind.

Never make users feel like they are failing.

Instead:

Make them feel:

curious

comfortable

capable

welcome

slightly proud that they started

WHAT MAKES SPEAKUP PREMIUM

Premium does NOT mean:

more gradients

more animations

more cards

more features

more effects

Premium means:

clarity

restraint

precision

confidence

emotional intelligence

excellent typography

beautiful spacing

fast feedback

thoughtful transitions

no unnecessary friction

TECHNICAL STACK

Use:

React

TypeScript

Tailwind CSS

Framer Motion

Lucide React

Use reusable components.

Suggested:

src/

components/
  Button
  Logo
  ConversationPrompt
  SessionTimer
  SessionState
  FeedbackRating
  ConnectionAnimation
  BottomSheet
  PageTransition
  ErrorState

pages/
  Landing
  Practice
  Session
  Feedback

services/
  api.ts

types/
  session.ts
  feedback.ts

config/
  prompts.ts

hooks/
  useSession
  useTimer
  useReducedMotion


STRICT PRODUCT SCOPE

Build ONLY:

Landing page

Practice Now flow

Name entry

Preparing state

Searching state

Session ready state

Conversation practice interface

10-minute timer

Conversation prompts

Session completion

Feedback form

Final thank-you state

Do NOT add:

Authentication

User profiles

Dashboard

Payments

Subscriptions

Chat

Friends

Followers

Leaderboards

AI tutor

AI scoring

Pronunciation analysis

Interview preparation

Resume features

Courses

Community feed

Notifications

Admin dashboard

Complex settings

FINAL QUALITY BAR

Before considering the product complete, perform a visual and UX audit.

Ask:

First impression

Can a stranger understand SpeakUp in less than 5 seconds?

Emotional response

Does it feel safe enough for someone nervous about speaking?

CTA

Is Practice Now the obvious next step without feeling aggressive?

Friction

Can someone begin with almost no effort?

Trust

Does the product feel credible without fake claims?

Premium quality

Would this look believable on a startup launch page?

Motion

Does animation communicate state rather than decorate?

Conversation

Does the interface feel calm while speaking?

Timer

Does it communicate "only 10 minutes" rather than "you're running out of time"?

Completion

Does finishing feel like a small personal win?

Mobile

Does the mobile experience feel deliberately designed rather than compressed?

Accessibility

Can keyboard and reduced-motion users comfortably use the product?

Scope

Have you avoided every feature outside the MVP?

MOST IMPORTANT INSTRUCTION

Build less. Polish more.

Do not add functionality simply because it looks impressive.

Do not add generic SaaS patterns.

Do not make SpeakUp look like an AI product.

Do not make SpeakUp look like an education dashboard.

Do not make SpeakUp look like a social network.

Make it feel like a beautiful, calm, human place to practice speaking.

The user's first thought should be:

"This looks different."

Their second thought:

"This doesn't feel intimidating."

Their third:

"I could actually try this."

And the desired action is:

## Supabase Setup

Phase 1 uses the existing React frontend with Supabase directly. No FastAPI, Express, Node backend, Redis, WebRTC, or Google Meet API is required.

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run `supabase/migrations/20260905000000_create_speakup_phase1.sql`.
3. Copy the Supabase Project URL and publishable key from the project settings.
4. Copy `.env.example` to `.env.local` and set:

```text
VITE_USE_MOCK_API=false
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_MEETING_URL=YOUR_GOOGLE_MEET_URL
```

5. Install dependencies with `npm install`.
6. Start the frontend with `npm run dev`.
7. Test the complete practice, session, completion, and feedback flow.

Set `VITE_USE_MOCK_API=true` to keep the existing local demo flow. The mock meeting URL is read from `VITE_MOCK_MEETING_URL`.

The migration enables RLS and grants anonymous clients only session insert/select/update and feedback insert access. Because Phase 1 has no authentication, session ownership cannot be strongly established; this anonymous validation model must be revisited before public production launch.

Practice Now

The MVP should be technically small but emotionally and visually complete.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
