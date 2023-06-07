import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import { Home } from "./Home";
import { Login } from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "login",
        element: <Login />
      },
    ]
  },

]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
