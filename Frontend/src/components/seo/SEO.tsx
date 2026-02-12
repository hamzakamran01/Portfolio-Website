import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    structuredData?: object | object[];
}

const SITE_URL = 'https://hamzakamran.tech';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ceo_image.png`;

const DEFAULT_KEYWORDS = [
    // Personal Brand
    'Hamza Kamran', 'Hamza', 'Kamran', 'hamzakamran',
    // Professional Titles
    'Enterprise AI Solutions Architect', 'AI Solutions Architect', 'Enterprise Solutions Architect',
    'AI Engineer', 'AI Automation Specialist', 'Full Stack Developer', 'Enterprise Web Developer',
    'Solutions Architect', 'Software Engineer', 'Tech Leader', 'Startup Founder',
    // Company
    'Zaaric', 'Zaaric AI', 'Founder Zaaric', 'CEO Zaaric', 'Zaaric Enterprise Automation',
    // Technical Skills
    'AI-Powered Automation', 'Agentic AI', 'Cloud Architecture', 'Digital Transformation',
    'React Developer', 'Next.js Developer', 'TypeScript Developer', 'Node.js Developer',
    'n8n Automation', 'LangChain Developer', 'OpenAI Developer', 'Claude Agent SDK',
    'GraphQL', 'Three.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
    'Enterprise Automation', 'SaaS Developer', 'DevOps Engineer', 'Microservices',
    // Achievements
    'Qimam Fellowship', 'Qimam Fellow', 'Parliamentary Debates',
    // Location
    'Pakistan Developer', 'Lahore Developer', 'Lahore Pakistan Tech',
    // General
    'Portfolio', 'Tech Portfolio', '3D Portfolio Website',
].join(', ');

const SEO: React.FC<SEOProps> = ({
    title = 'Enterprise AI Solutions Architect & Founder of Zaaric',
    description = 'Hamza Kamran — Enterprise Solutions Architect, AI-Powered Automation Specialist, and Founder & CEO of Zaaric. Specializing in scalable cloud architectures, agentic AI systems, and enterprise digital transformation. 2+ years architecting platforms and AI automation workflows that transform SME operations.',
    keywords = DEFAULT_KEYWORDS,
    canonical = SITE_URL,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    structuredData,
}) => {
    const siteTitle = `Hamza Kamran | ${title}`;

    // Ensure og:image is always absolute
    const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonical} />
            <meta name="author" content="Hamza Kamran" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="Hamza Kamran — Enterprise AI Solutions Architect & Founder of Zaaric" />
            <meta property="og:site_name" content="Hamza Kamran — Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter / X Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonical} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteOgImage} />
            <meta name="twitter:image:alt" content="Hamza Kamran — Enterprise AI Solutions Architect & Founder of Zaaric" />

            {/* GEO Tags */}
            <meta name="geo.region" content="PK-PB" />
            <meta name="geo.placename" content="Lahore, Pakistan" />
            <meta name="geo.position" content="31.5204;74.3587" />
            <meta name="ICBM" content="31.5204, 74.3587" />

            {/* JSON-LD Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(
                        Array.isArray(structuredData) ? structuredData : structuredData
                    )}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
