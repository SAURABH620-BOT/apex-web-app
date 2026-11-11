import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import type { Course } from '../types/course';
import { Heading, Text, Button, Badge, Card, Modal } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

interface CoursesProps {
  onNavigate?: (page: string, subSection?: string) => void;
  selectedCourseCode?: string;
}

export const Courses: React.FC<CoursesProps> = ({ onNavigate, selectedCourseCode }) => {
  useSEO({
    title: 'Computer Courses in Gaya | ADCA, DCA, Tally Prime & DTP - Apex Institute',
    description: 'Explore job-oriented computer diploma courses at Apex Institute Gaya. ADCA, DCA, DFA (Tally Prime), DTP & MS Office with 100% practical lab training & affordable fees.',
    keywords: 'Computer Courses in Gaya, ADCA Course in Gaya, DCA Course in Gaya, Tally Classes in Gaya, DTP Course in Gaya, Computer Training Gaya, Professional Computer Courses in Gaya',
    canonicalPath: '/courses',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Computer Courses at Apex Institute Gaya',
      'itemListElement': coursesData.map((course, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'Course',
          'name': course.name,
          'description': course.description,
          'provider': {
            '@type': 'EducationalOrganization',
            'name': 'Apex Institute',
            'url': 'https://apexinstitute.in'
          },
          'url': `https://apexinstitute.in/courses/${course.id}`
        }
      }))
    }
  });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | '12 Months' | '6 Months' | '3 Months' | 'New'>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  // Auto-open modal if navigated with specific course code
  React.useEffect(() => {
    if (selectedCourseCode) {
      const found = coursesData.find((c) => c.code.toLowerCase() === selectedCourseCode.toLowerCase());
      if (found) {
        setActiveCourseModal(found);
      }
    }
  }, [selectedCourseCode]);

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skillsGained.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesFilter = true;
      if (selectedFilter === '12 Months') matchesFilter = course.duration.includes('12');
      else if (selectedFilter === '6 Months') matchesFilter = course.duration.includes('6');
      else if (selectedFilter === '3 Months') matchesFilter = course.duration.includes('3');
      else if (selectedFilter === 'New') matchesFilter = !!course.isNew;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="blue" size="lg" leftIcon={<GraduationCap className="w-4 h-4" />}>
          Certified Career Diplomas
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Industry-Focused Computer Courses
        </Heading>
        <Text size="lg" className="text-slate-300">
          Curated by Apex Institute of Computer to transform learners into proficient IT specialists, accounting professionals, and office executives.
        </Text>
      </div>

      {/* Notice Banner: Zero Fees Displayed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-apex-blue-950/80 text-apex-blue-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              Official Government Affiliated & ISO 9001:2015 Approved Diplomas
            </p>
            <p className="text-xs text-slate-400">
              For batch schedules, installment options, and scholarship eligibility, please submit a free inquiry or visit our center.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (onNavigate) onNavigate('contact');
            else navigate('/contact');
          }}
          className="shrink-0 hidden sm:inline-flex"
        >
          Inquire Now
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course code or skill..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 text-slate-100 placeholder-slate-500 rounded-xl border border-slate-700/80 text-sm focus:outline-none focus:border-apex-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Duration:
          </span>
          {(['All', '12 Months', '6 Months', '3 Months', 'New'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-apex-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            variant="interactive"
            className="flex flex-col justify-between h-full group"
          >
            <div>
              {/* Badges and Duration */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-apex-blue-900 text-apex-blue-300 border border-apex-blue-500/30">
                    {course.code}
                  </span>
                  {course.isNew && (
                    <Badge variant="red" size="sm" leftIcon={<Sparkles className="w-3 h-3" />}>
                      NEW COURSE
                    </Badge>
                  )}
                  {course.isPopular && (
                    <Badge variant="yellow" size="sm">
                      POPULAR
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-apex-yellow-400" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Course Title */}
              <h3 className="text-xl font-bold font-display text-white group-hover:text-apex-yellow-400 transition-colors mb-2">
                {course.name}
              </h3>

              <p className="text-xs text-apex-blue-300 font-medium mb-3 italic">
                "{course.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Skills Gained list */}
              <div className="space-y-2 mb-6">
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  What You Will Master:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {course.skillsGained.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mb-6">
                <span className="font-semibold text-slate-300">Eligibility: </span>
                {course.eligibility}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (onNavigate) onNavigate('course-detail', course.code);
                  else navigate(`/courses/${course.id}`);
                }}
                leftIcon={<BookOpen className="w-3.5 h-3.5" />}
              >
                View Course Page
              </Button>

              <Button
                size="sm"
                variant="yellow"
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  else navigate('/contact');
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Inquire Batch
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-lg font-bold text-white">No courses match your search.</h4>
          <p className="text-sm text-slate-400">
            Try adjusting your search query or reset the filter.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* ========================================================
          DETAILED COURSE SYLLABUS MODAL
         ======================================================== */}
      {activeCourseModal && (
        <Modal
          isOpen={!!activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
          title={
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-apex-blue-900 text-apex-blue-300">
                {activeCourseModal.code}
              </span>
              <span>{activeCourseModal.name}</span>
            </div>
          }
          description={`${activeCourseModal.duration} &bull; ${activeCourseModal.level} Level &bull; 100% Practical Labs`}
          size="xl"
        >
          <div className="space-y-6 text-slate-300">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeCourseModal.description}
            </p>

            {/* Syllabus Modules Breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase font-bold tracking-wider text-apex-yellow-400 font-display">
                Detailed Curriculum & Module Breakdown
              </h4>

              <div className="space-y-3">
                {activeCourseModal.modules.map((mod, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
                  >
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-apex-blue-900 text-apex-blue-300 flex items-center justify-center text-xs font-mono">
                        {mIdx + 1}
                      </span>
                      {mod.title}
                    </h5>

                    <ul className="grid grid-cols-1 gap-2 pl-7">
                      {mod.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm uppercase font-bold tracking-wider text-white font-display flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-apex-yellow-400" />
                Target Career Roles & Job Profiles
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCourseModal.careerOpportunities.map((career, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Action in Modal */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span className="text-white font-semibold">Ready to enroll?</span> Contact us to reserve your computer lab station.
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setActiveCourseModal(null)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  variant="yellow"
                  onClick={() => {
                    setActiveCourseModal(null);
                    if (onNavigate) onNavigate('contact');
                    else navigate('/contact');
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Join Next Batch
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
