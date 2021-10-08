import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
export default function PetaBesar({ navigation, route }) {
  const {
    Tanggal,
    Jam,
    Magnitude,
    Kedalaman,
    Lintang,
    Bujur,
    Coordinates,
    Wilayah,
    Potensi,
  } = route.params;
  const latData = (koordinat) => {
    const str = typeof koordinat === "string" ? koordinat.split(",")[0] : "";
    const lat = Number(str);
    return lat;
  };

  const lonData = (koordinat) => {
    const str = typeof koordinat === "string" ? koordinat.split(",")[1] : "";
    const lon = Number(str);
    return lon;
  };

  //bottom sheet
  const sheetRef = useRef(null);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        height: 350,
      }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={() => sheetRef.current.snapTo(0)}
      >
        <Icon name="angle-up" size={30} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          paddingVertical: 5,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>{Tanggal}</Text>
            <Text>{Jam}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 20, color: "red" }}>
              Gempa Besar
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E5E5E5",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 1,
            width: width * 0.3,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icons
              name="pulse"
              size={30}
              color="red"
              style={{ paddingRight: 5 }}
            />
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{Magnitude}</Text>
          </View>
          <Text>Magnitudo</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: width * 0.3,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialComIcon
              name="radar"
              size={30}
              color="green"
              style={{ paddingRight: 5 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{Kedalaman}</Text>
          </View>
          <Text>Kedalaman</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            width: width * 0.35,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialComIcon name="map-search" size={30} color="red" />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>{Lintang}</Text>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>{Bujur}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            width: width * 0.95,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialComIcon
              name="map-marker-alert"
              size={25}
              color="#FDD017"
            />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={{ color: "grey" }}>Lokasi Gempa</Text>
            <Text style={{ fontSize: 15 }}>{Wilayah}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingBottom: 10,
            width: width * 0.95,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialIcon name="waves" size={25} color="#FDD017" />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={{ color: "grey" }}>Potensi</Text>
            <Text style={{ fontSize: 15 }}>{Potensi}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingBottom: 10,
            width: width * 0.95,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialComIcon
              name="comment-alert-outline"
              size={25}
              color="#FDD017"
            />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={{ color: "grey" }}>Saran</Text>
            <Text style={{ fontSize: 15 }}>
              Hati-hati terhadap gempabumi susulan yang mungkin terjadi
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latData(Coordinates),
            longitude: lonData(Coordinates),
            latitudeDelta: 3,
            longitudeDelta: 8,
          }}
        >
          <Marker
            coordinate={{
              latitude: latData(Coordinates),
              longitude: lonData(Coordinates),
            }}
            image={require("../../Assets/LogoMarker.png")}
            title={Wilayah}
          />
        </MapView>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[350, 165, 165]}
        borderRadius={15}
        renderContent={renderContent}
        initialSnap={1}
      />
    </>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
