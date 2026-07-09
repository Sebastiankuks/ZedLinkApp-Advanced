import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, { url: string; expires: number }>();

export function useSignedUrl(bucket: string, path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!path) { setUrl(null); return; }
    const key = `${bucket}/${path}`;
    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) { setUrl(hit.url); return; }
    supabase.storage.from(bucket).createSignedUrl(path, 3600).then(({ data }) => {
      if (data?.signedUrl) {
        cache.set(key, { url: data.signedUrl, expires: Date.now() + 55 * 60 * 1000 });
        setUrl(data.signedUrl);
      }
    });
  }, [bucket, path]);
  return url;
}

export function SignedImage({
  bucket, path, alt, className, fallback,
}: {
  bucket: string;
  path: string | null | undefined;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const url = useSignedUrl(bucket, path);
  if (!path) return <>{fallback ?? null}</>;
  if (!url) return <div className={className + " animate-pulse bg-muted"} />;
  return <img src={url} alt={alt} loading="lazy" className={className} />;
}
