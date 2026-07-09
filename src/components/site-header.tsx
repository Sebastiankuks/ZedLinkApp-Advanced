import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, LogOut, Shield, Crown, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-copper text-secondary-foreground font-bold">
            Z
          </div>
          <div className="leading-none">
            <div className="text-lg font-bold text-brand-green">
              Zedlink<span className="text-brand-copper"> it</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Find · Link · Sell
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {isAdmin && (
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/admin">
                <Shield className="mr-1.5 h-4 w-4" /> Admin
              </Link>
            </Button>
          )}
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/upgrade">
                  <Crown className="mr-1.5 h-4 w-4 text-brand-copper" /> Premium
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile">
                  <UserIcon className="mr-1.5 h-4 w-4" /> Profile
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-copper text-secondary-foreground hover:opacity-90">
                <Link to="/post">
                  <Plus className="mr-1.5 h-4 w-4" /> Post Ad
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-copper text-secondary-foreground hover:opacity-90">
                <Link to="/post">
                  <Plus className="mr-1.5 h-4 w-4" /> Post Ad
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
