import { mapDbTimeToScheduleTime } from "@/mappers/datetime";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import { Activity, ActivityCreate, ActivityUpdate } from "@/types/models/activities";

export const mapDbActivityToActivity = (dbActivity: Tables<"activities">): Activity => {
  return {
    id: dbActivity.id,
    name: dbActivity.name,
    description: dbActivity.description,
    time: mapDbTimeToScheduleTime(dbActivity.time),
    date: dbActivity.date ? new Date(dbActivity.date) : null,
    leaderId: dbActivity.leader_id,
    createdAt: new Date(dbActivity.created_at),
  };
}

export const mapActivityCreateToDbActivity = (activityCreate: ActivityCreate): TablesInsert<"activities"> => {
  return {
    name: activityCreate.name,
    description: activityCreate.description,
    time: activityCreate.time,
    date: activityCreate.date,
    leader_id: activityCreate.leaderId
  };
}

export const mapActivityUpdateToDbActivity = (activityUpdate: ActivityUpdate): TablesUpdate<"activities"> => {
  return {
    name: activityUpdate.name,
    description: activityUpdate.description,
    time: activityUpdate.time,
    date: activityUpdate.date,
    leader_id: activityUpdate.leaderId
  };
}