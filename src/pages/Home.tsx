import React, { useState } from "react";
import { PageGrid } from "../components/ItemGrids.tsx";
import "../styling/Backgrounds.css";
import "../styling/Animations.css";
import FlipCard from "../components/FlipCard.tsx";
import Sparkles from "react-sparkle";

const Home: React.FC = () => {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <>
      <div>
        <Sparkles
          color="gold"
          count={100}
          minSize={5}
          maxSize={10}
          overflowPx={0}
          fadeOutSpeed={10}
        />
        <PageGrid columns={0} style={{ width: "100vw" }}>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-row w-full items-center mb-20">
              <div className="flex flex-col w-1/10 h-40 justify-center items-center bg-gradient-to-br from-green-100 to-purple-200" />
              <div className="flex justify-center items-center z-10">
                <img src="/src/assets/jo.jpg" alt="jo" className="h-50" />
              </div>
              <div className="flex flex-col w-8/10 h-30 text-left align-middle">
                <h1 className="font-bold ml-10 mb-5 mt-10">hello!</h1>
                <p className="text-left ml-10 mr-20">
                  My name is Joanna :) Welcome to my little corner of the
                  internet. There's a bit of everything on here so I hope you
                  enjoy!
                </p>
              </div>
            </div>
            <div className="flex flex-row w-full justify-around">
              <FlipCard
                isFlipped={flipped[0]}
                onFlip={() => handleFlip(0)}
                frontContent={<h2>professionally</h2>}
                backContent={
                  <p>
                    I am a software engineer, especially interested in AI ethics
                    and governance.
                    <br />
                    <br />I currently work at{" "}
                    <a href="https://trail-ml.com" className="text-white">
                      Trail
                    </a>
                    , a Munich-based AI Governance start-up, and I graduated
                    from Engineering Science (ECE major) at the University of
                    Toronto in 2024.
                  </p>
                }
                // backgroundClass="bg-radial-[at_25%_25%] from-purple-400 via-pink-350 to-orange-300 to-75%"
                backgroundClass="bg-purple-200"
                backgroundPosition="bottom center"
              />

              <FlipCard
                isFlipped={flipped[1]}
                onFlip={() => handleFlip(1)}
                frontContent={<h2>personally</h2>}
                backContent={
                  <p>
                    I grew up in Canada but I'm currently living in Germany. I
                    have a cat named Barney, a dog named Buddy, and three guinea
                    pigs named Larry, Curly, and Moe.
                    <br />
                    <br />I love running, cycling, cross-country skiing, and
                    generally exploring outside & trying new sports or races. I
                    also really love reading and listening to podcasts and am
                    always open to recommendations! :)
                  </p>
                }
                // backgroundClass="bg-radial from-pink-400 from-20% via-fuchsia-350 to-orange-200"
                backgroundClass="bg-purple-200"
                backgroundPosition="top"
              />

              <FlipCard
                isFlipped={flipped[2]}
                onFlip={() => handleFlip(2)}
                frontContent={<h2>all the rest</h2>}
                backContent={
                  <p>
                    Of course there is lots more to me than can be shown here!{" "}
                    <br />
                    <br /> If anything on this site is of interest to you,
                    definitely reach out. I love meeting new people (and
                    re-finding old people) so I'd love to chat :)
                  </p>
                }
                // backgroundClass="bg-radial-[at_30%_30%] from-indigo-200 via-fuchsia-400 to-pink-300 to-90%"
                backgroundClass="bg-purple-200"
                backgroundPosition="right"
              />
            </div>
          </div>
        </PageGrid>
      </div>
    </>
  );
};

export default Home;
