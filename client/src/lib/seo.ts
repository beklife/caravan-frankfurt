import { useEffect } from "react";

type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
};

function setMetaTag(selector: string, content: string, attr: "name" | "property") {
  const element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setCanonical(url: string) {
  const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (link) {
    link.setAttribute("href", url);
  }
}

export function useSeoMeta({ title, description, canonical }: SeoMeta) {
  useEffect(() => {
    document.title = title;
    setMetaTag("description", description, "name");
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("twitter:title", title, "name");
    setMetaTag("twitter:description", description, "name");
    setCanonical(canonical);
  }, [title, description, canonical]);
}
