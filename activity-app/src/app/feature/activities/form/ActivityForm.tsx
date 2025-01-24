import { Button, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router";
import { Activity } from "../../../models/activity";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Field, Form, Formik } from "formik";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    category: "",
    title: "",
    date: "",
    description: "",
    city: "",
    venue: "",
    status: "current",
  });

  // trigger when this component called
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  // function handleSubmit() {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   } else {
  //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   }
  // }

  // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field placeholder="Title" name="title" />
            <Field placeholder="Description" name="description" />
            <Field placeholder="Category" name="category" />
            <Field placeholder="Date" type="date" name="date" />
            <Field placeholder="City" name="city" />
            <Field placeholder="Venue" name="venue" />
            <Button loading={loading} floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to="../activities" floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
