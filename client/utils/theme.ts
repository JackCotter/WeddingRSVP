import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#808080', // Change this to your desired focus color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
          backgroundColor: "gray",
          ":hover": {
            backgroundColor: "#bbbcbd"
          },
        },
        outlined: {
          color: "gray",
          backgroundColor: "white",
        }
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          color: 'black',
          ":focus": {
            color: 'black'
          },
          ":hover": {
            borderColor: "gray"
          }
        }
      }
    }
  },
});

export default theme;