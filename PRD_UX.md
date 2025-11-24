# Product Requirements Document (PRD)
## Know That Person - UX & User Experience Focus

---

## 1. Product Overview

### Vision Statement
**Know That Person** is a relationship exploration platform designed to help couples and partners understand each other's perspectives, values, and decision-making approaches through real-world scenarios. The app facilitates meaningful conversations by presenting relatable situations and enabling partners to compare their honest takes.

### Core Value Proposition
- **Discover Compatibility**: Understand how aligned you are with your partner on important life topics
- **Spark Conversations**: Use scenarios as conversation starters for deeper relationship discussions
- **Build Understanding**: See your partner's perspective on complex situations before they happen in real life
- **Explore Values**: Discover shared values and identify areas where perspectives differ

### Target Users
- **Primary**: Couples in committed relationships (dating, engaged, or married)
- **Secondary**: Friends exploring compatibility, family members wanting to understand each other better
- **User Personas**:
  - Couples who want to have deeper conversations but struggle with how to start
  - Partners preparing for major life decisions (marriage, moving in together, financial planning)
  - People who value self-awareness and want to understand their own values better

---

## 2. User Experience Goals

### Emotional Goals
- **Curiosity**: Users should feel intrigued to explore scenarios and discover their partner's perspective
- **Safety**: The app should feel like a judgment-free space for honest sharing
- **Connection**: Users should feel closer to their partner after using the app
- **Empowerment**: Users should feel equipped to have better conversations about difficult topics

### Behavioral Goals
- Users return regularly to explore new scenarios
- Users share scenarios with their partner consistently
- Users engage in real-world conversations based on app discussions
- Users feel comfortable being honest in their responses

---

## 3. User Journeys & Flows

### Journey 1: First-Time User Discovery Flow

**Entry Point**: User lands on homepage

**Steps**:
1. **Category Selection Screen**
   - User sees 6 visually distinct category cards with gradient backgrounds
   - Categories: Loyalty, Boundaries, Money, Intimacy, Family, Ambition
   - Each category has an icon and gradient color scheme
   - User can select multiple categories (minimum 1 required)
   - Visual feedback: Selected categories show ring border and checkmark
   - Continue button is disabled until at least one category is selected

2. **Feed Screen**
   - User sees personalized feed of scenarios based on selected categories
   - Each scenario card shows:
     - Category badge with gradient styling
     - Scenario title (question format)
     - Preview text (truncated, 3 lines max)
     - "Read more" call-to-action
   - Bottom navigation: Home (active), Categories, You
   - Scenarios load with smooth fade-in animations

3. **Scenario Detail Screen**
   - Full scenario text displayed
   - Category badge visible at top
   - "Ask your partner" button prominently displayed
   - Back button returns to feed
   - Share functionality creates unique shareable link

4. **Share Flow**
   - User taps "Ask your partner"
   - Dialog appears with shareable link
   - Copy button allows easy link sharing
   - Link can be sent via any messaging platform

**Success Criteria**: User successfully shares a scenario with their partner within first session

---

### Journey 2: Partner Response Flow

**Entry Point**: Partner receives shared link

**Steps**:
1. **Shared Scenario Page**
   - Partner sees the full scenario
   - Can see existing answers from others (if any)
   - Form to submit their own perspective:
     - Name field (optional)
     - Text area for honest take (up to 5000 characters)
   - "Share your take" button

2. **Submission**
   - Partner submits their perspective
   - Answer appears in the list of responses
   - Original sharer can now see partner's response

**Success Criteria**: Partner submits their perspective without friction

---

### Journey 3: Comparison & Reflection Flow

**Entry Point**: User views scenario where both partners have responded

**Steps**:
1. **Compare Answers Screen**
   - Side-by-side display of both perspectives
   - "Your take" section (user's own answer)
   - "Their take" section (partner's answer)
   - Visual distinction: Partner's answer has special highlight/border
   - Alignment score displayed as percentage
   - Progress bar visualization of alignment
   - Encouraging message based on alignment level

2. **Reflection**
   - "Discuss this together" call-to-action button
   - Gentle encouragement message: "Honest conversations strengthen relationships ✨"
   - Sparkle animations for celebratory feel

**Success Criteria**: Users feel motivated to discuss the scenario in real life

---

### Journey 4: Returning User Exploration Flow

**Entry Point**: User opens app after initial use

**Steps**:
1. **Feed Screen** (with saved preferences)
   - Previously selected categories are remembered
   - User can navigate to Categories to change selections
   - New scenarios appear in feed
   - User can explore scenarios they haven't seen yet

2. **Category Re-selection**
   - User can return to category screen anytime
   - Back button appears if categories were previously selected
   - Changes update feed immediately

**Success Criteria**: User can easily explore new categories and scenarios

---

## 4. Screen-by-Screen UX Specifications

### Screen 1: Category Selection

**Purpose**: Allow users to personalize their experience by selecting topics of interest

**Layout**:
- Full-screen dark background (#0B0B0D)
- Centered container with rounded corners (40px radius)
- Maximum width: mobile-optimized (max-w-md)

**Content**:
- **Header Section**:
  - Gradient text title: "What do you want to explore?"
  - Subtitle: "Pick categories you're curious about"
  - Back button (if returning from feed)

- **Category Grid**:
  - 2-column grid layout
  - Each category card: 144px height
  - Gradient backgrounds unique to each category
  - Icon at center top
  - Category name below icon
  - Hover effects: Scale up slightly, shimmer animation
  - Selected state: White ring border, checkmark badge, overlay glow

- **Continue Button**:
  - Full-width, bottom-positioned
  - Gradient background (purple → pink → rose)
  - Disabled state: 40% opacity, no interaction
  - Enabled state: Full opacity, shadow glow effect

**Interactions**:
- Tap category to toggle selection
- Visual feedback: Scale animation on tap
- Continue button only enabled when at least 1 category selected
- Smooth transitions between states

**Emotional Tone**: Curious, inviting, non-intimidating

---

### Screen 2: Feed Screen

**Purpose**: Display personalized scenario feed based on selected categories

**Layout**:
- Header with app branding
- Scrollable feed area
- Fixed bottom navigation

**Content**:
- **Header**:
  - App name: "Know That Person" (gradient text)
  - Subtitle: "Scenarios for you"
  - Subtle gradient overlay

- **Feed Items**:
  - Each scenario in a card:
    - Dark background with subtle gradient
    - Category badge (top left)
    - Title (white, prominent)
    - Preview text (3 lines, gray color)
    - "Read more" link with arrow icon
  - Cards have hover effects: Border brightens, shadow increases
  - Staggered fade-in animations on load

- **Empty States**:
  - Loading: "Loading scenarios..."
  - No results: "No scenarios found"

- **Bottom Navigation**:
  - Three icons: Home (active), Categories, You
  - Active state: Pink/purple color
  - Inactive: Gray color

**Interactions**:
- Tap scenario card → Navigate to detail screen
- Tap Categories → Return to category selection
- Smooth scrolling
- Infinite scroll potential (future enhancement)

**Emotional Tone**: Discovery, anticipation, personalized

---

### Screen 3: Scenario Detail Screen

**Purpose**: Display full scenario and enable sharing

**Layout**:
- Header with back button
- Scrollable content area
- Fixed action button at bottom

**Content**:
- **Header**:
  - Back arrow (left)
  - "Scene" title (center, subtle)
  - Gradient background overlay

- **Scenario Content**:
  - Category badge
  - Full scenario title
  - Complete scenario text (readable font size, good line height)
  - No container box - clean, minimal

- **Action Button**:
  - "Ask your partner" button
  - Pink gradient background
  - Share icon
  - Loading state: "Creating link..." with heart pulse animation

**Interactions**:
- Back button → Return to feed
- Share button → Open share dialog
- Smooth scroll for long content

**Share Dialog**:
- Modal overlay
- Title: "Share with your partner"
- Shareable link displayed in monospace font
- Copy button (changes to checkmark when copied)
- Info text: "Send this link to your partner to see their perspective. You can write yours too."

**Emotional Tone**: Thoughtful, inviting, non-pressured

---

### Screen 4: Shared Scenario Page

**Purpose**: Allow partner to view scenario and submit their perspective

**Layout**:
- Similar to detail screen
- Additional form section for submitting answer

**Content**:
- **Scenario Display** (same as detail screen)
- **Existing Answers Section** (if any):
  - "What others think:" heading
  - Each answer shows:
    - Avatar with initial
    - Name
    - Perspective text
  - Staggered animations for each answer

- **Submission Form**:
  - "What's your honest take?" heading
  - Name input (optional, max 40 chars)
  - Text area (placeholder: "Write your honest take…", max 5000 chars)
  - "Share your take" button
  - Button disabled until text area has content

**Interactions**:
- Form validation: Button enabled only with text
- Submit → Answer appears in list
- Smooth animations for new submissions

**Emotional Tone**: Welcoming, safe space, encouraging honesty

---

### Screen 5: Compare Answers Screen

**Purpose**: Display both perspectives side-by-side and show alignment

**Layout**:
- Header with back button
- Scrollable comparison area
- Fixed CTA button

**Content**:
- **Header**:
  - "Your takes together" (gradient text)
  - Scenario title preview (truncated)

- **Your Answer Section**:
  - Avatar: "You" in purple/pink gradient circle
  - "Your take" label
  - Answer in card with subtle purple glow

- **Partner's Answer Section**:
  - Avatar: Heart icon in teal/cyan gradient circle
  - "Their take" label
  - Answer in card with teal border and glow
  - Sparkle icon badge (top right)

- **Alignment Indicator**:
  - "Your connection" label
  - Percentage with heart icon
  - Animated progress bar (gradient fill)
  - Encouraging message based on score

- **CTA Button**:
  - "Discuss this together" (gradient background)
  - Message icon

- **Encouragement Message**:
  - "Honest conversations strengthen relationships ✨"

**Visual Effects**:
- Sparkle animations floating in background
- Staggered reveal animations
- Progress bar animates to final percentage
- Romantic gradient overlays

**Interactions**:
- Back button → Return to feed
- CTA button → (Future: Could open discussion prompts or save to favorites)

**Emotional Tone**: Celebratory, warm, encouraging, non-judgmental

---

## 5. Design Principles & Guidelines

### Visual Design Principles

1. **Dark, Intimate Aesthetic**
   - Primary background: #0B0B0D (near-black)
   - Creates cozy, private feeling
   - Reduces eye strain for evening use

2. **Gradient Language**
   - Purple → Pink → Rose gradients for primary actions
   - Each category has unique gradient identity
   - Gradients convey emotion and warmth

3. **Typography Hierarchy**
   - Gradient text for important headings
   - White for primary content
   - Gray tones for secondary information
   - Comfortable line height (1.7) for readability

4. **Spacing & Breathing Room**
   - Generous padding (px-3, py-3 standard)
   - Rounded corners (24-40px) for soft, approachable feel
   - Cards have adequate spacing between them

5. **Micro-interactions**
   - Smooth animations (motion/react)
   - Scale effects on tap (0.95-0.98)
   - Hover states with subtle transformations
   - Loading states with visual feedback

### Interaction Design Principles

1. **Progressive Disclosure**
   - Start with categories (high-level)
   - Reveal scenarios (medium detail)
   - Show full scenario (complete context)
   - Compare answers (deep insight)

2. **Clear Affordances**
   - Buttons look clickable (gradient, shadow)
   - Cards indicate they're tappable (hover effects)
   - Disabled states are visually distinct
   - Icons support text labels

3. **Forgiving Navigation**
   - Back buttons always available
   - State preservation (categories remembered)
   - Easy to change selections
   - No dead ends

4. **Feedback & Confirmation**
   - Visual feedback on all interactions
   - Copy confirmation (checkmark)
   - Loading states for async actions
   - Success animations

### Content Strategy

1. **Scenario Quality**
   - Relatable, real-world situations
   - No clear "right" or "wrong" answers
   - Emotionally engaging
   - Appropriate length (not too long, not too short)

2. **Language Tone**
   - Warm and inviting
   - Non-judgmental
   - Encouraging honesty
   - Celebrating connection

3. **Category Descriptions**
   - Clear, concise category names
   - Icons support understanding
   - Visual identity helps recognition

---

## 6. User Experience Metrics & Success Criteria

### Engagement Metrics
- **Time to First Share**: Users should share a scenario within 5 minutes of first use
- **Return Rate**: 40% of users return within 7 days
- **Completion Rate**: 60% of shared scenarios receive partner responses
- **Category Exploration**: Average user selects 3+ categories

### Quality Metrics
- **Response Length**: Average response should be 200+ words (indicating thoughtful engagement)
- **Alignment Distribution**: Alignment scores should show variety (not all high, not all low)
- **Conversation Trigger**: 30% of users report having real-world conversations based on app

### Usability Metrics
- **Task Completion**: 90% of users successfully complete share flow
- **Error Rate**: <5% of users encounter blocking errors
- **Navigation Clarity**: Users can navigate back from any screen without confusion

### Emotional Metrics (Qualitative)
- Users report feeling:
  - More connected to their partner
  - More comfortable discussing difficult topics
  - Better understanding of partner's values
  - Curious to explore more scenarios

---

## 7. Edge Cases & Error States

### Empty States
- **No Categories Selected**: Continue button disabled, clear visual feedback
- **No Scenarios Found**: Friendly message, suggestion to try different categories
- **No Partner Response Yet**: Share link remains active, clear indication that waiting for response

### Error States
- **Network Failure**: Graceful error message, retry option
- **Invalid Share Link**: Clear error message, option to return home
- **Failed Submission**: Error message, ability to retry without losing input

### Loading States
- **Scenario Loading**: Skeleton or loading text
- **Share Link Creation**: Button shows "Creating link..." with animation
- **Answer Submission**: Button shows "Submitting..." with disabled state

### Boundary Cases
- **Very Long Responses**: Character counter, graceful truncation if needed
- **Many Answers**: Pagination or "Load more" for shared scenario page
- **Rapid Tapping**: Debounced interactions, loading states prevent double-submission

---

## 8. Accessibility Considerations

### Visual Accessibility
- Sufficient color contrast (WCAG AA minimum)
- Text readable at standard sizes
- Icons supported by text labels
- Focus states clearly visible

### Interaction Accessibility
- All interactive elements keyboard accessible
- Touch targets minimum 44x44px
- Clear focus indicators
- Screen reader friendly structure

### Content Accessibility
- Alt text for meaningful images
- Semantic HTML structure
- Clear heading hierarchy
- Descriptive link text

---

## 9. Future Enhancements (Out of Scope for MVP)

### Potential Features
- **Discussion Prompts**: Suggested conversation starters after comparison
- **Favorites**: Save scenarios for later
- **History**: View past comparisons
- **Insights Dashboard**: Track alignment trends over time
- **Custom Scenarios**: Users can submit their own scenarios
- **Multiple Partners**: Compare with friends, family members
- **Notifications**: Remind partner to respond
- **Social Features**: Share alignment scores (optional, privacy-focused)

### Technical Enhancements
- **Offline Support**: Cache scenarios for offline viewing
- **Push Notifications**: Alert when partner responds
- **Analytics**: Track which categories/scenarios are most engaging
- **A/B Testing**: Test different scenario presentations

---

## 10. User Research & Validation Needs

### Research Questions
1. Do users understand the value proposition immediately?
2. Are scenarios relatable and engaging?
3. Do users feel comfortable being honest in their responses?
4. Does the comparison screen motivate real-world conversations?
5. What categories are most/least popular?
6. How do users prefer to share (link, in-app, etc.)?

### Validation Methods
- **User Interviews**: Understand motivations and pain points
- **Usability Testing**: Observe users completing key flows
- **A/B Testing**: Test different UI variations
- **Analytics**: Track behavior patterns
- **Surveys**: Gather feedback on emotional impact

---

## 11. Success Definition

### MVP Success Criteria
The product is successful if:
1. Users can complete the full flow (select categories → view scenario → share → partner responds → compare) without confusion
2. Users report feeling more connected to their partner after use
3. At least 50% of shared scenarios receive partner responses
4. Users return to explore more scenarios (3+ sessions per user)
5. Alignment scores feel accurate and meaningful to users

### Long-term Success Vision
- Becomes a regular tool for couples to explore compatibility
- Facilitates thousands of meaningful conversations
- Users credit the app with improving their relationship communication
- Expands to help friends, family, and other relationship types

---

## Appendix: Key User Flows Diagram

```
[Home/Categories]
    ↓ (Select categories)
[Feed Screen]
    ↓ (Tap scenario)
[Scenario Detail]
    ↓ (Share)
[Share Dialog] → [Partner receives link]
    ↓
[Shared Scenario Page]
    ↓ (Partner submits)
[Compare Answers Screen]
    ↓
[Real-world conversation] ✨
```

---

**Document Version**: 1.0  
**Last Updated**: Based on current codebase analysis  
**Focus**: User Experience & User Interface Design  
**Next Steps**: Technical implementation planning, user testing, iteration

