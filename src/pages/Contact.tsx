import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';
import { validationRules } from '../helpers/validationRules';
import { getWhatsAppNumber, getWhatsAppUrl, getInstituteAddress } from '../helpers/formatters';
import { Heading, Text, Button, Input, TextArea, SelectDropdown, Badge, Card } from '../components/ui';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  courseInterested: string;
  qualification: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const initialValues: ContactFormData = {
    fullName: '',
    email: '',
    phone: '',
    courseInterested: '',
    qualification: '',
    message: ''
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    // Simulating API inquiry dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmittedSuccessfully(true);
    resetForm();

    setTimeout(() => {
      setIsSubmittedSuccessfully(false);
    }, 6000);
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
                Fill in the details below. Our academic counselor will call you within 2 working hours.
              </p>
            </div>

            {isSubmittedSuccessfully && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-3 text-emerald-200 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Thank you for your inquiry!</p>
                  <p>
                    Your message has been received by Apex Institute. Our admission coordinator will contact you shortly with batch options.
                  </p>
                </div>
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

              <Button
                type="submit"
                variant="yellow"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                loadingText="Sending Inquiry..."
                rightIcon={<Send className="w-4 h-4" />}
              >
                Submit Inquiry to Apex Institute
              </Button>
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
                    className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{getWhatsAppNumber()}</span>
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
    </div>
  );
};
