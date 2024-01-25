import { useEffect, useState } from "react";
import { questionsData } from "../services/ApiService";
import "../assets/style.css";

export default function TravelTune() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const lastIndex = questions.length - 1;
  const lessThanLastIndex = index < lastIndex;

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const res = await questionsData();
      const data = res.data.data;
      setQuestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const prevQuestion = () => {
    let num = index;
    if (num > 0) setIndex((num -= 1));
  };

  const nextQuestion = () => {
    let num = index;
    // TODO: Also check if any answer was selected
    if (lessThanLastIndex) setIndex((num += 1));
  };

  const submit = () => alert("Submitted");

  return (
    <div className="container-fluid">
      {questions.length ? (
        <div key={index} className="row">
          <div className="col-12 col-md-6 p-0">
            <img
              src={questions[index].image}
              alt={questions[index].question}
              className="tune-img"
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column min-vh-100">
            <div className="mx-auto mt-5 pt-5">
              <h4 className="display-6">
                <i className="fa-solid fa-circle-question me-2 text-primary"></i>
                {questions[index].question}
              </h4>
              <div className="mt-5">
                {questions[index].answers.map((answer, i) => (
                  <div key={i} className="form-check cursor-pointer my-2">
                    <input
                      className="form-check-input cursor-pointer p-2 me-2 mt-2"
                      type="radio"
                      name="answers"
                      id={`answer-${i}`}
                    />
                    <label
                      className="form-check-label cursor-pointer fs-5"
                      htmlFor={`answer-${i}`}
                    >
                      {answer.answer}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`mt-auto mb-3 px-2 gap-1 ${
                index > 0 ? "d-flex justify-content-between" : "text-end"
              }`}
            >
              {index > 0 ? (
                <button
                  onClick={prevQuestion}
                  className="btn btn-secondary rounded-pill shadow-sm px-4"
                >
                  <i className="fa-solid fa-angle-left me-1"></i>
                  Previous question
                </button>
              ) : null}
              {lessThanLastIndex ? (
                <button
                  onClick={nextQuestion}
                  className="btn btn-primary rounded-pill shadow-sm px-4"
                >
                  Next question
                  <i className="fa-solid fa-angle-right ms-1"></i>
                </button>
              ) : (
                <button
                  onClick={submit}
                  className="btn btn-success rounded-pill shadow-sm px-4"
                >
                  Get personal suggestions
                  <i className="fa-solid fa-circle-check ms-2"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
