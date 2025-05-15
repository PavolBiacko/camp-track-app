export const groupImagesIntoRows = (images: string[], imagesPerRow: number = 3) => {
  const rows: string[][] = [];
  for (let i = 0; i < images.length; i += imagesPerRow) {
    rows.push(images.slice(i, i + imagesPerRow));
  }
  return rows;
};