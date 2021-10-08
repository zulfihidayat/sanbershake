import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
export default function GempaTerkini() {
  //menampung data dari API
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  //fungsi ambil data
  const getData = async () => {
    try {
      let response = await fetch(
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
      );
      let json = await response.json();
      setData(json.Infogempa.gempa);
      let strLat =
        typeof json.Infogempa.gempa.Coordinates === "string"
          ? json.Infogempa.gempa.Coordinates.split(",")[0]
          : "";
      const lat = Number(strLat);
      let strLon =
        typeof json.Infogempa.gempa.Coordinates === "string"
          ? json.Infogempa.gempa.Coordinates.split(",")[1]
          : "";
      const lon = Number(strLon);
      setLat(lat);
      setLon(lon);
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  //lifecycle
  useEffect(() => {
    getData();
  }, []);

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
        height: 400,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Icon name="angle-up" size={30} />
      </View>
      <View
        style={{
          flexDirection: "column",
          paddingVertical: 5,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              {data.Tanggal}
            </Text>
            <Text>{data.Jam}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 20, color: "yellow" }}>
              Gempa Terkini
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
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              {data.Magnitude}
            </Text>
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
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {data.Kedalaman}
            </Text>
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
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {data.Lintang}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {data.Bujur}
              </Text>
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
            <Text style={{ fontSize: 15 }}>{data.Wilayah}</Text>
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
            <Icons name="radio" size={25} color="#FDD017" />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={{ color: "grey" }}>Wilayah Dirasakan (Skala MMI)</Text>
            <Text style={{ fontSize: 15 }}>{data.Dirasakan}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingBottom: 5,
            width: width * 0.95,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialComIcon name="alert-outline" size={25} color="#FDD017" />
          </View>
          <Text style={{ fontSize: 15, paddingLeft: 10 }}>{data.Potensi}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 3,
              longitudeDelta: 8,
            }}
          >
            <Marker
              coordinate={{
                latitude: latData(data.Coordinates),
                longitude: lonData(data.Coordinates),
              }}
              image={require("../../Assets/LogoMarker.png")}
              title={data.Wilayah}
            />
          </MapView>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color="#22577A"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 165, 165]}
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
