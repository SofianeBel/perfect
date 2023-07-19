import React, { useEffect, useState } from "react";
import "./PrayerTimesStyle.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import moment from "moment-timezone";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import frLocale from "date-fns/locale/fr";
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
      <h1 className="title">Prayer Times</h1>
      <p className="description">
        Les horaires des prières sont calculés en fonction de votre position
        géographique.
      </p>
      <p className="description">
        Pour cela, vous devez autoriser la géolocalisation dans votre navigateur
        et sélectionner une date.
      </p>
      <p className="description">
        Les horaires des prières sont calculés en fonction de la méthode de
        calcul de la Ligue Islamique Mondiale.
      </p>
      <p className="description">
        Pour plus d'informations, veuillez consulter le site{" "}
        <a
          className="link"
          href="https://aladhan.com/prayer-times-api"
          target="_blank"
          rel="noreferrer"
        >
          AlAdhan.com
        </a>
      </p>

      <Box className="box">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <DatePicker
            className="date-picker"
            label="Sélectionner une date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                className="date-picker"
                variant="standard"
              />
            )}
          />
        </LocalizationProvider>
        {prayerTimes ? (
          <TableContainer className="table-container">
            <Table className="table">
              <TableHead className="table-head">
                <TableRow className="table-row">
                  <TableCell className="table-cell">Prière</TableCell>
                  <TableCell className="table-cell" align="right">
                    Heure
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <TableRow className="table-row" key={prayer}>
                    <TableCell
                      className="table-cell"
                      component="th"
                      scope="row"
                    >
                      {prayer}
                    </TableCell>
                    <TableCell className="table-cell" align="right">
                      {time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p className="loading-message">
            Chargement des horaires des prières...
          </p>
        )}
      </Box>
    </>
  );
};

export default PrayerTimesTable;
