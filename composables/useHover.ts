/**
 * Primary input mechanism system can
 * hover over elements with ease
 */
export const useHover = () => {
  return useState<Boolean>("hover", () => {
    return window.matchMedia("(hover: hover)").matches;
  });
};
