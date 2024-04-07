import { Alert } from "react-native"

const deepClone = (val: any) => {
  return JSON.parse(JSON.stringify(val))
}

const showToast = (message: string) => {
    Alert.alert(message)
    // Toast.show(message, {
    //   duration: Toast.durations.SHORT,
    //   position: Toast.positions.BOTTOM,
    //   shadow: true,
    //   animation: true,
    //   hideOnPress: true,
    //   textStyle: { fontSize: Responsive.moderateScale(15) },
    //   backgroundColor: global.Color?.blackDM1 || 'transparent',
    //   textColor: global.Color?.whiteDM1 || Color.whiteDM1
    // })
  }

const Utility = {
  deepClone,
  showToast
}

export default Utility
