import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [referralsCount, setReferralsCount] = useState(0);
  useEffect(() => {
    const loadReferralData = async () => {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;

      // Generate or get referral code (using user id as base)
      const code = `AISC${user.id.substring(0, 8).toUpperCase()}`;
      setReferralCode(code);

      // Get user points
      const {
        data: pointsData
      } = await supabase.from("user_points").select("total_points").eq("user_id", user.id).single();
      if (pointsData) {
        setTotalPoints(pointsData.total_points);
      }

      // Get referrals count
      const {
        data: referralsData,
        count
      } = await supabase.from("referral_program").select("*", {
        count: 'exact',
        head: true
      }).eq("referrer_user_id", user.id);
      setReferralsCount(count || 0);
    };
    loadReferralData();
  }, []);
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Скопировано!",
      description: "Реферальный код скопирован в буфер обмена"
    });
    setTimeout(() => setCopied(false), 2000);
  };
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Ссылка скопирована!",
      description: "Реферальная ссылка скопирована в буфер обмена"
    });
  };
  return <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Партнёрская программа
        </CardTitle>
        <CardDescription>
          Партнёры получают 5% от покупки реферала. Обычные пользователи — 3% в минутах
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Всего приглашённых</p>
            <p className="text-2xl font-bold">{referralsCount}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Заработано баллов</p>
            <p className="text-2xl font-bold text-primary">{totalPoints}</p>
          </div>
        </div>

        <div className="space-y-2">
          
          <div className="flex gap-2">
            
            
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Реферальная ссылка</p>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="text-sm" />
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <p className="text-sm">
            💡 <strong>Как это работает:</strong> Партнёры получают 5% от суммы покупки реферала. 
            Обычные пользователи получают 3% в виде минут для обучения!
          </p>
        </div>
      </CardContent>
    </Card>;
};