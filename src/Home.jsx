import { Link, Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Home() {
    return <div className="container">
        <Header/>



        <hr />
        <Outlet ></Outlet>
    </div>
}