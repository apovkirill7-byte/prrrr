import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PromoCodeInput } from "@/components/PromoCodeInput";
import { ReferralProgram } from "@/components/ReferralProgram";
import { Flame, Clock, Trophy, TrendingUp, Crown, LogOut, Info, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showTasksDialog, setShowTasksDialog] = useState(false);
  const [userTasks, setUserTasks] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [hasSubscription] = useState(true);

  const tasks = [
    { id: "task_1", title: "Пройди чек-лист по книге", points: 30 },
    { id: "task_2", title: "Пригласи друга", points: 100 },
    { id: "task_3", title: "Прочитай 3 книги подряд", points: 50 },
    { id: "task_4", title: "Пройди курс полностью", points: 200 },
    { id: "task_5", title: "Оставь отзыв о платформе", points: 25 },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      loadUserTasks();
      loadUserPoints();
    }
  }, [isLoggedIn]);

  const loadUserTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading tasks:', error);
      return;
    }

    setUserTasks(data || []);
  };

  const loadUserPoints = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_points')
      .select('total_points')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading points:', error);
      return;
    }

    setTotalPoints(data?.total_points || 0);
  };

  const getTaskStatus = (taskId: string) => {
    const userTask = userTasks.find(t => t.task_id === taskId);
    return userTask;
  };

  const handleStartTask = async (taskId: string, points: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const existingTask = getTaskStatus(taskId);
    if (existingTask) {
      toast({
        title: "Задание уже начато",
        description: "Это задание уже в процессе выполнения.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_tasks')
      .insert({
        user_id: user.id,
        task_id: taskId,
        started_at: new Date().toISOString(),
        points_earned: points,
      });

    if (error) {
      console.error('Error starting task:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось начать задание.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Задание начато!",
      description: "Таймер на 24 часа запущен. Удачи!",
    });

    await loadUserTasks();
    checkTaskCompletion(taskId, points);
  };

  const checkTaskCompletion = async (taskId: string, points: number) => {
    setTimeout(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_tasks')
        .update({
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('task_id', taskId)
        .is('completed_at', null);

      if (error) {
        console.error('Error completing task:', error);
        return;
      }

      // Update user points
      const { data: existingPoints } = await supabase
        .from('user_points')
        .select('total_points')
        .eq('user_id', user.id)
        .single();

      if (existingPoints) {
        await supabase
          .from('user_points')
          .update({
            total_points: existingPoints.total_points + points,
          })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('user_points')
          .insert({
            user_id: user.id,
            total_points: points,
          });
      }

      toast({
        title: "Задание выполнено!",
        description: `Вы получили ${points} баллов!`,
      });

      await loadUserTasks();
      await loadUserPoints();
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

              <Card className="border-border hover:border-primary/50 transition-all hover:shadow-glow h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Баллы
                    <Dialog>
                      <DialogTrigger asChild>
                        <button 
                          className="ml-1 p-1.5 rounded-full hover:bg-muted transition-colors group"
                          aria-label="Информация о баллах"
                        >
                          <Info className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl">Баллы — это твоя выгода</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm leading-relaxed">
                          <p>Получай <span className="font-semibold text-primary">10%</span> с покупок друзей по реферальной ссылке.</p>
                          <p>Выполняй задания и зарабатывай ещё больше.</p>
                          <p>Обменивай баллы на скидку и экономь на обучении.</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Доступно для обмена
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Subscription */}
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

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Подписка
                  </CardTitle>
                  <CardDescription>Информация о вашем плане</CardDescription>
                </CardHeader>
                <CardContent>
                  {hasSubscription ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-primary rounded-lg shadow-glow">
                        <p className="text-sm text-primary-foreground/80 mb-1">
                          Текущий план
                        </p>
                        <p className="text-2xl font-bold text-primary-foreground">
                          Премиум
                        </p>
                        <p className="text-sm text-primary-foreground/90 mt-1">
                          1499₽/мес
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Статус</span>
                          <span className="font-medium text-primary">Активна</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Дата окончания
                          </span>
                          <span className="font-medium">15 марта 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Автопродление
                          </span>
                          <span className="font-medium">Включено</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <PromoCodeInput 
                          onPromoApplied={(discount) => {
                            console.log(`Discount applied: ${discount}%`);
                          }}
                        />
                        <Link to="/subscription" className="w-full">
                          <Button variant="outline" className="w-full">
                            Управление подпиской
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">
                          У вас нет активной подписки
                        </p>
                        <p className="text-2xl font-bold">
                          Премиум
                        </p>
                        <p className="text-lg font-semibold text-primary mt-1">
                          1499₽/мес
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          Получите доступ ко всем функциям платформы
                        </p>
                      </div>
                      <Button className="w-full">
                        Оформить подписку
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tasks Card */}
            <Card 
              className="border-border hover:border-primary/50 transition-all hover:shadow-glow cursor-pointer mb-8"
              onClick={() => setShowTasksDialog(true)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Задания
                </CardTitle>
                <CardDescription>
                  Выполняй задания и зарабатывай баллы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {tasks.filter(t => !getTaskStatus(t.id)?.completed_at).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Доступно заданий</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">
                      {tasks.filter(t => !getTaskStatus(t.id)?.completed_at)
                        .reduce((sum, task) => sum + task.points, 0)} баллов
                    </p>
                    <p className="text-xs text-muted-foreground">можно заработать</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <ReferralProgram />
          </div>
        </div>

            {/* Tasks Dialog */}
            <Dialog open={showTasksDialog} onOpenChange={setShowTasksDialog}>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Доступные задания
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-4">
              {tasks.map((task) => {
                const taskStatus = getTaskStatus(task.id);
                const isCompleted = !!taskStatus?.completed_at;
                const isInProgress = taskStatus?.started_at && !taskStatus?.completed_at;
                
                return (
                  <Card 
                    key={task.id}
                    className="border-border hover:border-primary/50 transition-all hover:shadow-glow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-lg">{task.title}</p>
                          {isInProgress && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Таймер запущен • Осталось менее 24 часов
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary">{task.points}</p>
                            <p className="text-xs text-muted-foreground">баллов</p>
                          </div>
                          <Button 
                            size="sm"
                            className="shrink-0"
                            disabled={isCompleted || isInProgress}
                            style={isCompleted ? { backgroundColor: '#BDBDBD', color: '#fff', cursor: 'not-allowed' } : {}}
                            onClick={() => handleStartTask(task.id, task.points)}
                          >
                            {isCompleted ? 'Выполнено' : isInProgress ? 'В процессе' : 'Начать задание'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-center">
                Выполняй задания регулярно, чтобы зарабатывать больше баллов и получать скидки!
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
