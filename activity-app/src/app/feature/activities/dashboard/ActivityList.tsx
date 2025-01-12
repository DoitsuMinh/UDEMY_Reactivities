import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { activitiesByDate, deleteActivity, loading } = activityStore;

  function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
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
        ))}
      </Item.Group>
    </Segment>
  );
});
