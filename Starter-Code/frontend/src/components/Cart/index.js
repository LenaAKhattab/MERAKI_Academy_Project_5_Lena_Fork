import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
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

  const { token, isLoggedIn, userId } = useSelector((state) => state.authReducer); 
  const { draftRequests = [], loading, error, success } = useSelector(
    (state) => state.orders 
  );

  useEffect(() => {
    console.log("Token:", token);
    console.log("Is Logged In:", isLoggedIn, userId);

    if (!isLoggedIn) {
      console.log("User is not logged in!");
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

  const handleCreateOrder = () => {
    if (!location.trim()) {
      dispatch(createOrderFailure("Please enter a delivery location"));
      return;
    }

    dispatch(createOrderStart());
    axios
      .post(
        "http://localhost:5000/user/createOrders",
        { location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(createOrderSuccess(response.data.order));
        setLocation(""); 
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
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" color="primary" display="flex" alignItems="center">
        <ShoppingCart sx={{ mr: 2 }} /> Cart
      </Typography>

      <CardContent>
        {error && (
          <Alert severity="error">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success">
            <strong>Success:</strong> {success}
          </Alert>
        )}

        {draftRequests.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            Your cart is empty
          </Typography>
        ) : (
          <div>
            {draftRequests.map((request, index) => (
              <Card key={request.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Request #{index + 1}</Typography>

                  {request.category_name && (
                    <Typography variant="body2" color="textSecondary">
                      Category: {request.category_name}
                    </Typography>
                  )}

                  {request.description && (
                    <Typography variant="body2" color="textSecondary">
                      Description: {request.description}
                    </Typography>
                  )}

                  {request.weight && (
                    <Typography variant="body2" color="textSecondary">
                      Weight: {request.weight} kg
                    </Typography>
                  )}

                  {request.length && (
                    <Typography variant="body2" color="textSecondary">
                      Length: {request.length} cm
                    </Typography>
                  )}

                  {request.height && (
                    <Typography variant="body2" color="textSecondary">
                      Height: {request.height} cm
                    </Typography>
                  )}

                  {request.width && (
                    <Typography variant="body2" color="textSecondary">
                      Width: {request.width} cm
                    </Typography>
                  )}

                  <Typography variant="body1" align="right" color="primary">
                    ${Number(request.predicted_price).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Typography variant="h6" align="right" color="primary">
              Total: ${totalPredictedPrice.toFixed(2)}
            </Typography>

            <TextField
              fullWidth
              label="Enter delivery location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              margin="normal"
            />
          </div>
        )}
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCreateOrder}
          disabled={loading || draftRequests.length === 0}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Checkout"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cart;
