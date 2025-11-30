import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Миссия AI School
            </h1>
            
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                <p className="text-lg leading-relaxed mb-6">
                  AI School — это онлайн-платформа для обучения с помощью репетиторов основанных на искусственном интеллекте. Здесь ты получаешь доступ к качественным репетиторам-профессионалам по различным направлениям и дополнительным предметам, интерактивным заданиям и поддержке опытных репетиторов, чтобы учиться было легко, интересно и эффективно.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Наша миссия — дать каждому современные инструменты для эффективного и осознанного обучения. Мы понимаем, что традиционное образование часто не успевает за стремительно меняющимся миром, а живые репетиторы ограничены во времени и дорогие. AI School решает эту проблему, объединяя знания, технологии и постоянную поддержку в одном месте.
                </p>
                <p className="text-lg leading-relaxed">
                  Мы хотим, чтобы обучение перестало быть скучным и утомительным. В AI School каждый урок построен так, чтобы ты реально понимал материал, мог применять знания сразу и учился в удобном для себя формате: в видеоуроках, которые лично проводит репетитор. Такой формат помогает лучше усваивать материал, потому что ты видишь и слышишь объяснения, можешь задавать вопросы и сразу получать разбор сложных тем. Это обучение, как с личным репетитором, но доступное 24/7 и в любом месте.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                <h2 className="text-2xl font-semibold mb-6 text-primary">
                  Как работают репетиторы в AI School:
                </h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Ты выбираешь предмет и тему, которая тебе нужна.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Репетитор сам проводит для тебя индивидуальный видеоурок, объясняя материал наглядно и подробно.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>После урока репетитор проверяет твои задания, отвечает на вопросы и даёт практические рекомендации для закрепления материала.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Всё обучение гибкое: ты сам выбираешь темп, повторяешь сложные темы и углубляешься в то, что важно именно тебе.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                <p className="text-lg leading-relaxed mb-6">
                  Мы верим, что развитие — это ключ к успеху. Наша миссия — помочь тебе:
                </p>
                <ul className="space-y-3 text-lg mb-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>быстро и эффективно осваивать новые навыки;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>чувствовать себя уверенно в учебе и жизни;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>подготовиться к реальным вызовам современного мира;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>создавать проекты, решать задачи и достигать целей без лишней бюрократии и стресса.</span>
                  </li>
                </ul>
                <p className="text-lg leading-relaxed mb-6">
                  Подписка на AI School даёт полный доступ ко всем репетиторам, материалам и видеоурокам, чтобы каждый день учиться было легко, интересно и полезно. Мы создаём сообщество, где вопросы не страшны, а ответы всегда рядом.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-primary">
                  Наша цель — чтобы обучение стало твоим преимуществом. Мы помогаем не просто учиться, а учиться с пониманием, уверенностью и интересом, превращая знания в реальные результаты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
