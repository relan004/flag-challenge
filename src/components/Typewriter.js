import React from "react";

import { useEffect, useState } from "react";

export const Typewriter = ({ children, speed = 500 }) => {
  const [flag] = useState(children);
  const [displayFlag, setDisplayFlag] = useState("");

  useEffect(() => {
    //update the string every 500ms like typing
    let index = 0;
    let tempDisplay = "";
    const typeSpeedInterval = setInterval(() => {
      if (index < flag?.length) {
        tempDisplay += flag.charAt(index);
        setDisplayFlag(tempDisplay);
        index++;
      } else {
        clearInterval(typeSpeedInterval);
      }
    }, speed);
  }, [flag, speed]);

  return <div className="flag flag--string">{displayFlag}</div>;
};
