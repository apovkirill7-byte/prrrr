import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReferralProgram } from "@/components/ReferralProgram";
import { Flame, Clock, Trophy, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [currentPlan] = useState("free"); // free, medium, plus, premium

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        title: "Требуется согласие",
        description: "Пожалуйста, согласитесь с договором оферты и пользовательским соглашением.",
        variant: "destructive",
      });
      return;
    }
    setIsLoggedIn(true);
    toast({
      title: "Добро пожаловать!",
      description: "Вы успешно вошли в систему.",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                  Вход в систему
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Пароль"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-tight cursor-pointer"
                    >
                      Я согласен с{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowTermsDialog(true);
                        }}
                      >
                        договором оферты и пользовательским соглашением
                      </button>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={!agreedToTerms}>
                    Войти
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Нет аккаунта?{" "}
                    <Link to="/auth" className="text-primary hover:underline">
                      Зарегистрироваться
                    </Link>
                  </p>
                </form>
                
                <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Договор оферты и пользовательское соглашение</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Договор оферты</h3>
                        <p className="text-sm text-muted-foreground">
                          Текст договора оферты будет добавлен позже.
                        </p>
                        <Link to="/offer" className="text-sm text-primary hover:underline">
                          Читать полностью
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Пользовательское соглашение</h3>
                        <p className="text-sm text-muted-foreground">
                          Текст пользовательского соглашения будет добавлен позже.
                        </p>
                        <Link to="/terms" className="text-sm text-primary hover:underline">
                          Читать полностью
                        </Link>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
                <p className="text-xl text-muted-foreground">
                  Добро пожаловать, Александр!
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-border hover:border-primary/50 transition-all hover:shadow-glow h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    Стрик
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7 дней</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Продолжайте в том же духе!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-primary/50 transition-all hover:shadow-glow h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Часов обучения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42 ч</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    В этом месяце
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="border-border hover:border-primary/50 transition-all hover:shadow-glow cursor-pointer h-full"
                onClick={() => window.location.href = '/achievements'}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    Достижения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Получено наград
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Resources Section - Checklists, Guides, Collections, Recommendations */}
            <Card className="border-border mb-8">
              <CardHeader>
                <CardTitle>Мои материалы</CardTitle>
                <CardDescription>Доступные образовательные ресурсы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Checklists */}
                  <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 shadow-glow">
                      <span className="text-primary-foreground font-bold">✓</span>
                    </div>
                    <h4 className="font-semibold mb-1">Чек-листы</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Пошаговые списки для эффективного обучения
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Недоступно
                    </p>
                  </div>

                  {/* Guides */}
                  <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 shadow-glow">
                      <span className="text-primary-foreground font-bold">📘</span>
                    </div>
                    <h4 className="font-semibold mb-1">Гайды</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Подробные руководства по темам
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Недоступно
                    </p>
                  </div>

                  {/* Collections */}
                  <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 shadow-glow">
                      <span className="text-primary-foreground font-bold">📚</span>
                    </div>
                    <h4 className="font-semibold mb-1">Подборки</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Кураторские подборки материалов
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Недоступно
                    </p>
                  </div>

                  {/* Personal Recommendations */}
                  <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 shadow-glow">
                      <span className="text-primary-foreground font-bold">⭐</span>
                    </div>
                    <h4 className="font-semibold mb-1">Рекомендации</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Персональные советы по обучению
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Недоступно
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plans Section - Single Card */}
            <Card className="border-border mb-8 hover:border-primary/50 transition-all cursor-pointer" onClick={() => window.location.href = '/products'}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Доступные тарифы</span>
                  <span className="text-sm font-normal text-primary">Посмотреть все →</span>
                </CardTitle>
                <CardDescription>Выберите тариф для продолжения обучения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-muted/50 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">Базовый</span>
                    <span className="text-xs text-muted-foreground ml-2">Бесплатно</span>
                  </div>
                  <div className="bg-muted/50 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">Medium</span>
                    <span className="text-xs text-muted-foreground ml-2">13 500₽</span>
                  </div>
                  <div className="bg-primary/20 border border-primary rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">Plus</span>
                    <span className="text-xs text-muted-foreground ml-2">25 000₽</span>
                  </div>
                  <div className="bg-muted/50 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">Premium</span>
                    <span className="text-xs text-muted-foreground ml-2">57 500₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Недавняя активность</CardTitle>
                  <CardDescription>Ваши последние занятия</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        subject: "Программирование",
                        tutor: "Python Мастер",
                        time: "2 часа назад",
                      },
                      {
                        subject: "Английский язык",
                        tutor: "Grammar Pro",
                        time: "Вчера",
                      },
                      {
                        subject: "Дизайн",
                        tutor: "UI/UX Expert",
                        time: "2 дня назад",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow shrink-0">
                          <span className="text-sm font-semibold text-primary-foreground">
                            {activity.subject[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {activity.tutor}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Program */}
            <ReferralProgram />
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Profile;
