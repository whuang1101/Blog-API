import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./homepage";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;