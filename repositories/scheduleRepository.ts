import supabase from "@/supabase/client";

import { mapDbActivityToActivity } from "@/mappers/activities";
import { Activity } from "@/types/models/activities";
import { AuthError } from "@supabase/supabase-js";

const readActivities = async (): Promise<Activity[]> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("time");

    if (error) throw error;

    return data.map((activity) => mapDbActivityToActivity(activity));
  } catch (error: any) {
    // console.error('Error reading activities:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const scheduleRepository = {
  readActivities
}