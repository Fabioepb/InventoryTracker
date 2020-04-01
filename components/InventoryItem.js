import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, ToastAndroid } from "react-native";
import { Icon } from "react-native-elements"
import { useNavigation } from '@react-navigation/native';
import IconType from "../constants/TypeIcons"

const InventoryItem = ({ item, deleteItem }) => {
  const navigation = useNavigation()

  const handleDelete = (props) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        "Deleted Item",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    deleteItem(item)
  }

  return (
    <View style={styles.itemContainer}>
      <View>
        <Image
          alt="item-picture"
          style={styles.itemImage}
          source={
            {
              uri: IconType[item.type]
            }
          }
        />
      </View>
      <View style={styles.itemDescription}>
        <View style={styles.itemTitle}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={()=>navigation.navigate("EditItem",{item:item})}
          >
            <Icon 
            name='edit'
              type='font-awesome'
              color='black'
              size={11}
              iconStyle={[styles.buttonText, {marginTop: 5}]}
              />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.itemInfoText}>{item.type}</Text>
          <Text style={styles.itemInfoText}>Quantity: {item.quantity}</Text>
        </View>
      </View>
      <View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    marginBottom: 0,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    borderWidth: 1
  },
  itemDescription: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    alignContent: "space-around",
    width: "75%"
  },
  itemImage: {
    height: 32,
    width: 32,
    padding: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 5
  },
  itemInfoText: {
    fontSize: 14,
    fontWeight: "200",
    color: "gray",
  },
  itemData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "#e63c3c",
    height: 20,
    width: 20,
    position: "absolute",
    right: -13,
    borderTopRightRadius: 5,

  },
  buttonText: {
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 0
  },
  itemTitle: {
    display: "flex",
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "gray",
    height: 20,
    width: 20,
    position: "absolute",
    right: 7,
  }
});

export default InventoryItem;
