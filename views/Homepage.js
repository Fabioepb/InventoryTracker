import React, { useState } from "react";

import {
  FlatList,
  StyleSheet
} from "react-native";
import InventoryItem from "../components/InventoryItem";
import NoItems from "../components/NoItems";
import {Icon} from "react-native-elements"

const Homepage = props => {
  return (
    <>
      {props.item.length > 0 ? (
        <FlatList
          data={props.item}
          renderItem={({ item }) => <InventoryItem item={item} deleteItem={props.deleteItem} />}
          keyExtractor={item => item.id}
        />
      ) : (
          <NoItems/>
        )}
        <Icon
          raised
          name='plus'
          type="font-awesome"
          color="#19b342"
          reverse
          onPress={() => { props.navigation.navigate("NewItem",{title:"test"}) }}
          size={20}
          containerStyle={styles.addButton}
        />
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  addText: {
    fontSize: 20,
    color: "white"
  }
});

export default React.memo(Homepage);
