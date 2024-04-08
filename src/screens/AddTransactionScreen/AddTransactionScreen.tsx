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
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const FirestoreTransactions = firestore()
    .collection("users")
    .doc(global?.user?.uid)
    .collection(TRANSACTION_LIST);

  const onPressBack = () => navigation.goBack();

  const addTransaction = () => {
    if (!title || !amount || !date || !location) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    FirestoreTransactions.add({ title, amount, date, location }).then(() => {
      ToastAndroid.show("Transaction Added", ToastAndroid.SHORT);
      onPressBack();
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event, selectedDate) => {
    // console.log(selectedDate, "selectedDate");
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
    setIsPickerOpen(false);
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
        <AppButton
          title={date || "Enter Date"}
          style={styles.dateTouch}
          textStyle={styles.text}
          onPress={() => setIsPickerOpen(true)}
        />
        <AppButton title={"Submit"} onPress={addTransaction} />
        {isPickerOpen && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
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
  dateTouch: {
    width: "90%",
    height: Responsive.verticalScale(50),
    borderRadius: 10,
    backgroundColor: Color.themeBlue,
    alignItems: "flex-start",
    paddingHorizontal: Responsive.scale(10),
    marginVertical: Responsive.verticalScale(5),
  },
  text: {
    color: Color.themeOrange,
    fontSize: Responsive.font(4.5),
    fontWeight: "600",
  },
});
