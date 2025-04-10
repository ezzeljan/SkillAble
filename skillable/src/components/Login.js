import { useState } from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { Link as RouterLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { IconButton, InputAdornment } from "@mui/material"
import Navbar from "./Navbar"
import "./Login.css"
import Background from "./Background"
import ToggleButton from "./Togglebutton";

function Login() {
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)
  //const [isToggled, setIsToggled] = useState(false) // State for the toggle button
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get("email")
    const password = data.get("password")

    let isValid = true

    // Validations
    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else {
      setPasswordError("")
    }

    if (!isValid) {
      return
    }

    const user = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        throw new Error("Invalid email or password")
      }

      const result = await response.json()
      console.log(result)

      // Check if result contains a userId (or similar identifier)
      if (result.userId) {
        // Save userId and other necessary info to localStorage
        localStorage.setItem("userId", result.userId) // Store the userId in localStorage
        localStorage.setItem("user", JSON.stringify(result)) // Store the full user data if needed

        setSuccessMessage("Login successful!")
        setOpenSnackbar(true)
        setTimeout(() => navigate("/homepage"), 1500)
      } else {
        throw new Error("User ID not found in the response")
      }
    } catch (err) {
      setErrorMessage(err.message) // Set error message if login fails
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }
  // Handle the toggle change to navigate based on position
  /*const handleToggleChange = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      navigate("/login"); // Navigate to /login when toggle is on the left (Login)
    } else {
      navigate("/register"); // Navigate to /register when toggle is on the right (Signup)
    }
  };*/

  return (
    <div
      className="login-page"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh", // Ensure it covers full viewport height
        width: "100%",
      }}
    >
      <div
        style={{
          position: "fixed", // Change from absolute to fixed
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Background />
      </div>
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Navbar />
        <Container
          component="main"
          maxWidth="xs"
          className="main-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh", // Change from height to minHeight
            paddingBottom: "100px",
          }}
        >
          <Box
            className="login-box"
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              position: "relative", // Make sure the box has relative positioning for the toggle
            }}
          >
            <ToggleButton isLoginPage={false} />
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontSize: "32px", fontFamily: "Arial", fontWeight: "600", color: "#28313B" }}
            >
              Welcome Back!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth={false} // Disable fullWidth to allow custom width
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!emailError}
                helperText={emailError}
                sx={{
                  width: 380,
                  "& .MuiOutlinedInput-root": {
                    height: 65,
                    borderRadius: "15px",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth={false} // Disable fullWidth to allow custom width
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
                sx={{
                  width: 380,
                  "& .MuiOutlinedInput-root": {
                    height: 65,
                    borderRadius: "15px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}

              <Grid container justifyContent="flex-end" sx={{ pt: 0, pb: 3 }}>
                <Grid item>
                  <RouterLink to="/register" variant="body2" style={{ textDecoration: "none" }}>
                    {"Forgot Password?"}
                  </RouterLink>
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <button className="loginbutton" type="submit">
                  Log in
                </button>
              </Grid>
            </Box>
          </Box>
        </Container>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={successMessage ? "success" : "error"}
            sx={{ width: "100%" }}
            icon={successMessage ? <CheckCircleIcon /> : undefined}
          >
            {successMessage || errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default Login
