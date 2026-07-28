import { ContentPage } from './ContentPage';
import { Link } from 'react-router-dom';

const UPDATED = 'July 1, 2026';

export function Privacy() {
  return (
    <ContentPage
      title="Privacy Policy"
      subtitle="How SmartFit handles your information — in plain language."
      path="/privacy"
      updated={UPDATED}
      sections={[
        {
          heading: 'Overview',
          body: [
            'SmartFit is built privacy-first. The calculators and AI Coach run entirely in your browser, and your inputs are stored locally on your device by default — not on our servers.',
          ],
        },
        {
          heading: 'Information we collect',
          body: [
            'If you subscribe to our newsletter or contact us, we collect the details you provide (such as your email address and message).',
            'We may collect anonymous, aggregated analytics to understand how the product is used and to improve it. This never includes your health metrics.',
          ],
        },
        {
          heading: 'How we use information',
          body: [
            'To respond to your enquiries, send updates you have opted into, and improve SmartFit. We never sell your personal data to third parties.',
          ],
        },
        {
          heading: 'Your choices',
          body: [
            'You can unsubscribe from emails at any time, clear locally-stored data from your browser, and request deletion of any information you have shared with us.',
          ],
        },
        {
          heading: 'Contact',
          body: ['Questions about privacy? Email hello@smartfit.app and we will respond promptly.'],
        },
      ]}
    />
  );
}

export function Terms() {
  return (
    <ContentPage
      title="Terms & Conditions"
      subtitle="The agreement between you and SmartFit."
      path="/terms"
      updated={UPDATED}
      sections={[
        {
          heading: 'Acceptance of terms',
          body: ['By using SmartFit, you agree to these terms. If you do not agree, please do not use the service.'],
        },
        {
          heading: 'Use of the service',
          body: [
            'SmartFit provides fitness and nutrition information for educational purposes. You agree to use it lawfully and not to misuse or attempt to disrupt the service.',
          ],
        },
        {
          heading: 'Health disclaimer',
          body: [
            'Content on SmartFit is not medical advice. Always consult a qualified professional before beginning any exercise or nutrition program, especially if you have a health condition.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: ['All SmartFit branding, content and code are owned by SmartFit and protected by law.'],
        },
        {
          heading: 'Changes',
          body: ['We may update these terms from time to time. Continued use constitutes acceptance of the updated terms.'],
        },
      ]}
    />
  );
}

export function Cookies() {
  return (
    <ContentPage
      title="Cookie Policy"
      subtitle="How and why SmartFit uses cookies and local storage."
      path="/cookies"
      updated={UPDATED}
      sections={[
        {
          heading: 'What we use',
          body: [
            'SmartFit uses essential local storage to remember your theme preference and any inputs you save. We do not use advertising or cross-site tracking cookies.',
          ],
        },
        {
          heading: 'Managing cookies',
          body: ['You can clear local storage and cookies at any time from your browser settings.'],
        },
      ]}
    />
  );
}

export function Disclaimer() {
  return (
    <ContentPage
      title="Disclaimer"
      subtitle="Important information about using SmartFit content."
      path="/disclaimer"
      updated={UPDATED}
      sections={[
        {
          heading: 'Not medical advice',
          body: [
            'All content — including workouts, nutrition guidance and calculator results — is for general informational and educational purposes only and is not a substitute for professional medical advice, diagnosis or treatment.',
          ],
        },
        {
          heading: 'Assumption of risk',
          body: [
            'Physical exercise carries inherent risks. By following any SmartFit content, you do so at your own risk and take full responsibility for your health and safety.',
          ],
        },
        {
          heading: 'Accuracy',
          body: ['Calculator results are estimates based on established formulas and may not reflect your individual physiology.'],
        },
      ]}
    />
  );
}

export function Accessibility() {
  return (
    <ContentPage
      eyebrow="Commitment"
      title="Accessibility"
      subtitle="SmartFit is designed to be usable by everyone."
      path="/accessibility"
      updated={UPDATED}
      sections={[
        {
          heading: 'Our commitment',
          body: [
            'We aim to meet WCAG 2.1 AA standards. SmartFit is built with semantic HTML, keyboard navigation, visible focus states, sufficient colour contrast and screen-reader-friendly labels.',
          ],
        },
        {
          heading: 'Ongoing work',
          body: [
            'Accessibility is never finished. We continuously test and improve. If you encounter a barrier, please email hello@smartfit.app so we can fix it.',
          ],
        },
      ]}
    />
  );
}

export function Help() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Help Center"
      subtitle="Answers and guidance for getting the most out of SmartFit."
      path="/help"
      sections={[
        {
          heading: 'Getting started',
          body: [
            'New to SmartFit? Start with a program that matches your goal, use the calculators to set your calorie and protein targets, then let the AI Coach fill in the details.',
          ],
        },
        {
          heading: 'Calculators',
          body: ['Enter your details once on the Calculators page to see every metric, and download a PDF report to keep.'],
        },
        {
          heading: 'Still stuck?',
          body: ['Reach us any time at hello@smartfit.app — we usually reply within one business day.'],
        },
      ]}
    />
  );
}

export function Careers() {
  return (
    <ContentPage
      eyebrow="Join us"
      title="Careers"
      subtitle="Help us build the calmest, most credible fitness platform on the web."
      path="/careers"
      sections={[
        {
          heading: 'Why SmartFit',
          body: [
            'We are a small, remote-friendly team that values craft, evidence and kindness. We ship thoughtfully and look after each other.',
          ],
        },
        {
          heading: 'Open roles',
          body: [
            'We are always keen to meet talented engineers, designers, coaches and dietitians. Send your story and portfolio to careers@smartfit.app.',
          ],
        },
      ]}
    />
  );
}

export function Press() {
  return (
    <ContentPage
      eyebrow="Newsroom"
      title="Press & Media"
      subtitle="Brand assets, facts and contacts for journalists and partners."
      path="/press"
      sections={[
        {
          heading: 'About SmartFit',
          body: ['SmartFit is a premium, privacy-first fitness platform serving 250,000+ members across 90+ countries.'],
        },
        {
          heading: 'Media enquiries',
          body: ['For interviews, assets or partnership enquiries, contact press@smartfit.app.'],
        },
      ]}
    />
  );
}

export function Sitemap() {
  const linkClass = "text-primary hover:underline hover:text-primary/80 transition-colors mr-3";
  return (
    <ContentPage
      eyebrow="Navigation"
      title="Sitemap"
      subtitle="Every corner of SmartFit, in one place."
      path="/sitemap"
      sections={[
        {
          heading: 'Main',
          body: [
            <div className="flex flex-wrap gap-2">
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/workouts" className={linkClass}>Workouts</Link>
              <Link to="/nutrition" className={linkClass}>Nutrition</Link>
              <Link to="/calculators" className={linkClass}>Calculators</Link>
              <Link to="/programs" className={linkClass}>Programs</Link>
              <Link to="/ai-coach" className={linkClass}>AI Coach</Link>
              <Link to="/blog" className={linkClass}>Blog</Link>
              <Link to="/about" className={linkClass}>About</Link>
              <Link to="/contact" className={linkClass}>Contact</Link>
            </div>
          ]
        },
        {
          heading: 'Account',
          body: [
            <div className="flex flex-wrap gap-2">
              <Link to="/dashboard" className={linkClass}>Dashboard</Link>
              {/* Other paths are not yet implemented as routes, but keeping them as text or placeholder links */}
              <span className="text-muted mr-3">Profile (Coming Soon)</span>
              <span className="text-muted mr-3">Settings (Coming Soon)</span>
              <span className="text-muted mr-3">Progress (Coming Soon)</span>
              <span className="text-muted mr-3">Achievements (Coming Soon)</span>
            </div>
          ]
        },
        {
          heading: 'Legal',
          body: [
            <div className="flex flex-wrap gap-2">
              <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
              <Link to="/terms" className={linkClass}>Terms & Conditions</Link>
              <Link to="/cookies" className={linkClass}>Cookie Policy</Link>
              <Link to="/disclaimer" className={linkClass}>Disclaimer</Link>
              <Link to="/accessibility" className={linkClass}>Accessibility</Link>
            </div>
          ]
        },
        {
          heading: 'Company',
          body: [
            <div className="flex flex-wrap gap-2">
              <Link to="/careers" className={linkClass}>Careers</Link>
              <Link to="/press" className={linkClass}>Press</Link>
              <Link to="/help" className={linkClass}>Help Center</Link>
            </div>
          ]
        },
      ]}
    />
  );
}
