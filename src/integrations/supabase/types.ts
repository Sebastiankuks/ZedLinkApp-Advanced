export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          category: string
          contact: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          image_urls: string[]
          location: string
          price: number
          title: string
          user_id: string
          views: number
        }
        Insert: {
          category?: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[]
          location: string
          price?: number
          title: string
          user_id: string
          views?: number
        }
        Update: {
          category?: string
          contact?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[]
          location?: string
          price?: number
          title?: string
          user_id?: string
          views?: number
        }
      }
      favorites: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          from_user_id: string
          id: string
          rating: number
          to_user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          from_user_id: string
          id?: string
          rating: number
          to_user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          from_user_id?: string
          id?: string
          rating?: number
          to_user_id?: string
        }
      }
      messages: {
        Row: {
          ad_id: string
          body: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          ad_id: string
          body: string
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          ad_id?: string
          body?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
        }
      }
      payment_proofs: {
        Row: {
          admin_notes: string | null
          amount: number
          approved_at: string | null
          created_at: string
          expires_at: string | null
          full_name: string
          id: string
          payment_time: string
          phone: string
          screenshot_url: string
          status: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount?: number
          approved_at?: string | null
          created_at?: string
          expires_at?: string | null
          full_name: string
          id?: string
          payment_time: string
          phone: string
          screenshot_url: string
          status?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          approved_at?: string | null
          created_at?: string
          expires_at?: string | null
          full_name?: string
          id?: string
          payment_time?: string
          phone?: string
          screenshot_url?: string
          status?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
        }
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
      }
    }
    Views: {}
    Functions: {
      user_subscription_status: {
        Args: { _user_id: string }
        Returns: {
          ad_count: number
          free_remaining: number
          is_premium: boolean
          pending_payment: boolean
          premium_expires_at: string | null
        }[]
      }
    }
  }
}
