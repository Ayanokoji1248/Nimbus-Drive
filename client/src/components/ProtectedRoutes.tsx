import { Outlet } from "react-router-dom";
import useUserStore from "../store/userStore"

const ProtectedRoutes = () => {

    const { user } = useUserStore();

    if (user) return <Outlet />

    else return 
    
    
}

export default ProtectedRoutes