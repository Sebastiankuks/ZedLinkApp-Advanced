import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SubStatus = {
  ad_count: number;
  free_remaining: number;
  is_premium: boolean;
  premium_expires_at: string | null;
  pending_payment: boolean;
};

export function useSubscription(userId: string | undefined) {
  const [status, setStatus] = useState<SubStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) {
      setStatus(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase.rpc("user_subscription_status", { _user_id: userId });
    const row = Array.isArray(data) ? data[0] : null;
    setStatus(
      row
        ? {
            ad_count: Number(row.ad_count ?? 0),
            free_remaining: Number(row.free_remaining ?? 0),
            is_premium: !!row.is_premium,
            premium_expires_at: row.premium_expires_at,
            pending_payment: !!row.pending_payment,
          }
        : null,
    );
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  return { status, loading, refresh };
}
