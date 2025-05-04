import { mapDbChildToChild } from "@/mappers/children";
import supabase from "@/supabase/client";
import { Child } from "@/types/models/children";
import { AuthError } from "@supabase/supabase-js";

const readManyChildren = async (): Promise<Child[]> => {
  try {
    const { data: childrenData, error: childrenError } = await supabase
      .from('children')
      .select('*');

    if (childrenError) throw childrenError;

    return childrenData.map((child) => (mapDbChildToChild(child)));
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const childRepository = {
  readManyChildren,
}