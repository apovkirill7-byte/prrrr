import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TutorCard } from "@/components/TutorCard";

const Marketing = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Маркетинг</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              12 ИИ-ассистентов для обучения маркетингу
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TutorCard 
              name="Мария Маркетова"
              profession="Маркетолог"
              specialization="Digital-маркетинг и стратегии роста"
              description="Эксперт в области цифрового маркетинга с опытом работы в ведущих компаниях. Научу вас создавать эффективные маркетинговые стратегии, настраивать рекламные кампании, анализировать метрики и увеличивать конверсию."
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Marketing;
