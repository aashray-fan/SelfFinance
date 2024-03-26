// Library Imports
import { StyleSheet, Text, View } from "react-native";
import _ from "lodash";
import React from "react";
// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";
import { transactionList } from "../../utils/Data";

const InfoScreen = () => {
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

  const balance = _.sumBy(transactionList, (item) => Number(item?.amount));
  const high = _.maxBy(transactionList, (item) => Number(item?.amount));
  const low = _.minBy(transactionList, (item) => Number(item?.amount));
  return (
    <AppContainer>
      <AppHeader titleText={"Summary"} />
      <View style={styles.mainContainer}>
        {renderItem("Transactions", transactionList?.length.toString())}
        {renderItem("Balance", `$${balance}`)}
        {renderBigItem("High Spending", high)}
        {renderBigItem("Low Spending", low)}
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
