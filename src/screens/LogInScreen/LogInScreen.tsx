// Library Imports
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
// Relative Imports
import { AppButton, AppContainer, AppTextInput } from "../../components";
import { Color, Responsive, Screen } from "../../utils";
import { Auth } from "../../firebase";

interface LogInScreenProps {
  navigation: any;
  route: any;
}

const LogInScreen: React.FC<LogInScreenProps> = (props) => {
  const { navigation, route } = props;
  const [email, setEmail] = useState(route?.params?.email || "");
  const [password, setPassword] = useState("");

  const onPressSubmit = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    Auth.signIn({ email, password, navigation });
  };
  const onPressSignUp = () => {
    navigation.replace(Screen.SignUpScreen);
  };

  return (
    <AppContainer>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{"LogIn"}</Text>
        <AppTextInput
          placeholder={"Enter Email"}
          value={email}
          onChangeText={(t) => setEmail(t)}
        />
        <AppTextInput
          placeholder={"Enter Password"}
          value={password}
          isPassword={true}
          onChangeText={(t) => setPassword(t)}
        />
        <AppButton title={"LogIn"} onPress={onPressSubmit} style={styles.btn} />
        <Text style={styles.bottomText}>
          {"Don't have an account? "}
          <Text style={styles.loginText} onPress={onPressSignUp}>
            {"SignUp"}
          </Text>
        </Text>
      </View>
    </AppContainer>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: Responsive.font(7),
    fontWeight: "bold",
    color: Color.themeOrange,
    paddingBottom: Responsive.verticalScale(40),
  },
  bottomText: {
    color: Color.black,
    fontSize: Responsive.font(4),
  },
  loginText: {
    color: Color.themeBlue,
    fontSize: Responsive.font(4),
    fontWeight: "bold",
  },
  btn: {
    marginTop: Responsive.verticalScale(25),
    marginBottom: Responsive.verticalScale(15),
  },
});
