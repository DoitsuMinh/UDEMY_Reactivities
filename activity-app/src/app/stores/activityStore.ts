import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
  title = `Oi oi 🙉`;

  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;

  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = () => {
    this.title += ' ' + this.randomMonkey();
  };

  private randomMonkey = (): string => {
    return Math.random() > 0.7 ? '🙈' : Math.random() > 0.3 ? '🙉' : '🙊';
  }

  loadActivities = async () => {

    this.setLoadingInitial(true);

    try {
      const activities = await agent.Activities.list();

      this.setActivities(activities);
      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  initializeActivities = () => {
    this.activities = [];
  }

  // use arrow function to bind value of parameters in this class
  // to prevent strict mode warning
  setActivities = (activities: Activity[]) => {
    this.activities = activities.map(activity => ({
      ...activity,
      date: activity.date.split("T")[0]
    }));
  }

  // use arrow function to bind value of parameters in this class
  // to prevent strict mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSubmitting(state: boolean) {
    this.submitting = state;
  }

  setLoading(state: boolean) {
    this.loading = state;
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id) || undefined;
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  // editActivity = async (activity: Activity) => {
  //   this.setSubmitting(true);

  //   try {
  //     await agent.Activities.update(activity);

  //     this.updateActivity(activity);
  //     this.selectActivity(activity.id);
  //     this.closeForm();
  //     this.setSubmitting(false);
  //   }
  //   catch (error) {
  //     console.error(error);
  //     this.setSubmitting(false);
  //   }
  // }

  // updateActivity = (activity: Activity) => {
  //   this.activities = [...this.activities.filter((x) => x.id !== activity.id), activity];
  // }

  // addActivity = (activity: Activity) => {
  //   this.activities = [...this.activities, activity];
  // }

  // createActivity = async (activity: Activity) => {
  //   this.setSubmitting(true);

  //   try {
  //     await agent.Activities.create(activity);

  //     this.addActivity(activity);
  //     this.selectActivity(activity.id);
  //     this.closeForm();
  //     this.setSubmitting(false);
  //   } catch (error) {
  //     console.error(error);
  //     this.setSubmitting(false);
  //   }
  // }
}