import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Instagram, Youtube, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TestimonialSlider } from "@/components/TestimonialSlider";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Обратная связь от ${formData.name}`);
    const body = encodeURIComponent(`Имя: ${formData.name}\nEmail: ${formData.email}\n\nСообщение:\n${formData.message}`);
    window.location.href = `mailto:support@ai-school.ru?subject=${subject}&body=${body}`;
    
    toast({
      title: "Открываем почтовый клиент",
      description: "Отправьте письмо для связи с нами.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "Как начать обучение?",
      answer: "Зарегистрируйтесь на платформе, выберите интересующий вас пакет. Начните с бесплатного плана или выберите подходящий пакет.",
    },
    {
      question: "Что входит в пакет?",
      answer: "Пакеты открывают доступ ко множеству репетиторов, минутам, персональным подборкам, чек листам, заданиям и скидкам.",
    },
    {
      question: "Как работает бесплатный план?",
      answer: "Бесплатный план дает доступ к 1 репетитору и 10 минутам обучения в день. Этого достаточно для знакомства с платформой.",
    },
  ];

  const testimonials = [
    {
      name: "Анна К.",
      text: "Благодаря AI School я освоила программирование за 3 месяца! Репетиторы всегда доступны и отвечают на любые вопросы.",
      role: "Студентка",
    },
    {
      name: "Михаил П.",
      text: "Отличная платформа для изучения английского. Персональный подход и гибкое расписание — то, что нужно занятому человеку.",
      role: "Менеджер",
    },
    {
      name: "Елена С.",
      text: "Премиум план полностью оправдал ожидания. Качество обучения на высоте, прогресс виден уже через неделю!",
      role: "Дизайнер",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Contact Form Section */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Свяжитесь с нами</h1>
              <p className="text-xl text-muted-foreground">
                Есть вопросы? Мы всегда рады помочь!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Форма обратной связи
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Ваше сообщение"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </div>

              {/* Social & Support */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    Поддержка
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Получите мгновенную помощь через наш Telegram-бот
                  </p>
                  <a
                    href="https://t.me/AiSchoolHelpBot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Открыть Telegram-бот
                    </Button>
                  </a>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Социальные сети</h2>
                  <div className="space-y-3">
                    <a
                      href="https://t.me/AiSchoolRu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <Send className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span>Telegram</span>
                    </a>
                    <a
                      href="https://www.instagram.com/aischoolre?igsh=aHN3bnp4cGp5ZHU4&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <Instagram className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@AISchoolOff"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <Youtube className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Что говорят наши ученики
            </h2>
            <TestimonialSlider testimonials={testimonials} />
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
