import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Plus, History } from "lucide-react";
import { Link } from "react-router-dom";

interface HistoryItem {
  id: string;
  date: string;
  description: string;
  minutes: number;
  type: "add" | "spend";
}

const mockHistory: HistoryItem[] = [
  { id: "1", date: "14.12.2024", description: "Урок с репетитором по продажам", minutes: -15, type: "spend" },
  { id: "2", date: "13.12.2024", description: "Пополнение баланса (Plus)", minutes: 1200, type: "add" },
  { id: "3", date: "12.12.2024", description: "Урок с репетитором по маркетингу", minutes: -30, type: "spend" },
  { id: "4", date: "11.12.2024", description: "Бонус по реферальной программе", minutes: 45, type: "add" },
  { id: "5", date: "10.12.2024", description: "Урок с репетитором по английскому", minutes: -20, type: "spend" },
];

export const MinutesBalance = () => {
  const [showHistory, setShowHistory] = useState(false);
  const currentBalance = 1180; // Заглушка - потом подключить к БД

  return (
    <>
      <Card 
        className="border-border hover:border-primary/50 transition-all cursor-pointer"
        onClick={() => setShowHistory(true)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Баланс минут
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">{currentBalance}</p>
              <p className="text-sm text-muted-foreground">минут доступно</p>
            </div>
            <Button asChild size="sm" className="gap-1">
              <Link to="/products">
                <Plus className="h-4 w-4" />
                Докупить
              </Link>
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <History className="h-3 w-3" />
            Нажмите для просмотра истории
          </div>
        </CardContent>
      </Card>

      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              История операций
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockHistory.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <p className={`font-bold ${item.type === "add" ? "text-secondary" : "text-destructive"}`}>
                  {item.type === "add" ? "+" : ""}{item.minutes} мин
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Текущий баланс:</span>
              <span className="text-xl font-bold text-primary">{currentBalance} минут</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
