import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { AppButton, AppContainer, AppTextInput } from "../../components";
import { Color, Responsive, Screen } from "../../utils";
import { Auth } from "../../firebase";

interface SignUpScreenProps {
  navigation: any;
  route: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!name || !email || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    Auth.signUp({ name, email, password, navigation });
  };
  const onPressLogIn = () => {
    navigation.replace(Screen.LogInScreen, { email });
  };

  return (
    <AppContainer>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{"SignUp"}</Text>
        <AppTextInput
          placeholder={"Enter Name"}
          value={name}
          onChangeText={(t) => setName(t)}
        />
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
        <AppButton title={"SignUp"} onPress={onSubmit} style={styles.btn} />
        <Text style={styles.bottomText}>
          {"Already have an account? "}
          <Text style={styles.loginText} onPress={onPressLogIn}>
            {"LogIn"}
          </Text>
        </Text>
      </View>
    </AppContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: "center",
    paddingVertical: Responsive.verticalScale(150),
    // justifyContent: "center",
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
