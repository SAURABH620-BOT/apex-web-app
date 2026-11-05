import React from 'react';
import {
  Laptop,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Award,
  Clock,
  Target,
  BadgeCheck,
  GraduationCap,
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { Heading, Text, Button, Badge, Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { getWhatsAppUrl } from '../helpers/formatters';

interface WhyApexProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const WhyApex: React.FC<WhyApexProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  const keyMetrics = [
    {
      value: '1,500+',
      label: 'Careers Launched',
      subtext: 'Govt. Jobs, Banks & Private Firms'
    },
    {
      value: '1:1 Ratio',
      label: 'Zero Screen Sharing',
      subtext: 'Dedicated PC for every single student'
    },
    {
      value: '85%',
      label: 'Hands-On Lab Time',
      subtext: 'Real workplace projects, not just theory'
    },
    {
      value: '100%',
      label: 'Govt. Job Valid',
      subtext: 'ISO 9001:2015 & MCA Registered'
    }
  ];

  const coreAdvantages = [
    {
      icon: <Laptop className="w-6 h-6 text-apex-blue-400" />,
      title: 'Guaranteed 1:1 Personal PC (No Screen Sharing Ever)',
      highlight: 'Full Batch Time Aapka Computer',
      description:
        'Aksar coaching me 2-3 students ko ek hi screen par baitha diya jata hai jisse practice nahi ho pati. Apex me har student ka apna dedicated Core i5/i7 workstation reserved rehta hai. Yahan dekh kar nahi, khud haath se karke seekhte hain.',
      accent: 'border-t-apex-blue-500'
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "Direct Mentorship under Durgesh Sir",
      highlight: 'Personal Attention for Every Beginner',
      description:
        'Yahan koi temporary lab assistant nahi padhata. BCA/MCA expert Durgesh Sir har student ki speed, typing accuracy aur confusion par personally dhyan dete hain. Agar aapne pehle kabhi computer nahi chhua hai, tab bhi aap 100% confident banenge.',
      accent: 'border-t-amber-500'
    },
    {
      icon: <Zap className="w-6 h-6 text-apex-red-400" />,
      title: 'High-Speed Bilingual Typing Arena',
      highlight: 'Target 35-45+ WPM (English + Hindi)',
      description:
        'Beltron, High Court, SSC, Railway aur DEO clerical jobs me typing test pass karna sabse bada challenge hota hai. Apex me daily monitored Hindi (Kruti Dev/Remington) aur English typing speed tests hote hain jo accuracy aur speed guarantee karte hain.',
      accent: 'border-t-apex-red-500'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: '100% Genuine & 24x7 Online Verifiable Certificate',
      highlight: 'Instant Online Roll No. Verification',
      description:
        'Market me milne wale fake ya paper certificates Document Verification (DV) me reject ho jate hain. Apex Certificate Portal par har student ka certificate QR Code aur Roll No. ke sath lifetime digitally verified hota hai—Govt. & Corporate approved.',
      accent: 'border-t-emerald-500'
    },
    {
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      title: 'Latest Job-Ready Syllabus (Not 10 Years Old)',
      highlight: 'Tally Prime, Canva, CorelDraw, MS-Office',
      description:
        'Outdated manual entries ya purana software nahi—Tally Prime With GST, Live E-Invoicing, Photoshop, CoralDraw, Canva, Adobe PageMaker aur MS-Office ke real corporate assignments par live training milti hai jo employers ko chahiye.',
      accent: 'border-t-cyan-500'
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: 'Flexible Batches & Lifetime Free Lab Revision',
      highlight: 'Subah 7 AM se Shaam 7 PM Tak',
      description:
        'College, school ya job ke sath batch timing match nahi hone ki chinta khatam. Subah se shaam tak multiple batches hain. Aur sabse khaas: course khatam hone ke baad bhi exam ya interview se pehle free lab practice aur doubt classes ki azadi!',
      accent: 'border-t-purple-500'
    }
  ];

  const comparisonItems = [
    {
      feature: 'Practical Lab vs Blackboard Theory',
      apex: '85% Hands-On Practical Lab / 15% Concept Clarity',
      others: '70% Notebook Dictation / Limited 15-min Computer Time'
    },
    {
      feature: 'Computer Allocation in Batch',
      apex: 'Guaranteed 1:1 Independent PC for every single student',
      others: '2 se 3 students ek hi monitor ke aage baithaye jate hain'
    },
    {
      feature: 'Bilingual Touch-Typing Training',
      apex: 'Daily structured Hindi (Kruti Dev) + English typing with speed tracker',
      others: 'Bas optional typing ya koi daily tracking nahi'
    },
    {
      feature: 'Certificate Authenticity & Verification',
      apex: 'Official Apex Online Verification Portal with Unique Roll/Reg ID',
      others: 'Sirf paper printout, online check karne par koi record nahi'
    },
    {
      feature: 'Accounting & Taxation Standard',
      apex: 'Latest Tally Prime Release With GST, E-Invoicing & Live Ledgers',
      others: 'Purana Tally ERP 9 aur blackboard par journal entries'
    },
    {
      feature: 'Graphic & Modern Design Tools',
      apex: 'Adobe Photoshop, CoralDraw, Adobe PageMaker + Modern Canva',
      others: 'Sirf basic paint ya outdated software ka introductory demo'
    },
    {
      feature: 'Post-Course Lab & Career Support',
      apex: 'Lifetime Lab Practice, Exam Preparation & Job Guidance',
      others: 'Fees khatam hote hi lab me aane par pabandi'
    }
  ];

  const stepsToSuccess = [
    {
      step: '01',
      title: 'Zero-Hesitation Onboarding',
      desc: 'Pehle din se mouse, keyboard aur OS par comfortable banate hain. Har student ke level ke according personalized guidance.'
    },
    {
      step: '02',
      title: 'Real Industry Projects',
      desc: 'GST tax bills, corporate salary sheets, visiting cards, flex banners aur web layouts live computer par tayar karte hain.'
    },
    {
      step: '03',
      title: 'Speed & Interview Drills',
      desc: 'Beltron & clerical typing speed targets, viva practice aur online examination platform par mock tests.'
    },
    {
      step: '04',
      title: 'Verifiable Certification',
      desc: 'ISO 9001:2015 certified national credential jo central & state govt. jobs aur MNCs me 100% valid hai.'
    }
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="lg" leftIcon={<Sparkles className="w-4 h-4" />}>
          The Apex Learning Standard • Since 2018
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Kyun Apex Hai Sabse Alag Aur Bharosemand?
        </Heading>
        <Text size="lg" className="text-slate-300 leading-relaxed">
          Computer sikhna sirf certificate lene ka naam nahi hai—ye aapke career ki pehli seedhi hai. Apex Institute me hum notes ratane par nahi, har student ke haath me mouse pakda kar unhe job-ready computer professional banane par vishwas rakhte hain.
        </Text>
      </div>

      {/* Social Proof Stats Counter Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {keyMetrics.map((metric, idx) => (
          <Card
            key={idx}
            variant="glass"
            className="p-5 sm:p-6 text-center space-y-1.5 border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/90 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-apex-yellow-400">
              {metric.value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-display">
              {metric.label}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-tight">
              {metric.subtext}
            </p>
          </Card>
        ))}
      </div>

      {/* Section: 6 Unbeatable Apex Advantages */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="blue" size="md" leftIcon={<Sparkle className="w-3.5 h-3.5" />}>
            The 6 Apex Pillars
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Wo 6 Baatein Jo Apex Ko Gaya Me No. 1 Banati Hain
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Aapki mehnat aur fees ka har ek rupya tabhi safal hota hai jab training 100% practical ho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreAdvantages.map((adv, idx) => (
            <Card
              key={idx}
              variant="glass"
              className={`p-6 sm:p-7 space-y-4 border-t-4 ${adv.accent} hover:translate-y-[-4px] transition-all duration-300 shadow-xl bg-slate-900/70 border-slate-800`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center shadow-inner">
                  {adv.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-apex-yellow-400 border border-slate-700">
                  Pillar 0{idx + 1}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-apex-yellow-400 block">
                  {adv.highlight}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-display text-white leading-snug">
                  {adv.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {adv.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Section: 4-Step Practical Methodology */}
      <div className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="green" size="md" leftIcon={<GraduationCap className="w-3.5 h-3.5" />}>
            Learning Methodology
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Apex Me Sikhne Ka 4-Step Scientific Tarika
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Aise sikhiye jisse interview ya job ke pehle din aapko kisi se madad na mangni pade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stepsToSuccess.map((item, sIdx) => (
            <div
              key={sIdx}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-colors"
            >
              <span className="font-mono text-3xl font-black text-slate-800 group-hover:text-apex-blue-500/40 transition-colors block">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-white font-display">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Direct Comparison Table */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="blue" size="md" leftIcon={<BadgeCheck className="w-3.5 h-3.5" />}>
            Transparent Comparison
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Apex Institute vs Normal Computer Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Faisla lene se pehle dono ka farq samajhiye aur apne future ke liye sahi choice chuniye.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90">
                <th className="py-4 px-5 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Feature / Parameter
                </th>
                <th className="py-4 px-5 sm:px-6 text-xs font-bold uppercase tracking-wider text-apex-yellow-400 bg-apex-blue-950/60 border-x border-slate-800">
                  ⭐ Apex Institute of Computer
                </th>
                <th className="py-4 px-5 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aam / Local Computer Centers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-semibold text-white">
                    {item.feature}
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-slate-200 font-medium bg-apex-blue-950/30 border-x border-slate-800/60">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item.apex}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 sm:px-6 text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Founder / Mentor's Pledge Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-apex-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-apex-blue-600 to-apex-yellow-400 p-1 shrink-0 shadow-xl shadow-apex-yellow-400/10 overflow-hidden">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/logo/apex_logo.jpeg"
                alt="Apex Institute Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-apex-yellow-400 flex items-center justify-center md:justify-start gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Mentor's Personal Commitment</span>
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              "Hamara Maqsad Sirf Course Khatam Karana Nahi, Har Student Ko Atmanirbhar Banana Hai"
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Jab aap Apex me aate hain, to aap sirf ek roll number nahi hote. Hum aapke darr ko door karte hain, keyboard par ungliyon ki speed badhate hain, aur aapko itna capable banate hain ki kisi bhi government ya private computer test me aap pehle attempt me qualify karein.
            </p>
            <p className="text-xs font-semibold text-slate-400 pt-1">
              — Durgesh Sir & The Apex Academic Council
            </p>
          </div>
        </div>
      </div>

      {/* High-Converting Final Call to Action */}
      <div className="rounded-3xl bg-gradient-to-r from-apex-blue-950 via-slate-900 to-slate-900 border border-apex-blue-500/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left">
          <Badge variant="green" size="sm">
            Free Demo Class Available
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Khud Aakar Lab Dekhein Aur Fark Mehsus Karein!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Aap hamare campus me aakar computer station par baith sakte hain, Durgesh Sir se mil sakte hain aur 100% Free Demo Session le sakte hain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <Button
            size="lg"
            variant="yellow"
            onClick={() => {
              if (onNavigate) onNavigate('contact');
              else navigate('/contact');
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold shadow-xl shadow-apex-yellow-400/20"
          >
            Book Free Demo Class
          </Button>

          <a
            href={getWhatsAppUrl('Hello Apex Computer Institute! I want to inquire about joining and taking a free demo class.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto hover:border-emerald-500/50 hover:text-emerald-300"
            >
              WhatsApp Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
