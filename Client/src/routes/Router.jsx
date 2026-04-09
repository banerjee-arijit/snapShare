import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Upload } from "../components/pages/Upload";
import { Copy } from "../components/pages/Copy";
import { MyContent } from "../components/pages/MyContent";
import { GeneratePassword } from "../components/pages/GeneratePassword";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/upload", element: <Upload /> },
  { path: "/copy", element: <Copy /> },
  { path: "/my-content", element: <MyContent /> },
  { path: "/genarate_password", element: <GeneratePassword /> },
]);

export default Router;
