export function formattedData(data: number): string {
  return new Date(data * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
