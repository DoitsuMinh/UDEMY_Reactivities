import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router";
import HomePage from "../feature/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  // {
  //   /* <Grid>
  //         <Grid.Column width="10">
  //           <h2>{activityStore.title}</h2>
  //           <Button
  //             content="Add monkey"
  //             style={{ marginBottom: "1em" }}
  //             positive
  //             onClick={() => activityStore.setTitle()}
  //           />
  //         </Grid.Column>
  //       </Grid> */
  // }

  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
