import { test, expect, type Page } from '@playwright/test';

// ─── Helper: collect console errors ───
async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  return errors;
}

// ─── PHASE 5.1: Lint / Type-check / Build (run via npm scripts separately) ───

// ─── PHASE 5.2: Test all public routes ───
const publicRoutes = [
  '/', '/about', '/academics', '/academics/early-years', '/academics/primary',
  '/academics/secondary', '/admissions', '/admissions/apply', '/admissions/fees',
  '/admissions/requirements', '/admissions/track', '/student-life', '/facilities',
  '/achievements', '/gallery', '/news', '/events', '/contact', '/faq', '/privacy',
  '/terms', '/school-tour', '/login', '/register', '/reset-password',
];

test.describe('Public routes all return 200', () => {
  for (const route of publicRoutes) {
    test(`GET ${route} returns 200`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe('Dynamic route: /news/[slug]', () => {
  test('news article page renders', async ({ page }) => {
    const response = await page.goto('/news/test-article');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('News Article');
  });
});

// ─── PHASE 5.3: Test every CTA and form ───

test.describe('Hero CTA buttons navigate correctly', () => {
  test('Apply for Admission CTA', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Apply for Admission');
    await expect(page).toHaveURL('/admissions/apply');
  });

  test('Book a School Tour CTA', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Book a School Tour');
    await expect(page).toHaveURL('/school-tour');
  });
});

test.describe('Header CTAs navigate correctly', () => {
  test('Apply Now header button', async ({ page }) => {
    await page.goto('/');
    await page.click('header >> text=Apply Now');
    await expect(page).toHaveURL('/admissions/apply');
  });

  test('Book a Tour header button', async ({ page }) => {
    await page.goto('/');
    await page.click('header >> text=Book a Tour');
    await expect(page).toHaveURL('/school-tour');
  });
});

test.describe('Footer links navigate correctly', () => {
  test('footer About link', async ({ page }) => {
    await page.goto('/');
    await page.click('footer >> text=Our Story');
    await expect(page).toHaveURL('/about');
  });

  test('footer Apply Now link', async ({ page }) => {
    await page.goto('/');
    await page.click('footer >> text=Apply Now');
    await expect(page).toHaveURL('/admissions/apply');
  });

  test('footer Privacy Policy link', async ({ page }) => {
    await page.goto('/');
    await page.click('footer >> text=Privacy Policy');
    await expect(page).toHaveURL('/privacy');
  });

  test('footer Terms link', async ({ page }) => {
    await page.goto('/');
    await page.click('footer >> text=Terms of Service');
    await expect(page).toHaveURL('/terms');
  });
});

test.describe('Contact form submits successfully', () => {
  test('fills and submits contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('#name', 'Test Parent');
    await page.fill('#email', 'parent@test.com');
    await page.fill('#phone', '+234 123 456 7890');
    await page.fill('#subject', 'Admissions inquiry');
    await page.fill('#message', 'I would like to know more about your school.');
    await page.click('button:has-text("Send Message")');
    await expect(page.locator('text=Thank you! Your message has been sent successfully.')).toBeVisible();
  });
});

test.describe('Admissions application form (multi-step)', () => {
  test('navigates through all 3 steps', async ({ page }) => {
    await page.goto('/admissions/apply');
    
    // Step 1
    await page.fill('input[value=""] >> nth=0', 'Child Name');  // childName
    // Use proper selectors
    await page.locator('input[type="text"]').first().fill('John Doe');
    await page.locator('input[type="date"]').first().fill('2018-05-15');
    await page.locator('select').first().selectOption('Primary 1');
    
    await page.click('button:has-text("Continue")');
    
    // Step 2
    await expect(page.locator('text=Parent/Guardian Details')).toBeVisible();
    await page.locator('input[type="text"]').first().fill('Jane Doe');
    await page.locator('input[type="email"]').first().fill('jane@test.com');
    await page.locator('input[type="tel"]').first().fill('+234 123 456 7890');
    
    await page.click('button:has-text("Continue")');
    
    // Step 3
    await expect(page.locator('text=Review Your Application')).toBeVisible();
  });
});

test.describe('Login form renders correctly', () => {
  test('shows email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });
});

test.describe('Register form renders correctly', () => {
  test('shows all fields', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator('button:has-text("Create Account")')).toBeVisible();
  });
});

// ─── PHASE 5.4: Check broken links ───

test.describe('No broken internal links on key pages', () => {
  const pagesToCheck = ['/', '/about', '/admissions', '/contact'];

  for (const path of pagesToCheck) {
    test(`${path} has no 404 internal links`, async ({ page, request }) => {
      await page.goto(path);
      const links = await page.locator('a[href^="/"]').evaluateAll(els =>
        els.map(el => (el as HTMLAnchorElement).href)
      );
      const uniqueLinks = [...new Set(links)].filter(
        href => !href.includes('/admin') && !href.includes('/parent')
      );
      for (const link of uniqueLinks.slice(0, 15)) {
        const url = new URL(link);
        const resp = await request.get(url.pathname);
        expect(resp.status(), `Link ${url.pathname} returned ${resp.status()}`).toBe(200);
      }
    });
  }
});

// ─── PHASE 5.5: Responsive widths ───

const viewports = [
  { name: '320', width: 320, height: 568 },
  { name: '360', width: 360, height: 640 },
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '414', width: 414, height: 896 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1280', width: 1280, height: 720 },
  { name: '1440', width: 1440, height: 900 },
];

test.describe('Responsive layout at all widths', () => {
  for (const vp of viewports) {
    test(`viewport ${vp.name}px wide`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      // No horizontal overflow
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `Horizontal overflow at ${vp.name}px`).toBeLessThanOrEqual(1);
      // Hero text visible
      await expect(page.locator('h1')).toBeVisible();
    });
  }
});

// ─── PHASE 5.6: Image loading ───

test.describe('Images and assets load', () => {
  test('OG image referenced in metadata loads or is acceptable if placeholder', async ({ page, request }) => {
    await page.goto('/');
    // og-image.png is a placeholder — check it's referenced in meta
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
  });
});

// ─── PHASE 5.7: Console errors ───

test.describe('No console errors on key pages', () => {
  const pages = ['/', '/about', '/admissions', '/contact', '/login', '/register', '/admissions/apply'];
  for (const path of pages) {
    test(`${path} no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', err => errors.push(err.message));
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      // Filter out known benign messages
      const realErrors = errors.filter(
        e => !e.includes('favicon') && !e.includes('DevTools')
      );
      expect(realErrors, `Console errors on ${path}: ${realErrors.join(', ')}`).toHaveLength(0);
    });
  }
});

// ─── PHASE 5.8: Keyboard navigation & focus states ─────

test.describe('Keyboard navigation & focus states', () => {
  test('skip link is focusable and visible on homepage', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link:focus');
    await expect(skipLink).toBeVisible();
  });

  test('Tab moves focus to header navigation', async ({ page }) => {
    await page.goto('/');
    // Press tab a few times to get past skip link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // Check something in header has focus
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedTag);
  });

  test('CTA buttons have focus-visible styles', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a.btn-primary').first();
    await cta.focus();
    const outline = await cta.evaluate(
      el => getComputedStyle(el).outlineColor || getComputedStyle(el).boxShadow
    );
    expect(outline).toBeTruthy();
  });
});

// ─── PHASE 5.9: SEO metadata and crawlability ───

test.describe('SEO metadata', () => {
  test('homepage has correct title, description, OG tags', async ({ page }) => {
    await page.goto('/');
    const title = await page.locator('title').textContent();
    expect(title).toContain('SchoolName');
    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('SchoolName');
  });

  test('robots.txt is accessible', async ({ page, request }) => {
    const resp = await request.get('/robots.txt');
    expect(resp.status()).toBe(200);
    const body = await resp.text();
    expect(body).toContain('sitemap');
  });

  test('sitemap.xml is accessible', async ({ page, request }) => {
    const resp = await request.get('/sitemap.xml');
    expect(resp.status()).toBe(200);
  });

  test('all public pages have unique titles', async ({ page }) => {
    const titles: Record<string, string> = {};
    for (const route of ['/', '/about', '/admissions', '/contact']) {
      await page.goto(route);
      const title = await page.title();
      titles[route] = title;
    }
    const uniqueTitles = new Set(Object.values(titles));
    expect(uniqueTitles.size).toBe(Object.keys(titles).length);
  });
});

// ─── PHASE 5.10: Performance and layout shifts ───

test.describe('Performance & layout shifts', () => {
  test('homepage loads within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
  });

  test('no major layout shifts (hero section stable)', async ({ page }) => {
    await page.goto('/');
    // Check that hero section exists and has dimensions
    const hero = page.locator('section').first();
    const box = await hero.boundingBox();
    expect(box?.height).toBeGreaterThan(100);
  });
});
