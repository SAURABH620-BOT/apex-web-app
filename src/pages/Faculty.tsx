import React from 'react';
import {
  CheckCircle2,
  GraduationCap,
  Users,
  ArrowRight
} from 'lucide-react';
import { facultyData } from '../data/facultyData';
import { Heading, Text, Button, Badge, Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';

interface FacultyProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const Faculty: React.FC<FacultyProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="lg" leftIcon={<Users className="w-4 h-4" />}>
          Distinguished Mentors
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Meet the Instructors Behind Apex
        </Heading>
        <Text size="lg" className="text-slate-300">
          At Apex Institute of Computer, you are trained by proven educators who combine high academic degrees (BCA & MCA) with extensive commercial expertise in systems, accounting, and taxation.
        </Text>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {facultyData.map((faculty) => (
          <Card
            key={faculty.id}
            variant="glass"
            className="flex flex-col justify-between h-full border border-slate-800 hover:border-apex-blue-500/50 transition-all p-7 space-y-6"
          >
            <div>
              {/* Avatar and Top Badge */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-apex-blue-600 via-apex-blue-500 to-apex-yellow-400 shadow-xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <span className="text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-br from-apex-yellow-400 via-amber-200 to-apex-blue-400 tracking-wider">
                        {faculty.initials}
                      </span>
                    </div>
                  </div>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-apex-yellow-400 text-slate-950 text-xs font-black font-display shadow-lg border-2 border-slate-900 z-10">
                    {faculty.experienceText}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  {faculty.name}
                </h3>
                <p className="text-sm font-semibold text-apex-blue-300">{faculty.designation}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1">
                  <GraduationCap className="w-3.5 h-3.5 text-apex-yellow-400" />
                  <span>{faculty.qualification}</span>
                </div>
              </div>

              {/* Specialization & Bio */}
              <div className="pt-5 space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                    Specialization
                  </p>
                  <p className="text-sm font-semibold text-apex-yellow-300">
                    {faculty.specialization}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {faculty.bio}
                </p>

                {/* Key Skills */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Core Technical Strengths
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {faculty.keySkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                    Milestones & Track Record
                  </p>
                  <ul className="space-y-1.5">
                    {faculty.achievements.map((achieve, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{achieve}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom CTA for batch booking with faculty */}
            <div className="pt-6 border-t border-slate-800">
              <Button
                variant="outline"
                fullWidth
                size="sm"
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  else navigate('/contact');
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Book Class with {faculty.name.split(' ')[0]}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pedagogy Principles Strip */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="blue" size="md">
            Apex Teaching Methodology
          </Badge>
          <h3 className="text-2xl font-bold font-display text-white">
            How Our Faculty Ensures 100% Concept Mastery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-apex-blue-950 flex items-center justify-center text-apex-blue-400 font-bold">
              1
            </div>
            <h4 className="text-base font-bold text-white">Theory in 15 Minutes</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every class begins with a quick, crisp conceptual brief on whiteboard and smart screens before jumping straight into computers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-950 flex items-center justify-center text-apex-yellow-400 font-bold">
              2
            </div>
            <h4 className="text-base font-bold text-white">45 Minutes Lab Application</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Immediate practical execution on individual computers under the active personal supervision of Durgesh Sir and the faculty team.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-950 flex items-center justify-center text-apex-red-400 font-bold">
              3
            </div>
            <h4 className="text-base font-bold text-white">Weekly Speed & Practical Tests</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Regular Saturday typing evaluations and accounting case-study finalizations to ensure constant measurable progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
