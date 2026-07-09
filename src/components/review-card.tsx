import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export type ReviewData = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

interface ReviewCardProps {
  review: ReviewData;
  fromUserName?: string;
}

export function ReviewCard({ review, fromUserName = "Anonymous" }: ReviewCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{fromUserName}</CardTitle>
            <CardDescription className="text-xs">
              {new Date(review.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-brand-copper text-brand-copper" : "text-muted-foreground"}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      {review.comment && (
        <CardContent>
          <p className="text-sm text-foreground">{review.comment}</p>
        </CardContent>
      )}
    </Card>
  );
}
