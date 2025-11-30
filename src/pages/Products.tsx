import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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

        {/* Subscription Plan */}
        <section className="container mx-auto px-4">
          
        </section>
      </main>

      <Footer />
    </div>;
};
export default Products;