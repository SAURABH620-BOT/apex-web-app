import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, BookOpen, Phone, ArrowRight } from 'lucide-react';
import { Button, Heading, Text, Card } from '../components/ui';
import { useSEO } from '../hooks/useSEO';

export const NotFound: React.FC = () => {
  useSEO({
    title: '404 - Page Not Found | Apex Institute Gaya',
    description: 'The page you are looking for does not exist or has been moved. Explore computer courses in Gaya at Apex Institute.',
    canonicalPath: '/404',
    noindex: true
  });

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
      <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <span className="text-sm font-mono uppercase tracking-widest text-apex-yellow-400 font-bold">
          Error 404 &bull; Page Not Found
        </span>
        <Heading level={1} gradient="blue-yellow">
          Yeh Page Nahi Mila
        </Heading>
        <Text size="lg" className="text-slate-300 max-w-xl mx-auto">
          Aap jis page ko dhoondh rahe hain wo move ho chuka hai ya URL galat hai. Aap niche diye gaye links se humare main courses ya contact page par ja sakte hain.
        </Text>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link to="/">
          <Button variant="yellow" size="lg" leftIcon={<Home className="w-4 h-4" />}>
            Go to Homepage
          </Button>
        </Link>
        <Link to="/courses">
          <Button variant="outline" size="lg" leftIcon={<BookOpen className="w-4 h-4" />}>
            Explore Computer Courses
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="secondary" size="lg" leftIcon={<Phone className="w-4 h-4" />}>
            Contact & Admission Helpline
          </Button>
        </Link>
      </div>

      {/* Popular Courses Quick Access */}
      <div className="pt-10 max-w-2xl mx-auto text-left">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
          Popular Computer Courses in Gaya:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/courses/adca">
            <Card variant="interactive" className="p-4 group">
              <h4 className="text-sm font-bold text-white group-hover:text-apex-yellow-400 flex items-center justify-between">
                ADCA (1 Year)
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">Master Diploma & Tally</p>
            </Card>
          </Link>
          <Link to="/courses/dca">
            <Card variant="interactive" className="p-4 group">
              <h4 className="text-sm font-bold text-white group-hover:text-apex-yellow-400 flex items-center justify-between">
                DCA (6 Months)
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">Office & Basic Computer</p>
            </Card>
          </Link>
          <Link to="/courses/dfa">
            <Card variant="interactive" className="p-4 group">
              <h4 className="text-sm font-bold text-white group-hover:text-apex-yellow-400 flex items-center justify-between">
                DFA & Tally Prime
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">GST & Accounting</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
