import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";

interface Props {
  activities: Activity[];
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({ activities, deleteActivity, submitting }: Props) {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();

  function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content
              style={
                activity.status === "removed"
                  ? { opacity: 0.5, textDecoration: "line-through" }
                  : {}
              }
            >
              {activity.status === "removed" ? (
                <Item.Header style={{ textDecoration: "line-through" }}>
                  {activity.title}
                </Item.Header>
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
                    onClick={() => activityStore.selectActivity(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    loading={submitting && target === activity.id}
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
        ))}
      </Item.Group>
    </Segment>
  );
}
