// Library Imports
import { StyleSheet, Text, View } from "react-native";
import React from "react";
// Relative Imports
import { AppButton, AppContainer } from "../../components";
import { Color, Responsive, Screen } from "../../utils";

// Interface
interface IntroScreenProps {
  navigation: any;
  route: any;
}

// Component
const IntroScreen: React.FC<IntroScreenProps> = (props) => {
  const { navigation } = props;
  const onPressSignUp = () => {
    console.log("Sign Up");
    navigation.navigate(Screen.SignUpScreen);
  };

  const onPressLogIn = () => {
    console.log("Log In");
  };

  return (
    <AppContainer>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{"SelfFinance"}</Text>
        <AppButton
          title={"SignUp"}
          onPress={onPressSignUp}
          style={styles.btnStyle}
          textStyle={styles.btnTextStyle}
        />
        <AppButton
          title={"LogIn"}
          onPress={onPressLogIn}
          style={styles.btnStyle}
          textStyle={styles.btnTextStyle}
        />
      </View>
      <Text style={styles.rightsText}>
        {"All Rights Reserved "}
        <Text style={styles.appText}>{"@SelfFinance"}</Text>
      </Text>
    </AppContainer>
  );
};

export default IntroScreen;

// Default Props
IntroScreen.defaultProps = {};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: Responsive.font(7),
    color: Color.themeOrange,
    fontWeight: "bold",
    marginBottom: Responsive.verticalScale(50),
    textDecorationLine: "underline",
  },
  btnStyle: {
    backgroundColor: Color.themeBlue,
    width: "65%",
  },
  btnTextStyle: {
    color: Color.white,
  },
  rightsText: {
    color: Color.themeBlue,
    fontSize: Responsive.font(3.5),
    paddingVertical: Responsive.verticalScale(10),
    textAlign: "center",
  },
  appText: {
    color: Color.themeOrange,
    fontWeight: "600",
  },
});
