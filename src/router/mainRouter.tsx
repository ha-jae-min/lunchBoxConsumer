import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import kioskRouter from "./kioskRouter.tsx";
import reservationRouter from "./reservationRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage"))

const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense>
    },
    kioskRouter,
    reservationRouter

])

export default mainRouter