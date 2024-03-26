import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { Color, Images, Responsive } from "../utils";

interface AppHeaderProps {
  isBackButton?: boolean;
  isAddButton?: boolean;
  titleText?: string;
  onPressBack?: TouchableOpacityProps["onPress"];
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { titleText, onPressBack, isAddButton, isBackButton } = props;
  return (
    <View style={styles.mainView}>
      {isBackButton ? (
        <TouchableOpacity style={styles.backTouch} onPress={onPressBack}>
          <Image source={Images.back} style={styles.backImg} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backTouch} />
      )}
      <Text style={styles.titleText}>{titleText}</Text>
      {isAddButton ? (
        <TouchableOpacity style={styles.backTouch}>
          <Image source={Images.add} style={styles.backImg} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backTouch} />
      )}
    </View>
  );
};

export default AppHeader;

AppHeader.defaultProps = {
  isAddButton: false,
  isBackButton: false,
  titleText: "Transactions",
  onPressBack: () => console.log("onPressBack"),
};

const styles = StyleSheet.create({
  mainView: {
    height: Responsive.verticalScale(50),
    backgroundColor: Color.themeBlue,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "700",
    fontSize: Responsive.font(6),
    color: Color.themeOrange,
    flex: 1,
    textAlign: "center",
  },
  backTouch: {
    height: "90%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    width: "80%",
    height: "80%",
    tintColor: Color.black,
  },
});
