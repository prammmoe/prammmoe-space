---
title: "Rooted DBT: Reusable Learning Flows"
description: "Contributing dynamic lesson routing and reusable, type-safe content views to Rooted DBT's mindfulness learning experience."
thumbnail: "/projects/covers/rooted-dbt.png"
pubDate: 2026-10-14
tags: ["iOS", "Routing", "Generics"]
techStack: ["Swift", "SwiftUI", "Generics"]
---

Rooted DBT makes DBT skills simple, daily, and doable. My contribution focused on developing learning flows and the engineering structure behind dynamic lesson content.

## Routing dynamic content

In the Mindfulness lesson module, I implemented a routing structure to support highly dynamic lesson content without coupling navigation logic to individual views.

I separated routing logic from presentation. Navigation between lesson steps was driven by a centralized routing layer instead of view-specific state changes.

This allowed lessons to progress linearly or conditionally without duplicating navigation code across screens. It provided a clearer mental model and made maintenance easier as lesson structures evolved.

<div class="project-screens" role="group" aria-label="Dynamic mindfulness lesson content" tabindex="0">

![Mindfulness quiz with three possible answers and a Check Answer action.](../../assets/projects/rooted-dbt/mindfulness-quiz.png)

![Mindfulness lesson preview introducing Wise Mind, WHAT skills, and HOW skills.](../../assets/projects/rooted-dbt/mindfulness-preview.png)

![Wise Mind lesson explaining reasonable mind, emotion mind, and wise mind.](../../assets/projects/rooted-dbt/wise-mind.png)

![One-mindfully reflection step with a written response and lesson progress.](../../assets/projects/rooted-dbt/one-mindfully-reflection.png)

</div>

## Generics for flexible lesson content

I designed lesson sections and items as generic data structures constrained by the `LessonContent` and `LessonRoute` protocols.

This made it possible to reuse the same `LessonItemCellView` across multiple lesson configurations while keeping routing explicit and type-safe. New lesson variations could be introduced by defining new content and routes, without modifying the core component or navigation flow.

The portfolio shows the same component configured for mindfulness and distress tolerance lessons:

![Swift configuration of LessonItemCellView for mindfulness lessons with a purple level header and unlocked-item routing.](../../assets/projects/rooted-dbt/mindfulness-component-code.png)

```swift
LessonItemCellView<MindfulnessLesson, MindfulnessLessonRoute>(
    level: level.level,
    title: nil,
    items: level.items,
    levelHeaderStrokeColor: Color(hex: "#7030E0"),
    onTap: { item in
        guard !item.isLocked else { return }
        router.navigate(to: item.route)
    }
)
```

![Swift configuration of LessonItemCellView for distress tolerance lessons with a section title, red header, and unlocked-item routing.](../../assets/projects/rooted-dbt/distress-tolerance-component-code.png)

```swift
LessonItemCellView<DistressToleranceLesson, DistressLessonRoute>(
    level: nil,
    title: level.title,
    items: level.items,
    levelHeaderStrokeColor: Color.red500,
    onTap: { item in
        guard !item.isLocked else { return }
        router.navigate(to: item.route)
    }
)
```

These are usage examples from the portfolio; the types and surrounding application code are defined in the original project.

<div class="project-screens" role="group" aria-label="Mindfulness and distress tolerance lesson components" tabindex="0">

![Mindfulness levels using the shared lesson component with available and locked lessons.](../../assets/projects/rooted-dbt/mindfulness-levels.png)

![Distress tolerance using the shared lesson component for crisis survival and reality acceptance skills.](../../assets/projects/rooted-dbt/distress-tolerance.png)

</div>

## Reusing views with minimal configuration

With the generic structures in place, multiple lesson views can be implemented with a small amount of configuration code. Content and routes change while the shared component and navigation flow stay consistent.

<div class="project-screens" role="group" aria-label="Reusable DBT learning modules" tabindex="0">

![About DBT learning module with core concepts and lessons grouped into levels.](../../assets/projects/rooted-dbt/about-dbt.png)

![Emotion regulation learning module with its orange theme and level-based lessons.](../../assets/projects/rooted-dbt/emotion-regulation.png)

![Interpersonal effectiveness learning module with people skills and lessons grouped by objectives.](../../assets/projects/rooted-dbt/interpersonal-effectiveness.png)

</div>

## Key learnings

This project deepened my understanding of how engineering decisions affect user focus in mindfulness experiences. Clean routing, reusable components, and minimal UI friction were product constraints as well as technical choices.

I learned to balance flexibility with simplicity, allowing the system to grow without exposing complexity to the user. Contributing through **small, well-scoped changes** also reinforced the value of iteration over large, disruptive rewrites in a shared codebase.
