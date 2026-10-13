// Auth screen design tokens and copy live here so the screens can match the app theme.

export const authColors = {
  background:     '#FBFAF5',   // warm off-white page background
  surface:        '#FFFFFF',   // card/panel background
  border:         '#D6E8F0',   // light blue-grey borders
  accent:         '#ADD8E6',   // light blue – secondary highlights
  accentMuted:    '#EDF8FC',   // very light blue tint
  gold:           '#FFBF00',   // primary action colour
  goldHover:      '#E6AC00',
  text:           '#1a1a2e',   // headings and body
  textMuted:      '#5A5A7A',   // secondary labels
  textLight:      '#9CA3AF',   // placeholder / helper text
  error:          '#DC2626',
  errorSurface:   '#FEF2F2',
  errorBorder:    '#FECACA',
  successText:    '#15803D',
  successSurface: '#F0FDF4',
  successBorder:  '#BBF7D0',
  googleText:     '#3C4043',
  focus:          '#5B9BB8',
} as const;

export const authFonts = {
  heading: "'Plus Jakarta Sans', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export const authSpacing = {
  pageX: '1.25rem',
  pageY: '2.5rem',
  sectionGap: '1.5rem',
  headerGap: '0.75rem',
  cardPadding: 'clamp(1.25rem, 4vw, 2.5rem)',
  fieldGap: '1.25rem',
  controlY: '0.75rem',
  controlX: '1rem',
  buttonMinHeight: '3rem',
} as const;

export const authRadius = {
  sm:   '0.375rem',
  md:   '0.625rem',
  lg:   '0.875rem',
  xl:   '1.25rem',
  pill: '9999px',
} as const;

export const authShadow = {
  card:  '0 1px 4px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.06)',
  input: '0 1px 2px rgba(0,0,0,0.04)',
} as const;

// Text strings — edit here to update copy across all screens
export const authCopy = {
  appName:            'Studex',
  tagline:            'Every note. Every branch. One place.',
  googleButtonLabel:  'Continue with Google',
  googleButtonLoading: 'Connecting…',
  googleDisclaimer:  'Use any Google account. Your account is reviewed by an admin before you get access.',
  loginHeading:      'Welcome to your study community',
  loginDescription:  'Sign in to find and share notes, question papers, and presentations.',
  registrationHeading: 'Complete your profile',
  registrationDescription: 'Add your college details so we can verify your student account.',
  registrationNameLabel: 'Full name',
  registrationNamePlaceholder: 'As on your college ID',
  registrationEmailLabel: 'Email',
  registrationUsnLabel: 'USN (University Seat Number)',
  registrationDepartmentLabel: 'Department',
  registrationYearLabel: 'Academic year',
  registrationUsnPlaceholder: 'e.g. 1XX21CS000',
  registrationDepartmentPlaceholder: 'Select department',
  registrationYearPlaceholder: 'Select year',
  registrationSubmit: 'Submit for verification',
  registrationSubmitting: 'Submitting…',
  registrationError: 'We couldn’t submit your details. Please try again.',
  registrationEmailSource: 'from Google',
  registrationIllustrationAlt: 'Students sharing ideas and studying together',
  resourceTypes: {
    notes: 'Notes',
    papers: 'Question papers',
    presentations: 'PPTs',
  },
  departments: [
    { value: 'ECE', label: 'ECE — Electronics & Communication' },
    { value: 'CSE', label: 'CSE — Computer Science & Engineering' },
    { value: 'ISE', label: 'ISE — Information Science & Engineering' },
    { value: 'EEE', label: 'EEE — Electrical & Electronics' },
    { value: 'ME', label: 'ME — Mechanical Engineering' },
    { value: 'CV', label: 'CV — Civil Engineering' },
  ],
  academicYears: [
    { value: '1', label: '1st year' },
    { value: '2', label: '2nd year' },
    { value: '3', label: '3rd year' },
    { value: '4', label: '4th year' },
  ],
  verificationResults: {
    verified: 'Verified',
    mismatch: 'Mismatch',
    not_found: 'Not found',
    already_claimed: 'Already claimed',
    manual_review: 'Pending review',
  },
  validationFullName: 'Please enter your full name.',
  validationUsn: 'Please enter a valid USN.',
  validationDepartment: 'Please select your department.',
  validationYear: 'Please select your academic year.',
  pendingHeading:     'Your account is awaiting administrator approval',
  pendingBody:        'Your details have been submitted. An administrator will review your account before you get access.',
  pendingWaitTime:    'Reviews usually take 1–2 working days.',
  pendingSteps: {
    google_verified: 'Google email verified',
    usn_submitted: 'USN submitted',
    admin_approved: 'Admin approval',
  },
  pendingStepStates: {
    done: 'Done',
    in_progress: 'In progress',
    waiting: 'Waiting',
  },
  rejectedHeading:    'Your account was not approved',
  rejectedBody:       'We couldn’t approve your account at this time. You can contact the administrator or request another review.',
  rejectedReasonLabel: 'Reason',
  contactAdministrator: 'Contact administrator',
  requestReview: 'Request a review',
  requestReviewLoading: 'Sending request…',
  logOut: 'Log out',
} as const;
