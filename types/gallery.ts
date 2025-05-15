export type GalleryContextType = {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  groupedPhotos: string[][];
}