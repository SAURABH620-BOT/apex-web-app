import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Laptop,
  Clock,
  ShieldCheck,
  Zap,
  Target,
  FileCheck
} from 'lucide-react';
import { heroSlidesData } from '../data/heroSlidesData';
import { coursesData } from '../data/coursesData';
import { facultyData } from '../data/facultyData';
import { testimonialsData } from '../data/testimonialsData';
import { Heading, Text, Button, Badge, Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto carousel timer (30 seconds per slide)
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlidesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlidesData.length) % heroSlidesData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 30000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = heroSlidesData[currentSlideIndex];

  const handleNav = (action: string, param?: string) => {
    if (onNavigate) {
      onNavigate(action, param);
      return;
    }
    if (action === 'courses') {
      if (param) navigate(`/courses/${param.toLowerCase().replace(/\s+/g, '-')}`);
      else navigate('/courses');
    } else if (action === 'course-detail') {
      navigate(`/courses/${(param || 'adca').toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      const target = action.startsWith('/') ? action : `/${action}`;
      navigate(target);
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ========================================================
          HERO SECTION WITH DYNAMIC AUTO-PLAYING CAROUSEL
         ======================================================== */}
      <section
        className="relative pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative min-h-[580px] sm:min-h-[620px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center">
          {/* Background Image Carousel with Framer Motion Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <img
                src={activeSlide.bgImage}
                alt="Apex Institute of Computer Campus & Labs"
                className={`w-full h-full object-cover ${activeSlide.imagePosition || 'object-center'} filter brightness-[0.65] contrast-[1.06] saturate-[1.08]`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/30" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Text Content with ample padding to prevent arrow overlap */}
          <div className="relative z-10 max-w-4xl pl-16 pr-14 sm:pl-24 sm:pr-20 md:pl-28 md:pr-24 lg:pl-32 lg:pr-20 py-10 sm:py-14 lg:py-16 pb-16 sm:pb-20 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Badge */}
                <div>
                  <Badge
                    variant={activeSlide.badgeColor}
                    size="lg"
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  >
                    {activeSlide.badge}
                  </Badge>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black font-display tracking-tight text-white leading-tight">
                  {activeSlide.title}{' '}
                  <span className="bg-gradient-to-r from-apex-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent underline decoration-apex-red-500/80 decoration-4 underline-offset-8">
                    {activeSlide.highlightedText}
                  </span>
                </h1>

                {/* Subtitle description */}
                <Text size="lg" className="text-slate-300 max-w-2xl">
                  {activeSlide.description}
                </Text>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    size="lg"
                    variant="yellow"
                    onClick={() => handleNav(activeSlide.primaryCtaAction)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {activeSlide.primaryCtaText}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleNav(activeSlide.secondaryCtaAction)}
                  >
                    {activeSlide.secondaryCtaText}
                  </Button>
                </div>

                {/* Live Stats Snippets */}
                <div className="pt-5 border-t border-slate-800/90 grid grid-cols-3 gap-4 max-w-md">
                  {activeSlide.stats.map((s, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <p className="text-lg sm:text-xl font-extrabold font-display text-white">
                        {s.value}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow (Vertically Centered on Left Border) */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-apex-yellow-400 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl group cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-apex-yellow-400 transition-colors" />
          </button>

          {/* Right Arrow (Vertically Centered on Right Border) */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-apex-yellow-400 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl group cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-apex-yellow-400 transition-colors" />
          </button>

          {/* Carousel Dots (Centered at Bottom) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-xl">
            {heroSlidesData.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-8 bg-apex-yellow-400 shadow-sm shadow-apex-yellow-400/50'
                    : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          KEY METRICS STRIP: 1500+ STUDENTS, 7+ YEARS EXPERIENCE
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-apex-blue-950/80 via-slate-900 to-apex-blue-950/80 border border-apex-blue-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-apex-yellow-400 font-display">
                1500+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1">
                Students Trained
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Across All Diploma Batches</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                7+ Years
              </span>
              <span className="text-xs sm:text-sm font-semibold text-apex-blue-300 mt-1">
                Apex Experience
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Excellence in IT Education</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-apex-red-400 font-display">
                100%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1">
                Practical Computer Labs
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">1:1 Dedicated PC Access</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display">
                ISO 9001
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1">
                Quality Certified
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Govt. Recognized Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED COURSES PREVIEW (STRICTLY NO FEES DISPLAYED)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="blue" size="md">
              Industry Standard Programs
            </Badge>
            <Heading level={2} gradient="blue-yellow">
              Professional Courses at Apex
            </Heading>
            <Text className="max-w-2xl text-slate-400">
              Designed for career success. Every course delivers practical, computer-based experience without redundant theory.
            </Text>
          </div>

          <Button
            variant="outline"
            onClick={() => handleNav('courses')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All 5 Diplomas
          </Button>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.slice(0, 3).map((course) => (
            <Card
              key={course.id}
              variant="interactive"
              className="flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-apex-blue-900 border border-apex-blue-500/40">
                      {course.code}
                    </span>
                    {course.isNew && (
                      <Badge variant="red" size="sm">
                        NEW
                      </Badge>
                    )}
                    {course.isPopular && (
                      <Badge variant="yellow" size="sm">
                        TOP RATED
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-apex-yellow-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-apex-yellow-400 transition-colors mb-2">
                  {course.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Key Competencies:
                  </p>
                  <ul className="space-y-1.5">
                    {course.skillsGained.slice(0, 3).map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">100% Practical Labs</span>
                <Button
                  size="sm"
                  variant="yellow"
                  onClick={() => handleNav('course-detail', course.code)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  View Course Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Highlight Banner: 3-Month Fast-Track Office Work */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-apex-red-500/40 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-glow-red">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="red" size="md">
                HOT NEW COURSE
              </Badge>
              <span className="text-xs text-slate-400 font-mono">Duration: 3 Months</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Office Work & Business Automation (MS Word, MS Excel & Tally Prime)
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
              Specially launched to make job seekers immediately employable in corporate, billing, and back-office roles within 90 days.
            </p>
          </div>

          <Button
            size="lg"
            variant="danger"
            onClick={() => handleNav('course-detail', 'office-work')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0"
          >
            Enroll in Office Work
          </Button>
        </div>
      </section>

      {/* ========================================================
          WHY CHOOSE APEX INSTITUTE
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="yellow" size="md">
            The Apex Advantage
          </Badge>
          <Heading level={2} gradient="none">
            Why Students & Parents Trust Apex Institute
          </Heading>
          <Text className="text-slate-400">
            Over 7+ years of continuous dedication to hands-on computer education, building futures for 1500+ successful alumni.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Laptop,
              title: '1:1 Computer Ratio Guaranteed',
              desc: 'Every student gets their own dedicated high-speed workstation during lab sessions. Zero screen sharing or passive watching.',
              color: 'text-apex-blue-400',
              bg: 'bg-apex-blue-950/60'
            },
            {
              icon: Users,
              title: 'Guidance by Durgesh Sir & Specialists',
              desc: 'Learn directly from BCA & MCA educators with over a decade of verified teaching credentials in accounting, systems, and coding.',
              color: 'text-apex-yellow-400',
              bg: 'bg-amber-950/60'
            },
            {
              icon: Zap,
              title: 'High-Speed Bilingual Typing Arena',
              desc: 'Dedicated touch-typing stations in both English and Hindi (Kruti Dev / Mangal) to guarantee 35-45+ WPM speeds for job tests.',
              color: 'text-apex-red-400',
              bg: 'bg-red-950/60'
            },
            {
              icon: ShieldCheck,
              title: 'ISO 9001:2015 & Govt. Recognized',
              desc: 'Diplomas recognized across central/state government departments, corporate hiring, and legal verification portals.',
              color: 'text-emerald-400',
              bg: 'bg-emerald-950/60'
            },
            {
              icon: Target,
              title: 'Live GST & Corporate Tally Practice',
              desc: 'Simulate real business company books, generate GST e-way bills, file tax invoices, and prepare balance sheets.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-950/60'
            },
            {
              icon: FileCheck,
              title: 'Instant Online Certificate Verification',
              desc: 'Secure digital portal for employers to instantly verify student certificates with unique roll numbers and digital credentials.',
              color: 'text-purple-400',
              bg: 'bg-purple-950/60'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} variant="glass" className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center border border-white/10`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h4 className="text-lg font-bold font-display text-white">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FACULTY HIGHLIGHT PREVIEW
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="blue" size="md">
              Experienced Educators
            </Badge>
            <Heading level={2} gradient="blue-yellow">
              Meet Our Expert Faculty
            </Heading>
            <Text className="text-slate-400 max-w-2xl">
              Led by Durgesh Sir, our seasoned faculty brings a combined 18+ years of dedicated computer training and taxation mastery.
            </Text>
          </div>

          <Button
            variant="outline"
            onClick={() => handleNav('faculty')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View Full Faculty Profiles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facultyData.map((f) => (
            <Card key={f.id} variant="interactive" className="text-center flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-apex-blue-600 via-apex-blue-500 to-apex-yellow-400 shadow-xl">
                  <img
                    src={f.avatarUrl}
                    alt={f.name}
                    className="w-full h-full rounded-full object-cover object-top bg-slate-900"
                  />
                </div>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-apex-yellow-400 text-slate-950 text-[11px] font-bold font-display shadow-lg border-2 border-slate-900 z-10">
                  {f.experienceText}
                </span>
              </div>

              <h4 className="text-lg font-bold font-display text-white">{f.name}</h4>
              <p className="text-xs text-apex-blue-300 font-semibold mb-1">{f.designation}</p>
              <p className="text-[11px] text-slate-400 font-mono mb-3">{f.qualification}</p>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {f.specialization}
              </p>

              <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                {f.keySkills.slice(0, 3).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================
          TESTIMONIALS & ALUMNI SUCCESS
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="yellow" size="md">
            Alumni Voices
          </Badge>
          <Heading level={2} gradient="none">
            What Our 1500+ Graduates Say
          </Heading>
          <Text className="text-slate-400">
            Read inspiring feedback from students now working across government offices, multinational corporations, and accounting firms.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((t) => (
            <Card key={t.id} variant="glass" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-apex-blue-500/40"
                />
                <div>
                  <h5 className="text-xs font-bold text-white">{t.name}</h5>
                  <p className="text-[10px] text-apex-yellow-400 font-semibold">{t.currentRole}</p>
                  <p className="text-[10px] text-slate-500">{t.companyOrDept}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================
          CALL TO ACTION (CTA) SECTION
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-apex-blue-900 via-slate-900 to-indigo-950 border border-apex-blue-500/40 p-8 sm:p-14 overflow-hidden shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Badge variant="yellow" size="lg" leftIcon={<Sparkles className="w-4 h-4" />}>
              Admissions Open for Next Batch
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white">
              Ready to Accelerate Your Career at{' '}
              <span className="text-apex-yellow-400">Apex Institute?</span>
            </h2>

            <Text size="lg" className="text-slate-300">
              Join 1500+ successful graduates. Visit our modern computer lab, speak with Durgesh Sir, and book a free interactive demo class today.
            </Text>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="yellow"
                onClick={() => handleNav('contact')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Free Inquiry
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNav('portal')}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Verify Existing Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
