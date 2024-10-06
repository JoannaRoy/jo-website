import React, { useEffect, useState } from "react";
import { Typography, Button, Stack, Paper, Container } from "@mui/material";
import germanVocab from "../../data/german_vocab.json";
import { useQuizLogic } from "../GermanTeacher";

const GermanVocab = () => {
  const {
    currentQuestion,
    result,
    generateOptions,
    checkAnswer,
    nextQuestion,
  } = useQuizLogic(germanVocab, "english"); // 'english' is the correct field for vocab quiz

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (currentQuestion) {
      const shuffledOptions = generateOptions(currentQuestion);
      setOptions(shuffledOptions);
    }
  }, [currentQuestion, generateOptions]);

  return (
    <Container maxWidth="80%">
      <Paper className="quiz-card">
        <Typography variant="h5" paddingBottom={"1rem"}>
          German Vocabulary Quiz
        </Typography>
        <Typography variant="h6">
          Translate: <strong>{currentQuestion?.german}</strong>
        </Typography>
        <Stack direction="column" spacing={2} sx={{ marginTop: "1rem" }}>
          {options.map((option) => (
            <Button
              key={option}
              variant="contained"
              onClick={() => checkAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </Stack>
        {result && (
          <Typography variant="h6" sx={{ marginTop: "1rem" }}>
            {result}
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={nextQuestion}
          sx={{ marginTop: "1rem" }}
        >
          Next Question
        </Button>
      </Paper>
    </Container>
  );
};

export default GermanVocab;
