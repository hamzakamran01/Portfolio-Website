import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ProjectDetail from './components/Projects/ProjectDetail';
import './index.css';

// Check if the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Create the root and render the project detail component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ProjectDetail />
    </HelmetProvider>
  </React.StrictMode>
);
