import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TugasProject from "./TugasProject/index"

export default function App() {
  return (
    <TugasProject/>
  );
}

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//  apiKey: "AIzaSyA05AQ9SG-vAE8JkgqOh_tMWJdgoLofGYs",
//  authDomain: "authrn-2ad97.firebaseapp.com",
//  projectId: "authrn-2ad97",
//  storageBucket: "authrn-2ad97.appspot.com",
//  messagingSenderId: "188112590377",
//  appId: "1:188112590377:web:e10d9b0b295302acf32e38"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
