//https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/

import "./styles.css";
import { useEffect, useState } from "react";
import { Typewriter } from "./components/Typewriter";
import { TypewriterList } from "./components/TypewriterList";

export default function App() {
  const [flagUrl, setFlagUrl] = useState(null);
  const [flag, setFlag] = useState(null);

  const challengeURL =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

  useEffect(() => {
    const fetchData = async () => {
      // Find a hidden URL within the HTML
      const html = await asyncFetch(challengeURL);
      let result = "";

      // Create traversable doc obj
      const doc = new DOMParser().parseFromString(html, "text/html");
      const pFlags = doc.querySelectorAll(
        'ul[data-tag*="75"] li[data-id^="98"] div[data-class$="35"] span.value'
      );

      pFlags.forEach((flag) => {
        // Add valid value to URL
        result += flag.getAttribute("value");
      });
      setFlagUrl(result);

      // Make an HTTP request to URL obtained above to load the flag into a React component
      if (result) {
        const flag = await asyncFetch(result);
        // enjoy the wait <3
        setTimeout(() => {
          setFlag(flag);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App text-center">
      <h1>Flag Challenge</h1>
      <Typewriter speed={50}>
        Hi, I'm Sarah - I like to do fun things in react! 🚩
      </Typewriter>

      <hr />
      {flagUrl ? (
        flag ? (
          <>
            <div className="flex justify-around">
              <div>
                <h2>String</h2>
                <div className="flag">{flag}</div>
              </div>
              <div>
                <h2>Typewriter</h2>
                <Typewriter speed={500}>{flag}</Typewriter>
              </div>
            </div>

            <hr />

            <div className="flex justify-around">
              <div>
                <h2>List</h2>
                <div className="flag flag--list">
                  <ul>
                    {flag.split("").map((flagChar, i) => (
                      <li key={i}>{flagChar}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h2>Typewriter List</h2>
                <TypewriterList speed={500}>{flag}</TypewriterList>
              </div>
            </div>
          </>
        ) : (
          <>Loading ...</>
        )
      ) : (
        <>Fetching hidden URL...</>
      )}
    </div>
  );
}

async function asyncFetch(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error during asyncFetch:", error);
    throw error;
  }
}
