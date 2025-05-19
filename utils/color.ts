export function generateLightColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 85%)`; // soft pastel
}
