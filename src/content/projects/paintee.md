---
title: "Paintee: Face-Aware AR Guidance"
description: "Guiding beginner face painting through one continuous AR session, hands-free voice controls, and a focused application flow."
thumbnail: "/projects/covers/paintee.png"
pubDate: 2026-10-14
tags: ["iOS", "AR", "Accessibility"]
techStack: ["RealityKit", "SwiftUI", "Vision", "ARKit"]
---

Paintee helps beginners create proportional and symmetrical face painting. I approached it as a face-aware AR experience built from first principles.

<div class="project-screens paintee-intro" role="group" aria-label="Before the first brushstroke" tabindex="0">

![Meet Paintee: real-time camera guides for learning symmetrical face painting.](../../assets/projects/paintee/onboarding.png)

![Prepare to paint: stabilize the phone, find good light, mark the guide, and connect the dots.](../../assets/projects/paintee/drawing-tutorial.png)

</div>

## The problem: proportion and symmetry

Beginners applying face painting to their own faces often struggle with proportion and symmetry, especially when working from references on a flat surface.

From a builder's perspective, the problem was how to design an experience that understands facial structure and guides precision in real time.

<div class="project-screens" role="group" aria-label="Guidance meets the real brush" tabindex="0">

![Applying guide dots along the cheek and mouth while the camera follows facial proportions.](../../assets/projects/paintee/painting-dots-side.png)

![Connecting the mouth outline with a real brush while viewing the live camera guidance.](../../assets/projects/paintee/painting-outline-close.png)

</div>

## Navigation around a continuous AR session

Face painting is a continuous, hands-on activity. Every interruption can break focus, muscle memory, and spatial alignment.

In Paintee, navigation respects the session itself. The app preserves a **single, continuous AR session** while guiding users through structured phases: previewing, dotting, outlining, and painting.

Screens change while the session remains active. This turns navigation into session control, allowing beginners to stay grounded in the same physical space while progressing with confidence and precision.

<div class="project-screens" role="group" aria-label="From dots to outlines in one AR session" tabindex="0">

![Step 1: marking the face with dots aligned to the selected clown design.](../../assets/projects/paintee/painting-dots.png)

![Step 2: connecting those dots into outlines while continuing the same painting session.](../../assets/projects/paintee/painting-outline.png)

</div>

## Voice control as a primary interaction

During face painting, hands are already busy and attention is split between a mirror, the brush, and facial precision. Asking users to tap buttons or navigate the UI breaks focus at the moment it matters most.

Voice control lets users move between steps, toggle guidance, and progress through the experience without unnecessary touch interactions. They can stay focused on applying the paint, keeping their hands, posture, and attention anchored to the task.

<div class="project-screens" role="group" aria-label="Hands busy, voice in control" tabindex="0">

![Design collection with numbered voice targets for Tribal, Clown, Animal, and Hero.](../../assets/projects/paintee/voice-design-collection.png)

![AR design preview with visible voice targets for Back, Sparkle, Continue, and Return.](../../assets/projects/paintee/voice-design-preview.png)

</div>

## A focused application flow

Paintee is structured as a single, linear session. From design preview to guided application and finally capturing the result, each step advances the same underlying state instead of creating a new context.

The AR session stays alive while the UI layers shift just enough to guide the next action. This keeps navigation lightweight and predictable, avoids unnecessary resets, and preserves spatial alignment throughout the process.

Treating the experience as one continuous flow removes interface friction and lets users focus on the physical act of face painting.

<div class="project-screens paintee-flow" role="group" aria-label="One session, from preview to saved result" tabindex="0">

![01 · Preview the design: see the selected colors and shapes aligned to the face.](../../assets/projects/paintee/design-preview.png)

![02 · Place the dots: mark the guide points before drawing the outlines.](../../assets/projects/paintee/dotting.png)

![03 · Connect the outline: follow the contours around the eyes and mouth.](../../assets/projects/paintee/outlining.png)

![04 · Paint it in: fill the outlined shapes and finish the guided steps.](../../assets/projects/paintee/painting.png)

![05 · Capture the result: take a photo after completing the painting flow.](../../assets/projects/paintee/capture-result.png)

![06 · Keep the result: review the photo, save it, retake it, or return home.](../../assets/projects/paintee/save-result.png)

</div>

## Technology stack

![Paintee technology stack: RealityKit, SwiftUI, Vision, and ARKit.](../../assets/projects/paintee/technology-stack.png)

- RealityKit
- SwiftUI
- Vision
- ARKit

## App Store release

The portfolio records Paintee's App Store release and its face painting design collection. The collection provides creative, easy-to-draw designs for users to choose before guided application.
