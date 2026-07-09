import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AdCard, type Ad } from "@/components/ad-card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")();

function FavoritesPage() {
  const { user, loading: userLoading } = useAuth();
  const [favorites, setFavorites] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading || !user) {
      setLoading(false);
      return;
    }

    supabase
      .from("favorites")
      .select(
        `
        ad_id,
        ads!inner(
          id, title, price, location, category, image_url, image_urls, created_at, views
        )
      `,
      )
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) {
          const ads = data.map((f: any) => f.ads).flat();
          setFavorites(ads);
        }
        setLoading(false);
      });
  }, [user, userLoading]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto max-w-md px-4 py-20 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Sign in to save favorites</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep track of ads you love and come back to them anytime.
          </p>
          <Button asChild className="mt-6 bg-gradient-copper text-secondary-foreground hover:opacity-90">
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Heart className="h-8 w-8 fill-brand-copper text-brand-copper" />
          <h1 className="text-3xl font-bold text-brand-green">My Favorites</h1>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-card p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">No favorites yet</p>
            <Button asChild className="mt-4 bg-gradient-copper text-secondary-foreground hover:opacity-90">
              <Link to="/">Browse ads</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
