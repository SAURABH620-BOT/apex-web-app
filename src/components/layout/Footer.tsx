import React from 'react';
import {
  Laptop,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';
import { getWhatsAppNumber, getWhatsAppUrl, getInstituteAddress } from '../../helpers/formatters';

interface FooterProps {
  onNavigate?: (page: string, subSection?: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80 overflow-hidden pt-16 pb-12">
      {/* Decorative gradient background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-apex-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-apex-blue-700 via-apex-blue-600 to-apex-yellow-400 flex items-center justify-center shadow-lg shadow-apex-blue-900/40">
                <Laptop className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  APEX INSTITUTE
                </span>
                <p className="text-xs text-apex-yellow-400 font-semibold tracking-wide">
                  OF COMPUTER
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students with career-defining technical skills, 100% practical lab training, and nationally recognized certifications. Guided by Durgesh Sir and senior IT specialists.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="yellow" size="sm" leftIcon={<Sparkles className="w-3 h-3" />}>
                1500+ Students Trained
              </Badge>
              <Badge variant="blue" size="sm" leftIcon={<Award className="w-3 h-3" />}>
                7+ Years Experience
              </Badge>
              <Badge variant="green" size="sm" leftIcon={<ShieldCheck className="w-3 h-3" />}>
                ISO 9001:2015
              </Badge>
            </div>
          </div>

          {/* Column 2: Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              Programs Offered
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { code: 'ADCA', slug: 'adca', label: 'ADCA (12 Months)' },
                { code: 'DCA', slug: 'dca', label: 'DCA (6 Months)' },
                { code: 'DFA', slug: 'dfa', label: 'DFA Financial (6 Months)' },
                { code: 'DTA', slug: 'dta', label: 'DTA Taxation (6 Months)' },
                { code: 'Office Work', slug: 'office-work', label: 'Office Work (3 Months)', isNew: true }
              ].map((c) => (
                <li key={c.code}>
                  <Link
                    to={`/courses/${c.slug}`}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-apex-yellow-400 transition-colors cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-apex-blue-400" />
                    <span>{c.label}</span>
                    {c.isNew && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-apex-red-600/80 text-white ml-1">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About & Statutory Affiliations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              Affiliations & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'about-ica', label: 'About ICA Network' },
                { id: 'mission-vision', label: 'Mission & Vision' },
                { id: 'incorporation-certificate', label: 'MCA Incorporation' },
                { id: 'iso-certificate', label: 'ISO 9001:2015 Certified' },
                { id: 'trademark', label: 'Registered Trademark' },
                { id: 'msme', label: 'Govt. MSME / Udyam' },
                { id: 'govt-affiliation', label: 'Govt. Skill Council' },
                { id: 'pan-card', label: 'PAN Card Verification' },
                { id: 'central-vigilance', label: 'CVC Integrity Pledge' }
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/about/${item.id}`}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-left text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Lab Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-display">
              Campus & Support
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-apex-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {getInstituteAddress()}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-apex-yellow-400 shrink-0" />
                <a
                  href={`tel:${(import.meta.env.VITE_SUPPORT_PHONE || '+91 6200043032').replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {import.meta.env.VITE_SUPPORT_PHONE || '+91 6200043032'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl('Hello Apex Computer Institute!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-slate-400 transition-colors"
                >
                  WhatsApp: {getWhatsAppNumber()}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-apex-blue-400 shrink-0" />
                <a
                  href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL || 'apex@apexinstitute.org'}`}
                  className="hover:text-white transition-colors"
                >
                  {import.meta.env.VITE_SUPPORT_EMAIL || 'apex@apexinstitute.org'}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Lab Practice Hours</p>
                  <p className="text-xs">Mon – Sat: 7:00 AM – 7:00 PM</p>
                  <p className="text-xs text-amber-400">Sunday Special Practice Batches</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} <span className="text-white font-semibold">Apex Institute of Computer</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Powered by</span>
            <a
              href="https://techbiharinnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apex-yellow-400 hover:text-apex-yellow-300 font-semibold inline-flex items-center gap-1 transition-colors hover:underline"
            >
              <span>Tech Bihar Innovations Pvt. Ltd</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
