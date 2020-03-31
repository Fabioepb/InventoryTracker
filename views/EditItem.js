import React, { useState } from "react";
import { Text, TextInput, Button, View, Picker, StyleSheet, Platform, ToastAndroid } from "react-native";
import ItemType from "../constants/ItemTypes"

const EditItem = ({ route, navigation, editItem }) => {
  const { item } = route.params;
  const [itemData, setItemData] = useState(item);

  const handleEdit = () => {
    editItem(itemData)
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        "Item Edited!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    navigation.goBack()
  }

  return (
    <View style={styles.mainContainer}>
      <View >
        <Text>Name</Text>
        <TextInput value={itemData.name} style={styles.input} maxLength={18} placeholder="Ex. Milk" onChangeText={(value) => setItemData({ ...itemData, name: value })} />
      </View >
      <View style={styles.itemType}>
        <Text>Type</Text>
        <Picker
          selectedValue={itemData.type}
          style={styles.input}
          onValueChange={itemValue => setItemData({ ...itemData, type: itemValue })}
        >
          {itemType.map(type => <Picker.Item label={type.label} value={type.label} key={type.label} />)}
        </Picker>
      </View>
      <View>
        <Text>Quantity</Text>
        <TextInput value={itemData.quantity} style={styles.input} keyboardType="number-pad" maxLength={3} onChangeText={(value) => value <= 0 ? setItemData({ ...itemData, quantity: 0 }) : (setItemData({ ...itemData, quantity: value }))} />
      </View>
      <View>
        <Button onPress={handleEdit} title="Edit" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 25,
    paddingRight: 25
  },
  itemType: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15
  }
})

export default React.memo(EditItem);
