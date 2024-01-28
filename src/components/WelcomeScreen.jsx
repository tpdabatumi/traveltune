import { useEffect, useState } from "react";
import { welcomeData } from "../services/ApiService";

// eslint-disable-next-line react/prop-types
export default function WelcomeScreen({ setStarted, setLoading }) {
  const [welcome, setWelcome] = useState({});

  useEffect(() => {
    getWelcomeData();

    return () => setWelcome({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWelcomeData = async () => {
    setLoading(true);
    try {
      const res = await welcomeData();
      const data = res.data.data;
      setWelcome(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetStarted = () => setStarted(true);

  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-12 col-md-6 p-0">
          <img src={welcome.image} alt={welcome.title} className="tune-img" />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column min-vh-100 bg-dark">
          <div className="col-12 m-auto p-4">
            <h4 className="display-6 text-white">{welcome.title}</h4>
            <div className="mt-4">
              <p
                className="text-white lead"
                dangerouslySetInnerHTML={{ __html: welcome.text }}
              ></p>
            </div>
            <div className="text-center mt-5">
              <button
                onClick={handleSetStarted}
                type="button"
                className="btn btn-warning rounded-0 px-4 py-3 fs-5"
              >
                {welcome.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
