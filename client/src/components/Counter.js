import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting) {
      let start = 0;
      const endValue = parseInt(end, 10);
      if (start === endValue) return;

      // This determines how fast the counter ticks.
      // A smaller interval means more frequent updates.
      const interval = Math.max(duration / endValue, 1);

      const timer = setInterval(() => {
        // Calculate the increment to reach the end in the desired duration
        const increment = Math.ceil(endValue / (duration / interval));
        start += increment;
        if (start > endValue) {
          start = endValue;
        }
        setCount(start);
        if (start === endValue) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isIntersecting, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default Counter;
