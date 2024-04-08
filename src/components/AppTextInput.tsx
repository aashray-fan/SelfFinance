// Library Imports
import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Color, Responsive } from "../utils";
// Relative Imports

// Interfaces
interface AppTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const { placeholder, value, onChangeText, isPassword } = props;
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Color.white}
        style={styles.input}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default AppTextInput;

AppTextInput.defaultProps = {
  placeholder: "",
  value: "",
  onChangeText: () => {},
  isPassword: false,
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: Responsive.verticalScale(50),
    borderRadius: 10,
    backgroundColor: Color.themeBlue,
    justifyContent: "center",
    paddingHorizontal: Responsive.scale(10),
    marginVertical: Responsive.verticalScale(5),
  },
  input: {
    color: Color.themeOrange,
    fontSize: Responsive.font(4.5),
    fontWeight: "600",
  },
});
