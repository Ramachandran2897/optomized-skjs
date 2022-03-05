import React, { createRef, useState } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
const deviceHeight = Math.round(Dimensions.get("window").height);
import { CustomPrimaryTextinput } from "../../../../skjs_config/CustomComponents/CustomTextInput";
import { CustomSecondaryButton } from "../../../../skjs_config/CustomComponents/CustomButton";
import { styles } from "../Cresencial_moduleStyles/landingPageStyles";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomErrorComponent } from "../../../../skjs_config/CustomComponents/CustomText";
import LoginAction from "../../../Redux/Login/LoginAction";
import store from "../../../Redux/store";
function LoginLandingPage(props) {
  const [passwordTextVisible, setpasswordTextVisible] = useState(false);
  //validation starts
  const usernameRef = createRef(null);
  const passwordRef = createRef(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("values", values.username, values.password);
    store.dispatch(LoginAction(values.username, values.password));
  };

  const validationYup = Yup.object({
    username: Yup.string()
      .required("Usename cannot be empty")
      .min(6, `Usename must be at least 6 char`)
      .max(20, `Usename not greater than 20 char`),
    password: Yup.string()
      .required("Password cannot be empty")
      .min(6, `Password must be at least 6 char`)
      .max(15, `Password not greater than 15 char`),
  });
  //validation ends

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ margin: 40 }}>
          <Image source={require(`../../../../assets/images/logo.png`)} />
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationYup}
        >
          {(formik) => {
            const {
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              isSubmitting,
              loggingIn,
              dirty,
            } = formik;
            return (
              <>
                <View style={styles.textField}>
                  <CustomPrimaryTextinput
                    placeholder={"Enter Username"}
                    ref={usernameRef != null && usernameRef}
                    returnKeyType="next"
                    onBlur={handleBlur("username")}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    onChangeText={handleChange("username")}
                    maxLength={20}
                  />
                  {errors.username && touched.username && (
                    <CustomErrorComponent errormessagename={errors.username} />
                  )}
                </View>
                <View style={styles.textField}>
                  <CustomPrimaryTextinput
                    placeholder={"Enter Password"}
                    ref={passwordRef}
                    secureTextEntry={!passwordTextVisible}
                    autoCorrect={false}
                    returnKeyType="done"
                    onBlur={handleBlur("password")}
                    onSubmitEditing={handleSubmit}
                    onChangeText={handleChange("password")}
                    setpasswordTextVisible={setpasswordTextVisible}
                    passwordTextVisible={passwordTextVisible}
                    enablePasswordIcon={true}
                    maxLength={15}
                  />
                  {errors.password && touched.password && (
                    <CustomErrorComponent errormessagename={errors.password} />
                  )}
                </View>
                <View style={{ margin: 20 }}>
                  <CustomSecondaryButton
                    name={"Login"}
                    onPress={handleSubmit}
                    // refetch
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}

export default LoginLandingPage;
