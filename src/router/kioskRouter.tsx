
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {Navigate} from "react-router-dom";


const Loading = <LoadingPage/>
const KioskIndex = lazy(() => import("../pages/kiosk/IndexPage"))
const KioskList = lazy(() => import("../pages/kiosk/ListPage"))
const KioskCart = lazy(() => import("../pages/kiosk/CartPage"))

const kioskRouter = {
    path:'/kiosk',
    element: <Suspense fallback={Loading}><KioskIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><KioskList/></Suspense>,
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        {
            path: "cart",
            element: <Suspense fallback={Loading}><KioskCart/></Suspense>,
        }
    ]

}

export default kioskRouter