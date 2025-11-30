import { Link } from "react-router-dom";
import { Send, Instagram, Youtube } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">AI-School</h3>
            <p className="text-muted-foreground text-sm">AI-School</p>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Тарифы</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Подписка Плюс
                </Link>
              </li>
            </ul>
          </div>

          {/* About Project */}
          <div>
            <h3 className="text-lg font-semibold mb-4">О проекте</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Миссия AI-School
                </Link>
              </li>
              <li>
                <Link to="/offer" className="text-muted-foreground hover:text-primary transition-colors">
                  Договор оферты
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner Program */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Партнёрам</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/partner" className="text-muted-foreground hover:text-primary transition-colors">
                  Партнёрская программа
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social and Support */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a href="https://t.me/AiSchoolRu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-all hover:shadow-glow" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/aischoolre?igsh=aHN3bnp4cGp5ZHU4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-all hover:shadow-glow" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@AISchoolOff" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-all hover:shadow-glow" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Поддержка через{" "}
              <a href="https://t.me/AiSchoolHelpBot" className="text-primary hover:underline">
                Telegram-бот
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AI-School. Все права защищены.</p>
        </div>
      </div>
    </footer>;
};