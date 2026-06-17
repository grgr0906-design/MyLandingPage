# AGENTS.md

## Project

Busan Vibes

Multilingual tourism website introducing Busan to international visitors.

Supported Languages:

* Korean (ko)
* English (en)
* French (fr)

---

## Agent Mission

Build and maintain a modern, responsive tourism website that provides international travelers with useful and visually engaging information about Busan.

---

## Development Principles

### 1. Mobile First

Always prioritize:

* Mobile UX
* Responsive layouts
* Touch accessibility
* Fast loading speed

Required Breakpoints:

* Mobile: 0–767px
* Tablet: 768–1023px
* Desktop: 1024px+

---

### 2. Internationalization (i18n)

All user-facing content must support:

* Korean
* English
* French

Implementation Guidelines:

* Store text in translation files
* Avoid hardcoded strings
* Use locale switching

Example:

```json
{
  "hero.title": {
    "ko": "부산 여행 가이드",
    "en": "Busan Travel Guide",
    "fr": "Guide de Voyage à Busan"
  }
}
```

---

### 3. Accessibility

Ensure:

* Semantic HTML
* Keyboard navigation
* Alt attributes
* ARIA labels when necessary
* WCAG AA compliance

---

### 4. SEO

Every page should include:

* Unique title
* Meta description
* Open Graph tags
* Structured data

Target Languages:

* Korean
* English
* French

---

### 5. Performance

Requirements:

* Lighthouse > 90
* Lazy loaded images
* Compressed assets
* Responsive image sizing

---

### 6. Content Categories

Maintain content for:

* Attractions
* Restaurants
* Cafes
* Local Foods
* Festivals
* Travel Tips
* Maps

---

### 7. UI Guidelines

Design Style:

* Modern
* Clean
* Travel-focused
* Visual storytelling

Color Inspiration:

* Ocean Blue
* Sand Beige
* Sunset Orange

---

### 8. Code Standards

HTML:

* Semantic structure

CSS:

* Mobile first
* Responsive units

JavaScript:

* Modular code
* No unnecessary dependencies

---

### 9. Future Enhancements

Potential Integrations:

* Google Maps
* Weather API
* Translation API
* AI Travel Assistant
* User Reviews

---

## Success Criteria

Visitors should be able to:

1. Discover Busan attractions.
2. Find restaurants and cafes.
3. Navigate easily on mobile devices.
4. Switch between Korean, English, and French.
5. Access useful travel information quickly.
