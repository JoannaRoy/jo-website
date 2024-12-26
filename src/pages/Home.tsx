import { FlowerDecoration } from "../components/Decorations.tsx";
import { PageGrid } from "../components/ItemGrids.tsx";
import "../styling/Backgrounds.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="home-bgd">
        <PageGrid columns={0} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src="/src/assets/jo.jpg"
                alt="jo"
                width="30%"
                style={{
                  margin: "10px",
                  marginLeft: "20px",
                  borderRadius: "10px",
                }}
              />
              <div
                style={{
                  // backgroundColor: "var(--white)"
                  border: "3px solid var(--white)",
                  width: "70%",
                  borderRadius: "10px",
                  margin: "10px",
                  marginRight: "20px",
                }}
              ></div>
            </div>
            <FlowerDecoration style={{ margin: "10px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  // backgroundColor: "var(--white)",
                  border: "3px solid var(--white)",
                  width: "70%",
                  borderRadius: "10px",
                  margin: "10px",
                  marginLeft: "20px",
                }}
              ></div>
              <img
                src="/src/assets/barns.jpeg"
                alt="jo"
                width="30%"
                style={{
                  margin: "10px",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              />
            </div>
          </div>
        </PageGrid>
      </div>
    </>
  );
};

export default Home;
