import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {Navigate} from "react-router-dom";

const Loading = <LoadingPage/>
const ReservationIndex = lazy(() => import("../pages/reservation/ReservationIndexPage.tsx"))
const ReservationList = lazy(() => import("../pages/reservation/ReservationListPage.tsx"))

const reservationRouter = {
    path:'/reservation',
    element: <Suspense fallback={Loading}><ReservationIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ReservationList/></Suspense>,
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        }
    ]
}

export default reservationRouter