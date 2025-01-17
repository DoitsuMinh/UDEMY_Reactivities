import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { useStore } from "../../../stores/store";

interface Props {
  activity: Activity;
}
export default function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Item key={activity.id}>
      <Item.Content
        style={
          activity.status === "removed" ? { opacity: 0.5, textDecoration: "line-through" } : {}
        }
      >
        {activity.status === "removed" ? (
          <Item.Header style={{ textDecoration: "line-through" }}>{activity.title}</Item.Header>
        ) : (
          <Item.Header as="a">{activity.title}</Item.Header>
        )}

        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.city}, {activity.venue}
          </div>
        </Item.Description>
        {activity.status !== "removed" && (
          <Item.Extra>
            <Button
              as={Link}
              to={`../activities/${activity.id}`}
              // onClick={() => activityStore.selectActivity(activity.id)}
              floated="right"
              content="View"
              color="blue"
            />
            <Button
              name={activity.id}
              loading={loading && target === activity.id}
              onClick={(e) => handleActivityDelete(e, activity.id)}
              floated="right"
              content="Delete"
              color="red"
            />
            {activity.status !== "removed" && <Label basic content={activity.category} />}
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
}
