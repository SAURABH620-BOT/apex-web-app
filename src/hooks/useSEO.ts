import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
}

const BASE_URL = 'https://apexinstitute.in';
const DEFAULT_IMAGE = 'https://apexinstitute.in/lab/lab1_workstations.jpeg';

export function useSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
  noindex = false
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Helper to set or create meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Description & Keywords
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // Robots directive (index/noindex)
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical link
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Apex Institute');
    setMetaTag('property', 'og:locale', 'en_IN');

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Dynamic JSON-LD Schema
    const existingSchemaTag = document.getElementById('page-schema');
    if (existingSchemaTag) {
      existingSchemaTag.remove();
    }

    if (schema) {
      const scriptTag = document.createElement('script');
      scriptTag.id = 'page-schema';
      scriptTag.type = 'application/ld+json';
      scriptTag.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      const schemaTag = document.getElementById('page-schema');
      if (schemaTag) {
        schemaTag.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, schema, noindex]);
}
