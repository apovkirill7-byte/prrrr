import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Gift, TrendingUp, Users, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Partner = () => {
  const benefits = [
    {
      icon: Wallet,
      title: "Большие выплаты",
      description: "Получайте до 3000₽ от каждой оплаты привлеченного пользователя",
    },
    {
      icon: Users,
      title: "5% партнёрам / 3% пользователям",
      description: "Партнёры получают 5% от суммы покупки. Обычные пользователи — 3% в минутах",
    },
    {
      icon: TrendingUp,
      title: "Удобная статистика",
      description: "Отслеживайте количество переходов, регистраций и доход в реальном времени",
    },
    {
      icon: Gift,
      title: "Бонусы и акции",
      description: "Участвуйте в специальных акциях и получайте дополнительные бонусы",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Партнёрская программа</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Зарабатывайте, рекомендуя AI School своим друзьям и подписчикам
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-12 text-center shadow-glow-lg mb-16">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Начните зарабатывать уже сегодня
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Получайте стабильный пассивный доход с каждого привлечённого пользователя
            </p>
            <a href="https://t.me/ioanPopove" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-background text-foreground hover:bg-background/90">
                Стать партнёром
              </Button>
            </a>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Преимущества партнёрской программы
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-glow">
                  <benefit.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Как это работает
            </h2>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0 shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Зарегистрируйтесь</h3>
                    <p className="text-muted-foreground">
                      Создайте аккаунт и получите уникальную реферальную ссылку в личном кабинете
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0 shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Делитесь ссылкой</h3>
                    <p className="text-muted-foreground">
                      Рассказывайте о AI School в социальных сетях, блоге или друзьям
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0 shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Получайте доход</h3>
                    <p className="text-muted-foreground">
                      Зарабатывайте с каждой покупки подписки по вашей реферальной ссылке
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partner;
