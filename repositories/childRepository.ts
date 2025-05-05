import { mapChildCreateToDbChild, mapChildUpdateToDbChild, mapDbChildToChild } from "@/mappers/children";
import supabase from "@/supabase/client";
import { Child, ChildCreate, ChildUpdate } from "@/types/models/children";
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

const updateChild = async (id: string, child: ChildUpdate): Promise<Child> => {
  try {
    const newMappedChild = mapChildUpdateToDbChild(child);
    const { data: updatedChildData, error: updateError } = await supabase
      .from('children')
      .update(newMappedChild)
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    return mapDbChildToChild(updatedChildData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const deleteChild = async (id: string): Promise<void> => {
  try {
    const { error: deleteError } = await supabase
      .from('children')
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

  } catch (error: any) {
    throw error as AuthError;
  }
};

export const childRepository = {
  readManyChildren,
  readChildById,
  createChild,
  updateChild,
  deleteChild
}