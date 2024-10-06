import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Container,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Slider from "react-slick";
import "../App.css";
import germanVocab from "../data/german_vocab.json";
import germanCases from "../data/german_cases.json";

const GermanLessons = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    nextArrow: null,
    touchMove: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: false,
        },
      },
    ],
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const question = germanVocab[currentQuestionIndex];
    const allOptions = shuffle([
      question.english,
      ...germanVocab
        .filter((q) => q !== question)
        .map((q) => q.english)
        .slice(0, 3),
    ]);
    setOptions(allOptions);
  }, [currentQuestionIndex]);

  const checkAnswer = (option) => {
    const isCorrect = option === germanVocab[currentQuestionIndex].english;
    setResult(isCorrect ? "correct" : "wrong");
    setScore(isCorrect ? score + 1 : score);
    setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= germanVocab.length) {
      alert(`Quiz over! Your score is: ${score}/${germanVocab.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
      setResult("");
    } else {
      setSelectedAnswer("");
      setResult(null);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const currentQuestion = germanVocab[currentQuestionIndex];

  return (
    <Box
      id="german"
      sx={{
        width: "100%",
        marginBottom: "2rem",
        backgroundColor: "blue",
      }}
    >
      <Container
        sx={{
          maxWidth: "80%",
        }}
      >
        <Slider
          {...settings}
          sx={{
            alignItems: "center !important",
            justifyContent: "center !important",
          }}
        >
          <Paper className="quiz-card">
            <Typography className="section-head" paddingBottom={"1rem"}>
              German Vocabulary Quiz
            </Typography>
            <Typography className="subsection-head">
              Translate: <strong>{currentQuestion.german}</strong>
            </Typography>
            <Stack direction="column" spacing={2} sx={{ marginTop: "1rem" }}>
              {options.map((option) => (
                <Button
                  key={option}
                  variant="contained"
                  className="subsection-text"
                  onClick={() => checkAnswer(option)}
                  sx={{
                    backgroundColor: "rgb(208, 163, 197) !important",
                    boxShadow: "none !important",
                    color: "black",
                    "&:hover": {
                      backgroundColor:
                        selectedAnswer === option
                          ? result === "correct"
                            ? "#66bb6a"
                            : "#ef5350"
                          : "#1c7373",
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </Stack>
            {result && (
              <Typography
                variant="h6"
                className={`quiz-result ${
                  result === "Correct!" ? "correct" : "wrong"
                }`}
                sx={{ marginTop: "1rem" }}
              >
                {result}
              </Typography>
            )}
            <Button
              variant="outlined"
              onClick={nextQuestion}
              className="subsection-text"
              sx={{
                marginTop: "1rem",
                backgroundColor: "#497750 !important",
                boxShadow: "none !important",
                color: "white",
              }}
            >
              Next Question
            </Button>
          </Paper>
          <Paper className="quiz-card">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Typography className="section-head" padding={"none"}>
                German Cases Quiz
              </Typography>
              <Tooltip
                title={
                  <Box>
                    <Typography className="subsection-text">
                      <b>Nominative</b>: Subject of the sentence.
                    </Typography>
                    <Typography className="subsection-text">
                      <b>Accusative</b>: Direct object of the action.
                    </Typography>
                    <Typography className="subsection-text">
                      <b>Dative</b>: Indirect object, usually the receiver.
                    </Typography>
                    <Typography className="subsection-text">
                      <b>Genitive</b>: Possession or belonging.
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
                padding={"none"}
              >
                <IconButton>
                  <InfoIcon fontSize="small" padding={"none"} />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography className="subsection-head" padding={"none"}>
              {germanCases[currentQuestionIndex].sentence}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: "1rem" }}
              justifyContent={"center"}
            >
              {["Nominative", "Accusative", "Dative", "Genitive"].map(
                (option) => (
                  <Button
                    key={option}
                    variant="contained"
                    className={`subsection-text ${
                      selectedAnswer === option ? result : ""
                    }`}
                    onClick={() => checkAnswer(option)}
                    sx={{
                      backgroundColor:
                        selectedAnswer === option
                          ? result === "correct"
                            ? "#4caf50"
                            : "rgb(208, 163, 197)"
                          : "rgb(208, 163, 197)",
                      color: "black",
                      "&:hover": {
                        backgroundColor:
                          selectedAnswer === option
                            ? result === "correct"
                              ? "#66bb6a"
                              : "#ef5350"
                            : "#1c7373",
                      },
                      boxShadow: "none",
                    }}
                  >
                    {option}
                  </Button>
                )
              )}
            </Stack>

            {result && (
              <Typography
                className={`quiz-result ${
                  result === "correct" ? "correct" : "wrong"
                }`}
              >
                {result === "correct" ? "Correct!" : "Wrong, try again!"}
              </Typography>
            )}

            {result && (
              <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                {germanCases[currentQuestionIndex].explanation}
              </Typography>
            )}

            {selectedAnswer && result && (
              <Button
                variant="contained"
                color="primary"
                onClick={nextQuestion}
                className="next-question-btn"
                sx={{ marginTop: "1rem" }}
              >
                Next Question
              </Button>
            )}
          </Paper>
        </Slider>
      </Container>
    </Box>
  );
};

export default GermanLessons;
