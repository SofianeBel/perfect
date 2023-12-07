import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
} from "@mui/material";

const FuelPrice = () => {
    // Déclaration des états
    const [fuelType, setFuelType] = useState("all");
    const [jsonData, setJsonData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestStations, setNearestStations] = useState([]);
    const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
    const [sortByDistanceAsc, setSortByDistanceAsc] = useState(true);

    // Effect hook pour récupérer les données des prix des carburants
    useEffect(() => {
        const getFuelPrice = async () => {
            try {
                const response = await axios.get(
                    `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/exports/json`
                );
                setJsonData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFuelPrice();

        // Effect hook pour récupérer la géolocalisation de l'utilisateur

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    getFuelPrice();
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        // intervalle
        const interval = setInterval(() => {
            getFuelPrice();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Effect hook pour calculer les stations les plus proches en fonction du carburant sélectionné et de la géolocalisation de l'utilisateur
    useEffect(() => {
        const fuelType = getFuelType();
        if (userLocation) {
            const calculateDistance = (lat1, lon1, lat2, lon2) => {
                const R = 6371; // Rayon de la Terre en km
                const dLat = deg2rad(lat2 - lat1); // Conversion degrés en radians
                const dLon = deg2rad(lon2 - lon1);
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) *
                        Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon / 2) *
                        Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c; // Distance en km
                return d;
            };

            const deg2rad = (deg) => {
                return deg * (Math.PI / 180);
            };

            const nearestStations = jsonData
                .filter(
                    (item) =>
                        item.latitude &&
                        item.longitude &&
                        item.carburants_disponibles &&
                        item.carburants_disponibles.includes(fuelType)
                )
                .map((item) => {
                    const prix = item[`${fuelType.toLowerCase()}_prix`] || "erreur";
                    const distance = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        item.latitude,
                        item.longitude
                    );
                    return {
                        id: item.id,
                        adresse: item.adresse,
                        distance: distance,
                        prix: prix,
                    };
                })
                .sort((a, b) => {
                    if (sortByPriceAsc) {
                        return a.prix - b.prix;
                    } else {
                        return b.prix - a.prix;
                    }
                })
                .sort((a, b) => {
                    if (a.prix === b.prix) {
                        if (sortByDistanceAsc) {
                            return a.distance - b.distance;
                        } else {
                            return b.distance - a.distance;
                        }
                    }
                    return 0;
                })
                .slice(0, 20);

            setNearestStations(nearestStations);
        }
    }, [userLocation, jsonData, sortByPriceAsc, sortByDistanceAsc]);
    const resetSorting = () => {
        setSortByPriceAsc(true);
        setSortByDistanceAsc(true);
    };

    // Utilisez la fonction resetSorting où vous souhaitez réinitialiser les états de triage



    // Fonction pour obtenir le type de carburant en fonction de la valeur sélectionnée
    const getFuelType = () => {
        const fuelTypes = {
            1: "SP95",
            2: "SP98",
            3: "Gazole",
            4: "E85",
            5: "GPLc",
        };
        return fuelTypes[fuelType];
    };

    // Fonction pour trier par prix
    const handleSortByPrice = () => {
        setSortByPriceAsc(!sortByPriceAsc);
    };

    // Fonction pour trier par distance
    const handleSortByDistance = () => {
        setSortByDistanceAsc(!sortByDistanceAsc);
    };

    return (
        <div>
            <Menu />
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h4" component="h1" align="center">
                        Choix du carburant
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" align="center">
                        Choisissez le carburant que vous souhaitez
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel id="fuel-type-label">Carburant</InputLabel>
                        <Select
                            labelId="fuel-type-label"
                            id="fuel-type-select"
                            value={fuelType}
                            onChange={(event) => setFuelType(event.target.value)}>
                            <MenuItem value="1">SP95</MenuItem>
                            <MenuItem value="2">SP98</MenuItem>
                            <MenuItem value="3">Gazole</MenuItem>
                            <MenuItem value="4">E85</MenuItem>
                            <MenuItem value="5">GPLc</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Adresse</TableCell>
                                    <TableCell>Type de carburant</TableCell>
                                    <TableCell>
                                        <Button onClick={handleSortByPrice}>
                                            Prix{" "}
                                            {sortByPriceAsc ? (
                                                <span>&#8593;</span>
                                            ) : (
                                                <span>&#8595;</span>
                                            )}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={handleSortByDistance}>
                                            Distance{" "}
                                            {sortByDistanceAsc ? (
                                                <span>&#8593;</span>
                                            ) : (
                                                <span>&#8595;</span>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nearestStations.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.adresse}</TableCell>
                                        <TableCell>{getFuelType()}</TableCell>
                                        <TableCell>{item.prix}</TableCell>
                                        <TableCell>{item.distance.toFixed(2)} km</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default FuelPrice;
