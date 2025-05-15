import supabase from "@/supabase/client";
import { AuthError } from "@supabase/supabase-js";

const PAGE_SIZE = 10 * 3; // Number of images per page (20 rows of 3 images each)

const getImageUrl = async (fileName: string): Promise<string> => {
  try {
    const { data } = supabase
      .storage
      .from('gallery')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const getPaginatedImages = async (page: number): Promise<string[]> => {
  try {
    const offset = page * PAGE_SIZE;
    const { data, error } = await supabase
      .storage
      .from('gallery')
      .list('', {
        limit: PAGE_SIZE,
        offset: offset,
        sortBy: { column: 'created_at' },
      });

    if (error) throw error;

    const imageUrls = await Promise.all(data.map(file => getImageUrl(file.name)));

    return imageUrls;
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const galleryRepository = {
  getImageUrl,
  getPaginatedImages,
  PAGE_SIZE,
};