import { Dimensions } from "react-native";

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get("window");

const font = (font: any) => {
  const fontSize = typeof font === "number" ? font : parseFloat(font);
  return (W_WIDTH * fontSize) / 100;
};

const [shortDimension, longDimension] =
  W_WIDTH < W_HEIGHT ? [W_WIDTH, W_HEIGHT] : [W_HEIGHT, W_WIDTH];

// guideline size
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

const Responsive = {
  font,
  scale,
  verticalScale,
};
export default Responsive;
