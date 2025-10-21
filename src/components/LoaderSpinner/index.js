import { Circles as Loader } from "react-loader-spinner";

const LoaderSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh", // makes loader appear more centered
      width: "100%",
      backgroundColor: "#f9fafb" // light background for contrast
    }}
  >
    <Loader color="#00BFFF" height={100} width={100} />
  </div>
);

export default LoaderSpinner;
