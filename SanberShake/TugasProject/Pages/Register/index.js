import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

const TombolMasuk = ({ title }) => {
  return <Text style={styles.textMasuk}>{title}</Text>;
};

const TombolDaftar = ({ title, nav }) => {
  return <Text style={styles.textDaftar}>{title}</Text>;
};

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyA05AQ9SG-vAE8JkgqOh_tMWJdgoLofGYs",
    authDomain: "authrn-2ad97.firebaseapp.com",
    projectId: "authrn-2ad97",
    storageBucket: "authrn-2ad97.appspot.com",
    messagingSenderId: "188112590377",
    appId: "1:188112590377:web:e10d9b0b295302acf32e38",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const submit = () => {
    const data = {
      email,
      password,
    };
    console.log(data);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Register berhasil");
        Alert.alert("Berhasil Registrasi");
        navigation.navigate("LoginScreen");
      })
      .catch(() => {
        Alert.alert("Gagal Registrasi");
        console.log("Register Gagal");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../Assets/Logo.png")}
          style={styles.logoStyle}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.styleText}>Register</Text>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={{ paddingTop: 15 }}>
            <TextInput
              style={styles.coloumnText}
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <TextInput
              style={styles.coloumnText}
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingTop: 30,
            alignItems: "center",
            height: 50,
          }}
        >
          <View style={{ paddingBottom: 15 }}>
            <TouchableOpacity style={styles.buttonMasuk} onPress={submit}>
              <TombolMasuk title="DAFTAR" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingBottom: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Sudah Punya Akun?
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonDaftar}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <TombolDaftar title="MASUK" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 110,
  },
  logoStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.12,
  },
  styleText: {
    fontSize: 26,
    paddingLeft: 52,
    paddingTop: 60,
    color: "#003366",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  coloumnText: {
    width: 311,
    height: 46,
    borderRadius: 8,
    backgroundColor: "#D0D0D0",
    paddingLeft: 15,
    fontSize: 18,
  },
  buttonMasuk: {
    borderWidth: 1,
    height: 51,
    width: 311,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#22577A",
    borderColor: "#22577A",
  },
  buttonDaftar: {
    borderWidth: 1,
    height: 51,
    width: 311,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#22577A",
  },
  textMasuk: {
    color: "white",
    fontWeight: "600",
    fontSize: 22,
  },
  textDaftar: {
    color: "black",
    fontWeight: "600",
    fontSize: 22,
  },
});
