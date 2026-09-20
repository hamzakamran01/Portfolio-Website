import type { FallbackProps } from 'react-error-boundary';

/**
 * Minimal, on-brand fallback. Previously a WebGL context failure anywhere on
 * the page white-screened the whole site, because nothing was wrapped in a
 * boundary despite react-error-boundary being installed.
 */
const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => (
  <div role="alert" className="error-fallback">
    <h2>Something went wrong rendering this section.</h2>
    <p>
      The rest of the page still works. You can retry, or reach me directly at{' '}
      <a href="mailto:services@zaaric-ai.com">services@zaaric-ai.com</a>.
    </p>
    <button type="button" onClick={resetErrorBoundary}>
      Retry
    </button>
  </div>
);

export default ErrorFallback;
