import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../feature/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // using StrictMode will cause the app to render twice
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([activity, ...activities]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);

    if (id) {
      agent.Activities.delete(id).then(() => {
        // remove the activity from the list
        //setActivities([...activities.filter((x) => x.id !== id)]);

        // update the status of the activity to "removed"
        setActivities([...activities.map((x) => (x.id === id ? { ...x, status: "removed" } : x))]);
        setSubmitting(false);
      });
    }
  }
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
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
