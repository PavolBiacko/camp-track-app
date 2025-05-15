import { GalleryContextType } from '@/types/gallery';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider = (props: PropsWithChildren) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const groupedPhotos = useMemo(() => {
    const groups = [];
    for (let i = 0; i < photos.length; i += 3) {
      groups.push(photos.slice(i, i + 3));
    }
    return groups;
  }, [photos]); // Only recompute when photos changes

  return (
    <GalleryContext.Provider value={{ photos, setPhotos, groupedPhotos }}>
      {props.children}
    </GalleryContext.Provider>
  );
};

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
};