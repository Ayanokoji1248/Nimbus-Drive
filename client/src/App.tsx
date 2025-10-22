import { Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoutes from "./components/ProtectedRoutes"
import HomePage from "./pages/HomePage"
import SharePage from "./pages/SharePage"
import MainLayout from "./layouts/MainLayout"
import SearchPage from "./pages/SearchPage"

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/share-with-me" element={<SharePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App