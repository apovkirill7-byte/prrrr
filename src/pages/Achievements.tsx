import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Flame, Target, BookOpen, Users } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Flame,
      name: "Стрик 7 дней",
      description: "Занимайтесь 7 дней подряд",
      points: 100,
      color: "text-orange-500",
    },
    {
      icon: Flame,
      name: "Стрик 30 дней",
      description: "Занимайтесь 30 дней подряд",
      points: 500,
      color: "text-orange-500",
    },
    {
      icon: BookOpen,
      name: "Первое занятие",
      description: "Завершите первое занятие",
      points: 50,
      color: "text-primary",
    },
    {
      icon: BookOpen,
      name: "10 занятий",
      description: "Завершите 10 занятий",
      points: 200,
      color: "text-primary",
    },
    {
      icon: Target,
      name: "Цель достигнута",
      description: "Завершите курс полностью",
      points: 1000,
      color: "text-green-500",
    },
    {
      icon: Users,
      name: "Первый реферал",
      description: "Пригласите первого друга",
      points: 300,
      color: "text-blue-500",
    },
    {
      icon: Users,
      name: "5 рефералов",
      description: "Пригласите 5 друзей",
      points: 1500,
      color: "text-blue-500",
    },
    {
      icon: Star,
      name: "Идеальное занятие",
      description: "Получите 100% за занятие",
      points: 150,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Достижения</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-all hover:shadow-glow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        +{achievement.points} баллов
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Achievements;
