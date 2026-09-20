export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** What the quote is about. Shown under the name — this is what makes the
   *  quote checkable, so it is required, not optional. */
  project: string;
  /** Case study link, when the project has a detail page on this site. */
  projectHref?: string;
  /** Where the client is based, when known. Left out rather than guessed. */
  location?: string;
  /** Platform the review was left on. Drives the source badge. */
  source?: 'Upwork';
  /** Star rating as left on the platform, 1–5. Omitted when not recorded. */
  rating?: number;
  /** Optional headshot in /public/assets. Falls back to initials. */
  avatar?: string;
  /** A public profile makes the quote checkable. This is what turns a
   *  testimonial from decoration into evidence. */
  profileUrl?: string;
  /**
   * True only when the quote has a real full name and a real, named project
   * behind it. Unverified entries render with a muted treatment and no link,
   * so the page never implies more than it can show.
   */
  verified: boolean;
}

/**
 * Client reviews, verbatim from Upwork.
 *
 * This list previously held three placeholder quotes recovered from four dead
 * testimonial components — "Tech Lead" with no surname at Zaaric (Hamza's own
 * company), "Sarah" with no surname, and a real name whose company was listed
 * as "Self". For a page whose job is converting US/EU founders, an anonymous
 * quote is worth less than no quote: it reads as filler and costs credibility.
 * All three are gone. What is left is only what can be stood behind.
 *
 * Patrick's wording is lightly copy-edited for typos; the substance is his.
 * Ezra's is untouched.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ezra-molkha',
    quote:
      'Hamza was very open to ideas and extremely patient throughout the project. He explained clearly what needed to be done, helped me understand the situation at each stage, and completed the work quickly. Communication was professional and cooperative, and he was always willing to discuss feedback and possible improvements. I appreciated his thoughtful approach and the effort he put into the project.',
    author: 'Ezra Molkha',
    project: 'Redhead Slideshow platform',
    source: 'Upwork',
    verified: true,
  },
  {
    id: 'patrick-tonkinson',
    quote:
      "I'm genuinely impressed by how Zaaric transformed my idea into a fully realized product — with precision, maintaining excellent communication throughout, and delivering the entire process seamlessly.",
    author: 'Patrick Tonkinson',
    project: 'United by Art',
    projectHref: '/project-detail.html?id=united-by-art',
    location: 'United States',
    source: 'Upwork',
    verified: true,
  },
];

/** Entries safe to present as proof. */
export const getVerifiedTestimonials = (): Testimonial[] =>
  TESTIMONIALS.filter(t => t.verified);
