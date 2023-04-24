import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPages from "./components/ErrorPages";
import './index.css'
import App from "./App";
import AddProudct from "./components/AddProduct";
import AddClient from "./components/AddClient";
import Home from "./components/Home";
import Purchasehistory  from "./components/Purchasehistory"
import AddBox  from "./components/AddBox";
import Profit from"./components/Profit"
import LeaderBoard from "./components/LeaderBoard";


 export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPages />,
    children:[
      {
        path: "",
        element: <Home/>,
        errorElement: <ErrorPages />,
      },
      {
        path: "/addbox",
        element: <AddBox/>,
        errorElement: <ErrorPages/>,
      },
      {
        path: "/addproduct",
        element: <AddProudct/>,
        errorElement: <ErrorPages />,
      },
      {
        path: "/addclient",
        element: <AddClient/>,
        errorElement: <ErrorPages />,
      },
      {
        path: "/purchasehistory",
        element: <Purchasehistory/>,
        errorElement: <ErrorPages/>,
      },  {
        path: "/Profit",
        element: <Profit/>,
        errorElement: <ErrorPages/>,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard/>,
        errorElement: <ErrorPages/>,
      },
    ],
  },
]);