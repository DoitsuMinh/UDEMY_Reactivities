import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();

  useEffect(
    () => {
      if (id) loadActivity(id);
    },
    [id, loadActivity] // dependency in side useEffect
  );

  if (loadingInitial || !activity) return <LoadingComponent content={""} />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
});
