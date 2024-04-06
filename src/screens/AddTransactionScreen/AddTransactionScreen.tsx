// Library Imports
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";

// Relative Imports
import { AppHeader, AppContainer, AppTextInput } from "../../components";
import { Color, Responsive } from "../../utils";

const TRANSACTION_LIST = "transactions";
const FirestoreTransactions = firestore().collection(TRANSACTION_LIST);

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
  const [location, setLocation] = useState("");

  const onPressBack = () => navigation.goBack();

  const addTransaction = () => {
    FirestoreTransactions.add({ title, amount, date, location }).then(() => {
      ToastAndroid.show("Transaction Added", ToastAndroid.SHORT);
      onPressBack();
    });
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
          placeholder={"Enter Location"}
          value={location}
          onChangeText={(t) => setLocation(t)}
        />
        <AppTextInput
          placeholder={"Enter Date"}
          value={date}
          onChangeText={(t) => setDate(t)}
        />
        <TouchableOpacity style={styles.submitTouch} onPress={addTransaction}>
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
