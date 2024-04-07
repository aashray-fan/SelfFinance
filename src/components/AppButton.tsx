import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Color, Responsive } from "../utils";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  style?: TouchableOpacity["props"]["style"];
  textStyle?: Text["props"]["style"];
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { onPress, title, style, textStyle } = props;
  return (
    <TouchableOpacity style={[styles.submitTouch, style]} onPress={onPress}>
      <Text style={[styles.submitText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

AppButton.defaultProps = {
  onPress: () => {},
  title: "",
  style: {},
  textStyle: {},
};

const styles = StyleSheet.create({
  submitTouch: {
    width: "40%",
    paddingVertical: Responsive.verticalScale(10),
    borderRadius: 10,
    backgroundColor: Color.themeOrange,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Responsive.verticalScale(10),
  },
  submitText: {
    color: Color.black,
    fontSize: Responsive.font(5),
    fontWeight: "600",
  },
});
