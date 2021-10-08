import React, {useEffect} from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace("LoginScreen")
        }, 2000)
    }, [navigation])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: windowWidth * 0.9, height: windowHeight * 0.12 }}
        source={require("../../Assets/Logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
