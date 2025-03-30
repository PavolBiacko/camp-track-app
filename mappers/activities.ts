import { Tables } from "@/supabase/types";
import { Activity } from "@/types/models/activities";
import { mapDbTimeToScheduleTime } from "./time";

export const mapDbActivityToActivity = (dbActivity: Tables<"activities">): Activity => {
  return {
    id: dbActivity.id,
    name: dbActivity.name,
    time: mapDbTimeToScheduleTime(dbActivity.time),
    date: dbActivity.date ? new Date(dbActivity.date) : null,
    leaderId: dbActivity.leader_id,
    createdAt: new Date(dbActivity.created_at),
  };
}