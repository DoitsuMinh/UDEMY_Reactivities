import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, Item, ListItem } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => setActivities(res.data));
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities"></Header>
      <ListItem>
        {activities.map((activity: any) => (
          <Item key={activity.id}>{activity.title}</Item>
        ))}
      </ListItem>
    </div>
  );
}

export default App;
