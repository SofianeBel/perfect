import React, { useState, useEffect, useCallback } from "react";
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
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Alert,
} from "@mui/material";
import "./FuelPrice.css";

const FuelPrice = () => {
    // Déclaration des états
    const [fuelType, setFuelType] = useState("all");
    const [jsonData, setJsonData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestStations, setNearestStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
    const [sortByDistanceAsc, setSortByDistanceAsc] = useState(true);
    const [litre, setLitre] = useState(0);
    const [isJsonData, setIsJsonData] = useState(false);

    // Effect hook pour récupérer les données des prix des carburants
    useEffect(() => {
        if (isJsonData === false) {
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
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
            setIsJsonData(true);
        } else {
            setIsJsonData(true);
        }
    }, [userLocation,isJsonData]);

    // Fonction pour réinitialiser les états de triage
    const resetSorting = () => {
        setSortByPriceAsc(true);
        setSortByDistanceAsc(true);
    };

    // Fonction pour obtenir le type de carburant en fonction de la valeur sélectionnée
    const getFuelType = useCallback(() => {
        const fuelTypes = {
            1: "SP95",
            2: "SP98",
            3: "Gazole",
            4: "E85",
            5: "GPLc",
        };
        return fuelTypes[fuelType];
    }, [fuelType]);

    // Fonction pour trier par prix
    const handleSortByPrice = () => {
        setSortByPriceAsc(!sortByPriceAsc);
    };

    // Fonction pour trier par distance
    const handleSortByDistance = () => {
        setSortByDistanceAsc(!sortByDistanceAsc);
    };

    // calcule du prix le plus bas
    const minPrice = nearestStations.reduce((acc, item) => {
        if (acc === null || item.prix < acc) {
            return item.prix;
        } else {
            return acc;
        }
    }, null);

    // calcule du prix le plus haut
    const maxPrice = nearestStations.reduce((acc, item) => {
        if (acc === null || item.prix > acc) {
            return item.prix;
        } else {
            return acc;
        }
    }, null);

    // si le prix est le plus bas, alors la couleur de la ligne du tableau est verte
    // si le prix est le plus haut, alors la couleur de la ligne du tableau est rouge
    // sinon la couleur de la ligne du tableau est blanche
    const getColor = useCallback(
        (item) => {
            if (item.prix === minPrice) {
                return "green";
            } else if (item.prix === maxPrice) {
                return "red";
            } else {
                return "white";
            }
        },
        [minPrice, maxPrice]
    );

    // Fonction pour changer le nombre de litre
    const handleLitreChange = (event) => {
        const value = event.target.value;
        if (value >= 0) {
            setLitre(value);
            getTotalPrice(selectedStation);
        }
    };

    // calcule du prix total en fonction du prix du carburant et du litre de carburant sélectionné par l'utilisateur
    const getTotalPrice = useCallback((item) => {
        if (item) {
            const prix = item.prix;
            const total = (litre * prix).toFixed(2);
            return total;
        }
        return 0;
    }, [litre]);

    console.log(getTotalPrice(selectedStation));

    // Effect hook pour calculer les stations les plus proches en fonction du carburant sélectionné et de la géolocalisation de l'utilisateur
    useEffect(() => {
        const fuelType = getFuelType();
        if (userLocation) {
            const calculateDistance = (lat1, lon1, lat2, lon2) => {
                const R = 6371; // Rayon de la Terre en km
                const dLat = deg2rad(lat2 - lat1);
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
                    const lat = parseFloat(item.geom.lat); // Convertir en nombre
                    const lon = parseFloat(item.geom.lon); // Convertir en nombre
                    const distance = calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        lat,
                        lon
                    );
                    return {
                        id: item.id,
                        adresse: item.adresse,
                        ville: item.ville, // Ajout de la ville
                        distance: distance,
                        prix: prix,
                        couleur: getColor({ prix }),
                    };
                })
                .sort((a, b) => {
                    if (sortByDistanceAsc) {
                        return a.distance - b.distance;
                    } else {
                        return b.distance - a.distance;
                    }
                })
                .slice(0, 20); // Garder les 20 stations les plus proches

            setNearestStations(nearestStations);
        }
    }, [userLocation, jsonData, sortByDistanceAsc, getFuelType, getColor]);

    // Fonction pour sélectionner une station
    const handleSelectStation = (station) => {
        setSelectedStation(station);
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
                            onChange={(event) => setFuelType(event.target.value)}
                        >
                            <MenuItem value="">Sélectionnez un carburant</MenuItem>
                            <MenuItem value="1">SP95</MenuItem>
                            <MenuItem value="2">SP98</MenuItem>
                            <MenuItem value="3">Gazole</MenuItem>
                            <MenuItem value="4">E85</MenuItem>
                            <MenuItem value="5">GPLc</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        id="litre-input"
                        label="Nombre de litre"
                        value={litre}
                        onChange={handleLitreChange}
                        type="number"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body1" align="center">
                        Prix total : {getTotalPrice(selectedStation)} €
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={resetSorting}>
                        Réinitialiser
                    </Button>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Adresse</TableCell>
                                    <TableCell>Ville</TableCell>
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
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nearestStations.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        style={{ backgroundColor: item.couleur }}
                                    >
                                        <TableCell>{item.adresse}</TableCell>
                                        <TableCell>{item.ville}</TableCell>
                                        <TableCell>{getFuelType()}</TableCell>
                                        <TableCell>{item.prix}</TableCell>
                                        <TableCell>{item.distance.toFixed(2)} km</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleSelectStation(item)}
                                            >
                                                Sélectionner
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {selectedStation && (
                    <Grid item>
                        <Typography variant="body1" align="center">
                            Prix de la station sélectionnée : {selectedStation.prix}
                        </Typography>
                        <Alert severity="success">{`Vous avez sélectionné la station ${selectedStation.adresse}`}</Alert>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default FuelPrice;
