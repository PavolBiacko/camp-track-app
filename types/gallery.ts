export type GalleryImage = {
  fileName: string;
  buffer: Uint8Array;
}

export type GalleryContextType = {
  photosUpdating: boolean;
  setPhotosUpdating: (updating: boolean) => void;
}

export type GalleryImageLineProps = {
  item: string[];
}