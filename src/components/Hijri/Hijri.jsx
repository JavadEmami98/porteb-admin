import React, { useState, useEffect } from "react";
import moment from "jalali-moment";

const convertToPersianDay = (englishDay) => {
  const persianDays = {
    Saturday: "شنبه",
    Sunday: "یک‌شنبه",
    Monday: "دوشنبه",
    Tuesday: "سه‌شنبه",
    Wednesday: "چهارشنبه",
    Thursday: "پنج‌شنبه",
    Friday: "جمعه",
  };
  return persianDays[englishDay];
};

const Hijri = () => {
  const [currentPersianDateTime, setCurrentPersianDateTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const persianDateTime = moment();

      const englishDay = persianDateTime.format("dddd");

      const persianDay = convertToPersianDay(englishDay);

      const formattedPersianDateTime = persianDateTime.format("jYYYY/jM/jD");

      const result = `${persianDay} ${formattedPersianDateTime}`;
      setCurrentPersianDateTime(result);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className="text-[#228B22]">{currentPersianDateTime}</p>
    </div>
  );
};

export default Hijri;
