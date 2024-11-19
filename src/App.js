import React, { useState } from "react";
import "./App.css";
import CustomAccordion from "./components/customAccordion";

function App() {
  const [editableIndex, setEditableIndex] = useState([0]);
  const questionsPerAccordion = 5;

  const dummyQuestions = Array.from({ length: 4 }, (_, i) =>
    Array.from(
      { length: questionsPerAccordion },
      (_, j) => `Question ${j + 1} in Accordion ${i + 1}`
    )
  );

  const handleAnswerChange = (
    accordionIndex,
    questionIndex,
    answer,
    answers
  ) => {
    const updatedAnswers = { ...answers, [questionIndex]: answer };

    // Check if all answers in the current accordion are Yes or NA
    const allYesOrNA = Object.values(updatedAnswers).every(
      (value) => value === "Yes" || value === "NA"
    );

    if (allYesOrNA) {
      setEditableIndex([...editableIndex, Number(accordionIndex) + 1]);
    } else if (!allYesOrNA && editableIndex.includes(accordionIndex)) {
      // If any answer changes to No, reset subsequent accordions
      const filtered = editableIndex.filter((val) => val <= accordionIndex);
      setEditableIndex(filtered);
    }
  };

  return (
    <div className="App">
      {dummyQuestions.map((questions, index) => (
        <CustomAccordion
          key={index}
          index={index}
          title={`Accordion ${index + 1}`}
          questions={questions}
          isEditable={editableIndex.includes(index)}
          onAnswerChange={handleAnswerChange}
          editableIndex={editableIndex}
          setEditableIndex={setEditableIndex}
        />
      ))}
    </div>
  );
}

export default App;
