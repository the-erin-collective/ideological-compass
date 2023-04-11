import { useState, useEffect } from 'react';
import axios from 'axios';

function Survey() { 
  const [surveyData, setSurveyData] = useState<{ id: string, rootQuestions: { text: string, answers: { id: string, text: string }[] }[] } | null>(null);
  const [userResponses, setUserResponses] = useState<string[]>([]);

  useEffect(() => {
    // Fetch survey data from backend or API
    axios.get('http://localhost:3030/survey').then(response => { 
      const surveyData = response.data.data.map((survey: { id: string, rootQuestions: any; }) => ({
         ...survey,
         rootQuestions: JSON.parse(survey.rootQuestions)
     }));

     let survey = surveyData[0];
     console.log(survey);

      setSurveyData(survey);
    });
  }, []);

  function handleAnswerSelection(questionIndex: number, answerId: string) {
    // Update user responses state
    const updatedResponses = [...userResponses];
    updatedResponses[questionIndex] = answerId;
    setUserResponses(updatedResponses);
  }

  function handleSubmit() {
    // Submit user responses to backend or API
    axios.post('/api/survey/responses', { responses: userResponses });
  }

  if (!surveyData) {
    return <div>Loading survey...</div>;
  }

  return (
    <div>
      <h1>ideological compass</h1>
      {surveyData.rootQuestions.map((question, index) => (
        <div key={index}>
          <h2>{question.text}</h2>
          <ul>
            {/* {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={answerIndex}
                    checked={userResponses[index] === answer.id}
                    onChange={() => handleAnswerSelection(index,  answer.id)}
                  />
                  {answer.text}
                </label>
              </li>
            ))} */}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Survey;