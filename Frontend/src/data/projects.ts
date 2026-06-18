// ============================================================================
// PROJECTS DATA - Enhanced enterprise-level project showcase
// ============================================================================

import { Project } from '../types';
import React from 'react';
import { FaChartLine, FaShieldAlt, FaUsers, FaRocket, FaClock, FaAward } from 'react-icons/fa';

/**
 * All portfolio projects with comprehensive data
 */
export const projects: Project[] = [
  {
    id: 'ai-health-dost',
    title: 'AI HealthDost',
    subtitle: 'AI-Powered Personal Health Memory Platform',
    tagline: 'Your Complete Health History, One AI Away',
    description: 'AI-powered personal health memory platform for Pakistani patients that digitizes fragmented medical records and enables intelligent health queries in Urdu or English.',
    longDescription: 'AI HealthDost is an AI-powered personal health memory platform for Pakistani patients, built on a Next.js and Supabase (PostgreSQL + pgvector) stack within a Turborepo monorepo, that solves the fundamental problem of fragmented, paper-based medical records across Pakistan\'s disconnected healthcare facilities.',
    overview: 'Patients upload any health document—lab reports, prescriptions, discharge summaries, or hybrid mixed-format documents common in Pakistani clinics. These pass through a multi-stage ingestion pipeline that classifies document type, extracts structured data (biomarker values, medicine names, dosages, dates), embeds content using OpenAI\'s text-embedding-3-small, and stores it in pgvector with rich metadata for hybrid retrieval weighting both semantic similarity and recency.',
    challenge: 'Pakistan\'s healthcare facilities operate in silos with fragmented, paper-based medical records. Patients struggle to maintain comprehensive health histories, and healthcare providers lack access to complete patient data across different facilities, leading to redundant tests, medication errors, and poor continuity of care.',
    solution: 'Built a full-stack AI-powered platform using Next.js and Supabase with PostgreSQL + pgvector. Implemented a multi-stage document ingestion pipeline with classification, structured data extraction, and OpenAI embeddings. Created an AI layer using OpenAI Agents SDK that enables patients to query health history in Urdu or English, get AI-simplified lab report explanations, track biomarker trends, and understand prescriptions in plain language. Positioned as a B2B patient intelligence layer for healthcare networks using CNIC as the master patient identifier.',
    impact: 'Digitized fragmented medical records into a unified, queryable health memory. Enabled patients to understand their health data in their native language through AI. Provided healthcare networks with a persistent patient intelligence layer to improve care coordination and reduce medical errors.',
    role: 'Full-Stack Developer & AI Engineer',
    timeline: '4 months (2025)',

    techStack: ['Next.js', 'Supabase', 'PostgreSQL', 'pgvector', 'OpenAI Agents SDK', 'text-embedding-3-small', 'Turborepo', 'Document Intelligence', 'RAG'],
    category: ['Web Application', 'AI', 'Healthcare'],
    tags: ['AI-Powered', 'Health Tech', 'RAG', 'Urdu NLP', 'Enterprise', 'Document Processing'],

    images: {
      thumbnail: {
        url: '/assets/AI HealthDost/Screenshot 2026-06-19 023535.png',
        alt: 'AI HealthDost Platform',
      },
      hero: {
        url: '/assets/AI HealthDost/Screenshot 2026-06-19 023535.png',
        alt: 'AI HealthDost - Personal Health Memory Platform',
        caption: 'AI-powered health intelligence platform for Pakistani patients',
      },
      screenshots: [
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023535.png',
          alt: 'Dashboard Overview',
          caption: 'Comprehensive health dashboard with AI-powered insights',
        },
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023609.png',
          alt: 'Document Upload Interface',
          caption: 'Multi-format document ingestion pipeline',
        },
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023627.png',
          alt: 'AI Health Query',
          caption: 'Natural language health queries in Urdu and English',
        },
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023702.png',
          alt: 'Biomarker Trends',
          caption: 'Longitudinal health trend visualization',
        },
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023724.png',
          alt: 'Prescription Intelligence',
          caption: 'AI-simplified prescription explanations',
        },
        {
          url: '/assets/AI HealthDost/Screenshot 2026-06-19 023755.png',
          alt: 'Health Timeline',
          caption: 'Unified health timeline with intelligent search',
        },
      ],
    },

    links: {
      live: undefined,
      github: undefined,
    },

    stats: [
      { label: 'Document Types', value: '15+', icon: React.createElement(FaRocket), color: '#10B981' },
      { label: 'AI Queries', value: 'NL', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'Languages', value: 'UR+EN', icon: React.createElement(FaShieldAlt), color: '#8B5CF6' },
    ],

    features: [
      'Multi-Stage Document Ingestion Pipeline',
      'Structured Data Extraction (Biomarkers, Medicines, Dosages)',
      'OpenAI text-embedding-3-small Vector Embeddings',
      'pgvector Hybrid Retrieval (Semantic + Recency)',
      'Bilingual Urdu/English AI Health Queries',
      'AI-Simplified Lab Report Explanations',
      'Longitudinal Biomarker Trend Tracking',
      'CNIC-Based Patient Record Linkage',
      'B2B Healthcare Network Integration',
    ],

    isFeatured: true,
    isMajor: true,
    isNDA: false,
    order: 0,
    createdAt: '2025-01-01',
  },

  {
    id: 'digiqms',
    title: 'DigiQMS',
    subtitle: 'AI-Powered Enterprise Queue Intelligence & Analytics',
    tagline: 'Intelligent Queues. Predictive Operations. Real-Time Insight.',
    description: 'AI-powered digital queueing platform with intelligent analytics, behavioral insights, and automated service optimization for enterprise operations.',
    longDescription: 'DigiQMS AI is an enterprise-grade, AI-powered queue management system. It automates token generation and uses intelligent data analytics to surface patterns, predict bottlenecks, and recommend operational improvements.',
    overview: 'DigiQMS AI transforms traditional queue management into an intelligent operations platform. AI-driven analytics dashboards visualize live queue health, user behavior, and service performance—turning raw operational data into decisions leaders can act on. Built for security and scale, it serves thousands of users daily with 99.99% uptime.',
    challenge: 'Organizations faced inefficient manual queue management, long wait times, and no intelligent layer to interpret operational data or predict service bottlenecks before they impacted customers.',
    solution: 'Built a full-stack enterprise platform with secure token generation, real-time monitoring via Socket.io, and AI-powered analytics dashboards (Recharts) that track behavior, performance, and trends. Added automated service optimization and predictive insights so managers can adjust staffing and flow proactively.',
    impact: 'Reduced average wait times by 45%, processes over 5,000 daily tokens across multiple service points, maintains 99.99% uptime, and provides actionable insights that have improved operational efficiency by 60%.',
    role: 'Full-Stack Developer & System Architect',
    timeline: '6 months (2024)',

    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.io', 'Recharts', 'Docker', 'AI Analytics'],
    category: ['Web Application', 'AI', 'Enterprise'],
    tags: ['AI-Powered', 'Queue Management', 'Data Analytics', 'Enterprise', 'Real-time'],

    images: {
      thumbnail: {
        url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
        alt: 'DigiQMS Dashboard Overview',
      },
      hero: {
        url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
        alt: 'DigiQMS Analytics Dashboard - Real-time Monitoring',
        caption: 'Advanced analytics dashboard with real-time queue monitoring',
      },
      screenshots: [
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224615.png',
          alt: 'Main Dashboard with Real-time Queue Status',
          caption: 'Real-time queue monitoring and analytics dashboard',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224655.png',
          alt: 'Advanced Analytics Overview',
          caption: 'Comprehensive data visualization and insights',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224720.png',
          alt: 'Token Generation Interface',
          caption: 'Secure and seamless token generation system',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224804.png',
          alt: 'Service Performance Metrics',
          caption: 'Detailed service completion and performance tracking',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224839.png',
          alt: 'User Behavior Analytics',
          caption: 'User behavior patterns and engagement metrics',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 224917.png',
          alt: 'Queue Management System',
          caption: 'Intelligent queue optimization and management',
        },
        {
          url: '/assets/digital-queueing-system/Screenshot 2025-12-01 225020.png',
          alt: 'Administrative Controls',
          caption: 'Comprehensive administrative panel and controls',
        },
      ],
    },

    links: {
      live: 'https://digital-queueing-system.vercel.app',
      github: undefined, // Private Repository
    },

    stats: [
      { label: 'Wait Time Reduction', value: '45%', icon: React.createElement(FaChartLine), color: '#10B981' },
      { label: 'Daily Tokens', value: '5k+', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'System Uptime', value: '99.99%', icon: React.createElement(FaShieldAlt), color: '#8B5CF6' },
    ],

    features: [
      'AI-Powered Analytics & Predictive Operations Dashboard',
      'Secure Token Generation Pathway with Multi-factor Authentication',
      'Real-time Queue Monitoring with WebSocket Integration',
      'Intelligent User Behavior Tracking & Heatmaps',
      'Automated Service Optimization Recommendations',
      'Multi-location Support with Centralized Management',
      'Mobile-responsive Interface for All Devices',
      'Role-based Access Control & Audit Logs',
    ],

    isFeatured: true,
    isMajor: true,
    isNDA: false,
    order: 2,
    createdAt: '2024-08-01',
  },

  {
    id: 'united-by-art',
    title: 'United by Art',
    subtitle: 'US Client · Enterprise Creative Networking Platform',
    tagline: 'Connecting Creatives, Amplifying Talent',
    description: 'US client MVP: enterprise-grade networking platform for artists with communities, collaborations, and a secure talent marketplace.',
    longDescription: 'United by Art is a sophisticated networking ecosystem built for a US-based client in the creative industry—facilitating collaboration, portfolio showcases, and trusted service exchange at scale.',
    overview: 'Delivered for a US client, United by Art bridges creative professionals with collaboration tools, community building, and monetization. The platform combines social networking with a secure marketplace so artists can showcase work, connect with peers, and grow their businesses.',
    challenge: 'Creative professionals lacked a dedicated platform that combined networking, collaboration tools, and a trusted marketplace for services. Existing solutions were either too generic or lacked the community features artists needed to thrive.',
    solution: 'Built a full-stack platform using React, Supabase for backend and real-time features, Zustand for state management, and Framer Motion for fluid animations. Implemented real-time messaging, community leaderboards, secure marketplace transactions, and portfolio showcase features optimized for creative content.',
    impact: 'Onboarded 1,200+ beta users, facilitated formation of 50+ creative communities, enabled hundreds of secure marketplace transactions, and created a vibrant ecosystem where artists can connect, collaborate, and monetize their skills.',
    role: 'Frontend Developer & Database Expert',
    timeline: '8 months (2024)',

    techStack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
    category: ['Web Application', 'Social Platform', 'Marketplace'],
    tags: ['US Client', 'Social Network', 'Creative', 'Marketplace', 'Enterprise'],

    images: {
      thumbnail: {
        url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
        alt: 'United by Art Platform',
      },
      hero: {
        url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
        alt: 'United by Art - Creative Networking Platform',
        caption: 'Dynamic community hub connecting creative professionals',
      },
      screenshots: [
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231408.png',
          alt: 'Community Hub Interface',
          caption: 'Vibrant community spaces for creative collaboration',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231421.png',
          alt: 'Artist Discovery Feed',
          caption: 'Discover talented artists and creative work',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231441.png',
          alt: 'Portfolio Showcase',
          caption: 'Beautiful portfolio presentations and galleries',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231453.png',
          alt: 'Marketplace Interface',
          caption: 'Secure talent marketplace for creative services',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231522.png',
          alt: 'Project Collaboration',
          caption: 'Seamless collaboration tools for creative projects',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231538.png',
          alt: 'Community Engagement',
          caption: 'Interactive features for community building',
        },
        {
          url: '/assets/united-by-art/Screenshot 2025-12-01 231918.png',
          alt: 'Creative Dashboard',
          caption: 'Comprehensive dashboard for managing creative work',
        },
      ],
    },

    links: {
      live: 'https://unitedby.art',
      github: undefined, // Private Repository
    },

    stats: [
      { label: 'Beta Users', value: '1.2k+', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'Communities', value: '50+', icon: React.createElement(FaRocket), color: '#F59E0B' },
      { label: 'Marketplace Tx', value: 'Secure', icon: React.createElement(FaShieldAlt), color: '#10B981' },
    ],

    features: [
      'Community Hubs & Collaboration Spaces',
      'Real-time Messaging System with Media Sharing',
      'Talent Marketplace with Secure Transactions',
      'Portfolio Showcase with Custom Branding',
      'Dynamic Leaderboards & Achievement System',
      'Project Collaboration Tools',
      'Event Management & RSVP System',
      'Advanced Search & Discovery Features',
    ],

    isFeatured: true,
    isMajor: true,
    isNDA: true,
    order: 1,
    createdAt: '2024-06-01',
  },

  // ── New AI/Tech Projects (Innovation Lab) ──────────────────────────
  {
    id: 'gigledger',
    title: 'EarnSight',
    subtitle: 'Intelligent Income Intelligence for the Gig Economy',
    tagline: 'Financial Clarity for the Invisible Workforce',
    description: 'Real-time income tracking and anomaly detection platform built for gig workers using ML-based pattern recognition.',
    longDescription: 'The gig economy runs on hustle but bleeds on invisibility. Drivers, freelancers, and daily-wage workers earn across multiple platforms with zero unified financial picture. EarnSight is a real-time income tracking and anomaly detection platform built specifically for gig workers, giving them what every salaried employee takes for granted: clarity on what they actually earned, what looks wrong, and what to do about it.',
    overview: 'EarnSight ingests earnings data across sources, detects income anomalies using ML-based pattern recognition, flags irregularities like sudden drops, platform fee spikes, or missing payments, and surfaces them in a clean dashboard the worker can actually understand. Built on a full-stack architecture spanning Next.js, FastAPI, Node/Express, and Neon PostgreSQL.',
    challenge: 'Gig workers earn across multiple platforms with no unified financial picture. Sudden income drops, platform fee spikes, or missing payments go unnoticed because there is no system designed to give them visibility into their own earnings data.',
    solution: 'Built a full-stack real-time analytics platform ingesting multi-source earnings data, with an ML anomaly detection engine that flags irregularities automatically. Designed a clean, intuitive dashboard that surfaces actionable insights for non-technical users.',
    impact: 'Demonstrated real-time anomaly detection across multi-platform earnings with instant visual feedback and automated risk flagging for non-technical users.',
    role: 'Full-Stack Developer & ML Engineer',
    timeline: 'FinTech ML Platform (2026)',

    techStack: ['Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'Machine Learning', 'Real-time Analytics'],
    category: ['Web Application', 'FinTech', 'ML'],
    tags: ['FinTech', 'Anomaly Detection', 'Gig Economy', 'ML'],

    images: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
        alt: 'EarnSight financial analytics and income intelligence dashboard',
      },
      hero: {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
        alt: 'EarnSight - Income Intelligence Platform',
      },
      screenshots: [
        {
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
          alt: 'EarnSight Analytics',
          caption: 'Real-time income analytics and anomaly detection dashboard',
        },
      ],
    },

    links: {
      live: undefined,
      github: undefined,
    },

    stats: [
      { label: 'Anomaly Engine', value: 'ML', icon: React.createElement(FaChartLine), color: '#10B981' },
      { label: 'Income Sources', value: '4+', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'Risk Alerts', value: 'Auto', icon: React.createElement(FaShieldAlt), color: '#F59E0B' },
    ],

    features: [
      'Multi-Platform Data Ingestion Pipeline',
      'ML-Based Income Anomaly Detection',
      'Real-Time Earnings Visualizations',
      'Automated Risk Flagging & Alerts',
      'Actionable Financial Insights Dashboard',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 3,
    createdAt: '2026-01-01',
  },

  {
    id: 'haqyab',
    title: 'LegalBridge AI',
    subtitle: 'Agentic Legal Access for Every Pakistani',
    tagline: 'The Law, Working for the People',
    description: 'Multi-agent AI pipeline bridging legal statutes and citizen action through NLP and RAG in Urdu & English.',
    longDescription: 'Pakistan has laws that protect ordinary citizens. Most citizens never find out. LegalBridge AI bridges that gap. A citizen describes their problem in plain Urdu or English. A multi-agent AI pipeline classifies the issue, retrieves the applicable Pakistani statute, drafts the exact legal document they need—whether a landlord notice, employer complaint, or FIR draft—and generates a step-by-step action plan in language any person can follow.',
    overview: 'LegalBridge AI is an agentic legal-access system. No lawyer. No fee. No wasta. Just the law, working for the people it was written to protect. It uses OpenAI Agents SDK with a RAG pipeline backed by pgvector to retrieve relevant statutes and generate actionable legal documents in both Urdu and English.',
    challenge: 'Legal protections for Pakistani citizens are buried in English legal text, inaccessible without a lawyer, and useless without knowing which court, which document, and which step to take next.',
    solution: 'Built a multi-agent AI pipeline using OpenAI Agents SDK with RAG retrieval from pgvector. The system classifies legal issues, retrieves applicable statutes, auto-drafts legal documents, and generates step-by-step action plans in both Urdu and English.',
    impact: 'Democratized legal access for ordinary Pakistani citizens by eliminating the need for expensive legal counsel for common civil matters like tenant rights, employment disputes, and consumer fraud.',
    role: 'AI Engineer & Full-Stack Developer',
    timeline: '3 weeks (2026)',

    techStack: ['OpenAI Agents SDK', 'RAG', 'pgvector', 'Next.js', 'FastAPI', 'Python', 'Urdu NLP'],
    category: ['AI', 'Legal Tech', 'NLP'],
    tags: ['Agentic AI', 'Legal Tech', 'RAG', 'Urdu NLP', 'Social Impact'],

    images: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
        alt: 'LegalBridge AI agentic legal workspace and document intelligence',
      },
      hero: {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
        alt: 'LegalBridge AI - Agentic Legal Access Platform',
      },
      screenshots: [
        {
          url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
          alt: 'LegalBridge AI Legal Pipeline',
          caption: 'Multi-agent pipeline for legal document generation',
        },
      ],
    },

    links: {
      live: undefined,
      github: undefined,
    },

    stats: [
      { label: 'AI Agents', value: 'Multi', icon: React.createElement(FaRocket), color: '#8B5CF6' },
      { label: 'Bilingual NLP', value: 'EN+UR', icon: React.createElement(FaUsers), color: '#00E7FF' },
      { label: 'Statute RAG', value: 'pgvector', icon: React.createElement(FaShieldAlt), color: '#10B981' },
    ],

    features: [
      'Multi-Agent AI Classification Pipeline',
      'Bilingual Urdu/English NLP Support',
      'Automated Legal Document Generation',
      'pgvector RAG Statute Retrieval',
      'Step-by-Step Citizen Action Plans',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 4,
    createdAt: '2026-02-01',
  },

  {
    id: 'rxflow',
    title: 'RxFlow',
    subtitle: 'HIPAA-Compliant Pharmacy Commerce Platform',
    tagline: 'Where Healthcare Meets Secure Commerce',
    description: 'Full-stack pharmacy platform combining end-to-end e-commerce with strictly regulated HIPAA healthcare data protocols.',
    longDescription: 'Built for the US healthcare market where compliance is not optional and data integrity is everything. RxFlow is a full-stack pharmacy platform combining end-to-end medicine e-commerce with HIPAA-compliant data intake for both patients and vendors. Patients browse, order, and manage prescriptions through a clean consumer interface. On the backend, vendor onboarding, inventory management, and patient health records follow strict HIPAA data handling protocols including encrypted storage, access controls, and audit trails.',
    overview: 'The result is a platform that operates at the intersection of healthcare and commerce without compromising either—the exact standard US pharmacy clients require before trusting any external system with patient data.',
    challenge: 'The US healthcare market demands absolute HIPAA compliance. Any system handling patient data must implement encrypted storage, strict access controls, and comprehensive audit trails while maintaining a seamless e-commerce experience.',
    solution: 'Built a dual-interface platform: a clean consumer-facing e-commerce front and a strictly regulated backend with AWS KMS encryption, role-based access controls, vendor onboarding workflows, and complete audit trail logging for every data access event.',
    impact: 'Delivered a production-ready pharmacy platform meeting the full HIPAA compliance standard required for US healthcare market deployment.',
    role: 'Full-Stack Developer & Security Architect',
    timeline: '4 months (2025)',

    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS KMS', 'HIPAA Compliance', 'Stripe', 'REST APIs'],
    category: ['Web Application', 'Healthcare', 'E-Commerce'],
    tags: ['HIPAA', 'Healthcare', 'E-Commerce', 'Security', 'Compliance'],

    images: {
      thumbnail: {
        url: '/assets/pharmacyProjectpic.webp',
        alt: 'RxFlow HIPAA-compliant pharmacy commerce platform',
      },
      hero: {
        url: '/assets/pharmacyProjectpic.webp',
        alt: 'RxFlow - HIPAA Compliant Pharmacy Commerce',
      },
      screenshots: [
        {
          url: '/assets/pharmacyProjectpic.webp',
          alt: 'RxFlow Commerce Interface',
          caption: 'Secure pharmacy e-commerce with HIPAA compliance',
        },
      ],
    },

    links: {
      live: undefined,
      github: undefined,
    },

    stats: [
      { label: 'Compliance', value: 'HIPAA', icon: React.createElement(FaShieldAlt), color: '#10B981' },
      { label: 'Encryption', value: 'AWS KMS', icon: React.createElement(FaShieldAlt), color: '#00E7FF' },
      { label: 'Delivery', value: '4 Mo', icon: React.createElement(FaClock), color: '#8B5CF6' },
    ],

    features: [
      'End-to-End Secure E-Commerce Pipeline',
      'HIPAA-Compliant Data Architecture',
      'AWS KMS Encrypted Patient Storage',
      'Vendor Onboarding & Inventory Portal',
      'Comprehensive Access Controls & Audit Trails',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 5,
    createdAt: '2025-03-01',
  },

  {
    id: 'medicenter-ai',
    title: 'mediCenterAI',
    subtitle: 'Your Complete Health Intelligence Partner',
    tagline: 'Medical Intelligence, Made Human',
    description: 'AI-powered medical assistant that digitizes health records and acts as a personal health intelligence partner.',
    longDescription: 'Medical records are the most important data most people never understand. mediCenterAI changes that relationship entirely. It digitizes all medical invoices and health records through intelligent document processing, builds a unified health timeline the patient actually owns, and sits on top of it as an AI medical partner that knows your complete history.',
    overview: 'Ask it anything. What do my last three blood tests show? Is this new prescription interacting with something I already take? What does this diagnosis actually mean? mediCenterAI responds in plain human language—no jargon, no condescension—the way a brilliant doctor friend would explain things if they had time. One-click health stats, trend visualizations, and simple actionable suggestions make it the first health tool built for the person, not the provider.',
    challenge: 'People accumulate stacks of medical invoices, prescriptions, and lab reports that sit in a drawer until something goes wrong. No existing tool actually helps patients understand and own their health data.',
    solution: 'Built an intelligent document processing pipeline that digitizes and unifies all medical records into a single health timeline. Layered an AI medical partner on top that can answer natural language queries about the patient\'s full history, flag prescription interactions, and visualize health trends.',
    impact: 'Created the first truly patient-centric health intelligence tool that makes complex medical data accessible, understandable, and actionable for everyday people.',
    role: 'AI Engineer & Full-Stack Developer',
    timeline: '5 weeks (2026)',

    techStack: ['Next.js', 'Python', 'OpenAI API', 'Document Intelligence', 'PostgreSQL', 'Health Records Processing'],
    category: ['AI', 'Healthcare', 'Document Processing'],
    tags: ['AI', 'Health Tech', 'Document Intelligence', 'NLP', 'Patient Data'],

    images: {
      thumbnail: {
        url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2000&auto=format&fit=crop',
        alt: 'mediCenterAI clinical AI and digital health intelligence',
      },
      hero: {
        url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2000&auto=format&fit=crop',
        alt: 'mediCenterAI - Health Intelligence Partner',
      },
      screenshots: [
        {
          url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2000&auto=format&fit=crop',
          alt: 'mediCenterAI Health Timeline',
          caption: 'Unified health timeline with AI-powered insights',
        },
      ],
    },

    links: {
      live: undefined,
      github: undefined,
    },

    stats: [
      { label: 'Health Timeline', value: 'Unified', icon: React.createElement(FaChartLine), color: '#00E7FF' },
      { label: 'AI Partner', value: 'NL Chat', icon: React.createElement(FaRocket), color: '#8B5CF6' },
      { label: 'Doc Intelligence', value: 'OCR', icon: React.createElement(FaAward), color: '#10B981' },
    ],

    features: [
      'Intelligent Document OCR & Digitization',
      'Unified Patient Health Timeline',
      'AI-Powered Natural Language Medical Queries',
      'Cross-Prescription Interaction Detection',
      'Real-Time Health Trend Visualizations',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 6,
    createdAt: '2026-03-01',
  },

  {
    id: '3d-chair-visualizer',
    title: '3D Chair Visualizer',
    subtitle: 'Interactive E-Commerce Experience',
    tagline: 'Bringing Products to Life in 3D',
    description: 'Real-time 3D chair visualizer bridging the gap between online and physical shopping with immersive product exploration.',
    longDescription: 'A revolutionary e-commerce tool that allows users to visualize furniture in real-time 3D. This project bridges the gap between digital browsing and physical reality, offering an immersive shopping experience.',
    overview: '3D Chair Visualizer transforms online furniture shopping by providing customers with an interactive, photorealistic 3D preview of products. Users can rotate, zoom, customize materials and colors, and see exactly what they\'re buying before making a purchase decision.',
    challenge: 'E-commerce faces high return rates for furniture due to customers\' inability to visualize products in their space. Static images fail to convey size, texture, and spatial presence, leading to customer dissatisfaction and costly returns.',
    solution: 'Developed a Three.js-powered 3D visualization platform using Next.js for optimal performance. Implemented real-time material switching, lighting control, and smooth 360-degree rotation. Optimized 3D models for fast loading while maintaining visual quality. Used Tailwind for responsive UI and Framer Motion for smooth transitions.',
    impact: 'Dramatically improved customer confidence in purchase decisions, reduced potential return rates, and provided a competitive edge in the e-commerce space. The immersive 3D experience increased customer engagement and time on product pages.',
    role: 'Full-Stack Developer & 3D Engineer',
    timeline: '2 months (2024)',

    techStack: ['Next.js', 'Three.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    category: ['Web Application', '3D', 'E-Commerce'],
    tags: ['3D Visualization', 'E-Commerce', 'Interactive', 'Product Design'],

    images: {
      thumbnail: {
        url: '/assets/3D_chair_visualizer.png',
        alt: '3D Chair Visualizer',
      },
      hero: {
        url: '/assets/3D_chair_visualizer.png',
        alt: 'Interactive 3D Chair Visualization',
      },
      screenshots: [
        {
          url: '/assets/3D_chair_visualizer.png',
          alt: '3D Chair with Material Customization',
          caption: 'Real-time material and color customization',
        },
      ],
    },

    links: {
      live: 'https://3-d-chair-visualizer.vercel.app/',
      github: 'https://github.com/MCodecreeper/3D-chair-Visualizer',
    },

    stats: [
      { label: 'Load Time', value: '<2s', icon: React.createElement(FaClock), color: '#10B981' },
      { label: '3D Quality', value: 'High', icon: React.createElement(FaAward), color: '#00E7FF' },
    ],

    features: [
      'Real-time 3D Model Rendering with Three.js',
      '360° Product Rotation & Zoom',
      'Material & Color Customization',
      'Responsive Design for All Devices',
      'Optimized 3D Models for Fast Loading',
      'Smooth Animations & Transitions',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 7,
    createdAt: '2024-03-01',
  },

  {
    id: 'zaaric',
    title: 'ZAARIC',
    subtitle: 'Modern Tech Agency Website',
    tagline: 'Where Innovation Meets Design',
    description: 'High-performance agency website with stunning GSAP animations and seamless UI delivering exceptional user experience.',
    longDescription: 'A cutting-edge corporate website for Zaaric, featuring complex GSAP animations, a modern design language, and a highly optimized performance score.',
    overview: 'ZAARIC website sets a new standard for tech agency online presence. Combining stunning visuals with buttery-smooth animations, it creates an immersive brand experience that captures attention and converts visitors. Built with performance and accessibility in mind.',
    challenge: 'Creating a website that stands out in a crowded tech agency market while maintaining excellent performance. The challenge was to implement complex animations without sacrificing load times or user experience on various devices.',
    solution: 'Leveraged GSAP for professional-grade animations, React for component architecture, and Framer Motion for UI transitions. Implemented code splitting, lazy loading, and optimized assets. Used Tailwind CSS for maintainable styling and responsive design. Achieved 95+ Lighthouse scores across all metrics.',
    impact: 'Delivered a memorable digital experience that increased visitor engagement, reduced bounce rate, and strengthened brand perception. The website became a portfolio piece itself, attracting high-quality leads.',
    role: 'Frontend Developer & Animation Engineer',
    timeline: '3 months (2024)',

    techStack: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    category: ['Website', 'Agency', 'Animation'],
    tags: ['Corporate', 'Animation', 'High Performance', 'Modern Design'],

    images: {
      thumbnail: {
        url: '/assets/zaaric.png',
        alt: 'ZAARIC Agency Website',
      },
      hero: {
        url: '/assets/zaaric.png',
        alt: 'ZAARIC Homepage with Animations',
      },
      screenshots: [
        {
          url: '/assets/zaaric.png',
          alt: 'ZAARIC Modern Design',
          caption: 'Cutting-edge design and animations',
        },
      ],
    },

    links: {
      live: 'https://zaaric.com',
      github: 'https://github.com/MCodecreeper/Zaaric-Website.git',
    },

    stats: [
      { label: 'Lighthouse', value: '95+', icon: React.createElement(FaAward), color: '#10B981' },
      { label: 'Motion', value: 'GSAP', icon: React.createElement(FaRocket), color: '#00E7FF' },
      { label: 'Delivery', value: '3 Mo', icon: React.createElement(FaClock), color: '#8B5CF6' },
    ],

    features: [
      'Complex GSAP Animation Sequences',
      'Scroll-triggered Animations & Parallax',
      'Responsive Design with Mobile Optimization',
      '95+ Lighthouse Performance Score',
      'Smooth Page Transitions',
      'SEO Optimized Structure',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 8,
    createdAt: '2024-01-01',
  },

  {
    id: '3d-portfolio',
    title: '3D Portfolio',
    subtitle: 'Interactive Personal Portfolio',
    tagline: 'Showcasing Skills Through Immersive 3D',
    description: 'Previous iteration of my portfolio showcasing advanced 3D web skills with Three.js and interactive experiences.',
    longDescription: 'An immersive 3D portfolio website that demonstrates mastery of Three.js and interactive web design, creating a memorable user journey through 3D environments.',
    overview: 'My previous portfolio pushed the boundaries of web development by creating a fully interactive 3D experience. Visitors could explore my work through an engaging 3D environment, demonstrating both technical prowess and creative vision.',
    challenge: 'Creating a portfolio that stands out while remaining functional and accessible. The challenge was balancing impressive 3D visuals with performance, ensuring fast load times and smooth interactions across devices.',
    solution: 'Built with React and Three.js, implementing level-of-detail (LOD) rendering, progressive loading, and fallback experiences for low-powered devices. Used GSAP for timeline-based animations and TypeScript for type safety. Optimized 3D assets and implemented efficient render loops.',
    impact: 'Successfully showcased advanced frontend skills, attracted client attention, and demonstrated ability to create engaging, performant 3D web experiences.',
    role: 'Full-Stack Developer & 3D Engineer',
    timeline: '4 months (2023)',

    techStack: ['React', 'Three.js', 'GSAP', 'TypeScript', 'WebGL'],
    category: ['Portfolio', '3D', 'Interactive'],
    tags: ['3D', 'WebGL', 'Interactive', 'Portfolio'],

    images: {
      thumbnail: {
        url: '/assets/3d_portfolio.png',
        alt: '3D Portfolio Website',
      },
      hero: {
        url: '/assets/3d_portfolio.png',
        alt: 'Interactive 3D Portfolio Experience',
      },
      screenshots: [
        {
          url: '/assets/3d_portfolio.png',
          alt: '3D Interactive Environment',
          caption: 'Immersive 3D portfolio experience',
        },
      ],
    },

    links: {
      live: undefined,
      github: 'https://github.com/MCodecreeper/Portfolio-Website.git',
    },

    stats: [
      { label: 'Rendering', value: 'WebGL', icon: React.createElement(FaAward), color: '#00E7FF' },
      { label: 'Experience', value: '3D', icon: React.createElement(FaRocket), color: '#8B5CF6' },
      { label: 'Build', value: '4 Mo', icon: React.createElement(FaClock), color: '#10B981' },
    ],

    features: [
      'Fully Interactive 3D Environment',
      'Three.js WebGL Rendering',
      'GSAP Timeline Animations',
      'Responsive 3D Scaling',
      'Progressive Loading System',
      'Fallback for Low-power Devices',
    ],

    isFeatured: false,
    isMajor: false,
    isNDA: false,
    order: 9,
    createdAt: '2023-09-01',
  },
];

/**
 * Get all projects sorted by order
 */
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => a.order - b.order);
};

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.isFeatured).sort((a, b) => a.order - b.order);
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter((p) => p.category.includes(category)).sort((a, b) => a.order - b.order);
};
