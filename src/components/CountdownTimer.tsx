import { useEffect, useState } from "react";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      
      // Store end date in localStorage if not exists
      const storedEndDate = localStorage.getItem('promotionEndDate');
      let targetDate: Date;
      
      if (storedEndDate) {
        targetDate = new Date(storedEndDate);
        // Check if promotion ended, restart it
        if (targetDate.getTime() <= Date.now()) {
          targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + 7);
          localStorage.setItem('promotionEndDate', targetDate.toISOString());
        }
      } else {
        targetDate = endDate;
        localStorage.setItem('promotionEndDate', targetDate.toISOString());
      }

      const difference = targetDate.getTime() - Date.now();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="text-center">
      <p className="text-primary-foreground/90 text-sm mb-4">До конца акции осталось:</p>
      <div className="flex gap-3 justify-center">
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold text-primary-foreground">{formatNumber(timeLeft.days)}</div>
          <div className="text-xs text-primary-foreground/70 mt-1">дней</div>
        </div>
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold text-primary-foreground">{formatNumber(timeLeft.hours)}</div>
          <div className="text-xs text-primary-foreground/70 mt-1">часов</div>
        </div>
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold text-primary-foreground">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-xs text-primary-foreground/70 mt-1">минут</div>
        </div>
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
          <div className="text-2xl font-bold text-primary-foreground">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-xs text-primary-foreground/70 mt-1">секунд</div>
        </div>
      </div>
    </div>
  );
};
