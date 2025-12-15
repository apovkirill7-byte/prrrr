import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TutorCard } from "@/components/TutorCard";

const Business = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Бизнес</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              15 ИИ-ассистентов для развития бизнес-навыков
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TutorCard 
              name="Дмитрий Предпринимателев"
              profession="Бизнес-консультант"
              specialization="Стратегическое планирование и масштабирование"
              description="Серийный предприниматель с опытом запуска более 10 успешных проектов. Помогу разобраться в финансовом планировании, управлении командой, построении бизнес-процессов и привлечении инвестиций."
              imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Business;
