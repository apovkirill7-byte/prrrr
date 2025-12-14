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
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите промокод",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Use secure server-side function for promo code validation and application
      const { data, error } = await supabase
        .rpc('apply_promocode', { p_code: promoCode.toUpperCase() });

      if (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось применить промокод",
          variant: "destructive",
        });
        return;
      }

      const result = data?.[0];
      
      if (!result?.success) {
        toast({
          title: "Ошибка",
          description: result?.error_message || "Промокод не найден или неактивен",
          variant: "destructive",
        });
        return;
      }

      setIsApplied(true);
      setDiscount(result.discount_percent);
      onPromoApplied?.(result.discount_percent);
      
      toast({
        title: "Успешно!",
        description: `Промокод применён. Скидка ${result.discount_percent}%`,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось применить промокод",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Введите промокод"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          disabled={isApplied || isLoading}
          className="flex-1"
        />
        <Button 
          onClick={handleApplyPromo} 
          disabled={isApplied || isLoading}
          variant={isApplied ? "outline" : "default"}
        >
          {isLoading ? "Проверка..." : isApplied ? "Применён" : "Применить"}
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
