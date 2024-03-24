import { Dimensions, StatusBar, Platform } from 'react-native'

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window')

let isIPhoneX = false

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  isIPhoneX =
    W_HEIGHT === 780 ||
    W_WIDTH === 780 ||
    W_HEIGHT === 812 ||
    W_WIDTH === 812 ||
    W_HEIGHT === 844 ||
    W_WIDTH === 844 ||
    W_HEIGHT === 896 ||
    W_WIDTH === 896 ||
    W_HEIGHT === 926 ||
    W_WIDTH === 926
}

const font = (font: any) => {
  const fontSize = typeof font === 'number' ? font : parseFloat(font)
  return (W_WIDTH * fontSize) / 100
}

const getStatusBarHeight = () => {
  return Platform.select({
    ios: isIPhoneX ? 78 : 20,
    android:
      !!StatusBar.currentHeight && StatusBar.currentHeight > 24 ? 0 : StatusBar.currentHeight,
    default: 0
  })
}

const isIPhoneXSeries = () => {
  return Platform.OS === 'android' ? 0 : isIPhoneX ? 34 : 0
}

const isAndroidNouch =
  Platform.OS === 'android' ? !!StatusBar.currentHeight && StatusBar.currentHeight > 24 : false

const [shortDimension, longDimension] =
  W_WIDTH < W_HEIGHT ? [W_WIDTH, W_HEIGHT] : [W_HEIGHT, W_WIDTH]

// guideline size
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor

const Responsive = {
  isIPhoneXSeries,
  isIPhoneX,
  font,
  isAndroidNouch,
  getStatusBarHeight,
  scale,
  verticalScale,
  moderateScale
}
export default Responsive
