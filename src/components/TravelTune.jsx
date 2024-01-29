import { useEffect, useState } from "react";
import { questionsData, suggestions } from "../services/ApiService";
import LoadingSpinner from "./LoadingSpinner";
import WelcomeScreen from "./WelcomeScreen";
import {
  calculateAccommodation,
  calculateBudget,
  calculateFood,
  calculatePersonality,
  calculateSeason,
  calculateSocial,
  calculateDuration,
} from "../helpers/calculations";
import { personalitiesData } from "../services/ApiService";
import PersonalityScreen from "./PersonalityScreen";

export default function TravelTune() {
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [personalities, setPersonalities] = useState([]);
  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [suggestionsId, setSuggestionsId] = useState(null);
  const lastIndex = questions.length - 1;
  const lessThanLastIndex = index < lastIndex;

  useEffect(() => {
    if (started) {
      getQuestions();
      getPersonalities();
    }

    return () => {
      setQuestions([]);
      setPersonalities([]);
    };
  }, [started]);

  const getPersonalities = async () => {
    try {
      const res = await personalitiesData();
      const data = res.data.data;
      setPersonalities(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getQuestions = async () => {
    setLoading(true);
    try {
      const res = await questionsData();
      const data = res.data.data;
      setQuestions(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (payload) => {
    setLoading(true);
    try {
      const res = await suggestions(payload);
      const data = res.data.data;
      setSuggestionsId(data.id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    let num = index;
    if (lessThanLastIndex) setIndex((num += 1));
  };

  const addNewAnswer = (data) => {
    const answers = [...answered, data];
    setAnswered(answers);
    nextQuestion();
    if (index === lastIndex) submit(answers);
  };

  const submit = (answers) => {
    const calculations = {
      personality: calculatePersonality(personalities, answers),
      food: calculateFood(answers),
      accommodation: calculateAccommodation(answers),
      budget: calculateBudget(answers),
      social: calculateSocial(answers),
      duration: calculateDuration(answers),
      season: calculateSeason(answers),
    };

    setData({
      id: suggestionsId,
      personality: calculations.personality,
      food: calculations.food,
      accommodation: calculations.accommodation,
      budget: calculations.budget,
      social: calculations.social,
      duration: calculations.duration,
      season: calculations.season,
    });

    setAnswered([]);
    setIndex(0);
    setStarted(false);
    setFinished(true);
  };

  if (finished)
    return (
      <PersonalityScreen
        setFinished={setFinished}
        setSuggestionsId={setSuggestionsId}
        data={data}
      />
    );

  if (!started)
    return (
      <>
        <LoadingSpinner loading={loading} />
        <WelcomeScreen setStarted={setStarted} setLoading={setLoading} />
      </>
    );

  if (started)
    return (
      <div className="container-fluid bg-dark">
        <LoadingSpinner loading={loading} />
        {questions.length ? (
          <div key={index} className="row">
            <div className="col-12 col-md-6 p-0">
              <img
                src={questions[index].image}
                alt={questions[index].question}
                className="tune-img"
              />
            </div>
            <div className="col-12 col-md-6 d-flex flex-column min-vh-100 bg-dark">
              <div className="col-12 m-auto p-4">
                <h4 className="display-6 text-white">
                  ❓ {questions[index].question}
                </h4>
                <div className="mt-5">
                  {questions[index].answers.map((answer, i) => (
                    <div
                      key={i}
                      className="cursor-pointer my-2 bg-light p-4 answer-container"
                      onClick={() =>
                        addNewAnswer({
                          question: questions[index].question,
                          type: questions[index].type,
                          answer: answer.answer,
                          keywords: answer.keywords,
                        })
                      }
                    >
                      <p className="mb-0 fs-5">{answer.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <span className="badge bg-light text-dark rounded-pill px-3 py-2 fs-6 mt-3">
                    {`${index + 1} / ${questions.length}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
}
