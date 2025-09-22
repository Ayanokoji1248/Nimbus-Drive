import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    _id: string,
    username: string,
    email: string
}
interface userStoreState {
    user: User | null,
    setUser: (user: User | null) => void,
    clearUser: () => void
}

const useUserStore = create<userStoreState>()(persist((set) => ({
    user: null,
    setUser: (user) => {
        if (user) {
            const { _id, username, email } = user;
            set({ user: { _id, email, username } })
        } else {
            set({ user: null })
        }
    },
    clearUser: () => { set({ user: null }) }
}), {
    name: "user-storage"
}))

export default useUserStore;