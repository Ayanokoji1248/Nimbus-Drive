import axios from "axios";
import useUserStore from "../store/userStore"
import { BACKEND_URL } from "../lib";

const DashboardPage = () => {

    const { user, clearUser } = useUserStore();

    const logout = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
                withCredentials: true
            })
            clearUser()
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-950 text-white">
            <h1>
                {user?.username}
            </h1>

            <button onClick={logout} className="bg-red-500 p-2 px-5 text-sm font-medium rounded-md">Logout</button>

        </div>
    )
}

export default DashboardPage