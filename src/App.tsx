import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Exercise from './pages/Exercise';
import Diet from './pages/Diet';
import Plan30Day from './pages/Plan30Day';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BMICalculator from './components/BMICalculator';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/exercises" element={<Exercise />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/plan" element={<Plan30Day />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
