import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  title = `Oi oi 🙉`;

  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;

  loadingInitial: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => {
      if (a.status === b.status) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.status.localeCompare(b.status);
    })
  }

  setTitle = () => {
    this.title += ' ' + this.randomMonkey();
  };

  private randomMonkey = (): string => {
    return Math.random() > 0.7 ? '🙈' : Math.random() > 0.3 ? '🙉' : '🙊';
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();

      runInAction(() => {
        activities.forEach(activity => {
          activity.date = activity.date.split("T")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      })

      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  // initializeActivities = () => {
  //   this.activities = [];
  // }

  // use arrow function to bind value of parameters in this class
  // to prevent strict mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // setSubmitting(state: boolean) {
  //   this.submitting = state;
  // }

  // setLoading(state: boolean) {
  //   this.loading = state;
  // }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
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

  updateActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)

        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      })
    }
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      activity.id = uuid();
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)

        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        const activity = this.activityRegistry.get(id);
        if (activity) {
          activity.status = 'removed';
          this.activityRegistry.set(id, activity)
        }


        this.cancelSelectedActivity;
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}