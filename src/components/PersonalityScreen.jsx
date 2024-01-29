import { WEBSITE_URL } from "../config/settings";

/* eslint-disable react/prop-types */
export default function PersonalityScreen({ setFinished, data }) {
  const handleSetFinished = () => setFinished(false);

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
              <div className="text-white mt-5">
                <p className="mb-0">
                  <strong>Personality:</strong> {data.personality.keyword}
                </p>
                <p className="mb-0">
                  <strong>Food:</strong> {data.food}
                </p>
                <p className="mb-0">
                  <strong>Accommodation:</strong> {data.accommodation}
                </p>
                <p className="mb-0">
                  <strong>Budget:</strong> {data.budget}
                </p>
                <p className="mb-0">
                  <strong>Social:</strong> {data.social}
                </p>
                <p className="mb-0">
                  <strong>Duration:</strong> {data.duration}
                </p>
                <p className="mb-0">
                  <strong>Season:</strong> {data.season}
                </p>
              </div>
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
