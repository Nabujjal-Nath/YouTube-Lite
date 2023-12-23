export function formatCount(viewCount: number): string {
  const suffixes = ['', 'K', 'M', 'B'];
  let scaleIndex = 0;
  while (viewCount >= 1000 && scaleIndex < suffixes.length - 1) {
    viewCount /= 1000;
    scaleIndex++;
  }
  return `${viewCount.toFixed(scaleIndex === 0 ? 0 : 1)}${suffixes[scaleIndex]}`;
}

export function isNullOrUndefined(object: unknown): object is null | undefined {
  return object == null || object === undefined;
}