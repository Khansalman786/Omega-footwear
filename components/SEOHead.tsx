"use client";

import { useEffect } from "react";

interface HreflangEntry {
  hreflang: string;
  href: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  hreflang?: HreflangEntry[];
  noindex?: boolean;
}

const SEOHead = ({ title, description, canonical, ogImage, ogType = "website", jsonLd, hreflang, noindex }: SEOHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Omega Collections`;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", `${title} | Omega Collections`);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("name", "twitter:title", `${title} | Omega Collections`);
    setMeta("name", "twitter:description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
      setMeta("property", "og:url", canonical);
    }

    // hreflang alternates
    document.querySelectorAll('link[rel="alternate"][data-seo-hreflang]').forEach((el) => el.remove());
    if (hreflang && hreflang.length > 0) {
      hreflang.forEach((h) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", h.hreflang);
        link.setAttribute("href", h.href);
        link.setAttribute("data-seo-hreflang", "true");
        document.head.appendChild(link);
      });
    }

    // JSON-LD (supports single or array)
    document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
      document.querySelectorAll('link[rel="alternate"][data-seo-hreflang]').forEach((el) => el.remove());
    };
  }, [title, description, canonical, ogImage, ogType, jsonLd, hreflang, noindex]);

  return null;
};

export default SEOHead;
