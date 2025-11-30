import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Clock, Target, TrendingUp, Sparkles, BookOpen, Users, DollarSign } from "lucide-react";

const Home = () => {
  const problems = [
    { icon: Clock, text: "Трата времени на поиск материалов" },
    { icon: Target, text: "Некачественный контент" },
    { icon: TrendingUp, text: "Отсутствие структуры обучения" },
    { icon: Sparkles, text: "Нет мотивации продолжать" },
  ];

  const advantages = [
    {
      icon: Sparkles,
      title: "Гипер-персонализация",
      description: "ИИ-репетиторы адаптируются под ваш уникальный стиль, темп и текущий уровень знаний, создавая идеальную траекторию обучения.",
    },
    {
      icon: DollarSign,
      title: "Дешевле и выгоднее",
      description: "Целый месяц обучения в AI School стоит как один час с обычным репетитором. Экономия до 90% без потери качества.",
      highlight: true,
    },
    {
      icon: Clock,
      title: "Доступно 24/7",
      description: "Учитесь когда удобно, без привязки к расписанию, из любой точки мира. Ваш репетитор всегда онлайн и готов к занятию.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient Background with blur effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-accent/25 rounded-full blur-[90px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Революция в обучении с{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                ИИ-репетиторами
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эффективное обучение с персональными ИИ-ассистентами. Без траты времени на поиск информации, с четкой структурой и мотивацией.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/profile">
                <Button variant="hero" size="lg">
                  Попробуй бесплатно
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="outline" size="lg">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>

          {/* Problems Section */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Знакомо ли вам это?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Мы собрали все проблемы, с которыми сталкиваются ученики онлайн-школ, и создали решение, которое действительно работает.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-glow-sm"
                >
                  <problem.icon className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">{problem.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Advantages */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Наши главные преимущества
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-glow group animate-fade-in ${
                    advantage.highlight 
                      ? 'border-2 border-primary shadow-glow-lg' 
                      : 'border border-border'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-glow group-hover:shadow-glow-lg transition-all">
                    <advantage.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Посмотри, как работает наш ИИ-репетитор
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-glow hover:shadow-glow-lg transition-all">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Как работает ИИ-репетитор"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center shadow-glow-lg">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Всё, что нужно для успеха
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Структурированное обучение, персональные репетиторы и отслеживание прогресса в одной платформе
            </p>
            
            <div className="mb-8">
              <CountdownTimer />
            </div>

            <Link to="/partner">
              <Button variant="outline" size="lg" className="bg-background text-foreground hover:bg-background/90">
                Попробуй бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
