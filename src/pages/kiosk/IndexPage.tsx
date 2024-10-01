import BasicLayout from "../../layout/BasicLayout.tsx";
import {Outlet} from "react-router-dom";

function IndexPage() {
    return (
        <BasicLayout>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default IndexPage;