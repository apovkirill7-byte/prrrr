import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReferralProgram } from "@/components/ReferralProgram";
import { MinutesBalance } from "@/components/MinutesBalance";
import { PromoCodeCard } from "@/components/PromoCodeCard";
import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, metrics, materials, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Выход выполнен",
      description: "До скорой встречи!"
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = profile?.name || user.user_metadata?.name || "Пользователь";
  const currentPlan = metrics?.current_plan || "free";
  const minutesBalance = metrics?.minutes_balance || 0;

  // Count materials by type
  const checklistsCount = materials.filter(m => m.material_type === 'checklist' && m.is_unlocked).length;
  const guidesCount = materials.filter(m => m.material_type === 'guide' && m.is_unlocked).length;
  const collectionsCount = materials.filter(m => m.material_type === 'collection' && m.is_unlocked).length;
  const recommendationsCount = materials.filter(m => m.material_type === 'recommendation' && m.is_unlocked).length;

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'medium': return 'Medium';
      case 'plus': return 'Plus';
      case 'premium': return 'Premium';
      default: return 'Базовый';
    }
  };

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
                  Добро пожаловать, {userName}!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Текущий тариф: <span className="text-primary font-medium">{getPlanLabel(currentPlan)}</span>
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>

            {/* Minutes Balance */}
            <div className="mb-8">
              <MinutesBalance balance={minutesBalance} />
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
                      {checklistsCount > 0 ? `${checklistsCount} доступно` : 'Недоступно'}
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
                      {guidesCount > 0 ? `${guidesCount} доступно` : 'Недоступно'}
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
                      {collectionsCount > 0 ? `${collectionsCount} доступно` : 'Недоступно'}
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
                      {recommendationsCount > 0 ? `${recommendationsCount} доступно` : 'Недоступно'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plans & Promo Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Plans Section */}
              <Card className="border-border h-full hover:border-primary/50 transition-all cursor-pointer" onClick={() => navigate('/products')}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Доступные тарифы</span>
                    <span className="text-sm font-normal text-primary">Посмотреть все →</span>
                  </CardTitle>
                  <CardDescription>Выберите тариф для продолжения обучения</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className={`rounded-lg px-4 py-2 ${currentPlan === 'free' ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                      <span className="text-sm font-medium">Базовый</span>
                      <span className="text-xs text-muted-foreground ml-2">Бесплатно</span>
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${currentPlan === 'medium' ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                      <span className="text-sm font-medium">Medium</span>
                      <span className="text-xs text-muted-foreground ml-2">13 500₽</span>
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${currentPlan === 'plus' ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                      <span className="text-sm font-medium">Plus</span>
                      <span className="text-xs text-muted-foreground ml-2">25 000₽</span>
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${currentPlan === 'premium' ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                      <span className="text-sm font-medium">Premium</span>
                      <span className="text-xs text-muted-foreground ml-2">57 500₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code Card */}
              <PromoCodeCard />
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
