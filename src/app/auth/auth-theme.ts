// Swap these values to match your existing design tokens.
// All auth screens import from this single file.

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
  googleDisclaimer:   'Use any Google account. Your account is reviewed by an admin before you get access.',
  pendingHeading:     'Awaiting administrator approval',
  pendingBody:        'Your details have been submitted. An admin will review your account and grant access within 1–2 working days.',
  rejectedHeading:    'Account not approved',
  rejectedBody:       "We weren't able to approve your account this time. Please check the reason below or contact the administrator.",
} as const;
