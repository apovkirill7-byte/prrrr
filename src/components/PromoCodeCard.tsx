import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PromoCodeInput } from "@/components/PromoCodeInput";
import { Gift } from "lucide-react";

export const PromoCodeCard = () => {
  return (
    <Card className="border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className="h-5 w-5 text-secondary" />
          Промокод
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Введите промокод для получения скидки на обучение
        </p>
        <PromoCodeInput />
      </CardContent>
    </Card>
  );
};
