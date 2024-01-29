import { WEBSITE_URL } from "../config/settings";

/* eslint-disable react/prop-types */
export default function PersonalityScreen({ setFinished, setData, data }) {
  const handleSetFinished = () => {
    setFinished(false);
    setData({});
  };

  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-12 col-md-6 p-0">
          <img
            src="https://i.ibb.co/w4tTNCw/finish.jpg"
            alt={data.personality.result.name}
            className="tune-img"
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column min-vh-100 bg-dark">
          <div className="col-12 m-auto p-4">
            <h4 className="display-6 text-white">
              Your personality meets to &quot;{data.personality.result.name}
              &quot;
            </h4>
            <div className="mt-4">
              <p className="text-white lead fs-4">
                {data.personality.result.about}
              </p>
            </div>
            <div className="mt-5 d-flex gap-1 flex-wrap">
              <a
                rel="noreferrer"
                href={`${WEBSITE_URL}/${data.id}`}
                target="_blank"
                type="button"
                className="btn btn-warning rounded-0 px-4 py-3 fs-5"
              >
                View suggestions 🎉
              </a>
              <button
                onClick={handleSetFinished}
                type="button"
                className="btn btn-dark rounded-0 px-4 py-3 fs-5"
              >
                ⬅️ Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
