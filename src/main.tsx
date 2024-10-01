
import { createRoot } from 'react-dom/client'
import './index.css'
import mainRouter from "./router/mainRouter.tsx";
import {RouterProvider} from "react-router-dom";

createRoot(document.getElementById('root')!).render(

    <RouterProvider router={mainRouter}></RouterProvider>

)
