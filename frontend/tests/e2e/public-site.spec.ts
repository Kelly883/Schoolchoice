import { test, expect } from '@playwright/test';

// PHASE 5: TEST PUBLIC WEBSITE - Comprehensive Test Suite

test.describe('Public Website Phase 5 Tests', () => {
  
  // ROUTE TESTING
  test.describe('Route Accessibility', () => {
    const publicRoutes = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/academics', name: 'Academics' },
      { url: '/academics/early-years', name: 'Early Years' },
      { url: '/academics/primary', name: 'Primary' },
      { url: '/academics/secondary', name: 'Secondary' },
      { url: '/admissions', name: 'Admissions' },
      { url: '/admissions/apply', name: 'Apply' },
      { url: '/admissions/requirements', name: 'Requirements' },
      { url: '/admissions/fees', name: 'Fees' },
      { url: '/admissions/track', name: 'Track' },
      { url: '/contact', name: 'Contact' },
      { url: '/faq', name: 'FAQ' },
      { url: '/news', name: 'News' },
      { url: '/events', name: 'Events' },
      { url: '/gallery', name: 'Gallery' },
      { url: '/student-life', name: 'Student Life' },
      { url: '/facilities', name: 'Facilities' },
      { url: '/achievements', name: 'Achievements' },
      { url: '/school-tour', name: 'School Tour' },
      { url: '/privacy', name: 'Privacy' },
      { url: '/terms', name: 'Terms' },
      { url: '/login', name: 'Login' },
      { url: '/register', name: 'Register' },
      { url: '/reset-password', name: 'Reset Password' },
    ];

    for (const route of publicRoutes) {
      test(`${route.name} page loads without errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') errors.push(msg.text());
        });

        const response = await page.goto(route.url, { waitUntil: 'networkidle' });
        expect(response?.status()).toBeLessThan(400);
        await expect(page).toHaveTitle(/SchoolName/);
        
        const criticalErrors = errors.filter(e => 
          !e.includes('favicon') && !e.includes('net::ERR')
        );
        expect(criticalErrors).toHaveLength(0);
      });
    }
  });

  // CTA TESTING
  test.describe('CTA Testing', () => {
    test('Hero Apply for Admission navigates to /admissions/apply', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Apply for Admission').first().click();
      await expect(page).toHaveURL(/\/admissions\/apply/);
    });

    test('Hero Book a School Tour navigates to /school-tour', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Book a School Tour').first().click();
      await expect(page).toHaveURL(/\/school-tour/);
    });

    test('Header Apply Now navigates to /admissions/apply', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Apply Now').first().click();
      await expect(page).toHaveURL(/\/admissions\/apply/);
    });

    test('Header Book a Tour navigates to /school-tour', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Book a Tour').first().click();
      await expect(page).toHaveURL(/\/school-tour/);
    });

    test('CTA Section Apply for Admission works', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Ready to Join Our School Community?').waitFor();
      await page.locator('text=Apply for Admission').last().click();
      await expect(page).toHaveURL(/\/admissions\/apply/);
    });

    test('CTA Section Learn More navigates to /admissions', async ({ page }) => {
      await page.goto('/');
      await page.locator('text=Learn More').first().click();
      await expect(page).toHaveURL(/\/admissions/);
    });

    test('Footer navigation links work', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.locator('text=Our Story').first().click();
      await expect(page).toHaveURL(/\/about/);
    });

    test('All main navigation links work', async ({ page }) => {
      const navLinks = [
        { text: 'About', url: '/about' },
        { text: 'Academics', url: '/academics' },
        { text: 'Contact', url: '/contact' },
      ];
      for (const link of navLinks) {
        await page.goto('/');
        await page.locator(`text=${link.text}`).first().click();
        await expect(page).toHaveURL(link.url);
      }
    });
  });

  // FORM TESTING
  test.describe('Form Testing', () => {
    test.describe('Admission Application Form', () => {
      test('Shows all 3 steps', async ({ page }) => {
        await page.goto('/admissions/apply');
        await expect(page.locator('text=Step 1: Child Information')).toBeVisible();
        await expect(page.locator('text=Step 2: Parent Details')).toBeVisible();
        await expect(page.locator('text=Step 3: Review & Submit')).toBeVisible();
      });

      test('Step 1 Child Information fields exist', async ({ page }) => {
        await page.goto('/admissions/apply');
        await expect(page.locator('label:has-text("Child\'s Full Name")')).toBeVisible();
        await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();
      });

      test('Step 2 Parent Details fields exist', async ({ page }) => {
        await page.goto('/admissions/apply');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await expect(page.locator('label:has-text("Parent\'s Full Name")')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeVisible();
      });

      test('Step 3 Review shows data and terms links', async ({ page }) => {
        await page.goto('/admissions/apply');
        await page.fill('input[placeholder="John Doe"]', 'Test Child');
        await page.fill('input[placeholder="10"]', '10');
        await page.fill('input[type="date"]', '2015-01-15');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await page.fill('input[placeholder*="Parent"]', 'Test Parent');
        await page.fill('input[type="email"]', 'test@example.com');
        await page.fill('input[type="tel"]', '+2341234567890');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await expect(page.locator('text=Application Summary')).toBeVisible();
        await expect(page.locator('text=Test Child')).toBeVisible();
        await expect(page.locator('text=Terms of Service')).toBeVisible();
        await expect(page.locator('text=Privacy Policy')).toBeVisible();
      });

      test('Form submission shows success message', async ({ page }) => {
        await page.goto('/admissions/apply');
        await page.fill('input[placeholder="John Doe"]', 'Test Child');
        await page.fill('input[placeholder="10"]', '10');
        await page.fill('input[type="date"]', '2015-01-15');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await page.fill('input[placeholder*="Parent"]', 'Test Parent');
        await page.fill('input[type="email"]', 'test@example.com');
        await page.fill('input[type="tel"]', '+2341234567890');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await page.locator('button:has-text("Submit Application")').click();
        await page.waitForTimeout(2500);
        await expect(page.locator('text=Application submitted successfully')).toBeVisible();
      });

      test('Form data persists between steps', async ({ page }) => {
        await page.goto('/admissions/apply');
        await page.fill('input[placeholder="John Doe"]', 'Persistent Name');
        await page.locator('button:has-text("Continue")').first().click();
        await page.waitForTimeout(500);
        await page.locator('button:has-text("Back")').first().click();
        await page.waitForTimeout(500);
        await expect(page.locator('input[placeholder="John Doe"]')).toHaveValue('Persistent Name');
      });
    });

    test.describe('Contact Form', () => {
      test('All form fields present', async ({ page }) => {
        await page.goto('/contact');
        await expect(page.locator('label:has-text("Your Name")')).toBeVisible();
        await expect(page.locator('label:has-text("Email")')).toBeVisible();
        await expect(page.locator('label:has-text("Phone")')).toBeVisible();
        await expect(page.locator('label:has-text("Message")')).toBeVisible();
        await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
      });

      test('Successful submission shows thank you message', async ({ page }) => {
        await page.goto('/contact');
        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test@example.com');
        await page.fill('#phone', '+2341234567890');
        await page.fill('#message', 'Test message');
        await page.locator('button:has-text("Send Message")').click();
        await page.waitForTimeout(2000);
        await expect(page.locator('text=Thank you! Your message has been sent successfully.')).toBeVisible();
        await expect(page.locator('#name')).toHaveValue('');
      });

      test('WhatsApp link has proper attributes', async ({ page }) => {
        await page.goto('/contact');
        const link = page.locator('a[href*="wa.me"]');
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test.describe('Login Form', () => {
      test('Login form elements present', async ({ page }) => {
        await page.goto('/login');
        await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
        await expect(page.locator('text=Remember me')).toBeVisible();
        await expect(page.locator('text=Forgot password?')).toBeVisible();
      });

      test('Navigation to register and reset password', async ({ page }) => {
        await page.goto('/login');
        await page.locator('text=Register').first().click();
        await expect(page).toHaveURL(/\/register/);
        await page.goto('/login');
        await page.locator('text=Forgot password?').click();
        await expect(page).toHaveURL(/\/reset-password/);
      });
    });

    test.describe('Register Form', () => {
      test('Register form elements present', async ({ page }) => {
        await page.goto('/register');
        await expect(page.locator('h1:has-text("Create Account")')).toBeVisible();
        await expect(page.locator('input[name="name"]')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
      });

      test('Password mismatch shows error', async ({ page }) => {
        await page.goto('/register');
        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[type="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'different123');
        await page.locator('button:has-text("Create Account")').click();
        await expect(page.locator('text=Passwords do not match')).toBeVisible();
      });
    });

    test.describe('Reset Password Form', () => {
      test('Form elements present', async ({ page }) => {
        await page.goto('/reset-password');
        await expect(page.locator('h1:has-text("Reset Password")')).toBeVisible();
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
      });
    });
  });

  // RESPONSIVE DESIGN TESTING
  test.describe('Responsive Design', () => {
    const viewports = [
      { name: '320px', width: 320, height: 568 },
      { name: '360px', width: 360, height: 640 },
      { name: '375px', width: 375, height: 667 },
      { name: '390px', width: 390, height: 844 },
      { name: '414px', width: 414, height: 736 },
      { name: '768px', width: 768, height: 1024 },
      { name: '1024px', width: 1024, height: 768 },
      { name: '1280px', width: 1280, height: 800 },
      { name: '1440px', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      test(`${vp.name} - no horizontal overflow on home`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const clientWidth = await page.evaluate(() => document.body.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
      });
    }

    test('Mobile menu toggle works on 375px', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      const menuBtn = page.locator('button[aria-label="Toggle menu"]');
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();
      await expect(page.locator('text=About')).toBeVisible();
      await menuBtn.click();
      await expect(page.locator('text=About')).not.toBeVisible();
    });

    test('Desktop nav hidden on mobile, visible on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator('[class*="hidden lg:flex"]')).not.toBeVisible();
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await expect(page.locator('[class*="hidden lg:flex"] a').first()).toBeVisible();
    });
  });

  // IMAGE LOADING & ASSETS
  test.describe('Images and Assets', () => {
    test('Favicon linked', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('link[rel="icon"]')).toBeAttached();
    });

    test('Open Graph image referenced', async ({ page }) => {
      await page.goto('/');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toContain('/og-image.png');
    });

    test('SVG icons render', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('svg').first()).toBeAttached();
    });
  });

  // CONSOLE ERRORS
  test.describe('Console Errors', () => {
    const pagesToTest = ['/', '/about', '/admissions', '/contact'];

    for (const url of pagesToTest) {
      test(`No console errors on ${url}`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') errors.push(msg.text());
        });
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        const criticalErrors = errors.filter(e =>
          !e.includes('favicon') && !e.includes('404') && !e.includes('net::ERR')
        );
        expect(criticalErrors).toHaveLength(0);
      });
    }
  });

  // KEYBOARD NAVIGATION & FOCUS STATES
  test.describe('Keyboard Navigation & Focus', () => {
    test('Skip link present', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('a[href="#main-content"]')).toHaveText('Skip to main content');
    });

    test('Main content has proper ID', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('#main-content')).toBeAttached();
    });

    test('Elements are focusable', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeAttached();
    });

    test('Buttons show focus state', async ({ page }) => {
      await page.goto('/admissions/apply');
      await page.locator('button:has-text("Continue")').first().focus();
      await expect(page.locator('button:has-text("Continue")').first()).toBeFocused();
    });

    test('Form inputs are focusable', async ({ page }) => {
      await page.goto('/contact');
      await page.locator('#name').focus();
      await expect(page.locator('#name')).toBeFocused();
    });
  });

  // SEO METADATA & CRAWLABILITY
  test.describe('SEO & Metadata', () => {
    test('Home page has title', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/SchoolName/);
    });

    test('Home page has meta description', async ({ page }) => {
      await page.goto('/');
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
    });

    test('Home page has Open Graph metadata', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('meta[property="og:title"]')).toBeAttached();
      await expect(page.locator('meta[property="og:description"]')).toBeAttached();
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    });

    test('HTML has language attribute', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('Page-specific titles', async ({ page }) => {
      await page.goto('/about');
      await expect(page).toHaveTitle(/About/);
      await page.goto('/admissions');
      await expect(page).toHaveTitle(/Admissions/);
      await page.goto('/contact');
      await expect(page).toHaveTitle(/Contact/);
    });

    test('Robots.txt accessible', async ({ page }) => {
      const response = await page.goto('/robots.txt');
      expect(response?.status()).toBe(200);
    });

    test('Sitemap accessible', async ({ page }) => {
      const response = await page.goto('/sitemap.xml');
      expect(response?.status()).toBe(200);
    });

    test('Semantic HTML elements present', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('header')).toBeAttached();
      await expect(page.locator('main')).toBeAttached();
      await expect(page.locator('footer')).toBeAttached();
      await expect(page.locator('nav')).toBeAttached();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h2')).toBeVisible();
    });
  });

  // PERFORMANCE
  test.describe('Performance', () => {
    test('Home page loads within reasonable time', async ({ page }) => {
      const start = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - start;
      expect(loadTime).toBeLessThan(10000);
    });

    test('Fonts load properly', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('link[href*="fonts.googleapis.com"]').first()).toBeAttached();
    });
  });

  // ACCESSIBILITY
  test.describe('Accessibility', () => {
    test('Social links have aria-labels', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(page.locator('a[aria-label="Facebook"]')).toBeAttached();
      await expect(page.locator('a[aria-label="Twitter"]')).toBeAttached();
      await expect(page.locator('a[aria-label="Instagram"]')).toBeAttached();
    });

    test('Form inputs have labels', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.locator('label[for="name"]')).toBeVisible();
      await expect(page.locator('label[for="email"]')).toBeVisible();
    });

    test('Images have alt attributes', async ({ page }) => {
      await page.goto('/');
      const imgsWithoutAlt = await page.evaluate(() => {
        return document.querySelectorAll('img:not([alt])').length;
      });
      expect(imgsWithoutAlt).toBeLessThan(5);
    });
  });

  // BROKEN LINKS - Internal Navigation
  test.describe('Broken Links - Internal Navigation', () => {
    const links = [
      { selector: 'a[href="/about"]' },
      { selector: 'a[href="/academics"]' },
      { selector: 'a[href="/admissions"]' },
      { selector: 'a[href="/contact"]' },
      { selector: 'a[href="/news"]' },
      { selector: 'a[href="/events"]' },
      { selector: 'a[href="/faq"]' },
      { selector: 'a[href="/gallery"]' },
      { selector: 'a[href="/student-life"]' },
      { selector: 'a[href="/facilities"]' },
      { selector: 'a[href="/privacy"]' },
      { selector: 'a[href="/terms"]' },
    ];

    for (const link of links) {
      test(`${link.selector} from home page works`, async ({ page }) => {
        await page.goto('/');
        await page.locator(link.selector).first().click();
        await expect(page).toHaveURL(/\//);
      });
    }
  });

  // CONTENT VERIFICATION
  test.describe('Content Verification', () => {
    test('Home page hero content', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('Building Future Leaders');
      await expect(page.locator('h1')).toContainText('Excellence in Education');
    });

    test('About page sections', async ({ page }) => {
      await page.goto('/about');
      await expect(page.locator('text=Our Story')).toBeVisible();
      await expect(page.locator('text=Our Mission')).toBeVisible();
      await expect(page.locator('text=Our Vision')).toBeVisible();
      await expect(page.locator('text=Our Values')).toBeVisible();
    });

    test('Admissions page content', async ({ page }) => {
      await page.goto('/admissions');
      await expect(page.locator('text=Admission Process')).toBeVisible();
      await expect(page.locator('text=Admission Requirements')).toBeVisible();
      await expect(page.locator('text=Important Dates')).toBeVisible();
    });

    test('Academics page programs', async ({ page }) => {
      await page.goto('/academics');
      await expect(page.locator('text=Early Years Foundation Stage')).toBeVisible();
      await expect(page.locator('text=Primary School')).toBeVisible();
      await expect(page.locator('text=Secondary School')).toBeVisible();
    });

    test('Contact page information', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.locator('text=Lagos, Nigeria')).toBeVisible();
      await expect(page.locator('text=info@schoolname.edu')).toBeVisible();
      await expect(page.locator('text=+234')).toBeVisible();
    });
  });

  // USER INTERACTIONS
  test.describe('User Interactions', () => {
    test('Mobile menu closes after link click', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.locator('button[aria-label="Toggle menu"]').click();
      await expect(page.locator('[class*="border-t"]').first()).toBeVisible();
      await page.locator('text=About').first().click();
      await expect(page).toHaveURL(/\/about/);
    });

    test('Loading state during form submission', async ({ page }) => {
      await page.goto('/contact');
      await page.fill('#name', 'Test');
      await page.fill('#email', 'test@example.com');
      await page.fill('#message', 'Test');
      const btn = page.locator('button:has-text("Send Message")');
      await btn.click();
      await expect(btn).toBeDisabled();
      await expect(btn).toContainText('Sending');
      await page.waitForTimeout(2000);
      await expect(btn).toBeEnabled();
    });
  });
});
