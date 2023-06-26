import {
  createBrowserRouter,
} from "react-router-dom";
import './index.css';
import App from "./App";
import Home from "./components/Home";
import Profit from "./components/Profit";
import Clients from "./components/Clients";
import ErrorPages from "./components/ErrorPages";
import Products from "./components/Products";
import LeaderBoard from "./components/LeaderBoard";
import Purchasehistory from "./components/Purchasehistory";
import Boxes from "./components/Box";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPages />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorPages />,
      },
      {
        path: "/clients",
        element: <Clients />,
        errorElement: <ErrorPages />,
      },
      {
        path: "/products",
        element: <Products />,
        errorElement: <ErrorPages />,
      },
      {
        path: "/boxes",
        element: <Boxes />,
        errorElement: <ErrorPages />,
      },
      {
        path: "/history",
        element: <Purchasehistory />,
        errorElement: <ErrorPages />,
      }, {
        path: "/Profit",
        element: <Profit />,
        errorElement: <ErrorPages />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
        errorElement: <ErrorPages />,
      },
    ],
  },
]);