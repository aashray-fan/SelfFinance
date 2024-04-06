// Library Imports
import { StyleSheet, Text, View } from "react-native";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";
import { useFocusEffect } from "@react-navigation/native";

const SUMMARY_COLLECTION = "summary";
const FirestoreSummary2024 = firestore()
  .collection(SUMMARY_COLLECTION)
  .doc("2024");

const InfoScreen = () => {
  const [totalTransactions, setTotalTransactions] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [maxTransaction, setMaxTransaction] = useState({});
  const [minTransaction, setMinTransaction] = useState({});

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
        <View>
          <Text style={styles.itemTitleText}>{title}</Text>
        </View>
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
  return (
    <AppContainer>
      <AppHeader titleText={"Summary"} />
      <View style={styles.mainContainer}>
        {renderItem("Transactions", totalTransactions)}
        {renderItem("Balance", `$${totalAmount}`)}
        {renderBigItem("High Spending", maxTransaction)}
        {renderBigItem("Low Spending", minTransaction)}
      </View>
    </AppContainer>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
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
});
