import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { WhyApex } from './pages/WhyApex';
import { Faculty } from './pages/Faculty';
import { LabTour } from './pages/LabTour';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { CertificatePortal } from './pages/CertificatePortal';
import { useAuth } from './hooks/useAuth';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location} key={location.pathname}>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
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
