import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";
import {
  Typography,
  Button,
  Alert,
  CircularProgress,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Recycling } from "@mui/icons-material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import {
  fetchDraftRequestsStart,
  fetchDraftRequestsSuccess,
  fetchDraftRequestsFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
} from "../../redux/reducers/OrderCreate/index";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
  marginTop: "16px",
};
const center = { lat: 0, lng: 0 };

const Cart = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDvBk1nXO5XZP_N9fw-S9_EMTKFy1VA0Fw",
    libraries: ["places"],
  });

  const [location, setLocation] = useState("");
  const [autoLocation, setAutoLocation] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { token, isLoggedIn } = useSelector((state) => state.authReducer);
  const { draftRequests = [], loading, error, success } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    dispatch(fetchDraftRequestsStart());
    axios
      .get("http://localhost:5000/user/getRequestByuserId", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchDraftRequestsSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(fetchDraftRequestsFailure(err.message));
      });
  }, [dispatch, token, isLoggedIn]);

  useEffect(() => {
    if (draftRequests.length === 0) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(latitude, longitude, true);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    }
  }, [draftRequests]);

  const updateLocation = useCallback(async (lat, lng, isAuto = false) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDvBk1nXO5XZP_N9fw-S9_EMTKFy1VA0Fw`
      );
      if (response.data.results[0]) {
        setLocation(response.data.results[0].formatted_address);
        setAutoLocation(isAuto);
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  }, []);

  const debouncedGeocode = useCallback(
    debounce(async (address) => {
      if (!address.trim()) return;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyDvBk1nXO5XZP_N9fw-S9_EMTKFy1VA0Fw`
        );
        if (response.data.results[0]) {
          const { lat, lng } = response.data.results[0].geometry.location;
          updateLocation(lat, lng, false);
        }
      } catch (err) {
        console.error("Error geocoding address:", err);
      }
    }, 500),
    []
  );

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    debouncedGeocode(e.target.value);
  };

  const handleMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      updateLocation(lat, lng, false);
    },
    [updateLocation]
  );

  const handleCreateOrder = () => {
    if (!location.trim() || !latitude || !longitude) {
      dispatch(createOrderFailure("Please select a valid pickup location"));
      return;
    }

    dispatch(createOrderStart());
    axios
      .post(
        "http://localhost:5000/user/createOrders",
        { location, latitude, longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        dispatch(createOrderSuccess(response.data.order));
        setOrderSuccess(true);
        setTimeout(() => setOrderSuccess(false), 4000);
      })
      .catch(() => {
        dispatch(createOrderFailure("Failed to create order"));
      });
  };

  const totalPredictedPrice = draftRequests.reduce(
    (sum, request) => sum + Number(request.predicted_price),
    0
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: { xs: "column", md: "row" }, bgcolor: "#f5f5f5" }}>
     <Box sx={{ flex: 1, p: 4, bgcolor: "#ffffff", borderRight: { md: "1px solid #e0e0e0" } }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, display: "flex", alignItems: "center" }}>
          <Recycling sx={{ mr: 2, color: "#4caf50", fontSize: "2.5rem" }} />
          Your Recycling Cart
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, fontSize: "1.2rem" }}>
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {orderSuccess && (
          <Alert severity="success" sx={{ mb: 3, fontSize: "1.2rem" }}>
            <strong>Success:</strong> Order created successfully!
          </Alert>
        )}

        {draftRequests.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
            Your recycling cart is empty
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {draftRequests.map((request, index) => (
              <Grid item xs={12} key={request.id}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                  <Typography variant="h5" gutterBottom sx={{ fontSize: "1.8rem" }}>
                    Recycling Request #{index + 1}
                  </Typography>
                  {request.category_name && (
                    <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
                      Material: {request.category_name}
                    </Typography>
                  )}
                  {request.description && (
                    <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
                      Details: {request.description}
                    </Typography>
                  )}
                  {request.weight && (
                    <Typography variant="body1" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
                      Weight: {request.weight} kg
                    </Typography>
                  )}
                  <Typography variant="h5" color="primary" sx={{ mt: 2, color: "#4caf50", fontSize: "1.8rem" }}>
                    ${Number(request.predicted_price).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ width: { xs: "100%", md: "400px" }, p: 4, bgcolor: "#ffffff", boxShadow: { xs: "0 -2px 8px rgba(0, 0, 0, 0.1)", md: "none" } }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontSize: "2rem" }}>
          Payment & Location
        </Typography>

        <Autocomplete
          apiKey="AIzaSyDvBk1nXO5XZP_N9fw-S9_EMTKFy1VA0Fw"
          onPlaceSelected={(place) => {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();
            if (lat && lng) {
              updateLocation(lat, lng, false);
              setLocation(place.formatted_address);
            }
          }}
          options={{
            types: ["address"],
            componentRestrictions: { country: "us" },
            fields: ["formatted_address", "geometry"],
          }}
          onChange={handleLocationChange}
          value={location}
          style={{
            width: "100%",
            fontSize: "1.4rem",
            padding: "16.5px 14px",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            marginBottom: "24px",
          }}
          placeholder="Enter pickup location"
        />

        {autoLocation && (
          <Typography variant="body2" sx={{ mb: 2, color: "green" }}>
            Initial location set from your current position
          </Typography>
        )}

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        ) : (
          <Box sx={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 4, mb: 2, fontSize: "2rem" }}>
          Order Summary
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ fontSize: "1.6rem" }}>
            Subtotal: ${totalPredictedPrice.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
            Free Delivery
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCreateOrder}
          disabled={loading || draftRequests.length === 0}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#388e3c" },
            fontSize: "1.6rem",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Schedule Pickup"}
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
            ◦ Pickup within 24 hours
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
            ◦ Fast processing
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
            ◦ Price estimates may vary
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;