import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TutorCard } from "@/components/TutorCard";

const Languages = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Языки</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              5 ИИ-ассистентов для изучения иностранных языков
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TutorCard 
              name="Анна Лингвистова"
              profession="Лингвист-переводчик"
              specialization="Английский, немецкий и французский языки"
              description="Профессиональный преподаватель с международными сертификатами CELTA и DELTA. Использую коммуникативную методику для быстрого достижения результатов. Помогу преодолеть языковой барьер и заговорить свободно."
              imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Languages;
