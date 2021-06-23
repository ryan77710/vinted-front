import { SpinnerRoundFilled } from "spinners-react";

const Loading = () => {
  return (
    <div className="loading">
      <p className="tracking-in-expand">
        <SpinnerRoundFilled
          size={64}
          thickness={107}
          speed={100}
          color="#ffff"
        />
        chargement...
      </p>
    </div>
  );
};

export default Loading;
