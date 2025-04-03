import supabase from "@/supabase/client";

import { mapDbActivityToActivity } from "@/mappers/activities";
import { Activity, AddActivity } from "@/types/models/activities";
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
    // console.error('Error reading activities:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const createActivity = async (activity: AddActivity): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .insert([activity])
      .select()
      .single();

    if (error) throw error;

    return data.id;
  } catch (error: any) {
    // console.error('Error creating activity:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const scheduleRepository = {
  readActivitiesByDate,
  readActivityById,
  createActivity,
}