import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Laptop,
  HelpCircle,
  FolderGit2,
  Wrench,
  Award,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import { Button, Badge, Card } from '../components/ui';

interface CourseDetailProps {
  courseCode?: string;
  onNavigate?: (page: string, subSection?: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ courseCode: propCourseCode }) => {
  const params = useParams<{ courseCode: string }>();
  const navigate = useNavigate();

  const codeParam = (propCourseCode || params.courseCode || 'adca').toLowerCase().replace(/-/g, ' ');

  // Find matching course or fallback to ADCA
  const course = coursesData.find((c) => {
    const cleanCode = c.code.toLowerCase();
    const cleanId = c.id.toLowerCase();
    return cleanCode === codeParam || cleanId === codeParam || cleanCode.replace(/\s+/g, '') === codeParam.replace(/\s+/g, '');
  }) || coursesData[0];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const otherCourses = coursesData.filter((c) => c.code !== course.code);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-white transition-colors">
            Courses
          </Link>
          <span>/</span>
          <span className="text-apex-yellow-400 font-semibold">{course.code}</span>
        </div>

        <Link to="/courses">
          <Button size="sm" variant="outline" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            View All Courses
          </Button>
        </Link>
      </div>

      {/* Hero Section of Course */}
      <div className="relative rounded-3xl bg-gradient-to-tr from-apex-blue-950/90 via-slate-900 to-slate-900 border border-apex-blue-500/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-sm font-bold px-3 py-1 rounded-xl bg-apex-blue-900 text-apex-blue-300 border border-apex-blue-500/40">
              {course.code}
            </span>
            {course.isNew && (
              <Badge variant="red" size="md" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                NEW COURSE ADDED
              </Badge>
            )}
            {course.isPopular && (
              <Badge variant="yellow" size="md">
                HIGH ENROLLMENT
              </Badge>
            )}
            <Badge variant="blue" size="md">
              {course.level} Level
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight">
            {course.name}
          </h1>

          <p className="text-base sm:text-lg text-apex-yellow-300 font-medium italic">
            "{course.tagline}"
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-apex-yellow-400" /> Duration
              </span>
              <p className="text-base font-bold text-white font-mono">{course.duration}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-apex-blue-400" /> Eligibility
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white line-clamp-1">{course.eligibility}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                <Laptop className="w-3.5 h-3.5 text-emerald-400" /> Lab Ratio
              </span>
              <p className="text-base font-bold text-emerald-400 font-mono">1 : 1 Dedicated</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Accreditation
              </span>
              <p className="text-xs sm:text-sm font-semibold text-cyan-300">ISO 9001:2015</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              size="lg"
              variant="yellow"
              onClick={() => navigate('/contact')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enroll in {course.code} Batch
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const el = document.getElementById('syllabus-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Explore Full Syllabus
            </Button>
          </div>
        </div>
      </div>

      {/* Grid: Left Syllabus & Tools | Right Sidebar Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (8 cols): Syllabus & Curriculum */}
        <div className="lg:col-span-8 space-y-12">
          {/* Detailed Syllabus Modules */}
          <div id="syllabus-section" className="space-y-6">
            <div className="space-y-2">
              <Badge variant="blue" size="md">
                Course Curriculum
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Detailed Module & Topic Breakdown
              </h2>
              <p className="text-sm text-slate-400">
                Every topic is accompanied by hands-on practical computer assignments in our lab.
              </p>
            </div>

            <div className="space-y-5">
              {course.modules.map((mod, mIdx) => (
                <Card key={mIdx} variant="glass" className="p-6 sm:p-7 space-y-4 border border-slate-800">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-apex-blue-700 to-apex-blue-600 text-white flex items-center justify-center text-sm font-mono font-bold shadow-md">
                      0{mIdx + 1}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white">
                      {mod.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 pt-1">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Software Tools Mastered */}
          {course.toolsCovered && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-apex-yellow-400" />
                  Software Applications & Tools Mastered
                </h3>
                <p className="text-xs text-slate-400">
                  You will practice directly on latest licensed corporate software versions.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {course.toolsCovered.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center flex flex-col items-center justify-center gap-2"
                  >
                    <Laptop className="w-5 h-5 text-apex-blue-400" />
                    <span className="text-xs font-semibold text-slate-200">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Projects */}
          {course.practicalProjects && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-emerald-400" />
                  Real-World Practical Lab Projects
                </h3>
                <p className="text-xs text-slate-400">
                  Projects completed by every student to build a verified workplace portfolio.
                </p>
              </div>

              <div className="space-y-2.5">
                {course.practicalProjects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
                  >
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-apex-yellow-400 shrink-0 mt-0.5">
                      Project #{pIdx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-200">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="blue" size="sm">
                  Course Clarifications
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {course.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                        isOpen
                          ? 'bg-slate-900 border-slate-700 shadow-md ring-1 ring-apex-yellow-400/20'
                          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full text-left px-5 py-4 sm:px-6 sm:py-4.5 font-semibold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer transition-colors"
                      >
                        <span className={`${isOpen ? 'text-apex-yellow-400 font-bold' : 'text-slate-100'} transition-colors leading-snug`}>
                          {faq.question}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? 'bg-apex-yellow-400/20 text-apex-yellow-400 rotate-180'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-3 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40 animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Enrollment Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Direct Enrollment Card */}
          <Card variant="glass" className="p-6 sm:p-7 space-y-6 border border-slate-800 sticky top-28">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-apex-yellow-400">
                Admissions Open
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Reserve Your Computer Station
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Batches run morning (7 AM) to evening (7 PM). Seats are limited to guarantee 1:1 computer ratio.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Course Code</span>
                <span className="font-bold text-white font-mono">{course.code}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Duration</span>
                <span className="font-bold text-apex-yellow-300 font-mono">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Daily Lab Time</span>
                <span className="font-bold text-white">1 - 2 Hours Practice</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Batch Timing</span>
                <span className="font-bold text-white">Flexible Shifts</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Certificate</span>
                <span className="font-bold text-emerald-400">ISO 9001:2015 Approved</span>
              </div>
            </div>

            <Button
              variant="yellow"
              fullWidth
              size="lg"
              onClick={() => navigate('/contact')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Inquire for This Course
            </Button>

            <div className="text-center">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-1.5 text-xs text-apex-blue-300 hover:text-white transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Need guidance? Call +91 98765 43210</span>
              </a>
            </div>
          </Card>

          {/* Certificate Awarded Card */}
          <Card variant="glass" className="p-6 space-y-3 border border-slate-800">
            <div className="flex items-center gap-2 text-apex-yellow-400">
              <Award className="w-5 h-5" />
              <h4 className="text-sm font-bold font-display text-white">
                Official Certification
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upon passing the examination, students are awarded an official ISO 9001:2015 accredited diploma valid across public and private sector job applications.
            </p>
            <Link
              to="/portal"
              className="inline-block text-xs font-semibold text-apex-blue-400 hover:text-apex-blue-300 transition-colors"
            >
              Verify Certificate Demo &rarr;
            </Link>
          </Card>
        </div>
      </div>

      {/* Switcher to Other Courses */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <h3 className="text-xl font-bold font-display text-white">
          Explore Other Career Programs at Apex
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherCourses.map((c) => (
            <Link
              key={c.code}
              to={`/courses/${c.id}`}
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-apex-blue-500/50 text-left transition-all group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-apex-blue-950 text-apex-blue-300">
                  {c.code}
                </span>
                <span className="text-[11px] text-apex-yellow-400 font-mono">{c.duration}</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-apex-yellow-400 transition-colors line-clamp-1">
                {c.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
