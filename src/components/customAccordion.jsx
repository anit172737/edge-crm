import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = ({
  index,
  title,
  questions,
  isEditable,
  onAnswerChange,
  editableIndex,
  setEditableIndex,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [answers, setAnswers] = useState(
    questions.reduce((acc, _, i) => ({ ...acc, [i]: "No" }), {})
  );
  const [showSaveCancel, setShowSaveCancel] = useState(false);

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(updatedAnswers);
    setShowSaveCancel(true);
    onAnswerChange(index, questionIndex, answer, updatedAnswers);
  };

  const handleSave = () => {
    setShowSaveCancel(false);
  };

  const handleCancel = () => {
    setAnswers(questions.reduce((acc, _, i) => ({ ...acc, [i]: "No" }), {}));
    setShowSaveCancel(false);
    const filtered = editableIndex.filter((val) => val <= index);
    setEditableIndex(filtered);
  };

  useMemo(() => {
    if (isEditable) {
      setExpanded(true);
    }
  }, [isEditable]);

  useMemo(() => {
    if (!isEditable) {
      setExpanded(false);
      setAnswers(questions.reduce((acc, _, i) => ({ ...acc, [i]: "No" }), {}));
    }
  }, [isEditable]);

  return (
    <Accordion
      className="accordion"
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        className={expanded ? "summary summary-expand" : "summary"}
        expandIcon={<ExpandMoreIcon className="expand-icon" />}
      >
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails
        className={expanded ? "detail detail-expand" : "detail"}
      >
        <div
          style={{
            opacity: isEditable ? 1 : 0.6,
            pointerEvents: isEditable ? "auto" : "none",
          }}
        >
          {questions.map((question, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <Typography>{question}</Typography>
              <RadioGroup
                row
                value={answers[i]}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              >
                <FormControlLabel
                  className="formLabel"
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  className="formLabel"
                  value="No"
                  control={<Radio />}
                  label="No"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  className="formLabel"
                  value="NA"
                  control={<Radio />}
                  label="NA"
                  disabled={!isEditable}
                />
              </RadioGroup>
            </div>
          ))}
        </div>
        {showSaveCancel && isEditable && (
          <div style={{ marginTop: "10px", paddingBottom: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
