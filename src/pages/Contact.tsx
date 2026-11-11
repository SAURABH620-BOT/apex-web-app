import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import { validationRules } from '../helpers/validationRules';
import { getWhatsAppNumber, getWhatsAppUrl, getInstituteAddress } from '../helpers/formatters';
import { Heading, Text, Button, Input, TextArea, SelectDropdown, Badge, Card } from '../components/ui';
import { useSEO } from '../hooks/useSEO';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  courseInterested: string;
  qualification: string;
  message: string;
}

export const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Apex Institute Gaya | Admission Inquiry & Campus Location',
    description: 'Visit Apex Institute at Beldari Tola Nutan Nagar Rd, New Area, Gaya, Bihar 823001. Call or WhatsApp +91 6200043032 to book your free demo class today.',
    keywords: 'Contact Apex Institute Gaya, Computer Institute in Gaya Address, Computer Institute in Gaya Near Me, Apex Institute Phone Number, Computer Admission Gaya',
    canonicalPath: '/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact & Admissions - Apex Institute Gaya',
      'url': 'https://apexinstitute.in/contact',
      'mainEntity': {
        '@type': 'EducationalOrganization',
        'name': 'Apex Institute',
        'telephone': '+916200043032',
        'email': 'apex@apexinstitute.org',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Beldari Tola Nutan Nagar Rd, in front of Dr Pushkar & Shupriya Gupta, New Area',
          'addressLocality': 'Gaya',
          'addressRegion': 'Bihar',
          'postalCode': '823001',
          'addressCountry': 'IN'
        }
      }
    }
  });

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [lastSubmittedWhatsAppUrl, setLastSubmittedWhatsAppUrl] = useState<string | null>(null);

  const initialValues: ContactFormData = {
    fullName: '',
    email: '',
    phone: '',
    courseInterested: '',
    qualification: '',
    message: ''
  };

  const courseOptions = [
    { value: 'ADCA', label: 'ADCA - Advance Diploma in Computer Applications (12M)' },
    { value: 'DCA', label: 'DCA - Diploma in Computer Applications (6M)' },
    { value: 'DFA', label: 'DFA - Diploma in Financial Accounting (4M)' },
    { value: 'DTP', label: 'DTP - Diploma in Desktop Publishing (3M)' },
    { value: 'Office Work', label: 'Office Work & Automation - MS Word, Excel & Tally (3M)' },
    { value: 'General Inquiry', label: 'General Inquiry / Custom Batch' }
  ];

  const qualificationOptions = [
    { value: '10th Pass', label: '10th Matriculation' },
    { value: '12th Pass', label: '12th Intermediate' },
    { value: 'Graduation Pursuing', label: 'Graduation (Pursuing)' },
    { value: 'Graduate', label: 'Graduate (Completed)' },
    { value: 'Working Professional', label: 'Working Professional' }
  ];

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    resetForm,
    setIsSubmitting
  } = useFormValidation<ContactFormData>(initialValues, {
    fullName: (val) => validationRules.required(val, 'Full Name'),
    email: (val) => validationRules.email(val),
    phone: (val) => validationRules.phone(val, 'Phone number'),
    courseInterested: (val) => validationRules.required(val, 'Course selection'),
    message: (val) => validationRules.required(val, 'Message')
  });

  const createInquiryWhatsAppMessage = (data: ContactFormData) => {
    const courseObj = courseOptions.find((c) => c.value === data.courseInterested);
    const courseText = courseObj ? courseObj.label : data.courseInterested;
    const qualObj = qualificationOptions.find((q) => q.value === data.qualification);
    const qualText = qualObj ? qualObj.label : (data.qualification || 'Not Specified');
    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return (
      `🎓 *APEX INSTITUTE OF COMPUTER*\n` +
      `📩 *NEW STUDENT INQUIRY & DEMO CLASS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Student Name:* ${data.fullName}\n` +
      `📱 *Mobile Number:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}\n` +
      `🎓 *Qualification:* ${qualText}\n` +
      `📚 *Course Interested:* ${courseText}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 *Inquiry / Message:*\n${data.message}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📅 *Date:* ${today}\n` +
      `📍 *Source:* Website Inquiry Form`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    const message = createInquiryWhatsAppMessage(values);
    const whatsappUrl = getWhatsAppUrl(message, getWhatsAppNumber());
    setLastSubmittedWhatsAppUrl(whatsappUrl);

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSubmittedSuccessfully(true);
    resetForm();

    setTimeout(() => {
      setIsSubmittedSuccessfully(false);
    }, 12000);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="lg" leftIcon={<MessageSquare className="w-4 h-4" />}>
          Connect with Us
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Contact Apex Institute of Computer
        </Heading>
        <Text size="lg" className="text-slate-300">
          Have queries regarding batch timings, course syllabus, or lab visits? Drop us a message or visit our campus for direct counseling with Durgesh Sir.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Integrated Student Inquiry Form */}
        <div className="lg:col-span-7">
          <Card variant="glass" className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-apex-yellow-400" />
                <h3 className="text-xl font-bold font-display text-white">
                  Student Inquiry & Demo Class Form
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Apni details darj karein aur batch timings, fee concessions aur free lab demo class ke liye hamare academic counselor se instantly connect karein.
              </p>
            </div>

            {isSubmittedSuccessfully && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 space-y-3 text-emerald-200 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-1">
                    <p className="font-bold text-emerald-300">Inquiry Ready & Opening WhatsApp!</p>
                    <p className="text-slate-300">
                      Aapka inquiry data format hokar WhatsApp par bhej diya gaya hai. Agar chat automatically open na hui ho, toh niche button par click karein:
                    </p>
                  </div>
                </div>
                {lastSubmittedWhatsAppUrl && (
                  <a
                    href={lastSubmittedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue to WhatsApp Chat</span>
                  </a>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  isRequired
                  placeholder="e.g. Ramesh Kumar"
                  value={values.fullName}
                  error={touched.fullName ? errors.fullName : undefined}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                />

                <Input
                  label="Email Address"
                  isRequired
                  type="email"
                  placeholder="name@gmail.com"
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="10-Digit Mobile Number"
                  isRequired
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={values.phone}
                  error={touched.phone ? errors.phone : undefined}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const numsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleChange('phone', numsOnly);
                  }}
                  onBlur={() => handleBlur('phone')}
                />

                <SelectDropdown
                  label="Highest Qualification"
                  options={qualificationOptions}
                  placeholder="Select Qualification"
                  value={values.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                />
              </div>

              <SelectDropdown
                label="Course You Are Interested In"
                isRequired
                options={courseOptions}
                placeholder="Choose a Course"
                value={values.courseInterested}
                error={touched.courseInterested ? errors.courseInterested : undefined}
                onChange={(e) => handleChange('courseInterested', e.target.value)}
                onBlur={() => handleBlur('courseInterested')}
              />

              <TextArea
                label="Your Message or Questions"
                isRequired
                rows={3}
                placeholder="Ask about batch timings, lab availability, or career scope..."
                value={values.message}
                error={touched.message ? errors.message : undefined}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
              />

              <div className="space-y-2 pt-2">
                <Button
                  type="submit"
                  variant="yellow"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="Opening WhatsApp..."
                  rightIcon={<MessageSquare className="w-4 h-4 text-slate-950" />}
                  className="font-bold shadow-lg shadow-apex-yellow-900/20"
                >
                  Submit & Book Free Demo Class
                </Button>
                <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Aapki inquiry priority ke saath hamare counselor tak pahunch jayegi • 100% Free Demo Session</span>
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Info: Address, Hours & Map Embed Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="glass" className="space-y-5 p-6">
            <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
              Campus Headquarters
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-apex-red-950/80 text-apex-red-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Apex Institute of Computer</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {getInstituteAddress()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-apex-yellow-950/80 text-apex-yellow-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Direct Helpline</p>
                  <a
                    href={`tel:${(import.meta.env.VITE_SUPPORT_PHONE || '+91 6200043032').replace(/\s+/g, '')}`}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {import.meta.env.VITE_SUPPORT_PHONE || '+91 6200043032'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">WhatsApp Helpline</p>
                  <a
                    href={getWhatsAppUrl('Hello Apex Computer Institute! I have an inquiry.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">{getWhatsAppNumber()}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-medium">Chat Now</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-apex-blue-950/80 text-apex-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <p className="text-xs text-slate-400">{import.meta.env.VITE_SUPPORT_EMAIL || 'info@apexinstitute.org'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Lab & Office Hours</p>
                  <p className="text-xs text-slate-400">Monday – Saturday: 7:00 AM – 7:00 PM</p>
                  <p className="text-xs text-amber-400">Sunday: Special Typing & Doubt Batches</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Google Map Interactive Placeholder */}
          <Card variant="glass" className="p-0 overflow-hidden border border-slate-800">
            <div className="relative h-64 bg-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-apex-red-950/80 border border-apex-red-500/40 flex items-center justify-center text-apex-red-400 animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-display">
                  Interactive Campus Map
                </h4>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  {getInstituteAddress()}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getInstituteAddress())}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-apex-blue-300 transition-colors"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Local SEO: How to Reach & Nearby Areas Served */}
      <div className="pt-8 border-t border-slate-800/80 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="blue" size="sm">
            Local Proximity & Accessibility
          </Badge>
          <h3 className="text-xl font-bold font-display text-white">
            Conveniently Located in the Heart of Gaya City
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Located at Beldari Tola, Nutan Nagar Road (New Area), Apex Institute is easily accessible by E-Rickshaw, Auto, and Bus from all major landmarks across Gaya and neighboring areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-apex-yellow-400">From Gaya Junction</h4>
            <p className="text-slate-400">Approx. 2.5 km (10-12 mins). Regular E-Rickshaws available directly towards Nutan Nagar / New Area.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-apex-yellow-400">From GB Road & Tower Chowk</h4>
            <p className="text-slate-400">Approx. 1.8 km (7-8 mins). Central city location with seamless commute from Civil Lines & Rai Kashi Nath More.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-apex-yellow-400">From Manpur & Buniyadganj</h4>
            <p className="text-slate-400">Approx. 4.5 km (15-18 mins) via Falgu River Bridge. Direct auto/bus connectivity for daily commuting students.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-apex-yellow-400">From Bodh Gaya & Chandauti</h4>
            <p className="text-slate-400">Directly connected via Bodh Gaya Road and Gaya-Tekari Road with flexible morning and evening batch timings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
