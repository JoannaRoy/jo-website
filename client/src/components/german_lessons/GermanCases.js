import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import germanCases from "../../data/german_cases.json";
import { useQuizLogic } from "../GermanTeacher";

const GermanCases = () => {
  const {
    currentQuestion,
    selectedAnswer,
    result,
    generateOptions,
    checkAnswer,
    nextQuestion,
  } = useQuizLogic(germanCases, "correct"); // 'correct' is the field for the correct case

  const [options, setOptions] = useState([]);

  // Automatically generate and shuffle options when currentQuestion changes
  useEffect(() => {
    if (currentQuestion) {
      const generatedOptions = generateOptions(currentQuestion); // Use the helper to generate options
      setOptions(generatedOptions);
    }
  }, [currentQuestion, generateOptions]); // Add generateOptions to dependency array

  return (
    <Box>
      <Paper className="quiz-card">
        <Typography variant="h5">German Cases Quiz</Typography>
        <Tooltip
          title={
            <Box>
              <Typography>
                <b>Nominative</b>: Subject of the sentence.
              </Typography>
              <Typography>
                <b>Accusative</b>: Direct object of the action.
              </Typography>
              <Typography>
                <b>Dative</b>: Indirect object, usually the receiver.
              </Typography>
              <Typography>
                <b>Genitive</b>: Possession or belonging.
              </Typography>
            </Box>
          }
          arrow
        >
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Typography>{currentQuestion?.sentence}</Typography>
        <Stack direction="row" spacing={2}>
          {options.map((option) => (
            <Button
              key={option}
              variant="contained"
              onClick={() => checkAnswer(option)}
              sx={{
                backgroundColor:
                  selectedAnswer === option
                    ? result === "correct"
                      ? "#66bb6a"
                      : "#ef5350"
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
              }}
            >
              {option}
            </Button>
          ))}
        </Stack>
        {result && (
          <Typography>
            {result === "correct" ? "Correct!" : "Wrong, try again!"}
          </Typography>
        )}
        <Button variant="contained" onClick={nextQuestion}>
          Next Question
        </Button>
      </Paper>
    </Box>
  );
};

export default GermanCases;
