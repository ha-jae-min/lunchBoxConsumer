import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import kioskRouter from "./kioskRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage"))
const KioskDetail = lazy(() => import("../pages/DetailPage"))
const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense>
    },
    {
        path: "/kiosk/detail/:pno",
        element: <Suspense fallback={Loading}><KioskDetail/></Suspense>,
    },
    kioskRouter

])

export default mainRouter