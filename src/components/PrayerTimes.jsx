import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "../components/Menu";

const PrayerTimesTable = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(
            new Error(
              "La géolocalisation n'est pas prise en charge par ce navigateur."
            )
          );
        }
      });
    };
    const fetchPrayerTimes = async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition();

        // Utiliser selectedDate au lieu de currentDate
        const prayerTimes = new PrayerTimes(
          new Coordinates(parseFloat(latitude), parseFloat(longitude)),
          selectedDate,
          CalculationMethod.MuslimWorldLeague()
        );

        const prayerTimesObject = {
          fajr: moment(prayerTimes.fajr).tz("Europe/Paris").format("HH:mm"),
          sunrise: moment(prayerTimes.sunrise)
            .tz("Europe/Paris")
            .format("HH:mm"),
          dhuhr: moment(prayerTimes.dhuhr).tz("Europe/Paris").format("HH:mm"),
          asr: moment(prayerTimes.asr).tz("Europe/Paris").format("HH:mm"),
          maghrib: moment(prayerTimes.maghrib)
            .tz("Europe/Paris")
            .format("HH:mm"),
          isha: moment(prayerTimes.isha).tz("Europe/Paris").format("HH:mm"),
        };

        setPrayerTimes(prayerTimesObject);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des horaires des prières :",
          error.message
        );
      }
    };

    fetchPrayerTimes();
  }, [selectedDate]);

  return (
    <>
      <Menu />
      <Box>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        {prayerTimes ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prière</TableCell>
                  <TableCell align="right">Heure</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <TableRow key={prayer}>
                    <TableCell component="th" scope="row">
                      {prayer}
                    </TableCell>
                    <TableCell align="right">{time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>Chargement des horaires des prières...</p>
        )}
      </Box>
    </>
  );
};

export default PrayerTimesTable;
