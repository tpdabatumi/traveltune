/* eslint-disable react/prop-types */
export default function PersonalityScreen({ setFinished, data }) {
  const handleSetFinished = () => setFinished(false);

  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-12 col-md-6 p-0">
          <img
            src="https://i.ibb.co/0VjkQCw/finish.jpg"
            alt={data.personality.name}
            className="tune-img"
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column min-vh-100 bg-dark">
          <div className="col-12 m-auto p-4">
            <h4 className="display-6 text-white">
              Your personality meets to &quot;{data.personality.name}&quot;
            </h4>
            <div className="mt-5">
              <p className="text-white lead fs-4">{data.personality.about}</p>
              <div className="text-white">
                <p className="mb-0">
                  <strong>Food preference:</strong> {data.food}
                </p>
                <p className="mb-0">
                  <strong>Accommodation type:</strong> {data.accommodation}
                </p>
                <p className="mb-0">
                  <strong>Finances:</strong> {data.budget}
                </p>
                <p className="mb-0">
                  <strong>Group type:</strong> {data.social}
                </p>
                <p className="mb-0">
                  <strong>Stay duration:</strong> {data.duration}
                </p>
                <p className="mb-0">
                  <strong>Desired season:</strong> {data.season}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={handleSetFinished}
                type="button"
                className="btn btn-link text-white text-decoration-none rounded-0 p-0 fs-5"
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
