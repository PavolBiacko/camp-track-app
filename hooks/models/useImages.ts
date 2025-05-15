import { galleryRepository } from "@/repositories/galleryRepository";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

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