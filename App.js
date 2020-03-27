/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  FlatList,
  DrawerLayoutAndroid
} from 'react-native';

import InventoryItem from "./components/InventoryItem"


const App: () => React$Node = () => {
  const [items, setItems] = useState([]);

  const addItem = () => setItems([...items, {name:"prueba", type:"food"}]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ height: '100%' }}>
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={"left"}
          renderNavigationView={() => <Text>nothin</Text>}>
          <Text style={styles.title}>Pandemic Inventory</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <InventoryItem item={item}/>
            )}
            keyExtractor={item => Math.random()}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addItem}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </DrawerLayoutAndroid>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: 'lightgray',
    height:50
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 25,
    color: 'white',
  },
});

export default App;
