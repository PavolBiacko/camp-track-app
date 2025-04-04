import { CurrentTime } from "@/types/base";
import { useEffect, useState } from "react";

export const useCurrentTime = (): CurrentTime => {
  const [currentTime, setCurrentTime] = useState<CurrentTime>(() => {
    const now = new Date(); // Set a fixed date for testing
    return { hours: now.getHours(), minutes: now.getMinutes() };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime({ hours: now.getHours(), minutes: now.getMinutes() });
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};