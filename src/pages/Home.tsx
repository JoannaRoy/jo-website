import { CheckerBox, PlainBox, SparkleBox } from "../components/ItemBoxes.tsx";
import { PageGrid, RegularGrid } from "../components/ItemGrids.tsx";
import "../styling/Backgrounds.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="home-bgd">
        <PageGrid columns={0}>
          <CheckerBox
            title=""
            imageUrl="/src/assets/jo.jpg"
            width="30%"
            height="20rem"
          ></CheckerBox>
          <SparkleBox
            title="hello!"
            borderColor="var(--white)"
            width="60%"
            height="20rem"
          >
            <p>my name is joanna :) welcome to my website</p>
            <RegularGrid columns={2}>
              <PlainBox width="11rem" height="10rem">
                <p>bla bla</p>
              </PlainBox>
              <PlainBox width="10rem" height="10rem">
                <p>bla bla</p>
              </PlainBox>
            </RegularGrid>
          </SparkleBox>
        </PageGrid>
      </div>
    </>
  );
};

export default Home;
