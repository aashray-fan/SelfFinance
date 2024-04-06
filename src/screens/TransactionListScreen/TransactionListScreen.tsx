// Library Imports
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
// Relative Imports
import { AppContainer, AppHeader } from "../../components";
import { Color, Images, Responsive, Screen } from "../../utils";
import _ from "lodash";

const TRANSACTION_LIST = "transactions";
const SUMMARY_COLLECTION = "summary";
const FirestoreSummary2024 = firestore()
  .collection(SUMMARY_COLLECTION)
  .doc("2024");
const FirestoreTransactions = firestore().collection(TRANSACTION_LIST);

interface TransactionListScreenProps {
  navigation: any;
}

const TransactionListScreen: React.FC<TransactionListScreenProps> = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const onPressItem = (item: any) => {
    const { navigation } = props;
    navigation.navigate(Screen.TransactionDetailScreen, { item });
  };

  const onPressAdd = () => {
    const { navigation } = props;
    navigation.navigate(Screen.AddTransactionScreen);
  };

  useEffect(() => {
    getTransactionList();
    const subscriber = FirestoreTransactions.onSnapshot(setReceivedData);
    return () => subscriber();
  }, []);

  const getTransactionList = async () => {
    FirestoreTransactions.get().then(setReceivedData);
  };

  const saveSummary = (summary: any) => {
    FirestoreSummary2024.set(summary);
  };

  const calculateSummary = (list) => {
    const totalTransactions = list?.length.toString();
    const totalAmount = _.sumBy(list, (item) => Number(item?.amount))
      .toFixed(2)
      .toString();
    const maxTransaction = _.maxBy(list, (item) => Number(item?.amount));
    const minTransaction = _.minBy(list, (item) => Number(item?.amount));
    saveSummary({
      totalTransactions,
      totalAmount,
      maxTransaction,
      minTransaction,
    });
  };

  const setReceivedData = (transactions: any) => {
    const tempList: any[] | ((prevState: never[]) => never[]) = [];
    transactions.docs.map((doc: any) => tempList.push(doc.data()));
    calculateSummary(tempList);
    setTransactionList(tempList);
  };

  return (
    <AppContainer>
      <AppHeader isAddButton onPressAdd={onPressAdd} />
      <View style={styles.mainContainer}>
        <FlatList
          data={transactionList}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.itemLeftView}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.itemRightTouch}
                  onPress={() => onPressItem(item)}
                >
                  <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
                  <Image
                    source={Images.right}
                    style={styles.rightImg}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </AppContainer>
  );
};

export default TransactionListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(5),
    backgroundColor: Color.themeOrange,
    marginBottom: Responsive.verticalScale(2),
    borderRadius: 5,
  },
  itemLeftView: {
    justifyContent: "center",
    flex: 1,
  },
  itemRightTouch: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: Responsive.font(4),
    color: Color.black,
  },
  amountText: {
    fontSize: Responsive.font(4),
    color: Color.white,
    fontWeight: "700",
  },
  rightImg: {
    height: Responsive.verticalScale(15),
    width: Responsive.scale(10),
    tintColor: Color.white,
    marginLeft: Responsive.scale(5),
  },
});
