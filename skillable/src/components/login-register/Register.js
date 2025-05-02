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
import { IconButton, InputAdornment, Divider } from "@mui/material"
import Navbar from "../Navbar"
import "./Login.css"
import Background from "../Background"

function Register() {
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get("email")
    const password = data.get("password")
    const confirmPassword = data.get("confirmpassword"); 

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
    
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValid) {
      return
    }

    // Create registration request body
    const registerRequest = {
      email: email,
      password: password,
      userType: "STUDENT" // Set default role or get from form
    }

    try {
      // Call your Spring Boot register endpoint
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest),
      })

      const result = await response.text() // Get response as text since your endpoint returns ResponseEntity<String>

      if (!response.ok) {
        throw new Error(result || "Registration failed")
      }

      // Registration successful
      setSuccessMessage("Registration successful! Redirecting to login...")
      setOpenSnackbar(true)
      
      // Redirect to login page after short delay
      setTimeout(() => navigate("/login"), 1500)
      
    } catch (err) {
      setErrorMessage(err.message)
      setOpenSnackbar(true)
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <div
      className="login-page"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh", 
        width: "100%",
      }}
    >
      <div
        style={{
          position: "fixed",
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
            minHeight: "90vh",
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
              position: "relative",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontSize: "32px", fontFamily: "Arial", fontWeight: "600", color: "#28313B" }}
            >
              Create an account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth={false}
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
                fullWidth={false}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                autoComplete="current-password"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
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
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              <Grid container sx={{ pt: 0, pb: 3 }}>
              </Grid>

              <Grid container justifyContent="center">
                <button className="loginbutton" type="submit">
                  Sign up
                </button>
              </Grid>
              
              {/* Added login link section */}
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Already have an account?
                </Typography>
                <RouterLink 
                  to="/login" 
                  style={{ 
                    textDecoration: "none",
                    color: "#4a6cf7",
                    fontWeight: "600",
                    fontSize: "16px"
                  }}
                >
                  Log in here
                </RouterLink>
              </Box>
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

export default Register