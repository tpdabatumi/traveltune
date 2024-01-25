import { useEffect, useState } from "react";
import { questionsData } from "../services/ApiService";
import "../assets/style.css";

export default function TravelTune() {
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
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

  const nextQuestion = () => {
    let num = index;
    if (lessThanLastIndex) setIndex((num += 1));
  };

  const addNewAnswer = (data) => {
    setAnswered([...answered, data]);
    nextQuestion();
    if (index === lastIndex) submit();
  };

  const submit = () => {
    // eslint-disable-next-line no-undef
    Swal.fire({
      title: "Questionnaire finished!",
      text: "Thanks for answering the questions. Now we got your personality: %PERSONALITY%",
      icon: "success",
      showCloseButton: true,
      showConfirmButton: false,
    });
    setAnswered([]);
    setIndex(0);
  };

  console.log(answered);

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
          <div className="col-12 col-md-6 d-flex flex-column min-vh-100 bg-dark">
            <div className="col-12 m-auto p-4">
              <h4 className="display-6 text-white">
                {questions[index].question}
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
