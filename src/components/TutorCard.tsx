import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TutorCardProps {
  name: string;
  profession: string;
  description: string;
  imageUrl: string;
  specialization: string;
}

export const TutorCard = ({ name, profession, description, imageUrl, specialization }: TutorCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startLesson = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('tavus-conversation', {
        body: { tutorName: name }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.conversation_url) {
        // Open Tavus video call in new tab
        window.open(data.conversation_url, '_blank');
        toast({
          title: "Занятие начинается",
          description: `Открывается видеозвонок с ${name}`,
        });
      } else {
        throw new Error("Не удалось получить ссылку на занятие");
      }
    } catch (error) {
      console.error("Error starting lesson:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось начать занятие",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border overflow-hidden hover:border-primary/50 transition-all">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Photo Section */}
          <div className="relative md:w-64 h-64 md:h-auto shrink-0">
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
                {profession}
              </Badge>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-muted/50 border border-border overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{specialization}</p>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="gap-2" onClick={startLesson} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isLoading ? "Подключение..." : "Заниматься"}
              </Button>
              <Button variant="outline" className="gap-2 border-secondary/50 text-secondary hover:bg-secondary/10">
                <Sparkles className="h-4 w-4" />
                Beyond Presence
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
