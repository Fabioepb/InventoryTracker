import React, { useState } from "react";
import { Text, TextInput, Button, View, Picker, StyleSheet, Platform, ToastAndroid, Image } from "react-native";
import UUIDGenerator from 'react-native-uuid-generator';
import itemType from "../constants/ItemTypes"
import IconType from "../constants/TypeIcons"

const NewItem = props => {
  const [itemData, setItemData] = useState({ name: "", type: "Miscellaneous", quantity: "1", id: '' });

  const addItem = async () => {
    const newId = await UUIDGenerator.getRandomUUID()
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        "New item Added!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    props.navigation.goBack()
    await props.addItem({ ...itemData, id: newId })
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.ImgView}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: IconType[itemData.type],
            }}
          />
        </View>
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
        <Button onPress={addItem} title="Add" />
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
  },
  tinyLogo: {
    height: 80,
    width: 80,
  },
  ImgView:{
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default React.memo(NewItem);
