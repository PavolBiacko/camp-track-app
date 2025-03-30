import { CurrentTime } from "@/types/base";
import { useEffect, useState } from "react";

export const useCurrentTime = (): CurrentTime => {
  const [currentTime, setCurrentTime] = useState<CurrentTime>(() => {
    const now = new Date();
    return { hours: now.getHours(), minutes: now.getMinutes() };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime({ hours: now.getHours(), minutes: now.getMinutes() });
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};