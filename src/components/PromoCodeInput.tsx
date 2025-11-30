import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PromoCodeInputProps {
  onPromoApplied?: (discount: number) => void;
}

export const PromoCodeInput = ({ onPromoApplied }: PromoCodeInputProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите промокод",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if promocode exists and is active
      const { data: promo, error } = await supabase
        .from("promocodes")
        .select("*")
        .eq("code", promoCode.toUpperCase())
        .eq("active", true)
        .single();

      if (error || !promo) {
        toast({
          title: "Ошибка",
          description: "Промокод не найден или неактивен",
          variant: "destructive",
        });
        return;
      }

      // Check if promocode is expired
      if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
        toast({
          title: "Ошибка",
          description: "Срок действия промокода истёк",
          variant: "destructive",
        });
        return;
      }

      // Check usage limit
      if (promo.max_uses && promo.current_uses >= promo.max_uses) {
        toast({
          title: "Ошибка",
          description: "Промокод уже использован максимальное количество раз",
          variant: "destructive",
        });
        return;
      }

      setIsApplied(true);
      setDiscount(promo.discount_percent);
      onPromoApplied?.(promo.discount_percent);
      
      toast({
        title: "Успешно!",
        description: `Промокод применён. Скидка ${promo.discount_percent}%`,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось применить промокод",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Введите промокод"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          disabled={isApplied}
          className="flex-1"
        />
        <Button 
          onClick={handleApplyPromo} 
          disabled={isApplied}
          variant={isApplied ? "outline" : "default"}
        >
          {isApplied ? "Применён" : "Применить"}
        </Button>
      </div>
      {isApplied && (
        <p className="text-sm text-primary">
          ✓ Скидка {discount}% применена
        </p>
      )}
    </div>
  );
};
