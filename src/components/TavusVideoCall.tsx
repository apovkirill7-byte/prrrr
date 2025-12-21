import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader2, Phone, PhoneOff } from "lucide-react";

interface TavusVideoCallProps {
  isOpen: boolean;
  onClose: () => void;
  conversationUrl: string | null;
  tutorName: string;
  isLoading: boolean;
}

export const TavusVideoCall = ({
  isOpen,
  onClose,
  conversationUrl,
  tutorName,
  isLoading,
}: TavusVideoCallProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <DialogTitle className="text-lg font-semibold">
              Занятие с {tutorName}
            </DialogTitle>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClose}
            className="gap-2"
          >
            <PhoneOff className="h-4 w-4" />
            Завершить
          </Button>
        </DialogHeader>

        <div className="flex-1 bg-muted relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground text-lg">Подключение к занятию...</p>
              <p className="text-muted-foreground/70 text-sm">Пожалуйста, подождите</p>
            </div>
          ) : conversationUrl ? (
            <iframe
              src={conversationUrl}
              className="w-full h-full border-0"
              allow="camera; microphone; autoplay; fullscreen; display-capture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Phone className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Ошибка подключения</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
