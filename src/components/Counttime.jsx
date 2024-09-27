"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} className="mx-2 text-center">
        <div className="text-6xl font-bold">
          {timeLeft[interval].toString().padStart(2, "0")}
        </div>
        <div className="text-sm">{interval}</div>
      </div>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center items-center">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Event has started!</span>
      )}
    </div>
  );
}
