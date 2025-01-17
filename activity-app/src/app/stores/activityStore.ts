import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  title = `Oi Oi 🙉`;

  activityRegistry = new Map<string, Activity>();
  selectedActivity?: Activity = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;

  loadingInitial: boolean = false;

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

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    )
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

      runInAction(() => {
        activities.forEach(activity => {
          this.setActivity(activity);
        });
      })

      this.setLoadingInitial(false);
    } catch (error) {
      console.error(error);

      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }
    else {
      this.setLoadingInitial(true);

      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);

        runInAction(() => { this.selectedActivity = activity; })
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.error(error);

        this.setLoadingInitial(false);
      }
    }
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  // use arrow function to bind value of parameters in this class
  // to prevent strict mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

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