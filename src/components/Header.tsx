import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
              <span className="text-2xl font-bold text-primary-foreground">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI School
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Главная
            </Link>
            <Link
              to="/products"
              className={`transition-colors ${
                isActive("/products") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Продукты
            </Link>
            <Link
              to="/contacts"
              className={`transition-colors ${
                isActive("/contacts") ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Контакты
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <Link to="/auth">
                <Button variant="hero" size="default">
                  Начать обучение
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="default">
                  Начать обучение
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3 animate-fade-in">
            <Link
              to="/"
              className={`block py-2 transition-colors ${
                isActive("/") ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              to="/products"
              className={`block py-2 transition-colors ${
                isActive("/products") ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Продукты
            </Link>
            <Link
              to="/contacts"
              className={`block py-2 transition-colors ${
                isActive("/contacts") ? "text-primary font-semibold" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакты
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
