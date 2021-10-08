import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function GempaBesar({ navigation }) {
  //menampung data dari API
  const [data, setData] = useState([]);

  //fungsi ambil data
  const getData = async () => {
    try {
      let response = await fetch(
        "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json"
      );
      let json = await response.json();
      setData(json.Infogempa.gempa);
    } catch (err) {
      console.error(err);
    }
  };

  //lifecycle
  useEffect(() => {
    getData();
  }, []);

  //render item
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Gempabumi Besar", item)}
        >
          <View
            style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5 }}
          >
            <View
              style={{
                backgroundColor: "red",
                width: 70,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                M {item.Magnitude}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: 270,
                padding: 5,
                paddingLeft: 10,
              }}
            >
              <View style={{ paddingVertical: 5, alignItems: "center" }}>
                <Text>
                  {item.Tanggal} {item.Jam}
                </Text>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <Text style={{ fontWeight: "700" }}>{item.Wilayah}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 20,
              }}
            >
              <Icon name="chevron-forward-outline" size={30} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
