
import { createRoot } from 'react-dom/client'
import './index.css'
import mainRouter from "./router/mainRouter.tsx";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import projectStore from "./store.ts";

createRoot(document.getElementById('root')!).render(

    <Provider store={projectStore}>
        <RouterProvider router={mainRouter}></RouterProvider>
    </Provider>

)
