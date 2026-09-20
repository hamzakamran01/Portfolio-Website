export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional headshot in /public/assets. Falls back to initials. */
  avatar?: string;
  /** A public profile makes the quote checkable. This is what turns a
   *  testimonial from decoration into evidence. */
  profileUrl?: string;
  /**
   * True only when the quote has a real full name, a real role, a real
   * company, and ideally a link. Unverified entries render with a muted
   * treatment and no link, so the page never implies more than it can show.
   */
  verified: boolean;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * ACTION REQUIRED — replace the attribution on all three entries.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * These quotes are recovered verbatim from the four dead testimonial
 * components that previously shipped in the repo and were never rendered.
 * The words are real; the attribution is not usable as proof:
 *
 *   1. "Tech Lead" with no surname, at Zaaric — Hamza's OWN company.
 *   2. "Sarah" — first name only, company given as a generic description.
 *   3. "Sara Malik" — a real name, but company listed as "Self".
 *
 * For a page whose job is converting US/EU founders, an anonymous quote is
 * worth less than no quote: it reads as filler and costs credibility. Each
 * entry needs a full name, a real role, a real company and a profile link.
 * Set `verified: true` once that is in place.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'zaaric-tech-lead',
    quote:
      "Hamza's expertise in full-stack development and innovative 3D implementations transformed our digital presence. A true professional.",
    author: 'Tech Lead', // TODO: full name
    role: 'Engineering', // TODO: actual title
    company: 'Zaaric',
    verified: false,
  },
  {
    id: 'ecommerce-founder',
    quote:
      'His work on our online store was exceptional. The modern features and user-friendly design helped grow our small business significantly.',
    author: 'Sarah', // TODO: full name
    role: 'Founder',
    company: 'Online Fashion Boutique', // TODO: actual company name
    verified: false,
  },
  {
    id: 'sara-malik',
    quote:
      'His 3D portfolio work is a masterpiece — innovative, immersive, and absolutely next-level.',
    author: 'Sara Malik',
    role: 'Freelance Designer',
    company: 'Self', // TODO: studio or client name
    verified: false,
  },
];

/** Entries safe to present as proof. */
export const getVerifiedTestimonials = (): Testimonial[] =>
  TESTIMONIALS.filter(t => t.verified);
