import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import { AuthContext } from "../../Context";

export default function AboutScreen({ navigation }) {

  const [isLogin, setIsLogin] = useContext(AuthContext);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User Berhasil Logout");
        setIsLogin(false)
      });
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = firebase.auth().currentUser;
    setUser(userInfo);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.portofolioCntainer}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon name="user" size={200} color="black" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {user.email}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Image
                source={require("../../Assets/Logo.png")}
                style={styles.logoStyle}
              />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: "700", fontSize: 20 }}>
                Tentang SanberShake
              </Text>
              <Text style={{ fontSize: 16, textAlign: "justify" }}>
                SanberShake merupakan aplikasi untuk memberikan informasi
                mengenai gempabumi terkini, besar, dan dirasakan di wilayah
                Indonesia dari data terbuka BMKG{" "}
              </Text>
            </View>
            <View style={{ padding: 15 }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: "#22577A",
                }}
                onPress={() => Linking.openURL("https://data.bmkg.go.id/")}
              >
                <Text style={{ fontSize: 15, color: "white" }}>
                  Data Terbuka BMKG
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#22577A",
              marginVertical: 10,
              flexDirection: "row",
              width: windowWidth * 0.3,
            }}
            onPress={logout}
          >
            <Icons name="logout" size={25} color="white" />
            <Text style={{ fontSize: 15, color: "white", fontWeight: "700" }}>
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  portofolioCntainer: {
    width: 350,
    height: 200,
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 10,
  },
  aboutContainer: {
    width: 350,
    height: windowHeight*0.42,
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 10,
  },
  logoStyle: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
