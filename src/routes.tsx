import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import {
  Accessibility,
  Careers,
  Cookies,
  Disclaimer,
  Help,
  Press,
  Privacy,
  Sitemap,
  Terms,
} from '@/pages/legal';

// Code-split heavy pages so each route ships its own chunk.
const Home = lazy(() => import('@/pages/Home'));
const Workouts = lazy(() => import('@/pages/Workouts'));
const Nutrition = lazy(() => import('@/pages/Nutrition'));
const Calculators = lazy(() => import('@/pages/Calculators'));
const CalculatorDetail = lazy(() => import('@/pages/CalculatorDetail'));
const Programs = lazy(() => import('@/pages/Programs'));
const AICoach = lazy(() => import('@/pages/AICoach'));
const Blog = lazy(() => import('@/pages/Blog'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/calculators/:slug" element={<CalculatorDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/ai-coach" element={<AICoach />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        {/* Legal & info */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/help" element={<Help />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/sitemap" element={<Sitemap />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
