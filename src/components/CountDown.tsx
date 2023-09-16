'use client';
import React, { useState, useEffect } from 'react';

const CountDown = () => {
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    const endDate = new Date('10/10/2023').getTime();
    const now = new Date().getTime();
    const difference = endDate - now;

    if (difference > 0) {
      setDelay(difference);

      const timer = setInterval(() => {
        setDelay((prevDelay) => {
          if (prevDelay > 1000) {
            return prevDelay - 1000;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  const days = Math.floor(delay / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delay / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delay / (1000 * 60)) % 60);
  const seconds = Math.floor((delay / 1000) % 60);

  return (
    <span className='font-bold text-5xl text-yellow-300'>
      {days}:{hours}:{minutes}:{seconds}
    </span>
  );
};

export default CountDown;
