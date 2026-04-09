import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/pages/LoadingScreen";
import { MainPage } from "./components/pages/MainPage";

const App = () => {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      {/* {loading ? <LoadingScreen /> : */}
      <MainPage />
      {/* } */}
    </div>
  );
};

export default App;
