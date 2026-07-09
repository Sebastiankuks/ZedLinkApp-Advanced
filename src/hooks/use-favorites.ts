import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Favorite = {
  id: string;
  user_id: string;
  ad_id: string;
  created_at: string;
};

export function useFavorites(userId: string | undefined) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .then(({ data }) => {
        setFavorites((data as Favorite[]) ?? []);
        setLoading(false);
      });
  }, [userId]);

  const addFavorite = async (adId: string) => {
    if (!userId) return;
    const { error } = await supabase.from("favorites").insert({
      user_id: userId,
      ad_id: adId,
    });
    if (!error) {
      setFavorites((prev) => [...prev, { id: "", user_id: userId, ad_id: adId, created_at: new Date().toISOString() }]);
    }
  };

  const removeFavorite = async (adId: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("ad_id", adId);
    if (!error) {
      setFavorites((prev) => prev.filter((f) => f.ad_id !== adId));
    }
  };

  const isFavorited = (adId: string) => favorites.some((f) => f.ad_id === adId);

  return { favorites, loading, addFavorite, removeFavorite, isFavorited };
}
