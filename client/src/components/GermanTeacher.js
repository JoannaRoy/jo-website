import { useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const sliderSettings = {
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

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Custom hook to manage quiz logic
export const useQuizLogic = (data, correctField) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  // Shuffles and sets the options for the current question
  const generateOptions = (currentQuestion) => {
    if (!currentQuestion) return [];
    const correctAnswer = currentQuestion[correctField]; // Use the correct field to check answer
    return shuffle([
      correctAnswer,
      ...data
        .filter((q) => q !== currentQuestion)
        .map((q) => q[correctField])
        .slice(0, 3),
    ]);
  };

  // Check if the selected answer is correct
  const checkAnswer = (option) => {
    const isCorrect = option === data[currentQuestionIndex][correctField];
    setResult(isCorrect ? "correct" : "wrong");
    setScore(isCorrect ? score + 1 : score);
    setSelectedAnswer(option);
  };

  // Move to the next question
  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= data.length) {
      alert(`Quiz over! Your score is: ${score}/${data.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
      setResult(null);
      setSelectedAnswer("");
    } else {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer("");
      setResult(null);
    }
  };

  // Get the current question
  const currentQuestion = data[currentQuestionIndex];

  return {
    currentQuestion,
    selectedAnswer,
    result,
    score,
    generateOptions,
    checkAnswer,
    nextQuestion,
  };
};

const GermanTeacher = () => {
  return (
    <Box id="german" className="subpage-box">
      <Typography className="section-head">
        Herzlig willkommen in der Deutsch Sprachschule 🇩🇪
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginTop: "1rem", marginBottom: "2rem" }}
        justifyContent={"center"}
      >
        <Link to="/german_lessons/GermanVocab">
          <Button variant="outlined" href="#outlined-buttons">
            Practice Vocabulary 🤓
          </Button>
        </Link>
        <Link to="/german_lessons/GermanCases">
          <Button variant="outlined" href="#outlined-buttons">
            Practice Cases 💼
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default GermanTeacher;
