import React from 'react';
import {
  Laptop,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Heading, Text, Button, Badge, Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';

interface WhyApexProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const WhyApex: React.FC<WhyApexProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const comparisonItems = [
    {
      feature: 'Practical Lab Time to Theory Ratio',
      apex: '80% Hands-On Practical Lab / 20% Theory',
      others: '70% Blackboard Theory / Limited System Time'
    },
    {
      feature: 'Computer Access During Class',
      apex: 'Guaranteed 1:1 Individual System for every student',
      others: 'Often 2-3 students crowded around one screen'
    },
    {
      feature: 'Accounting & Taxation Pedagogy',
      apex: 'Live GST Portal, Tally Prime Release 4.0 & Simulated Returns',
      others: 'Outdated manual journal entries and obsolete Tally ERP 9'
    },
    {
      feature: 'Bilingual Touch-Typing Arena',
      apex: 'Daily monitored English & Hindi typing (Target: 40+ WPM)',
      others: 'No systematic typing tests or speed tracking'
    },
    {
      feature: 'Certificate Verification',
      apex: 'Online Student Certificate Portal with Unique Roll/Reg No.',
      others: 'Paper-only certificates with no online verification'
    },
    {
      feature: 'Lead Mentorship',
      apex: 'BCA & MCA Veterans with 10+ Years Dedicated Experience',
      others: 'Inexperienced temporary lab assistants'
    }
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="lg" leftIcon={<Sparkles className="w-4 h-4" />}>
          7+ Years of Academic Distinction
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Why Choose Apex Institute of Computer?
        </Heading>
        <Text size="lg" className="text-slate-300">
          We don't teach computers like a conventional textbook subject. At Apex, learning is 100% practical, career-directed, and tailored to build real workplace capabilities.
        </Text>
      </div>

      {/* Core 4 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="space-y-4 border-t-4 border-t-apex-blue-500">
          <div className="w-12 h-12 rounded-2xl bg-apex-blue-950/80 text-apex-blue-400 flex items-center justify-center">
            <Laptop className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">1:1 Dedicated PC</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every enrolled student has their own computer station reserved for their entire batch slot. You build muscle memory by doing, not watching.
          </p>
        </Card>

        <Card variant="glass" className="space-y-4 border-t-4 border-t-amber-500">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">Durgesh Sir's Mentorship</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Personalized attention from BCA/MCA educators who have guided over 1,500 students into successful clerical, accounting, and IT careers.
          </p>
        </Card>

        <Card variant="glass" className="space-y-4 border-t-4 border-t-apex-red-500">
          <div className="w-12 h-12 rounded-2xl bg-red-950/80 text-apex-red-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">High Speed Typing</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Master touch-typing in both English and Hindi. Our specialized typing software tracks accuracy, backspaces, and words per minute daily.
          </p>
        </Card>

        <Card variant="glass" className="space-y-4 border-t-4 border-t-emerald-500">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">Govt. Recognitions</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Incorporated under MCA, ISO 9001:2015 certified, MSME registered, and valid for central and state government job eligibility.
          </p>
        </Card>
      </div>

      {/* Comparison Table: Apex vs Conventional */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="blue" size="md">
            Direct Comparison
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Apex Institute vs Conventional Institutes
          </h3>
          <p className="text-sm text-slate-400">
            See the concrete differences that give our 1,500+ alumni a clear competitive advantage in the job market.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Feature / Parameter
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-apex-yellow-400 bg-apex-blue-950/40">
                  Apex Institute of Computer
                </th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Conventional Centers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    {item.feature}
                  </td>
                  <td className="py-4 px-6 text-slate-200 font-medium bg-apex-blue-950/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item.apex}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <span>{item.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="rounded-3xl bg-gradient-to-r from-apex-blue-950 via-slate-900 to-slate-900 border border-apex-blue-500/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-display text-white">
            Experience the Apex Difference with a Free Demo Class
          </h3>
          <p className="text-sm text-slate-300">
            Visit our computer center, take a seat in our lab, and discuss your career goals directly with our faculty.
          </p>
        </div>

        <Button
          size="lg"
          variant="yellow"
          onClick={() => {
            if (onNavigate) onNavigate('contact');
            else navigate('/contact');
          }}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shrink-0"
        >
          Book Your Free Demo
        </Button>
      </div>
    </div>
  );
};
