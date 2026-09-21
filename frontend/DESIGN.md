# Hero Section Patterns

## Pattern: Solid Background with Subtle Decoration

**DO**: Use a solid background (typically white `bg-white`) with one subtle opacity-tinted geometric element.

**DON'T**: Use gradient backgrounds (`bg-gradient-to-br...`), glassmorphism, or excessive decorative overlays.

### Example Pattern
```tsx
<section className="relative bg-white overflow-hidden">
  <div className="container-wide">
    <div className="py-20 md:py-32 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
        Headline text
      </h1>
      <p className="text-lg text-neutral-600 mb-8">
        Supporting text
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="primary">Primary CTA</Button>
        <Button variant="outline">Secondary CTA</Button>
      </div>
    </div>
  </div>
  {/* Single subtle decorative element */}
  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-50 rounded-3xl opacity-30" aria-hidden="true" />
</section>
```

### Why This Works
1. **Premium**: Clean white background conveys trust and professionalism
2. **Academic**: Uncluttered focus on typography and content hierarchy
3. **Modern**: Single colored circle provides visual interest without decoration
4. **Human**: Generous whitespace breathes, typography carries personality
5. **Performant**: No gradient calculations, no heavy assets

### Common Mistakes
- `bg-gradient-to-br from-primary-50 via-white to-secondary-50` — excessive gradient
- Multiple floating shapes at different opacities — visual noise
- Blur overlays or glass effects — outdated aesthetic
- Large decorative illustrations — distracts from message

### Variations
- **Emergency Alert**: bg-error-50 with error-color decorative element
- **Accomplishment**: bg-amber-50 with amber-colored element
- **Informational**: bg-blue-50 with blue-colored element

Always verify at mobile (375px) and desktop (1440px+) viewports.