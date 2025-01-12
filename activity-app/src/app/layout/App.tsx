import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../feature/activities/dashboard/ActivityDashboard";
// import { v4 as uuid } from "uuid";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  // using StrictMode will cause the app to render twice
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
