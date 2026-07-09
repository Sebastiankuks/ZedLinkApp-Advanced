import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Review = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export function useReviews(userId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setReviews([]);
      setAverageRating(0);
      setLoading(false);
      return;
    }

    supabase
      .from("reviews")
      .select("*")
      .eq("to_user_id", userId)
      .then(({ data }) => {
        const revs = (data as Review[]) ?? [];
        setReviews(revs);
        if (revs.length > 0) {
          const avg = revs.reduce((sum, r) => sum + r.rating, 0) / revs.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
        setLoading(false);
      });
  }, [userId]);

  const addReview = async (toUserId: string, rating: number, comment: string | null) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { error } = await supabase.from("reviews").insert({
      from_user_id: userData.user.id,
      to_user_id: toUserId,
      rating,
      comment,
    });

    if (!error) {
      const newReview: Review = {
        id: "",
        from_user_id: userData.user.id,
        to_user_id: toUserId,
        rating,
        comment,
        created_at: new Date().toISOString(),
      };
      setReviews((prev) => [...prev, newReview]);
      const newAvg = [...reviews, newReview].reduce((sum, r) => sum + r.rating, 0) / ([...reviews, newReview].length);
      setAverageRating(Math.round(newAvg * 10) / 10);
    }
  };

  return { reviews, averageRating, loading, addReview };
}
