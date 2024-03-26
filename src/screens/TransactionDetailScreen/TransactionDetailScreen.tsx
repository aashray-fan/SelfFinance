// Library Imports
import { StyleSheet, Text, View } from "react-native";
import React from "react";
// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Responsive } from "../../utils";

interface TransactionDetailScreenProps {
  navigation: any;
  route: any;
}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = (
  props
) => {
  const { navigation, route } = props;
  const { item } = route?.params;
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <AppContainer>
      <AppHeader
        titleText={"Transaction Detail"}
        isBackButton
        onPressBack={onPressBack}
      />
      <View style={styles.mainContainer}>
        <View style={styles.topView}>
          <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
          <Text style={styles.otherText}>{item?.title}</Text>
          <Text style={styles.otherText}>{item?.location}</Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.otherText}>{"Transaction Date"}</Text>
          <Text style={styles.dateText}>{item?.date}</Text>
        </View>
      </View>
    </AppContainer>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topView: {
    backgroundColor: Color.themeOrange,
    height: Responsive.verticalScale(100),
    width: "100%",
    alignItems: "center",
    paddingVertical: Responsive.verticalScale(20),
  },
  amountText: {
    fontWeight: "600",
    fontSize: Responsive.font(5.5),
    color: Color.black,
    marginBottom: Responsive.verticalScale(4),
  },
  otherText: {
    color: Color.black,
    fontSize: Responsive.font(4),
  },
  bottomView: {
    flexDirection: "row",
    paddingVertical: Responsive.verticalScale(8),
    paddingHorizontal: Responsive.scale(5),
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontWeight: "500",
    color: Color.black,
    fontSize: Responsive.font(4),
  },
});
