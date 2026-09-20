import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const PROJECT_TYPES = [
  'AI agent / automation workflow',
  'AI feature in an existing product',
  'Full platform build',
  'Architecture / technical review',
  'Something else',
];

const BUDGETS = ['Under $5k', '$5k - $15k', '$15k - $50k', '$50k+', 'Not sure yet'];

const TIMELINES = ['ASAP', 'Within a month', '1 - 3 months', 'Just exploring'];

const CONTACT_EMAIL = 'hamzakamran843@gmail.com';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const apiUrl = import.meta.env.VITE_API_URL;

    // A missing env var used to surface the raw developer string
    // "API URL is not defined. Please check your environment variables."
    // straight to the visitor. Fall back to mail instead of leaking config.
    if (!apiUrl) {
      setStatus({
        loading: false,
        success: false,
        error: `The form is unavailable right now. Please email ${CONTACT_EMAIL} directly - I reply within one business day.`,
      });
      return;
    }

    // The backend contract is name / email / subject / message, so the
    // qualifying answers are folded into those fields rather than requiring a
    // backend change.
    const payload = {
      name: formData.name,
      email: formData.email,
      subject: `New enquiry - ${formData.projectType || 'General'}${
        formData.company ? ` (${formData.company})` : ''
      }`,
      message: [
        formData.company && `Company: ${formData.company}`,
        formData.projectType && `Project type: ${formData.projectType}`,
        formData.budget && `Budget: ${formData.budget}`,
        formData.timeline && `Timeline: ${formData.timeline}`,
        '',
        formData.message,
      ]
        .filter(Boolean)
        .join('\n'),
    };

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setStatus({ loading: false, success: true, error: null });
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        loading: false,
        success: false,
        error: `Something went wrong sending that. Please email ${CONTACT_EMAIL} and I will pick it up from there.`,
      });
    }
  };

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
      <div className={styles.contactHeader}>
        <h2 id="contact-heading">Start a project</h2>
        <p>
          Tell me what you are building and what is in the way. If it is a fit, I will come back
          with an architecture sketch and a 30-day plan. If it is not, I will tell you that too.
        </p>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <FaEnvelope />
            </div>
            <div className={styles.infoContent}>
              <h3>Email</h3>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <FaPhone />
            </div>
            <div className={styles.infoContent}>
              <h3>Phone</h3>
              <a href="tel:+923052449933">+92 305 2449933</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon} aria-hidden="true">
              <FaMapMarkerAlt />
            </div>
            <div className={styles.infoContent}>
              <h3>Based in</h3>
              <p>Lahore, Pakistan &mdash; working across US &amp; EU time zones</p>
            </div>
          </div>

          <p className={styles.responseNote}>Typical reply time: within one business day.</p>

          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/in/hamza-kamran-7b1a85294/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Hamza Kamran on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
            <a
              href="https://github.com/MCodecreeper"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Hamza Kamran on GitHub"
            >
              <FaGithub aria-hidden="true" />
            </a>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {/* Status was previously announced to nobody - there was no live region. */}
          <div aria-live="polite" role="status">
            {status.error && <div className={styles.errorMessage}>{status.error}</div>}
            {status.success && (
              <div className={styles.successMessage}>
                Thanks &mdash; that came through. I will reply within one business day.
              </div>
            )}
          </div>

          {/* Every field previously had a placeholder and no label at all. */}
          <div className={styles.formGroup}>
            <label className="visually-hidden" htmlFor="contact-name">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className="visually-hidden" htmlFor="contact-email">
              Work email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Work email"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className="visually-hidden" htmlFor="contact-company">
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company (optional)"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className="visually-hidden" htmlFor="contact-project-type">
              What do you need built?
            </label>
            <select
              id="contact-project-type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">What do you need built?</option>
              {PROJECT_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className="visually-hidden" htmlFor="contact-budget">
                Budget range
              </label>
              <select
                id="contact-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={styles.formInput}
              >
                <option value="">Budget range</option>
                {BUDGETS.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className="visually-hidden" htmlFor="contact-timeline">
                Timeline
              </label>
              <select
                id="contact-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={styles.formInput}
              >
                <option value="">Timeline</option>
                {TIMELINES.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className="visually-hidden" htmlFor="contact-message">
              What are you trying to build?
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What are you trying to build, and what is in the way?"
              className={styles.formInput}
              rows={5}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={status.loading}>
            {status.loading ? 'Sending...' : 'Send enquiry'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
