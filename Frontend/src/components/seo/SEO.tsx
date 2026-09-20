import { Helmet } from 'react-helmet-async';

/**
 * Per-page metadata.
 *
 * This component previously re-emitted every tag that already existed
 * statically in index.html, which produced duplicate descriptions, duplicate
 * Open Graph tags and — worst — TWO <link rel="canonical"> in the live DOM.
 *
 * The homepage now relies solely on the static head in index.html (which also
 * makes its JSON-LD visible to non-JS social crawlers). This component is for
 * pages whose metadata genuinely varies per view — currently the project
 * case-study pages, whose head is deliberately minimal in project-detail.html.
 */
interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
}

const SITE_URL = 'https://hamzakamran.tech';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ceo_image.png`;

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'article',
  structuredData,
}) => {
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const absoluteCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteCanonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
