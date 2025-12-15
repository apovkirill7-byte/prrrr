import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TutorCard } from "@/components/TutorCard";

const Sales = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Продажи</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              8 ИИ-ассистентов для обучения продажам
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TutorCard 
              name="Алексей Продавцов"
              profession="Sales-эксперт"
              specialization="Эксперт по B2B и B2C продажам"
              description="Более 15 лет опыта в продажах. Обучу вас техникам холодных звонков, работе с возражениями, закрытию сделок и построению долгосрочных отношений с клиентами. Специализируюсь на корпоративных продажах и работе с крупными клиентами."
              imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sales;
