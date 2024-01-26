// eslint-disable-next-line react/prop-types
export default function LoadingSpinner({ loading }) {
  if (loading)
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );

  return;
}
