import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HeroSkeleton } from './components/skeletons/HeroSkeleton';
import { useAuth } from './hooks/useAuth';

import { Home } from './pages/Home';

// Route-level code splitting with React.lazy for secondary routes
const Courses = React.lazy(() => import('./pages/Courses').then((m) => ({ default: m.Courses })));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail').then((m) => ({ default: m.CourseDetail })));
const WhyApex = React.lazy(() => import('./pages/WhyApex').then((m) => ({ default: m.WhyApex })));
const Faculty = React.lazy(() => import('./pages/Faculty').then((m) => ({ default: m.Faculty })));
const LabTour = React.lazy(() => import('./pages/LabTour').then((m) => ({ default: m.LabTour })));
const Contact = React.lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const About = React.lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const CertificatePortal = React.lazy(() => import('./pages/CertificatePortal').then((m) => ({ default: m.CertificatePortal })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="flex-1 flex flex-col animate-fade-in">
      <Suspense fallback={<div className="pt-24 px-4 max-w-7xl mx-auto w-full"><HeroSkeleton /></div>}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseCode" element={<CourseDetail />} />
          <Route path="/why-apex" element={<WhyApex />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/lab-tour" element={<LabTour />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:section" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal" element={<CertificatePortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-apex-yellow-400 selection:text-slate-950">
        {/* Navigation Bar */}
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />

        {/* Main Content with Route Transitions */}
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
