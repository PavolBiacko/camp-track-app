import supabase from "@/supabase/client";

import { mapActivityCreateToDbActivity, mapActivityUpdateToDbActivity, mapDbActivityToActivity } from "@/mappers/activities";
import { Activity, ActivityCreate, ActivityUpdate } from "@/types/models/activities";
import { formatDateToISOLocal } from "@/utils/dates";
import { AuthError } from "@supabase/supabase-js";

const readActivitiesByDate = async (date: Date): Promise<Activity[]> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .or(`date.eq.${formatDateToISOLocal(date)},date.is.null`)
      .order("time");

    if (error) throw error;

    return data.map((activity) => mapDbActivityToActivity(activity));
  } catch (error: any) {
    // console.error('Error reading activities:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readActivityById = async (id: number): Promise<Activity> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return mapDbActivityToActivity(data);
  } catch (error: any) {
    // console.error('Error reading activity:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const createActivity = async (activity: ActivityCreate): Promise<number> => {
  try {
    const newMappedActivity = mapActivityCreateToDbActivity(activity);
    const { data, error } = await supabase
      .from("activities")
      .insert(newMappedActivity)
      .select()
      .single();

    if (error) throw error;

    return data.id;
  } catch (error: any) {
    // console.error('Error creating activity:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const updateActivityById = async (id: number, activity: ActivityUpdate): Promise<Activity> => {
  try {
    const newMappedActivity = mapActivityUpdateToDbActivity(activity);
    const { data, error } = await supabase
      .from("activities")
      .update(newMappedActivity)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return mapDbActivityToActivity(data);
  } catch (error: any) {
    // console.error('Error updating activity:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const deleteActivityById = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id)

    if (error) throw error;

  } catch (error: any) {
    // console.error('Error deleting activity:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const activityRepository = {
  readActivitiesByDate,
  readActivityById,
  createActivity,
  updateActivityById,
  deleteActivityById,
}