import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Offer = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Договор оферты</h1>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-muted-foreground">
                Текст договора оферты будет добавлен позже.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Offer;
