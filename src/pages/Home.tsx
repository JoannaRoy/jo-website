import React, { useState } from "react";
import { PageGrid } from "../components/ItemGrids.tsx";
import "../styling/Backgrounds.css";
import "../styling/Animations.css";

const Home: React.FC = () => {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };

  const aboutMeStyle = {
    width: "30vw",
    height: "30vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundImage: "url('/src/assets/spiffs-gradient.png')",
  };

  return (
    <>
      <div>
        <PageGrid columns={0} style={{ width: "100vw" }}>
          <div
            style={{
              flexDirection: "column",
              width: "100%",
              ...divStyle,
            }}
          >
            <div
              style={{
                flexDirection: "row",
                width: "100%",
                ...divStyle,
              }}
            >
              <div
                style={{
                  width: "20vw",
                  height: "30vw",
                  ...divStyle,
                  zIndex: 1000,
                }}
              >
                <img
                  src="/src/assets/jo.jpg"
                  alt="jo"
                  style={{
                    height: "90%",
                    width: "auto",
                  }}
                />
              </div>
              <div
                style={{
                  width: "80vw",
                  height: "20vw",
                  flexDirection: "column",
                  right: "0",
                  backgroundImage: "url('/src/assets/spiffs-gradient.png')",
                  ...divStyle,
                }}
              >
                <h1 style={{ fontSize: "5rem" }}>hello!</h1>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginBottom: "2vw",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "90vw",
                  height: "6vw",
                  backgroundColor: "var(--white)",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  border: "3px solid var(--purple)",
                  borderRight: "none",
                  marginTop: "1vw",
                  marginBottom: "2vw",
                }}
              >
                <p
                  style={{
                    margin: "5px",
                    textAlign: "left",
                  }}
                >
                  My name is Joanna :) Welcome to my little corner of the
                  internet. There's a bit of everything on here so I hope you
                  enjoy!
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <div
                className={`flip-container ${flipped[0] ? "flipped" : ""}`}
                onClick={() => handleFlip(0)}
                style={{
                  ...aboutMeStyle,
                  backgroundPosition: "bottom center",
                  position: "relative",
                  perspective: "1000px",
                }}
              >
                <div className="flipper" style={{ width: "100%" }}>
                  <div
                    className="front"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <h1>professionally</h1>
                  </div>
                  <div
                    className="back"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <p>
                      I am a software engineer, especially interested in AI
                      ethics and governance.
                      <br />
                      <br />I currently work at{" "}
                      <a href="https://trail-ml.com" style={{ color: "white" }}>
                        Trail
                      </a>
                      , a Munich-based AI Governance start-up, and I graduated
                      from Engineering Science (ECE major) at the University of
                      Toronto in 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`flip-container ${flipped[1] ? "flipped" : ""}`}
                onClick={() => handleFlip(1)}
                style={{
                  ...aboutMeStyle,
                  backgroundPosition: "top",
                  position: "relative",
                  perspective: "1000px",
                }}
              >
                <div className="flipper" style={{ width: "100%" }}>
                  <div
                    className="front"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <h1>personally</h1>
                  </div>
                  <div
                    className="back"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <p>
                      I grew up in Canada but I'm currently living in Germany. I
                      have a cat named Barney, a dog named Buddy, and three
                      guinea pigs named Larry, Curly, and Moe.
                      <br />
                      <br />I love running, cycling, cross-country skiing, and
                      generally exploring outside & trying new sports or races.
                      I also really love reading and listening to podcasts and
                      am always open to recommendations! :)
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`flip-container ${flipped[2] ? "flipped" : ""}`}
                onClick={() => handleFlip(2)}
                style={{
                  ...aboutMeStyle,
                  backgroundPosition: "right",
                  position: "relative",
                  perspective: "1000px",
                }}
              >
                <div className="flipper" style={{ width: "100%" }}>
                  <div
                    className="front"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <h1>all the rest</h1>
                  </div>
                  <div
                    className="back"
                    style={{
                      ...divStyle,
                      height: "100%",
                    }}
                  >
                    <p>
                      Of course there is lots more to me than can be shown here!{" "}
                      <br />
                      <br /> If anything on this site is of interest to you,
                      definitely reach out. I love meeting new people (and
                      re-finding old people) so I'd love to chat :)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageGrid>
      </div>
    </>
  );
};

export default Home;
