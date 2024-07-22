import { useEffect, useState } from "react";
import axios from "axios";
import { Item, ListItem } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => setActivities(res.data));
  }, []);

  return (
    <div>
      <NavBar />
      <ListItem>
        {activities.map((activity: Activity) => (
          <Item key={activity.id}>{activity.title}</Item>
        ))}
      </ListItem>
    </div>
  );
}

export default App;
