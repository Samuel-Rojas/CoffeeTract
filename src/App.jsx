import { useState } from "react";
import { coffeeDrinks, findBestMatch, filterDrinks } from "./coffeeDrinks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState({
    caffeine: null,
    bitterness: null,
    vibe: null,
    temp: null,
  });

  let questions = [
    {
      id: "vibe",
      text: "What's you vibe right now?",
      options: ["chill", "focused", "adventurous", "comfort"],
    },
    {
      id: "caffeine",
      text: "How much caffeine?",
      options: ["light", "medium", "strong"],
    },
    {
      id: "bitterness",
      text: "How bitter do you like it?",
      options: ["balanced", "mild", "bold"],
    },
    {
      id: "temp",
      text: "Hot or Iced, or both?",
      options: ["hot", "iced", "both"],
    },
  ];

  const handleAnswer = (selectedOption) => {
    const questionID = questions[currentQuestion].id;

    setUserAnswer({
      ...userAnswer,
      [questionID]: selectedOption,
    });
    console.log(userAnswer);
    console.log(currentQuestion);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const recommendation = findBestMatch(userAnswer);

  

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          {!showResult ? (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    className="w-full p-4 border rounded-lg hover:bg-blue-300"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2>{recommendation.name}</h2>
              <p>{recommendation.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
