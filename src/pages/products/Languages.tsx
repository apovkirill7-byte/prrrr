import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

          {/* Здесь будут карточки товаров */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">
                Карточки товаров будут добавлены позже
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Languages;
