import ProjectImg from "../assets/flower-2.svg";
import projects from "../data/projects.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Button, Container } from "@mui/material";

const Projects = () => {
  const settings = {
    dots: true,
    infinite: false,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: false,
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      id="projects"
      sx={{ padding: "2rem 0", width: "100%", alignContent: "center" }}
    >
      <Container sx={{ maxWidth: "80%" }}>
        <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
          <Typography className="section-head">projects</Typography>
        </Box>
        <Box
          className="projects-container"
          sx={{ width: "100%", position: "relative" }}
        >
          <Slider {...settings}>
            {projects.map((project, key) => {
              return (
                <Box
                  key={key}
                  className="project"
                  sx={{
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    width: "70% !important",
                  }}
                >
                  <Box
                    className="content"
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={ProjectImg}
                        alt="Project"
                        style={{ maxWidth: "100%" }}
                      />
                    </Box>
                    <Typography className="subsection-head">
                      {project.name}
                    </Typography>
                    <Typography className="subsection-text">
                      {project.description}
                    </Typography>
                    <Box sx={{ marginTop: "1rem" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="project-button"
                        target="_blank"
                        href={project.link}
                        rel="noreferrer"
                      >
                        GitHub
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
