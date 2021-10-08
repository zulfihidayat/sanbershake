import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AboutScreen,
  Login,
  GempaDirasakan,
  GempaTerkini,
  GempaBesar,
  Splash,
  PetaDirasakan,
  PetaBesar,
  RegisterScreen,
} from "../Pages";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../Context";

const Tab = createBottomTabNavigator();
const Drawwer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Router() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AuthContext.Provider value={[isLogin, setIsLogin]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogin ? (
            <>
              <Stack.Screen name="MainApp" component={MainApp} />
              <Stack.Screen
                name="Gempabumi Dirasakan"
                component={PetaDirasakan}
                options={{
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerTintColor: "white",
                  headerStyle: { backgroundColor: "#22577A" },
                }}
              />
              <Stack.Screen
                name="Gempabumi Besar"
                component={PetaBesar}
                options={{
                  headerShown: true,
                  headerTitleAlign: "center",
                  headerTintColor: "white",
                  headerStyle: { backgroundColor: "#22577A" },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="LoginScreen" component={Login} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const MainApp = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Terkini") {
          return (
            <Icon
              name={focused ? "clock-alert" : "clock-alert-outline"}
              size={size}
              color={color}
            />
          );
        } else if (route.name === "Dirasakan") {
          return (
            <Icon
              name={focused ? "map-marker-radius" : "map-marker-radius-outline"}
              size={size}
              color={color}
            />
          );
        } else if (route.name === "Besar") {
          return (
            <Icon
              name={focused ? "alert-octagon" : "alert-octagon-outline"}
              size={size}
              color={color}
            />
          );
        } else if (route.name === "Profil") {
          return (
            <Icons
              name={focused ? "user-circle" : "user-circle-o"}
              size={size}
              color={color}
            />
          );
        }
      },
      tabBarInactiveTintColor: "gray",
      tabBarActiveTintColor: "#22577A",
      tabBarLabelStyle: {
        fontSize: 13,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#22577A",
      },
    })}
  >
    <Tab.Screen
      name="Terkini"
      component={GempaTerkini}
      options={{ title: "Gempabumi Terkini", tabBarLabel: "Terkini" }}
    />
    <Tab.Screen
      name="Besar"
      component={GempaBesar}
      options={{
        tabBarLabel: "M > 5.0",
        title: "Gempabumi Besar",
      }}
    />
    <Tab.Screen
      name="Dirasakan"
      component={GempaDirasakan}
      options={{ title: "Gempabumi Dirasakan", tabBarLabel: "Dirasakan" }}
    />
    <Tab.Screen name="Profil" component={AboutScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
