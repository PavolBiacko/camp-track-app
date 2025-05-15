import { GalleryImage } from "@/types/gallery";
import { ImagePickerAsset } from "expo-image-picker";
import { Alert } from "react-native";

export const groupImagesIntoRows = (images: string[], imagesPerRow: number = 3) => {
  const rows: string[][] = [];
  for (let i = 0; i < images.length; i += imagesPerRow) {
    rows.push(images.slice(i, i + imagesPerRow));
  }
  return rows;
};

// Function to process assets and return an array of images to upload
export const processImagesForUpload = (assets: ImagePickerAsset[]): GalleryImage[] => {
  const imagesToUpload: GalleryImage[] = [];

  for (const asset of assets) {
    const { base64, fileName } = asset;

    if (!base64) {
      Alert.alert("Nepodarilo sa získať dáta. Skús to znova.");
      continue;
    }

    // Decode the base64 string to binary data
    const byteString = atob(base64);
    const uint8Array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Add the image data to the array
    imagesToUpload.push({
      fileName: fileName || `image-${Date.now()}.jpg`,
      buffer: uint8Array,
    });
  }

  return imagesToUpload;
};
