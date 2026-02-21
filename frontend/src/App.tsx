import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import MainPage from "./page/MainPage";
import Dashboard from "./page/Dashboard";
import HabitsPage from "./page/HabitsPage";
import AnalyticsPage from "./page/AnalyticsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="habitspage" element={<HabitsPage />} />
          <Route path="analyticspage" element={<AnalyticsPage />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
