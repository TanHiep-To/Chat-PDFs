"use client";

import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { handleLogin } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const backgroundImageUrl =
  "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-16-1.jpg";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff4400",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: "#ffffff",
    },
    body1: {
      color: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
          "& label": {
            color: "#ffffff",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ffffff",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          fontWeight: "bold",
          backgroundColor: "#ff4400",
          "&:hover": {
            backgroundColor: "#ff5500",
          },
        },
      },
    },
  },
});

export default function Login({}: {}) {
  const router = useRouter();
  const { user, setCookie } = useContext(UserContext);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    handleLogin(router, setCookie, { email, password });
  };

  useEffect(() => {
    // get token
    if (!user.id) {
      return;
    }
    router.push("/dashboard");
  });
  return (
    <ThemeProvider theme={customTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            maxWidth: 500, // Increased width
            width: "100%", // Responsive width control
            p: 4,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 1.0)",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Ensures everything inside the box is centered
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: "100%", textAlign: "center" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="/forgot-password" variant="body2">
                  <span style={{ color: "white" }}>Forgot password?</span>{" "}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  <span style={{ color: "white" }}>
                    {"Don't have an account? Sign Up"}
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
