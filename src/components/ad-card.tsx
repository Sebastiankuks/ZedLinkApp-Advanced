import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { SignedImage } from "@/components/signed-image";

export type Ad = {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  image_url: string | null;
  image_urls?: string[] | null;
  created_at: string;
  views?: number;
};

export function AdCard({ ad }: { ad: Ad }) {
  const firstImage = ad.image_urls?.[0] ?? null;
  return (
    <Link
      to="/ads/$adId"
      params={{ adId: ad.id }}
      className="group overflow-hidden rounded-xl border bg-card shadow-card transition hover:shadow-elegant"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        {firstImage ? (
          <SignedImage
            bucket="listings"
            path={firstImage}
            alt={ad.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : ad.image_url ? (
          <img
            src={ad.image_url}
            alt={ad.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="space-y-1 p-3">
        <div className="text-base font-bold text-brand-copper">
          {ad.category === "Jobs"
            ? Number(ad.price) > 0
              ? <>K {Number(ad.price).toLocaleString()}<span className="ml-1 text-[10px] font-medium text-muted-foreground">/mo</span></>
              : <span className="text-sm font-medium text-muted-foreground">Salary negotiable</span>
            : <>K {Number(ad.price).toLocaleString()}</>
          }
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{ad.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {ad.location}
          <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] text-accent-foreground">
            {ad.category === "Jobs" ? "Hiring" : ad.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
