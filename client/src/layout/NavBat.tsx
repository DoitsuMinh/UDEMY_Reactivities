import { Group } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { NavLink } from "react-router";
import { Observer } from "mobx-react-lite";
// import UserMenu from "./UserMenu";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../lib/hooks/useStore";

export default function NavBar() {
  const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem component={NavLink} to="/" sx={{ display: "flex", gap: 2 }}>
                <Group fontSize="large" />
                <Typography sx={{ position: "relative" }} variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isLoading ? (
                      <CircularProgress
                        size={20}
                        thickness={7}
                        sx={{
                          color: "white",
                          position: "absolute",
                          top: "30%",
                          left: "105%",
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/counter">Counter</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
            </Box>
            <Box display="flex" alignItems="center">
              <MenuItemLink to="/login">Login</MenuItemLink>
              <MenuItemLink to="/register">Register</MenuItemLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
