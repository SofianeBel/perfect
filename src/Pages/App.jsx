import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./About";
import PrayerTimesTable from "../components/PrayerTimes";
import ToDoList from "../components/ToDoList";
import WheaterApp from "../components/WheaterApp";
import Twobro from "./TwoBro";
import FuelPrice from "./FuelPrice";
import Projects from "./projects";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/PrayersTime" element={<PrayerTimesTable />} />
        <Route path="/To_Do_List" element={<ToDoList />} />
        <Route path="/WheaterApp" element={<WheaterApp />} />
        <Route path="/TwoBro" element={<Twobro />} />
        <Route path="/FuelPrice" element={<FuelPrice />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
