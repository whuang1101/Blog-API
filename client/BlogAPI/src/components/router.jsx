import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./homepage";
import Login from "./login";
import Edit from "./edit";



const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path:"/protected",
      element: (localStorage.getItem("token") ? <Edit/> : <Homepage/>)
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;