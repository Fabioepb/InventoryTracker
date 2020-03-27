import React from "react";
import {View, StyleSheet, Image, Text} from "react-native";

const InventoryItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Image
          alt="item-picture"
          style={styles.itemImage}
          source={
            item.image
              ? item.image
              : {uri:"https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"}
          }
        />
      </View>
      <View style={styles.itemDescription}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemType}>{item.type}</Text>
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
    backgroundColor: "lightgray",
    borderRadius: 5
  },
  itemDescription: {
      height:"100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    alignContent: "space-around",
  },
  itemImage: {
    height: 32,
    width: 32,
    padding: 30
  },
  itemName:{
      fontSize: 18,
      fontWeight:  "bold",
      paddingTop: 10
  },
  itemType:{
      fontSize: 14,
      fontWeight: "200",
      color:"gray",
      paddingLeft: 10
  }
});

export default InventoryItem;
