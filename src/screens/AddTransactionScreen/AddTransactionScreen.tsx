// Library Imports
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
// Relative Imports
import { AppHeader, AppContainer, AppTextInput } from "../../components";
import { Color, Responsive } from "../../utils";
import App from "../../../App";

// Interface
interface AddTransactionScreenProps {
  navigation: any;
  route: any;
}

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = (props) => {
  const { navigation } = props;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <AppContainer>
      <AppHeader
        titleText={"Add Transaction"}
        isBackButton
        onPressBack={onPressBack}
      />
      <View style={styles.mainContainer}>
        <AppTextInput
          placeholder={"Enter Title"}
          value={title}
          onChangeText={(t) => setTitle(t)}
        />
        <AppTextInput
          placeholder={"Enter Amount"}
          value={amount}
          onChangeText={(t) => setAmount(t)}
        />
        <AppTextInput
          placeholder={"Enter Date"}
          value={date}
          onChangeText={(t) => setDate(t)}
        />
        <TouchableOpacity style={styles.submitTouch}>
          <Text style={styles.submitText}>{"Submit"}</Text>
        </TouchableOpacity>
      </View>
    </AppContainer>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: Responsive.verticalScale(40),
    paddingHorizontal: Responsive.scale(10),
  },
  submitTouch: {
    width: "40%",
    paddingVertical: Responsive.verticalScale(10),
    borderRadius: 10,
    backgroundColor: Color.themeOrange,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Responsive.verticalScale(20),
  },
  submitText: {
    color: Color.black,
    fontSize: Responsive.font(4.5),
    fontWeight: "600",
  },
});
