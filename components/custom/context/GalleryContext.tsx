import { GalleryContextType } from '@/types/gallery';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider = (props: PropsWithChildren) => {
  const [photosUpdating, setPhotosUpdating] = useState(false);

  return (
    <GalleryContext.Provider value={{ photosUpdating, setPhotosUpdating }}>
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