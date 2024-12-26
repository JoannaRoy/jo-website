import { CheckerBox, PlainBox } from "../components/ItemBoxes.tsx";
import { PageGrid, RegularGrid } from "../components/ItemGrids.tsx";
import "../styling/Backgrounds.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="home-bgd">
        <PageGrid columns={1}>
          <RegularGrid columns={2}>
            <CheckerBox
              title=""
              imageUrl="/src/assets/jo.jpg"
              width="100%"
              height="30rem"
            ></CheckerBox>
            <PlainBox
              title="welcome :)"
              borderColor="var(--white)"
              width="80%"
              height="30rem"
            >
              <p>hello i am jo! welcome to my website</p>
              <RegularGrid columns={2}>
                <PlainBox width="80%" height="10rem">
                  <p>bla bla</p>
                </PlainBox>
                <PlainBox width="80%" height="10rem">
                  <p>bla bla</p>
                </PlainBox>
              </RegularGrid>
            </PlainBox>
          </RegularGrid>
        </PageGrid>
      </div>
    </>
  );
};

export default Home;
