export const parseDescriptionJson = (descriptionJson: string): string => {
  if (!descriptionJson || descriptionJson.trim() === "") return "";
  try {
    const parsed = JSON.parse(descriptionJson);
    return parsed?.blocks?.map((b: any) => b.data?.text || "").join("<br/>");
  } catch (e) {
    console.error("Error parsing description JSON:", e);
    return "";
  }
};
