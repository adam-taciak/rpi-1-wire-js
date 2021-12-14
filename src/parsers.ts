export const parseSensorsFile = (text: string) => {
  const parts = text.split('\n');
  parts.pop();
  return parts;
};
