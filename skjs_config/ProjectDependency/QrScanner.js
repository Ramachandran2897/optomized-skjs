import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner, BarCodeSize } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);
export default function QrScanner({sendScanedData}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const customer = [
    {
      key: "Customer",
      value: "VKJS jwellery, Belly, Anthra Pradesh, +91 9080706050 CID: 126321",
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    sendScanedData(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{height: 200, width: '100%',}}
    >
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, {
          // height: 200,
          // width: 200, marginLeft: deviceWidth/5
        }]}
      />
      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
}
