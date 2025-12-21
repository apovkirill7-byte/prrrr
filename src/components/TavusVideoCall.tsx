import { useEffect, useRef, useState, useCallback } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Users, 
  MonitorUp,
  Loader2,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const callRef = useRef<DailyCall | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);
  const [isConnecting, setIsConnecting] = useState(true);
  const [callError, setCallError] = useState<string | null>(null);

  const cleanup = useCallback(() => {
    if (callRef.current) {
      callRef.current.leave();
      callRef.current.destroy();
      callRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !conversationUrl) return;

    const initCall = async () => {
      try {
        setIsConnecting(true);
        setCallError(null);

        // Create Daily call frame
        const call = DailyIframe.createCallObject({
          videoSource: true,
          audioSource: true,
        });

        callRef.current = call;

        // Event handlers
        call.on("joined-meeting", () => {
          console.log("Joined meeting");
          setIsConnecting(false);
        });

        call.on("participant-joined", (event) => {
          console.log("Participant joined:", event);
          updateParticipantCount(call);
          updateRemoteVideo(call);
        });

        call.on("participant-left", (event) => {
          console.log("Participant left:", event);
          updateParticipantCount(call);
        });

        call.on("participant-updated", (event) => {
          updateRemoteVideo(call);
        });

        call.on("track-started", (event) => {
          console.log("Track started:", event);
          if (event.participant) {
            if (event.participant.local) {
              updateLocalVideo(call);
            } else {
              updateRemoteVideo(call);
            }
          }
        });

        call.on("error", (event) => {
          console.error("Call error:", event);
          setCallError("Ошибка подключения к звонку");
          setIsConnecting(false);
        });

        call.on("left-meeting", () => {
          console.log("Left meeting");
          onClose();
        });

        // Join the call
        await call.join({ url: conversationUrl });

      } catch (error) {
        console.error("Error initializing call:", error);
        setCallError("Не удалось подключиться к звонку");
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      cleanup();
    };
  }, [isOpen, conversationUrl, cleanup, onClose]);

  const updateParticipantCount = (call: DailyCall) => {
    const participants = call.participants();
    setParticipantCount(Object.keys(participants).length);
  };

  const updateLocalVideo = (call: DailyCall) => {
    const localParticipant = call.participants().local;
    if (localParticipant?.tracks?.video?.persistentTrack && localVideoRef.current) {
      const stream = new MediaStream([localParticipant.tracks.video.persistentTrack]);
      localVideoRef.current.srcObject = stream;
    }
  };

  const updateRemoteVideo = (call: DailyCall) => {
    const participants = call.participants();
    const remoteParticipants = Object.values(participants).filter(p => !p.local);
    
    if (remoteParticipants.length > 0 && remoteParticipants[0]?.tracks?.video?.persistentTrack && remoteVideoRef.current) {
      const stream = new MediaStream([remoteParticipants[0].tracks.video.persistentTrack]);
      remoteVideoRef.current.srcObject = stream;
    }
  };

  const toggleMute = () => {
    if (callRef.current) {
      callRef.current.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (callRef.current) {
      callRef.current.setLocalVideo(isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleLeave = () => {
    cleanup();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleLeave()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden bg-[#1a1a2e]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-white/80" />
            <span className="text-emerald-400 font-medium text-sm">
              {participantCount} {participantCount === 1 ? 'участник' : 'участника'} в звонке
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm">Speaker view</span>
            <div className="flex gap-1">
              <button className="p-1.5 bg-white/10 rounded hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="3" y="3" width="14" height="14" rx="2" />
                </svg>
              </button>
              <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="6" height="6" rx="1" />
                  <rect x="10" y="2" width="6" height="6" rx="1" />
                  <rect x="2" y="10" width="6" height="6" rx="1" />
                  <rect x="10" y="10" width="6" height="6" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main video area */}
        <div ref={videoContainerRef} className="relative w-full h-full bg-[#1a1a2e]">
          {isLoading || isConnecting ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-white text-xl font-medium">Подключение к занятию...</p>
              <p className="text-white/60 text-sm">Пожалуйста, разрешите доступ к камере и микрофону</p>
            </div>
          ) : callError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <PhoneOff className="h-16 w-16 text-red-500" />
              <p className="text-white text-xl font-medium">{callError}</p>
              <Button onClick={handleLeave} variant="destructive">
                Закрыть
              </Button>
            </div>
          ) : (
            <>
              {/* Remote video (tutor) - Main */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Tutor name overlay */}
              <div className="absolute bottom-20 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                <Mic className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-medium">Tutor {tutorName}</span>
              </div>

              {/* Local video (user) - Picture-in-picture */}
              <div className="absolute top-20 right-4 w-48 h-36 bg-[#2d3748] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                {isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#2d3748]">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                        <VideoOff className="h-6 w-6 text-white/60" />
                      </div>
                      <span className="text-white/80 text-xs">Камера выключена</span>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror"
                  />
                )}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded">
                    Вы
                  </span>
                  <Mic className={cn(
                    "h-3 w-3",
                    isMuted ? "text-red-500" : "text-white"
                  )} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Controls bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 bg-[#16161a] border-t border-white/10">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Left controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVideo}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-white/10",
                  isVideoOff && "text-red-500"
                )}
              >
                {isVideoOff ? (
                  <VideoOff className="h-5 w-5" />
                ) : (
                  <Video className="h-5 w-5 text-white" />
                )}
                <span className="text-xs text-white/80">
                  {isVideoOff ? "No camera" : "Camera"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-white/10",
                  isMuted && "text-red-500"
                )}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5 text-white" />
                )}
                <span className="text-xs text-white/80">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </Button>
            </div>

            {/* Center controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-white/10"
              >
                <Users className="h-5 w-5 text-white" />
                <span className="text-xs text-white/80">People</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-white/10"
              >
                <MonitorUp className="h-5 w-5 text-white" />
                <span className="text-xs text-white/80">Share</span>
              </Button>
            </div>

            {/* Right controls - Leave */}
            <Button
              onClick={handleLeave}
              className="bg-red-600 hover:bg-red-700 text-white flex flex-col items-center gap-1 h-auto py-2 px-4"
            >
              <PhoneOff className="h-5 w-5" />
              <span className="text-xs">Leave</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
