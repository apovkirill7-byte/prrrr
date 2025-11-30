import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, CreditCard, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SubscriptionManagement = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);

  const handleAutoRenewalToggle = (checked: boolean) => {
    setAutoRenewal(checked);
    toast({
      title: checked ? "Автопродление включено" : "Автопродление отключено",
      description: checked 
        ? "Подписка будет автоматически продлена в конце периода." 
        : "Подписка не будет продлена автоматически.",
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Подписка отменена",
      description: "Ваша подписка будет активна до окончания оплаченного периода.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Link 
              to="/profile" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Вернуться в профиль
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Crown className="h-8 w-8 text-primary" />
                Управление подпиской
              </h1>
              <p className="text-xl text-muted-foreground">
                Информация о вашем плане и настройки
              </p>
            </div>

            {/* Subscription Status Card */}
            <Card className="border-border mb-6 overflow-hidden">
              <div className="bg-gradient-primary p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-foreground/80 mb-1">
                      Текущий план
                    </p>
                    <h2 className="text-3xl font-bold text-primary-foreground">
                      Премиум
                    </h2>
                  </div>
                  <Badge className="bg-background/20 text-primary-foreground border-primary-foreground/20">
                    Активна
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Стоимость</p>
                        <p className="text-sm text-muted-foreground">Ежемесячный платёж</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">1499₽</p>
                  </div>

                  {/* Renewal Date */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Следующее списание</p>
                        <p className="text-sm text-muted-foreground">Дата продления</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">15 марта 2025</p>
                  </div>

                  {/* Auto-renewal Toggle */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Автопродление</p>
                        <p className="text-sm text-muted-foreground">
                          {autoRenewal ? "Включено" : "Отключено"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={autoRenewal}
                      onCheckedChange={handleAutoRenewalToggle}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancel Subscription */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Отмена подписки</CardTitle>
                <CardDescription>
                  При отмене подписки вы потеряете доступ к премиум-функциям после окончания текущего периода.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Отключить подписку
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие отменит автоматическое продление подписки. Вы сможете пользоваться 
                        премиум-функциями до 15 марта 2025, после чего доступ будет ограничен.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Отключить подписку
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionManagement;
