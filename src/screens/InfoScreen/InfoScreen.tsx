// Library Imports
import { StyleSheet, Text, View } from "react-native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

// Relative Imports
import { AppButton, AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";
import { Auth } from "../../firebase";

interface InfoScreenProps {
  navigation: any;
}

const SUMMARY_COLLECTION = "summary";

const InfoScreen: React.FC<InfoScreenProps> = (props) => {
  const { navigation } = props;
  const [totalTransactions, setTotalTransactions] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [maxTransaction, setMaxTransaction] = useState({});
  const [minTransaction, setMinTransaction] = useState({});

  const FirestoreSummary2024 = firestore()
    .collection("users")
    .doc(global?.user?.uid)
    .collection(SUMMARY_COLLECTION)
    .doc("2024");

  useEffect(() => {
    FirestoreSummary2024.get().then((doc) => {
      const data = doc.data();
      setTotalTransactions(data?.totalTransactions);
      setTotalAmount(data?.totalAmount);
      setMaxTransaction(data?.maxTransaction);
      setMinTransaction(data?.minTransaction);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      FirestoreSummary2024.get().then((doc) => {
        const data = doc.data();
        setTotalTransactions(data?.totalTransactions);
        setTotalAmount(data?.totalAmount);
        setMaxTransaction(data?.maxTransaction);
        setMinTransaction(data?.minTransaction);
      });
    }, [])
  );

  const onPressLogOut = () => {
    Auth.signOut(navigation);
  };

  const renderProfileItem = (title: string, answer: string) => {
    return (
      <View style={styles.profileRow}>
        <Text style={styles.leftText}>{title}</Text>
        <Text style={styles.rightText}>{answer}</Text>
      </View>
    );
  };

  const renderItem = (title: string, answer: string) => {
    return (
      <View style={styles.smallItemView}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.ansText}>{answer}</Text>
      </View>
    );
  };

  const renderBigItem = (title: string, item: any) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemTitleText}>{title}</Text>
        <View style={styles.itemBottom}>
          <Text style={styles.titleText}>{item?.title}</Text>
          <Text style={styles.ansText}>{`$${item?.amount}`}</Text>
        </View>
      </View>
    );
  };

  // const balance = _.sumBy(transactionList, (item) => Number(item?.amount));
  // const high = _.maxBy(transactionList, (item) => Number(item?.amount));
  // const low = _.minBy(transactionList, (item) => Number(item?.amount));
  const { name, email } = global?.user;
  return (
    <AppContainer>
      <AppHeader titleText={"Info"} />
      <View style={styles.mainContainer}>
        {renderProfileItem("Name", name)}
        {renderProfileItem("Email", email)}
        <Text style={styles.itemTitleText}>{"Summary"}</Text>
        {renderItem("Transactions", totalTransactions)}
        {renderItem("Balance", `$${totalAmount}`)}
        {renderBigItem("High Spending", maxTransaction)}
        {renderBigItem("Low Spending", minTransaction)}
      </View>
      <AppButton
        title={"Log Out"}
        onPress={onPressLogOut}
        style={styles.logout}
        textStyle={styles.logoutText}
      />
    </AppContainer>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
    alignItems: "center",
    flex: 1,
  },
  smallItemView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(5),
    backgroundColor: Color.themeOrange,
    marginBottom: Responsive.verticalScale(2),
    borderRadius: 5,
  },
  itemView: {
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(5),
    backgroundColor: Color.themeOrange,
    marginBottom: Responsive.verticalScale(2),
    borderRadius: 5,
    width: "100%",
  },
  titleText: {
    fontSize: Responsive.font(4),
    color: Color.black,
    flex: 1,
  },
  ansText: {
    fontSize: Responsive.font(4),
    color: Color.white,
    fontWeight: "700",
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitleText: {
    fontSize: Responsive.font(4.5),
    color: Color.themeBlue,
    fontWeight: "600",
    marginBottom: Responsive.verticalScale(4),
  },
  profileRow: {
    backgroundColor: Color.themeBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(5),
    marginBottom: Responsive.verticalScale(2),
    borderRadius: 5,
  },
  leftText: {
    flex: 1,
    fontSize: Responsive.font(4),
    color: Color.white,
  },
  rightText: {
    fontSize: Responsive.font(4),
    color: Color.themeOrange,
    fontWeight: "600",
  },
  logout: {
    backgroundColor: Color.themeBlue,
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
    alignSelf: "center",
  },
  logoutText: {
    color: Color.white,
  },
});
