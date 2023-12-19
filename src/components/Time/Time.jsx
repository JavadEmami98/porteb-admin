import React, { useState, useEffect } from "react";

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(currentTime);

  return (
    <div>
      <p className="text-[#228B22]">{formattedTime}</p>
    </div>
  );
}

export default Time;
