import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Recycling } from "@mui/icons-material";
import {
  fetchDraftRequestsStart,
  fetchDraftRequestsSuccess,
  fetchDraftRequestsFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
} from "../../redux/reducers/OrderCreate/index";

const Cart = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [autoLocation, setAutoLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { token, isLoggedIn } = useSelector((state) => state.authReducer);
  const { draftRequests = [], loading, error, success } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    dispatch(fetchDraftRequestsStart());
    axios
      .get("http://localhost:5000/user/getRequestByuserId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          setLatitude(latitude);
          setLongitude(longitude);

          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDvBk1nXO5XZP_N9fw-S9_EMTKFy1VA0Fw`
            )
            .then((response) => {
              if (response.data.results[0]) {
                setLocation(response.data.results[0].formatted_address);
                setAutoLocation(true);
              }
            })
            .catch((err) => {
              console.error("Error fetching address from coordinates:", err);
            });
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [draftRequests]);

  const handleCreateOrder = () => {
    if (!location.trim()) {
      dispatch(createOrderFailure("Please enter a pickup location"));
      return;
    }

    if (!latitude || !longitude) {
      dispatch(createOrderFailure("Location data (latitude/longitude) is missing"));
      return;
    }

    dispatch(createOrderStart());
    axios
      .post(
        "http://localhost:5000/user/createOrders",
        { location, latitude, longitude },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(createOrderSuccess(response.data.order));
        setLocation("");
        setLatitude(null);
        setLongitude(null);
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 4,
          bgcolor: "#ffffff",
          borderRight: { md: "1px solid #e0e0e0" },
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 4, display: "flex", alignItems: "center" }}
        >
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
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
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

                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ mt: 2, color: "#4caf50", fontSize: "1.8rem" }}
                  >
                    ${Number(request.predicted_price).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "400px" },
          p: 4,
          bgcolor: "#ffffff",
          boxShadow: { xs: "0 -2px 8px rgba(0, 0, 0, 0.1)", md: "none" },
          position: { xs: "sticky", md: "static" },
          bottom: 0,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontSize: "2rem" }}>
          Payment & Location
        </Typography>

        <TextField
          fullWidth
          label="Enter pickup location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          variant="outlined"
          sx={{ mb: 3, fontSize: "1.4rem" }}
          InputProps={{ style: { fontSize: "1.4rem" } }}
          InputLabelProps={{ style: { fontSize: "1.4rem" } }}
        />

        {autoLocation && (
          <Typography variant="body2" sx={{ mb: 2, color: "green" }}>
            Location autofilled from your current position
          </Typography>
        )}

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, fontSize: "2rem" }}>
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
          ◦ Pickup will be scheduled within 24 hours.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
          ◦ We will process your order as fast as possible.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "1.4rem" }}>
          ◦ The price given is an estimate and subject to change.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
