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
  onPressAdd?: TouchableOpacityProps["onPress"];
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { titleText, onPressBack, isAddButton, isBackButton, onPressAdd } = props;
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
        <TouchableOpacity style={styles.backTouch} onPress={onPressAdd}>
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
  onPressAdd: () => console.log("onPressAdd"),
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
    width: "65%",
    height: "65%",
    tintColor: Color.black,
  },
});
