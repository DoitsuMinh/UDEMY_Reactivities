import {
  Card,
  Image,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Button,
} from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { Link, useParams } from "react-router";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useEffect } from "react";

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
    <Card fluid>
      <Image src={`/asset/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button as={Link} to={`../manage/${activity.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to="../activities" basic color="grey" content="Cancel" />
        </Button.Group>
      </CardContent>
    </Card>
  );
});
