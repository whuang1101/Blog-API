import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./homepage";
import Login from "./login";


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: < Login/>,
    },
    {
      path:"/protected",
      element: (localStorage.getItem("token") ? <Login/> : <Homepage/>)
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;