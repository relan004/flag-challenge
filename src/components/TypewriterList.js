import React from "react";

import { useEffect, useState } from "react";

export const TypewriterList = ({ children, speed = 500 }) => {
  const [flag] = useState(children);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (flag) {
      //update the list every 500ms like typing
      let index = 0;
      let list = [];
      const listSpeedInterval = setInterval(() => {
        if (index < flag?.length) {
          list.push(flag.charAt(index));
          setItems([...list]);
          index++;
        } else {
          clearInterval(listSpeedInterval);
        }
      }, speed);
    }
  }, [flag, speed]);

  return (
    <div className="flag flag--list">
      <ul>
        {items?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
