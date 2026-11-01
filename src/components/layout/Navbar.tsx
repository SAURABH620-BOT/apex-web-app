import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Award,
  Building,
  FileCheck,
  Briefcase,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Compass,
  Laptop
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../helpers/cn';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);

  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const coursesDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target as Node)) {
        setIsAboutOpen(false);
      }
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(e.target as Node)) {
        setIsCoursesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsAboutOpen(false);
    setIsCoursesOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Mutually exclusive dropdown handlers
  const handleOpenCourses = () => {
    setIsAboutOpen(false);
    setIsCoursesOpen(true);
  };

  const handleToggleCourses = () => {
    setIsCoursesOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        setIsAboutOpen(false);
      }
      return willOpen;
    });
  };

  const handleOpenAbout = () => {
    setIsCoursesOpen(false);
    setIsAboutOpen(true);
  };

  const handleToggleAbout = () => {
    setIsAboutOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        setIsCoursesOpen(false);
      }
      return willOpen;
    });
  };

  const aboutDropdownItems = [
    {
      id: 'about-ica',
      title: 'About ICA',
      desc: 'National Institute of Computer Academics network',
      icon: ShieldCheck,
      badge: 'Accreditation'
    },
    {
      id: 'mission-vision',
      title: 'Mission & Vision',
      desc: 'Affordable, 100% practical IT training',
      icon: Compass,
      badge: 'Core Values'
    },
    {
      id: 'incorporation-certificate',
      title: 'Incorporation Certificate',
      desc: 'Ministry of Corporate Affairs registered',
      icon: Building,
      badge: 'MCA Govt'
    },
    {
      id: 'iso-certificate',
      title: 'ISO Certificate',
      desc: 'ISO 9001:2015 Quality Management',
      icon: Award,
      badge: 'ISO 9001'
    },
    {
      id: 'trademark',
      title: 'Trademark Registration',
      desc: 'Government recognized registered brand',
      icon: FileCheck,
      badge: 'Class 41 TM'
    },
    {
      id: 'msme',
      title: 'MSME Registration',
      desc: 'Govt. of India Udyam skill portal',
      icon: Briefcase,
      badge: 'Udyam'
    },
    {
      id: 'govt-affiliation',
      title: 'Govt. of India Affiliation',
      desc: 'Approved for government job applications',
      icon: GraduationCap,
      badge: 'Govt. Skill'
    },
    {
      id: 'pan-card',
      title: 'PAN Card Verification',
      desc: 'Income Tax Department registered entity',
      icon: CreditCard,
      badge: 'Tax Verified'
    },
    {
      id: 'central-vigilance',
      title: 'Central Vigilance Commission',
      desc: 'National ethical integrity pledge',
      icon: CheckCircle2,
      badge: 'CVC Pledge'
    }
  ];

  const courseDropdownItems = [
    { slug: 'adca', code: 'ADCA', name: 'Advance Diploma in Computer Applications', duration: '12 Months', isPopular: true },
    { slug: 'dca', code: 'DCA', name: 'Diploma in Computer Applications', duration: '6 Months' },
    { slug: 'dfa', code: 'DFA', name: 'Diploma in Financial Accounting', duration: '6 Months' },
    { slug: 'dta', code: 'DTA', name: 'Diploma in Taxation & Accounting', duration: '6 Months' },
    { slug: 'office-work', code: 'Office Work', name: 'Office Work (MS Word, Excel & Tally)', duration: '3 Months', isNew: true }
  ];

  const isHomeActive = location.pathname === '/';
  const isCoursesActive = location.pathname.startsWith('/courses');
  const isWhyApexActive = location.pathname === '/why-apex';
  const isFacultyActive = location.pathname === '/faculty';
  const isLabTourActive = location.pathname === '/lab-tour';
  const isAboutActive = location.pathname.startsWith('/about');
  const isContactActive = location.pathname === '/contact';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={cn(
          'transition-all duration-300 border-b',
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-slate-800 shadow-2xl py-3'
            : 'bg-slate-950/90 backdrop-blur-md border-slate-800/80 py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-apex-blue-700 via-apex-blue-600 to-apex-yellow-400 flex items-center justify-center shadow-lg shadow-apex-blue-900/50 group-hover:scale-105 transition-transform">
              <Laptop className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-apex-yellow-400 transition-colors block leading-tight">
                APEX
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide leading-none mt-0.5">
                Institute of Computer
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={cn(
                'px-3 py-2 text-sm font-semibold rounded-lg transition-all',
                isHomeActive
                  ? 'text-apex-yellow-400 bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              )}
            >
              Home
            </Link>

            {/* Courses Dropdown (Clean, compact original design) */}
            <div className="relative" ref={coursesDropdownRef}>
              <button
                onClick={handleToggleCourses}
                onMouseEnter={handleOpenCourses}
                className={cn(
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer',
                  isCoursesActive
                    ? 'text-apex-yellow-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                )}
              >
                <span>Courses</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isCoursesOpen ? 'rotate-180 text-apex-yellow-400' : ''
                  )}
                />
              </button>

              {isCoursesOpen && (
                <div
                  onMouseLeave={() => setIsCoursesOpen(false)}
                  className="absolute left-0 mt-1 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 shadow-2xl p-2 z-50 animate-fadeIn"
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Career Diploma Programs
                    </p>
                  </div>
                  <div className="py-1">
                    {courseDropdownItems.map((course) => (
                      <Link
                        key={course.code}
                        to={`/courses/${course.slug}`}
                        onClick={() => setIsCoursesOpen(false)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/90 transition-colors flex items-center justify-between group block"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-100 group-hover:text-apex-yellow-400 transition-colors">
                              {course.code}
                            </span>
                            {course.isNew && (
                              <Badge variant="red" size="sm">
                                NEW 3M
                              </Badge>
                            )}
                            {course.isPopular && (
                              <Badge variant="yellow" size="sm">
                                POPULAR
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">{course.name}</p>
                        </div>
                        <span className="text-[11px] text-apex-blue-300 font-mono shrink-0 pl-2">
                          {course.duration}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-800 bg-slate-950/60 rounded-b-xl">
                    <Link
                      to="/courses"
                      onClick={() => setIsCoursesOpen(false)}
                      className="w-full py-2 px-3 text-xs font-bold text-center text-apex-blue-400 hover:text-apex-yellow-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1 block"
                    >
                      View All Courses Catalog &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/why-apex"
              className={cn(
                'px-3 py-2 text-sm font-semibold rounded-lg transition-all',
                isWhyApexActive
                  ? 'text-apex-yellow-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              )}
            >
              Why Apex
            </Link>

            <Link
              to="/faculty"
              className={cn(
                'px-3 py-2 text-sm font-semibold rounded-lg transition-all',
                isFacultyActive
                  ? 'text-apex-yellow-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              )}
            >
              Faculty
            </Link>

            <Link
              to="/lab-tour"
              className={cn(
                'px-3 py-2 text-sm font-semibold rounded-lg transition-all',
                isLabTourActive
                  ? 'text-apex-yellow-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              )}
            >
              Lab Tour
            </Link>

            {/* Mega Dropdown: About Us (Solid Dark High Contrast Background) */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={handleToggleAbout}
                onMouseEnter={handleOpenAbout}
                className={cn(
                  'px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer',
                  isAboutActive
                    ? 'text-apex-yellow-400 bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                )}
              >
                <span>About Us</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isAboutOpen ? 'rotate-180 text-apex-yellow-400' : ''
                  )}
                />
              </button>

              {isAboutOpen && (
                <div
                  onMouseLeave={() => setIsAboutOpen(false)}
                  className="absolute -left-36 mt-1 w-[560px] rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-4 z-50 animate-fadeIn"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                    <div>
                      <p className="text-xs uppercase font-extrabold tracking-wider text-apex-yellow-400">
                        Institutional Pedigree & Legal Standing
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Apex Institute of Computer affiliations & statutory certificates
                      </p>
                    </div>
                    <Badge variant="blue" size="sm">
                      Govt Recognized
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                    {aboutDropdownItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.id}
                          to={`/about/${item.id}`}
                          onClick={() => setIsAboutOpen(false)}
                          className="flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-slate-800/80 transition-colors group block"
                        >
                          <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-apex-blue-900/60 text-apex-blue-400 group-hover:text-apex-yellow-400 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-100 group-hover:text-white leading-tight">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-800 mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>Central & State Recognized Diplomas</span>
                    <Link
                      to="/about"
                      onClick={() => setIsAboutOpen(false)}
                      className="font-semibold text-apex-blue-400 hover:text-apex-blue-300"
                    >
                      View All Credentials &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={cn(
                'px-3 py-2 text-sm font-semibold rounded-lg transition-all',
                isContactActive
                  ? 'text-apex-yellow-400 bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              )}
            >
              Contact Us
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              size="sm"
              variant="yellow"
              onClick={() => navigate('/portal')}
              leftIcon={<Award className="w-3.5 h-3.5" />}
            >
              Request for Certificate
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/portal"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-apex-yellow-400 text-slate-950 font-display flex items-center gap-1 sm:hidden"
            >
              <Award className="w-3 h-3" />
              <span>Certificate</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-6 max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn">
          <div className="space-y-2">
            <Link
              to="/"
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 block"
            >
              Home
            </Link>

            {/* Courses Mobile Accordion */}
            <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-2">
              <button
                onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                className="w-full text-left px-2 py-2 font-semibold text-slate-200 hover:text-apex-yellow-400 flex items-center justify-between"
              >
                <span>Courses & Diplomas</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileCoursesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileCoursesOpen && (
                <div className="space-y-1 pt-1 border-t border-slate-800/80 mt-1 pl-2">
                  {courseDropdownItems.map((c) => (
                    <Link
                      key={c.code}
                      to={`/courses/${c.slug}`}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-apex-yellow-400 hover:bg-slate-800 flex items-center justify-between block"
                    >
                      <span>{c.code} - {c.name}</span>
                      <span className="text-[10px] text-apex-blue-300 font-mono">{c.duration}</span>
                    </Link>
                  ))}
                  <Link
                    to="/courses"
                    className="w-full text-center text-xs text-apex-blue-400 font-semibold py-2 block"
                  >
                    View All Courses Catalog &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/why-apex"
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 block"
            >
              Why Apex
            </Link>

            <Link
              to="/faculty"
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 block"
            >
              Faculty (Durgesh Sir, Nitish Kumar, Ashutosh Kumar)
            </Link>

            <Link
              to="/lab-tour"
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 block"
            >
              Lab Tour (High-Tech Computer Labs)
            </Link>

            {/* About Dropdown in Mobile */}
            <div className="pt-2 pb-1 border-t border-slate-800/80">
              <p className="px-4 text-xs uppercase font-extrabold tracking-wider text-apex-yellow-400 mb-2">
                About & Affiliations
              </p>
              <div className="space-y-1 pl-2">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/about/${item.id}`}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center justify-between block"
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.badge}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 border-t border-slate-800/80 block"
            >
              Contact Us & Inquiry Form
            </Link>

            <div className="pt-4 border-t border-slate-800">
              <Button
                variant="yellow"
                fullWidth
                size="md"
                onClick={() => navigate('/portal')}
                leftIcon={<Award className="w-4 h-4" />}
              >
                Request for Certificate
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
