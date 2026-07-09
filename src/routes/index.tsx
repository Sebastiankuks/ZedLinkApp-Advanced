import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { AdCard, type Ad } from "@/components/ad-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { LOCATIONS, CATEGORIES } from "@/lib/constants";

export const Route = createFileRoute("/")(() => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("All Locations");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    supabase
      .from("ads")
      .select("id,title,price,location,category,image_url,image_urls,created_at,views")
      .order("created_at", { ascending: false })
      .limit(60)
      .then(({ data }) => {
        setAds((data as Ad[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return ads.filter((a) => {
      if (loc !== "All Locations" && a.location !== loc) return false;
      if (cat !== "All" && a.category !== cat) return false;
      if (q && !a.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [ads, q, loc, cat]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1fr_auto] md:py-20">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Connecting Zambia, one link at a time
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl">
              Find what you're <br className="hidden sm:block" />
              <span className="text-brand-copper">looking for today.</span>
            </h1>
            <p className="max-w-lg text-base text-primary-foreground/80 sm:text-lg">
              Buy, sell, and discover jobs, cars and property in your area —
              <span className="font-semibold text-secondary"> Find it, Link it, Sell it.</span>
            </p>

            {/* Search */}
            <div className="rounded-2xl bg-card p-3 text-foreground shadow-elegant">
              <div className="grid gap-2 md:grid-cols-[1fr_180px_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search e.g. 'Toyota', 'apartment', 'iPhone'…"
                    className="h-11 pl-9"
                  />
                </div>
                <Select value={loc} onValueChange={setLoc}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Locations">All Locations</SelectItem>
                    {LOCATIONS.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="h-11 bg-gradient-copper text-secondary-foreground hover:opacity-90">
                  <Search className="mr-1.5 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CHIPS */}
      <section className="border-b bg-card">
        <div className="container mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold">Recent ads</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} listings</span>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-card p-12 text-center">
            <p className="text-muted-foreground">No ads match that filter yet.</p>
            <Button asChild className="mt-4 bg-gradient-copper text-secondary-foreground hover:opacity-90">
              <Link to="/post">Be the first to post</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t bg-card">
        <div className="container mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zedlink it. Connecting Zambia, one link at a time.
        </div>
      </footer>
    </div>
  );
});
