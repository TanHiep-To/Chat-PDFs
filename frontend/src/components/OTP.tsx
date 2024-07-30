"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import { handleOTP, handleResendOTP } from "@/app/otp/actions";
import { useToast } from "./ui/use-toast";

const backgroundImageUrl =
  "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-16-1.jpg";
const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#29b6f6",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: `url(${backgroundImageUrl}) no-repeat center center fixed`,
      paper: "#ffffff22",
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
              borderColor: "#29b6f6",
            },
            "&:hover fieldset": {
              borderColor: "#ce93d8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
              boxShadow: "0 0 5px #29b6f6",
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
          backgroundColor: "#29b6f6",
          "&:hover": {
            backgroundColor: "#58a5f0",
          },
        },
      },
    },
  },
});

export default function OTP() {
  const router = useRouter();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otp = data.get("otp") as string;
    if (!otp) {
      toast({
        variant: "error",
        title: "Please enter the OTP code",
      });
      return;
    }
    handleOTP(router, toast, { otp });
  };

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;

    if (isCounting && countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsCounting(false);
    }

    return () => clearInterval(countdownTimer);
  }, [isCounting, countdown]);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#ffffff",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.75)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#ffffff",
            width: "100%", // Adjust width as needed, increased for better form visibility
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            OTP Confirm
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, width: "100%" }}
          >
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              We have sent the 6-digit OTP code to your email. If you have not
              received the message, please click
              <span className="font-bold"> resend OTP</span>.
            </Typography>
            <TextField
              margin="normal"
              required
              style={{ width: "20%", left: "40%" }}
              id="otp"
              name="otp"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {countdown > 0 ? (
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    Resend OTP in {countdown}s
                  </Typography>
                ) : (
                  <Button
                    onClick={handleResendOTP}
                    style={{ color: "black" }}
                    sx={{ cursor: "pointer" }}
                  >
                    Resend OTP
                  </Button>
                )}
              </Grid>

              {/* <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              {/* </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
