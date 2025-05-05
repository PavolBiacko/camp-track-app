import { mapChildCreateToDbChild, mapDbChildToChild } from "@/mappers/children";
import supabase from "@/supabase/client";
import { Child, ChildCreate } from "@/types/models/children";
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

const readChildById = async (id: string): Promise<Child> => {
  try {
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq("id", id)
      .single();

    if (childError) throw childError;

    return mapDbChildToChild(childData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const createChild = async (child: ChildCreate): Promise<string> => {
  try {
    const newMappedChild = mapChildCreateToDbChild(child);
    const { data: newChildData, error: createError } = await supabase
      .from('children')
      .insert(newMappedChild)
      .select()
      .single();

    if (createError) throw createError;

    return newChildData.id;
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const childRepository = {
  readManyChildren,
  readChildById,
  createChild,
}