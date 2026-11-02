import React, { useState, useRef } from 'react';
import {
  Award,
  Upload,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  FileText,
  Send,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Camera,
  Trash2,
  FileCheck2,
  Lock,
  User,
  LogIn,
  LogOut,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Copy,
  Check,
  Download,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '../helpers/cn';
import { useFormValidation } from '../hooks/useFormValidation';
import { validationRules } from '../helpers/validationRules';
import { useAuth } from '../hooks/useAuth';
import { getCertificateWhatsAppNumber, getWhatsAppUrl } from '../helpers/formatters';
import {
  uploadStudentPhoto,
  copyImageToClipboard,
  compressImageToDataUrl,
  downloadImageFile
} from '../helpers/imageUpload';
import type {
  CertificateFormData,
  CertificateRequestRecord,
  CourseOption,
  Gender,
  SocialCategory
} from '../types/certificate';
import {
  Heading,
  Text,
  Button,
  Input,
  SelectDropdown,
  TextArea,
  Badge,
  Card,
  DatePicker
} from '../components/ui';

export const CertificatePortal: React.FC = () => {
  // Authentication state via encrypted localStorage vault
  const { isAuthenticated, user, isLoading: isAuthLoading, login, logout } = useAuth();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Certificate Form States
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<CertificateRequestRecord | null>(null);
  const [sameAddress, setSameAddress] = useState(false); // By default UNCHECKED
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatusText, setSubmitStatusText] = useState('Submitting Application...');
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);
  const [copyFeedbackText, setCopyFeedbackText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialFormValues: CertificateFormData = {
    course: 'ADCA',
    completionDate: new Date().toISOString().split('T')[0],
    name: '',
    fatherName: '',
    motherName: '',
    email: '',
    mobileNumber: '',
    alternateNumber: '',
    dob: '',
    category: 'General',
    gender: 'Male',
    correspondenceAddress: '',
    permanentAddress: '',
    profilePicture: null
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    validateAll,
    getFirstInvalidField,
    resetForm,
    setIsSubmitting
  } = useFormValidation<CertificateFormData>(initialFormValues, {
    name: (val) => validationRules.required(val, 'Student Name'),
    fatherName: (val) => validationRules.required(val, "Father's Name"),
    motherName: (val) => validationRules.required(val, "Mother's Name"),
    email: (val) => validationRules.email(val),
    mobileNumber: (val) => validationRules.phone(val, 'Mobile / WhatsApp Number'),
    alternateNumber: (val) => validationRules.phone(val, 'Alternate Number', true),
    dob: (val) => validationRules.dateOfBirth(val),
    completionDate: (val) => validationRules.completionDate(val),
    correspondenceAddress: (val) => validationRules.address(val, 'Correspondence Address'),
    permanentAddress: (val) => validationRules.address(val, 'Permanent Address')
  });

  // Handle Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const trimmedUser = loginUsername.trim();
    const trimmedPass = loginPassword.trim();

    if (!trimmedUser) {
      setLoginError('Please enter your authorized username.');
      return;
    }
    if (!trimmedPass) {
      setLoginError('Please enter your portal password.');
      return;
    }

    setIsLoggingIn(true);
    const result = await login({ userId: trimmedUser, password: trimmedPass });
    setIsLoggingIn(false);

    if (!result.success) {
      setLoginError(result.error || 'Invalid credentials. Please verify your username and password.');
    } else {
      setLoginPassword('');
    }
  };


  // Process image file
  const processSelectedFile = (file: File) => {
    const validation = validationRules.imageFile(file, 2);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }
    setFieldValue('profilePicture', file);
    const url = URL.createObjectURL(file);
    setProfilePreviewUrl(url);
  };

  // Handle profile image selection via file browser
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      processSelectedFile(file);
    }
  };

  // Remove selected photo
  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFieldValue('profilePicture', null);
    setProfilePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  // Toggle "Permanent Address is same as Correspondence Address"
  const handleSameAddressToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSameAddress(isChecked);
    if (isChecked) {
      handleChange('permanentAddress', values.correspondenceAddress);
    }
  };

  // Build formatted WhatsApp message
  const createWhatsAppMessage = (record: CertificateRequestRecord) => {
    let photoLine = '';
    if (record.photoUrl) {
      photoLine = `📷 *Student Photograph:* ${record.photoUrl}\n`;
    } else if (record.hasPhoto) {
      photoLine = `📷 *Student Photograph:* Attached / Pasted in this chat\n`;
    } else {
      photoLine = `📷 *Student Photograph:* Not uploaded in form\n`;
    }

    return (
      `🎓 *APEX INSTITUTE OF COMPUTER*\n` +
      `📜 *CERTIFICATE REQUEST APPLICATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Reference ID:* ${record.referenceId}\n` +
      `👤 *Student Name:* ${record.studentName}\n` +
      `👨 *Father's Name:* ${record.fatherName}\n` +
      `👩 *Mother's Name:* ${record.motherName}\n` +
      `📚 *Course Applied:* ${record.course}\n` +
      `📅 *Completion Date:* ${record.completionDate}\n` +
      `📱 *Mobile / WhatsApp:* ${record.mobileNumber}\n` +
      (record.alternateNumber ? `📞 *Alternate No:* ${record.alternateNumber}\n` : '') +
      `✉️ *Email:* ${record.email}\n` +
      `🎂 *Date of Birth:* ${record.dob}\n` +
      `⚧ *Gender:* ${record.gender}\n` +
      `🏷️ *Category:* ${record.category}\n` +
      `🏠 *Correspondence Address:* ${record.correspondenceAddress}\n` +
      `📍 *Permanent Address:* ${record.permanentAddress}\n` +
      photoLine +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🌐 *Submitted online via Apex Certificate Portal*\n` +
      `⏱️ *Time:* ${new Date(record.submittedAt).toLocaleString('en-IN')}`
    );
  };

  // Smoothly scroll and focus the first invalid field
  const scrollToAndFocusField = (fieldKey: keyof CertificateFormData) => {
    const elementId = `field-${fieldKey}`;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        el.focus();
        el.classList.add('ring-4', 'ring-red-500/50');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-red-500/50');
        }, 1800);
      }, 300);
    }
  };

  // Copy student photo to clipboard for instant Ctrl+V in WhatsApp Web
  const handleCopyPhotoToClipboard = async () => {
    if (values.profilePicture) {
      const ok = await copyImageToClipboard(values.profilePicture);
      if (ok) {
        setIsCopiedToClipboard(true);
        setCopyFeedbackText('✓ Photo copied! Press Ctrl+V in WhatsApp chat to paste.');
        setTimeout(() => setCopyFeedbackText(null), 5000);
      } else {
        setCopyFeedbackText('Clipboard copy not supported. Please use WhatsApp photo link or download.');
        setTimeout(() => setCopyFeedbackText(null), 5000);
      }
    }
  };

  // Download photo file locally
  const handleDownloadPhoto = () => {
    if (values.profilePicture) {
      downloadImageFile(values.profilePicture, values.name || 'student');
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formIsValid = validateAll();
    if (!formIsValid) {
      const fieldOrder: (keyof CertificateFormData)[] = [
        'completionDate',
        'name',
        'fatherName',
        'motherName',
        'dob',
        'mobileNumber',
        'email',
        'correspondenceAddress',
        'permanentAddress'
      ];
      const firstInvalid = getFirstInvalidField(fieldOrder);
      if (firstInvalid) {
        scrollToAndFocusField(firstInvalid);
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatusText(
      values.profilePicture
        ? 'Uploading photo & preparing WhatsApp...'
        : 'Preparing certificate request...'
    );

    let photoUrl: string | undefined = undefined;
    let photoDataUrl: string | undefined = undefined;

    // Handle student photo if uploaded
    if (values.profilePicture) {
      // 1. Upload student photo to hosting so direct link is in WhatsApp
      try {
        const uploadResult = await uploadStudentPhoto(values.profilePicture);
        if (uploadResult.success && uploadResult.url) {
          photoUrl = uploadResult.url;
        }
      } catch (err) {
        console.warn('Photo upload warning:', err);
      }

      // 2. Generate compressed base64 for persistent preview in portal
      try {
        photoDataUrl = await compressImageToDataUrl(values.profilePicture);
      } catch {
        // Fallback
      }

      // 3. Auto-copy photo to clipboard so user can instantly paste (Ctrl+V) in WhatsApp Web
      try {
        const copied = await copyImageToClipboard(values.profilePicture);
        if (copied) {
          setIsCopiedToClipboard(true);
        }
      } catch {
        // Clipboard fallback
      }
    }

    const refId = `APEX-REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: CertificateRequestRecord = {
      referenceId: refId,
      studentName: values.name.trim().toUpperCase(),
      fatherName: values.fatherName.trim().toUpperCase(),
      motherName: values.motherName.trim().toUpperCase(),
      course: values.course,
      completionDate: values.completionDate,
      mobileNumber: values.mobileNumber.trim(),
      alternateNumber: values.alternateNumber?.trim() || undefined,
      email: values.email.trim(),
      dob: values.dob,
      gender: values.gender,
      category: values.category,
      correspondenceAddress: values.correspondenceAddress.trim(),
      permanentAddress: values.permanentAddress.trim() || values.correspondenceAddress.trim(),
      photoUrl,
      photoDataUrl: photoDataUrl || profilePreviewUrl || undefined,
      hasPhoto: Boolean(values.profilePicture),
      submittedAt: new Date().toISOString()
    };

    // Save record to LocalStorage
    try {
      const existing: CertificateRequestRecord[] = JSON.parse(
        localStorage.getItem('apex_cert_requests') || '[]'
      );
      existing.unshift(newRecord);
      localStorage.setItem('apex_cert_requests', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // LocalStorage fallback
    }

    // Build WhatsApp URL using configured WhatsApp number (6200043032) and open
    const message = createWhatsAppMessage(newRecord);
    const whatsappUrl = getWhatsAppUrl(message, getCertificateWhatsAppNumber());
    window.open(whatsappUrl, '_blank');

    setSubmittedRecord(newRecord);
    setIsSubmitting(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Reset form to submit another request
  const handleReset = () => {
    resetForm();
    setSameAddress(false);
    setProfilePreviewUrl(null);
    setSubmittedRecord(null);
    setIsCopiedToClipboard(false);
    setCopyFeedbackText(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Loading State while checking auth
  if (isAuthLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 pt-28">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-apex-yellow-400 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-mono">Verifying encrypted credential vault...</p>
      </div>
    );
  }

  // 2. Unauthenticated State: Show Portal Security Login Screen
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <Badge variant="yellow" size="lg" leftIcon={<Lock className="w-4 h-4" />}>
            Restricted Portal Access
          </Badge>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-apex-yellow-400 bg-clip-text text-transparent whitespace-nowrap">
            Portal Authentication
          </h1>
          <Text size="sm" className="text-slate-400 max-w-md mx-auto">
            Access to student certificate applications & dispatch records is restricted to authorized institute personnel.
          </Text>
        </div>

        <Card variant="glass" className="p-6 sm:p-8 space-y-6 border-slate-800 relative overflow-hidden shadow-2xl">
          {/* Subtle top neon ambient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-apex-yellow-400 to-amber-500" />

          {/* Login header with icon */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-apex-yellow-400/10 border border-apex-yellow-400/30 flex items-center justify-center text-apex-yellow-400 shrink-0 shadow-inner">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Login</h2>
              <p className="text-xs text-slate-400">Sign in with your authorized credentials</p>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <Input
              label="Authorized Username / ID"
              placeholder="Enter your username"
              value={loginUsername}
              onChange={(e) => {
                setLoginUsername(e.target.value);
                if (loginError) setLoginError(null);
              }}
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="username"
              isRequired
              autoFocus
            />

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password <span className="text-apex-red-400">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  autoComplete="current-password"
                  className="w-full rounded-xl pl-10 pr-10 py-2.5 text-sm transition-all duration-200 focus:outline-none border border-slate-700/80 hover:border-slate-600 focus:border-apex-blue-500 focus:ring-2 focus:ring-apex-blue-500/50 bg-slate-900/90 text-slate-100 placeholder-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="yellow"
              size="lg"
              isLoading={isLoggingIn}
              loadingText="Signing In..."
              leftIcon={<LogIn className="w-4 h-4" />}
              className="w-full font-bold shadow-lg shadow-apex-yellow-400/20 mt-2"
            >
              Login to Certificate Portal
            </Button>
          </form>

          {/* Footer Informational Text */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized portal for Apex Institute of Computer administration. Please enter your valid credentials to proceed with student certificate processing.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // 3. Authenticated State: Full Request for Certificate Page with Top Session Strip
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 animate-fadeIn">
      {/* Authenticated Admin Session Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/95 border border-emerald-500/30 backdrop-blur-md shadow-xl shadow-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Encrypted Vault Session Active
              </span>
            </div>
            <p className="text-sm font-bold text-white">
              {user?.name || 'Apex Portal Administrator'}
              <span className="ml-2 text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                @{user?.userId || 'apexadmin'}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="w-4 h-4 text-red-400" />}
            className="hover:border-red-500/50 hover:bg-red-950/30 text-slate-300 hover:text-red-300 font-medium"
          >
            Lock & Sign Out
          </Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="lg" leftIcon={<Award className="w-4 h-4" />}>
          Online Student Services
        </Badge>
        <Heading level={1} gradient="blue-yellow">
          Request for Certificate
        </Heading>
        <Text size="lg" className="text-slate-300">
          Complete the official student application form below. Once submitted, your details will be recorded and forwarded directly to the Apex Institute administration on WhatsApp for verification & dispatch.
        </Text>
      </div>

      {/* ========================================================
          SUCCESS CONFIRMATION SCREEN
         ======================================================== */}
      {submittedRecord ? (
        <Card variant="glass" className="p-8 sm:p-12 text-center space-y-8 border-emerald-500/30">
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <Badge variant="green" size="md">
              Application Submitted Successfully
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Certificate Request Forwarded!
            </h2>
            <p className="text-sm text-slate-300">
              Your certificate application has been recorded under Reference ID:
            </p>
            <p className="font-mono text-xl sm:text-2xl font-black text-apex-yellow-400 py-1 px-4 rounded-xl bg-slate-900 border border-slate-800 inline-block">
              {submittedRecord.referenceId}
            </p>
          </div>

          {/* Details Summary Card */}
          <div className="text-left bg-slate-900/90 rounded-2xl p-6 border border-slate-800 max-w-2xl mx-auto space-y-4 text-xs sm:text-sm">
            {/* Student Photo & Identity Strip */}
            {(submittedRecord.photoDataUrl || profilePreviewUrl || submittedRecord.photoUrl) && (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="relative shrink-0">
                  <img
                    src={submittedRecord.photoDataUrl || profilePreviewUrl || submittedRecord.photoUrl}
                    alt="Student Photograph"
                    className="w-24 h-28 rounded-xl object-cover object-top border-2 border-apex-yellow-400 shadow-xl shadow-black/60 bg-slate-900"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] shadow">
                    Attached
                  </span>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Student Passport Photograph
                    </span>
                    <p className="font-bold text-white text-base">{submittedRecord.studentName}</p>
                    <p className="text-xs text-apex-yellow-400 font-medium">{submittedRecord.course}</p>
                  </div>

                  {submittedRecord.photoUrl ? (
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Photo URL successfully added to WhatsApp message!</span>
                      </div>
                      <div>
                        <a
                          href={submittedRecord.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-apex-blue-400 hover:text-apex-blue-300 hover:underline"
                        >
                          <span>Open Hosted Photo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs">
                      <span>Photo saved with application. Use WhatsApp paste (Ctrl+V) or attach to send image file.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions for Photo */}
            {values.profilePicture && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-apex-yellow-400 shrink-0" />
                  <span>Student Photo Actions:</span>
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPhotoToClipboard}
                    leftIcon={isCopiedToClipboard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    className="text-xs py-1.5 px-3"
                  >
                    {isCopiedToClipboard ? 'Photo Copied!' : 'Copy Photo (Ctrl+V)'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPhoto}
                    leftIcon={<Download className="w-3.5 h-3.5 text-apex-blue-400" />}
                    className="text-xs py-1.5 px-3"
                  >
                    Download Photo
                  </Button>
                </div>
              </div>
            )}

            {copyFeedbackText && (
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{copyFeedbackText}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Student Name:</span>
                <span className="font-bold text-white">{submittedRecord.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Course:</span>
                <span className="font-bold text-apex-yellow-400">{submittedRecord.course}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Father's Name:</span>
                <span className="text-white">{submittedRecord.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Mother's Name:</span>
                <span className="text-white">{submittedRecord.motherName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Mobile / WhatsApp:</span>
                <span className="text-white font-mono">{submittedRecord.mobileNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Email:</span>
                <span className="text-white font-mono">{submittedRecord.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Correspondence Address:</span>
                <span className="text-slate-200">{submittedRecord.correspondenceAddress}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Permanent Address:</span>
                <span className="text-slate-200">{submittedRecord.permanentAddress}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Instructions Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 max-w-2xl mx-auto text-left space-y-2.5 text-xs text-slate-300">
            <p className="font-bold text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Dispatch Guide</span>
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              <li>
                <strong className="text-white">Online Photo Link:</strong> Aapka photo URL WhatsApp message me automatically link kar diya gaya hai. Admin WhatsApp me link khol kar student photo download kar sakte hain.
              </li>
              <li>
                <strong className="text-white">Direct Photo Send (Ctrl+V):</strong> Original image WhatsApp me bhejne ke liye WhatsApp Web khulne par chat me <strong className="text-apex-yellow-400">Ctrl + V (Paste)</strong> karein ya attach icon (+) se send karein.
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={
                submittedRecord
                  ? getWhatsAppUrl(createWhatsAppMessage(submittedRecord), getCertificateWhatsAppNumber())
                  : getWhatsAppUrl(undefined, getCertificateWhatsAppNumber())
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="yellow"
                size="lg"
                leftIcon={<MessageSquare className="w-5 h-5 text-emerald-950" />}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
              >
                Open in WhatsApp ({getCertificateWhatsAppNumber()})
              </Button>
            </a>

            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Submit Another Request
            </Button>
          </div>
        </Card>
      ) : (
        /* ========================================================
            CERTIFICATE REQUEST APPLICATION FORM
           ======================================================== */
        <Card variant="glass" className="p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Student Certificate Application Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Please enter all details accurately as they should appear on the official certificate.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-apex-yellow-400 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-500/30 shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>WhatsApp Direct Dispatch</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Section 1: Course & Session Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-apex-yellow-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>1. Academic & Course Information</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectDropdown
                  label="Select Course / Diploma"
                  isRequired
                  options={[
                    { value: 'ADCA', label: 'ADCA - Advance Diploma in Computer Applications (12M)' },
                    { value: 'DCA', label: 'DCA - Diploma in Computer Applications (6M)' },
                    { value: 'DFA', label: 'DFA - Diploma in Financial Accounting (4M)' },
                    { value: 'DTP', label: 'DTP - Diploma in Desktop Publishing (3M)' },
                    { value: 'Office Work', label: 'Office Work - MS Word, Excel & Tally Prime (3M)' }
                  ]}
                  value={values.course}
                  onChange={(e) => handleChange('course', e.target.value as CourseOption)}
                />

                <DatePicker
                  id="field-completionDate"
                  label="Course Completion Date"
                  isRequired
                  value={values.completionDate}
                  error={touched.completionDate ? errors.completionDate : undefined}
                  onChange={(e) => handleChange('completionDate', e.target.value)}
                  onBlur={() => handleBlur('completionDate')}
                />
              </div>
            </div>

            {/* Section 2: Student Identification */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-apex-blue-300 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>2. Student Identification Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Input
                  id="field-name"
                  label="Student's Full Name"
                  isRequired
                  placeholder="Enter full name"
                  value={values.name}
                  error={touched.name ? errors.name : undefined}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                />

                <Input
                  id="field-fatherName"
                  label="Father's Full Name"
                  isRequired
                  placeholder="Enter father's name"
                  value={values.fatherName}
                  error={touched.fatherName ? errors.fatherName : undefined}
                  onChange={(e) => handleChange('fatherName', e.target.value)}
                  onBlur={() => handleBlur('fatherName')}
                />

                <Input
                  id="field-motherName"
                  label="Mother's Full Name"
                  isRequired
                  placeholder="Enter mother's name"
                  value={values.motherName}
                  error={touched.motherName ? errors.motherName : undefined}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                  onBlur={() => handleBlur('motherName')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <DatePicker
                  id="field-dob"
                  label="Date of Birth"
                  isRequired
                  placeholder="Select Birth Date"
                  minYear={1960}
                  maxYear={new Date().getFullYear()}
                  value={values.dob}
                  error={touched.dob ? errors.dob : undefined}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  onBlur={() => handleBlur('dob')}
                />

                <SelectDropdown
                  label="Gender"
                  isRequired
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' }
                  ]}
                  value={values.gender}
                  onChange={(e) => handleChange('gender', e.target.value as Gender)}
                />

                <SelectDropdown
                  label="Social Category"
                  isRequired
                  options={[
                    { value: 'General', label: 'General' },
                    { value: 'OBC', label: 'OBC' },
                    { value: 'SC', label: 'SC' },
                    { value: 'ST', label: 'ST' },
                    { value: 'EWS', label: 'EWS' }
                  ]}
                  value={values.category}
                  onChange={(e) => handleChange('category', e.target.value as SocialCategory)}
                />
              </div>
            </div>

            {/* Section 3: Contact Details */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>3. Contact & Communication</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Input
                  id="field-mobileNumber"
                  label="Mobile / WhatsApp Number"
                  isRequired
                  placeholder="10-digit number"
                  maxLength={10}
                  inputMode="numeric"
                  type="tel"
                  value={values.mobileNumber}
                  error={touched.mobileNumber ? errors.mobileNumber : undefined}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const numsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleChange('mobileNumber', numsOnly);
                  }}
                  onBlur={() => handleBlur('mobileNumber')}
                />

                <Input
                  id="field-alternateNumber"
                  label="Alternate Contact No. (Optional)"
                  placeholder="10-digit alternate phone"
                  maxLength={10}
                  inputMode="numeric"
                  type="tel"
                  value={values.alternateNumber}
                  error={touched.alternateNumber ? errors.alternateNumber : undefined}
                  onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const numsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleChange('alternateNumber', numsOnly);
                  }}
                  onBlur={() => handleBlur('alternateNumber')}
                />

                <Input
                  id="field-email"
                  label="Email Address"
                  isRequired
                  type="email"
                  placeholder="student@example.com"
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
              </div>
            </div>

            {/* Section 4: Address Details */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-apex-red-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>4. Address Details</span>
              </h3>

              {/* Correspondence Address */}
              <TextArea
                id="field-correspondenceAddress"
                label="Correspondence Address"
                isRequired
                rows={3}
                placeholder="Complete street address, village/city, landmark, district, state & PIN code"
                value={values.correspondenceAddress}
                error={touched.correspondenceAddress ? errors.correspondenceAddress : undefined}
                onChange={(e) => {
                  handleChange('correspondenceAddress', e.target.value);
                  if (sameAddress) {
                    handleChange('permanentAddress', e.target.value);
                  }
                }}
                onBlur={() => handleBlur('correspondenceAddress')}
              />

              {/* Checkbox: By default UNCHECKED */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  type="checkbox"
                  id="sameAddress"
                  checked={sameAddress}
                  onChange={handleSameAddressToggle}
                  className="w-4 h-4 rounded text-apex-yellow-400 focus:ring-apex-yellow-400 bg-slate-900 border-slate-700 cursor-pointer"
                />
                <label htmlFor="sameAddress" className="text-xs text-slate-300 cursor-pointer select-none">
                  Permanent Address is the same as Correspondence Address (Auto-fill)
                </label>
              </div>

              {/* Permanent Address: ALWAYS VISIBLE */}
              <TextArea
                id="field-permanentAddress"
                label="Permanent Address"
                isRequired
                rows={3}
                placeholder="Enter permanent address"
                value={values.permanentAddress}
                error={touched.permanentAddress ? errors.permanentAddress : undefined}
                onChange={(e) => {
                  handleChange('permanentAddress', e.target.value);
                  if (sameAddress && e.target.value !== values.correspondenceAddress) {
                    setSameAddress(false);
                  }
                }}
                onBlur={() => handleBlur('permanentAddress')}
              />
            </div>

            {/* Section 5: Student Passport Photo / ID */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-apex-yellow-400 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>5. Student Passport Photo / ID (Optional)</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  Supported formats: JPG, PNG, WEBP (Max 2MB)
                </span>
              </div>

              {profilePreviewUrl ? (
                /* Selected / Uploaded State Preview Card */
                <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={profilePreviewUrl}
                        alt="Student Passport Preview"
                        className="w-20 h-24 rounded-xl object-cover object-top border-2 border-apex-yellow-400 shadow-xl shadow-black/60 bg-slate-950"
                      />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        ✓
                      </span>
                    </div>

                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Passport Photo Attached
                        </span>
                        <Badge variant="green" size="sm">
                          Ready for Diploma
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400">
                        This photograph will be attached to your verification record and diploma.
                      </p>
                      <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 pt-0.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>High-resolution photo ready for processing</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      leftIcon={<Upload className="w-3.5 h-3.5" />}
                    >
                      Change Photo
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={handleRemovePhoto}
                      leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Dropzone Card */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'group relative rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 border-2 border-dashed flex flex-col sm:flex-row items-center justify-between gap-6',
                    isDragging
                      ? 'border-apex-yellow-400 bg-apex-yellow-400/10 shadow-[0_0_25px_rgba(250,204,21,0.2)]'
                      : 'border-slate-700/80 hover:border-apex-yellow-400/80 bg-slate-900/60 hover:bg-slate-900/90'
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {/* Left: Interactive Icon & Upload Prompt */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/90 group-hover:bg-apex-yellow-400/20 text-slate-400 group-hover:text-apex-yellow-400 flex items-center justify-center border border-slate-700 group-hover:border-apex-yellow-400/50 transition-all shrink-0 shadow-inner">
                      <Camera className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white group-hover:text-apex-yellow-400 transition-colors">
                        Click to upload or drag & drop student photo
                      </p>
                      <p className="text-xs text-slate-400">
                        Passport size photograph for official certificate printing (JPG, PNG, WEBP max 2MB)
                      </p>
                      <p className="text-[11px] text-apex-blue-300">
                        Optional: You can also send your passport photo directly on WhatsApp after submitting.
                      </p>
                    </div>
                  </div>

                  {/* Right: Browse CTA button */}
                  <div className="shrink-0">
                    <span className="px-4 py-2.5 rounded-xl bg-slate-800 group-hover:bg-apex-yellow-400 group-hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 group-hover:border-apex-yellow-400 transition-all inline-flex items-center gap-1.5 shadow-md">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Browse Photo</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Submitted data will be formatted and opened directly in WhatsApp.</span>
              </div>

              <Button
                type="submit"
                variant="yellow"
                size="lg"
                isLoading={isSubmitting}
                loadingText={submitStatusText}
                leftIcon={<Send className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto font-bold"
              >
                Submit & Send to WhatsApp
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
