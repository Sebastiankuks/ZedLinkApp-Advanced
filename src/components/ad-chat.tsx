import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Message = {
  id: string;
  ad_id: string;
  sender_id: string;
  receiver_id: string;
  body: string;
  created_at: string;
};

type Props = {
  adId: string;
  sellerId: string;
  buyerIdOverride?: string;
  readOnly?: boolean;
};

export function AdChat({ adId, sellerId, buyerIdOverride, readOnly }: Props) {
  const { user, isAdmin } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const isSeller = user?.id === sellerId;
  const buyerId = buyerIdOverride ?? (isSeller ? null : user?.id ?? null);

  useEffect(() => {
    if (!user) return;
    if (!isAdmin && !buyerId) return;

    let query = supabase
      .from("messages")
      .select("*")
      .eq("ad_id", adId)
      .order("created_at", { ascending: true });

    if (buyerId) {
      query = query.or(
        `and(sender_id.eq.${buyerId},receiver_id.eq.${sellerId}),and(sender_id.eq.${sellerId},receiver_id.eq.${buyerId})`,
      );
    }

    query.then(({ data }) => setMessages((data as Message[]) ?? []));

    const channel = supabase
      .channel(`messages:${adId}:${buyerId ?? "all"}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `ad_id=eq.${adId}` },
        (payload) => {
          const m = payload.new as Message;
          if (
            !buyerId ||
            (m.sender_id === buyerId && m.receiver_id === sellerId) ||
            (m.sender_id === sellerId && m.receiver_id === buyerId)
          ) {
            setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [adId, sellerId, buyerId, user, isAdmin]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
  }, [messages.length]);

  const send = async () => {
    if (!user || !body.trim() || sending) return;
    const receiver_id = isSeller ? buyerId : sellerId;
    if (!receiver_id) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      ad_id: adId,
      sender_id: user.id,
      receiver_id,
      body: body.trim(),
    });
    setSending(false);
    if (error) return toast.error(error.message);
    setBody("");
  };

  if (!user) {
    return (
      <div className="rounded-2xl border bg-card p-4 text-sm shadow-card">
        <div className="flex items-center gap-2 font-medium">
          <MessageCircle className="h-4 w-4 text-brand-copper" /> Chat with seller
        </div>
        <p className="mt-2 text-muted-foreground">Sign in to message the seller about this listing.</p>
        <Button asChild size="sm" className="mt-3"><Link to="/auth">Sign in</Link></Button>
      </div>
    );
  }

  const canSend = !readOnly && (isSeller ? !!buyerId : true);

  return (
    <div className="flex flex-col rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="h-4 w-4 text-brand-copper" />
          {isAdmin && readOnly ? "Conversation (admin view)" : "Chat with seller"}
        </div>
        {isAdmin && !readOnly && (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-700">
            visible to admin
          </span>
        )}
      </div>

      <div ref={scrollerRef} className="max-h-80 min-h-32 space-y-2 overflow-y-auto px-4 py-3">
        {messages.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No messages yet. {isSeller ? "Wait for a buyer to start." : "Say hello!"}
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.sender_id === user.id;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-sm ${
                    mine
                      ? "bg-brand-copper text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{m.body}</div>
                  <div className={`mt-0.5 text-[10px] ${mine ? "text-white/70" : "text-muted-foreground"}`}>
                    {new Date(m.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {canSend && (
        <div className="flex items-end gap-2 border-t p-2">
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type a message…"
            rows={1}
            maxLength={2000}
            className="min-h-9 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <Button size="sm" onClick={send} disabled={sending || !body.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
