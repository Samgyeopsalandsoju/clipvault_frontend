export const markIntersectingElementsAsForked = <T extends { id: string | number }>(
  arr1: T[],
  arr2: (string | number)[]
) => {
  if (!arr1 || !arr2) return;
  const set = new Set(arr2);

  return arr1.map((v) => ({
    ...v,
    isForked: set.has(v.id),
  }));
};
