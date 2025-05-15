import supabase from "@/supabase/client";
import { GalleryImage } from "@/types/gallery";
import { AuthError } from "@supabase/supabase-js";

const PAGE_SIZE = 10 * 3; // Number of images per page (20 rows of 3 images each)

const getImageUrl = async (fileName: string): Promise<string> => {
  try {
    const { data } = supabase
      .storage
      .from('gallery')
      .getPublicUrl(fileName);

    return data.publicUrl || '';
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
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;

    const filteredData = data.filter(file => file.name !== '.emptyFolderPlaceholder');

    const imageUrls = await Promise.all(filteredData.map(file => getImageUrl(file.name)));

    return imageUrls;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const addOneImage = async (galleryImage: GalleryImage): Promise<void> => {
  try {
    const { error } = await supabase
      .storage
      .from('gallery')
      .upload(galleryImage.fileName, galleryImage.buffer, {
        cacheControl: '3600',
        contentType: 'image/jpeg',
        upsert: true,
      });
    if (error) throw error;
  } catch (error: any) {
    throw error as AuthError;
  }
}

const addManyImages = async (galleryImages: GalleryImage[]): Promise<void> => {
  try {
    const uploadPromises = galleryImages.map(image => addOneImage(image));
    await Promise.all(uploadPromises);
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const galleryRepository = {
  getImageUrl,
  getPaginatedImages,
  addOneImage,
  addManyImages,
  PAGE_SIZE,
};