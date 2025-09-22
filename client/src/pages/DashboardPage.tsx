import useUserStore from "../store/userStore"

const DashboardPage = () => {

    const { user } = useUserStore();

    return (
        <div className="w-full h-screen bg-zinc-950 text-white">{user?.username}</div>
    )
}

export default DashboardPage