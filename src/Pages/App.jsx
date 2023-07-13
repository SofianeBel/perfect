import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./About";
import PrayerTimesTable from "../components/PrayerTimes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/PrayersTime" element={<PrayerTimesTable />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
