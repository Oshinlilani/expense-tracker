import { useEffect, useState } from "react";
import { animate, useMotionValue } from "motion/react";

export default function AnimatedAmount({ amount }) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString("en-IN"));
    });

    const controls = animate(count, amount, {
      duration: 1,
      ease: "easeOut",
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [amount, count]);

  return <span>₹{displayValue}</span>;
}
