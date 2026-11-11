import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Building,
  FileCheck,
  Briefcase,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { aboutPagesData, affiliationsList } from '../data/aboutAffiliationsData';
import { Heading, Text, Button, Badge, Card } from '../components/ui';
import { useSEO } from '../hooks/useSEO';

interface AboutProps {
  selectedSubSection?: string;
  onNavigate?: (page: string, subSection?: string) => void;
}

export const About: React.FC<AboutProps> = ({ selectedSubSection }) => {
  useSEO({
    title: 'About Apex Institute | Certified Computer Training Center in Gaya, Bihar',
    description: 'Learn about Apex Institute Gaya: our mission, 1500+ trained graduates, ISO certified computer diploma credentials, and practical pedagogy under Durgesh Sir.',
    keywords: 'About Apex Institute, Computer Training Institute in Gaya, Coaching Institute in Gaya Bihar, Durgesh Sir Gaya, Computer Education Gaya',
    canonicalPath: '/about'
  });

  const params = useParams<{ section?: string }>();
  const navigate = useNavigate();

  const initialTab = params.section || selectedSubSection || 'about-ica';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    const current = params.section || selectedSubSection;
    if (current && aboutPagesData[current]) {
      setActiveTab(current);
    }
  }, [params.section, selectedSubSection]);

  const activeData = aboutPagesData[activeTab] || aboutPagesData['about-ica'];

  const tabList = [
    { id: 'about-ica', title: 'About ICA', icon: ShieldCheck },
    { id: 'mission-vision', title: 'Mission & Vision', icon: Compass },
    { id: 'incorporation-certificate', title: 'Incorporation', icon: Building },
    { id: 'iso-certificate', title: 'ISO 9001:2015', icon: Award },
    { id: 'trademark', title: 'Trademark', icon: FileCheck },
    { id: 'msme', title: 'MSME / Udyam', icon: Briefcase },
    { id: 'govt-affiliation', title: 'Govt. Affiliation', icon: GraduationCap },
    { id: 'pan-card', title: 'PAN Card', icon: CreditCard },
    { id: 'central-vigilance', title: 'Central Vigilance', icon: CheckCircle2 }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/about/${tabId}`, { replace: true });
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="blue" size="lg" leftIcon={<ShieldCheck className="w-4 h-4" />}>
          Institutional Credentials & Accreditation
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          About Apex Institute of Computer
        </Heading>
        <Text size="lg" className="text-slate-300">
          A legally registered, government-affiliated, and ISO 9001:2015 certified center for excellence in technical and professional IT education.
        </Text>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-apex-blue-600 text-white shadow-lg shadow-apex-blue-900/50'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Main Document Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="space-y-6 p-8">
            <div className="space-y-2 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <Badge variant="yellow" size="md">
                  {activeData.badge}
                </Badge>
                {activeData.fullContent.certificateNumber && (
                  <span className="font-mono text-xs text-apex-blue-300 font-bold">
                    Reg No: {activeData.fullContent.certificateNumber}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {activeData.fullContent.heading}
              </h2>
              <p className="text-sm font-semibold text-apex-yellow-300">
                {activeData.fullContent.subheading}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              {activeData.fullContent.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Points */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Key Verification Highlights:
              </h4>
              <ul className="space-y-2.5">
                {activeData.fullContent.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeData.fullContent.issuingBody && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Issuing Authority: </span>
                  <span className="font-semibold text-white">
                    {activeData.fullContent.issuingBody}
                  </span>
                </div>
                <Badge variant="green" size="sm">
                  Active & Verified
                </Badge>
              </div>
            )}
          </Card>
        </div>

        {/* Right Col: Affiliation Summary Card & Portal Link */}
        <div className="space-y-6">
          <Card variant="glass" className="space-y-4">
            <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-apex-yellow-400" />
              <span>Institutional Summary</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <p className="text-slate-400">Institution Name</p>
                <p className="font-bold text-white text-sm">Apex Institute of Computer</p>
              </div>
              <div>
                <p className="text-slate-400">Governing Network</p>
                <p className="font-semibold text-white">Institute of Computer Academics (ICA)</p>
              </div>
              <div>
                <p className="text-slate-400">Quality Standard</p>
                <p className="font-semibold text-apex-yellow-300">ISO 9001:2015 Accredited</p>
              </div>
              <div>
                <p className="text-slate-400">Legal Registration</p>
                <p className="font-semibold text-white">Ministry of Corporate Affairs (MCA)</p>
              </div>
              <div>
                <p className="text-slate-400">Enterprise Classification</p>
                <p className="font-semibold text-white">Govt. of India MSME (Udyam)</p>
              </div>
              <div>
                <p className="text-slate-400">Track Record</p>
                <p className="font-bold text-white">1500+ Trained &bull; 7+ Years Operational</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link to="/portal" className="block">
                <Button
                  variant="yellow"
                  fullWidth
                  size="sm"
                  leftIcon={<Award className="w-4 h-4" />}
                >
                  Verify Student Certificate
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Contact CTA */}
          <Card variant="glass" className="p-6 text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Questions about our Affiliations?</h4>
            <p className="text-xs text-slate-400">
              Our administrative office can provide certified copies for official recruitment scrutiny.
            </p>
            <Link to="/contact" className="block">
              <Button variant="outline" size="sm" fullWidth>
                Contact Administration
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Comprehensive Statutory Affiliation Records Table */}
      <div className="space-y-6 pt-8">
        <div className="space-y-2">
          <Badge variant="blue" size="md">
            All Affiliation Records
          </Badge>
          <h3 className="text-2xl font-bold font-display text-white">
            Statutory Legal & Certification Registry
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliationsList.map((record) => (
            <Card key={record.id} variant="glass" className="space-y-3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-apex-blue-300 font-bold px-2 py-0.5 rounded bg-apex-blue-950 border border-apex-blue-500/30">
                    {record.issueYear}
                  </span>
                  <Badge variant="green" size="sm">
                    {record.statusBadge}
                  </Badge>
                </div>

                <h4 className="text-base font-bold text-white font-display">
                  {record.title}
                </h4>

                <p className="text-xs font-mono text-apex-yellow-300 my-1">
                  {record.codeOrNumber}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {record.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>{record.issuedBy}</span>
                <span className="text-emerald-400 font-semibold">{record.validity}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
