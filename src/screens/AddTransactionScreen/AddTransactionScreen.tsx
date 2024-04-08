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
import {
  AppHeader,
  AppContainer,
  AppTextInput,
  AppButton,
} from "../../components";
import { Color, Responsive } from "../../utils";

const TRANSACTION_LIST = "transactions";

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

  const FirestoreTransactions = firestore()
    .collection("users")
    .doc(global?.user?.uid)
    .collection(TRANSACTION_LIST);

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
        <AppButton title={"Submit"} onPress={addTransaction} />
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
});
