import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./skjs_config/colors";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
import "./src/Common_utilites/interceptor";
import { useFonts } from "expo-font";
import Spin from "./src/Common_utilites/Spinner";
import Navigation from "./src/Common_utilites/Navigation";
import GlobalFont from "react-native-global-font";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (fontsLoaded) {
    GlobalFont.applyGlobal("Roboto-Regular");
    return (
      <>
        <Provider store={store}>
          <StatusBar backgroundColor={colors.secondaryColor} />
          <Navigation />
          <Spin />
        </Provider>
      </>
    );
  } else {
    return <AppLoading />;
  }
}
