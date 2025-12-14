import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, DollarSign, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
const Products = () => {
  const plan = {
    name: "Плюс",
    price: "1490₽",
    oldPrice: "2999₽",
    discount: "-50%",
    period: "/месяц",
    description: "Для активных учеников",
    features: ["Все репетиторы без ограничений", "Все темы и направления обучения", "Отслеживание личного прогресса", "Ежедневный стрик (серия занятий без пропусков)"]
  };
  const topics = [{
    icon: TrendingUp,
    category: "Маркетинг",
    count: 12,
    link: "/products/marketing"
  }, {
    icon: DollarSign,
    category: "Продажи",
    count: 8,
    link: "/products/sales"
  }, {
    icon: Briefcase,
    category: "Бизнес",
    count: 15,
    link: "/products/business"
  }, {
    icon: Globe,
    category: "Языки",
    count: 5,
    link: "/products/languages"
  }];
  return <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        {/* Topics Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Продукты</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите направление и начните обучение с ИИ-ассистентами
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
            {topics.map((topic, index) => <Link key={index} to={topic.link}>
                <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in cursor-pointer" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                  
                  {/* Content Overlay */}
                  <div className="relative p-6 min-h-[200px] flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-glow group-hover:shadow-glow-lg transition-all">
                        <topic.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{topic.category}</h3>
                      <p className="text-xs text-primary font-semibold">{topic.count} ИИ-ассистентов</p>
                    </div>
                  </div>
                </div>
              </Link>)}
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Тарифы AI School</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите подходящий тариф для эффективного обучения
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            {/* Free Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Базовый</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">Бесплатно</span>
                </div>
                <p className="text-sm text-muted-foreground">Идеально для знакомства</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>3 минуты на урок</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>До 3 уроков в день</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Доступ к одному репетитору</span>
                </li>
              </ul>
              <Button className="w-full mt-auto" variant="outline">Выбрать</Button>
            </div>

            {/* Medium Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Medium</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">13 500₽</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">500 минут (27₽/мин)</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Гайды и чек-листы</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Доступ к 30% репетиторов</span>
                </li>
              </ul>
              <Button className="w-full mt-auto">Выбрать</Button>
            </div>

            {/* Plus Plan - Most Popular */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 relative shadow-glow flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Выбирают чаще всего
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Plus</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">25 000₽</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">1 200 минут (25₽/мин)</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Гайды и чек-листы</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Подборки материалов</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Скидка на доп. минуты</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Доступ к 50% репетиторов</span>
                </li>
              </ul>
              <Button className="w-full mt-auto" variant="hero">Выбрать</Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">57 500₽</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">2 500 минут (23₽/мин)</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Гайды и чек-листы</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Подборки материалов</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Персональные рекомендации</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Скидка на доп. минуты</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Полный доступ ко всем репетиторам</span>
                </li>
              </ul>
              <Button className="w-full mt-auto">Выбрать</Button>
            </div>
          </div>

          {/* Custom Minutes Purchase */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Покупка минут отдельно</h3>
            <div className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-5xl font-bold text-primary">29₽</span>
                <span className="text-xl text-muted-foreground ml-2">/минута</span>
              </div>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Количество минут</label>
                  <Input 
                    type="number" 
                    placeholder="Введите количество" 
                    min="1"
                    id="custom-minutes"
                    onChange={(e) => {
                      const minutes = parseInt(e.target.value) || 0;
                      const cost = minutes * 29;
                      const costElement = document.getElementById('calculated-cost');
                      if (costElement) {
                        costElement.textContent = cost.toLocaleString('ru-RU');
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Стоимость</label>
                  <div className="h-10 flex items-center justify-center bg-muted rounded-lg px-4">
                    <span id="calculated-cost" className="font-bold">0</span>
                    <span className="ml-1">₽</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Купить минуты</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Products;