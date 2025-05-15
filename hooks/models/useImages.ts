import { galleryRepository } from "@/repositories/galleryRepository";
import { GalleryImage } from "@/types/gallery";
import { keepPreviousData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGalleryImagesPaginated = () => {
  const query = useInfiniteQuery({
    queryKey: ['gallery'],
    queryFn: async ({ pageParam }) => {
      return await galleryRepository.getPaginatedImages(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0 || lastPage.length < galleryRepository.PAGE_SIZE) {
        return undefined;
      }
      const nextPage = allPages.length;
      return nextPage;
    },
    initialPageParam: 0,
    placeholderData: keepPreviousData,
  });

  return { images: query.data, ...query };
};

export const useAddImage = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (galleryImage: GalleryImage) => {
      return await galleryRepository.addOneImage(galleryImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
  return { addImage: mutateAsync, isError };
}

export const useAddManyImages = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: async (galleryImages: GalleryImage[]) => {
      return await galleryRepository.addManyImages(galleryImages);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
  return { addManyImages: mutateAsync, isError };
}