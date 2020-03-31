/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  DrawerLayoutAndroid,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import Homepage from './views/Homepage';
import NewItem from "./views/NewItem";
import EditItem from "./views/EditItem"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from './components/Drawer';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {

    const initialState = async () =>{
      try {
        const storageResult = await AsyncStorage.getItem("data")
        if (storageResult) {
          return setItems(JSON.parse(storageResult))
        }
      } catch (error) {
        console.log("Error loading storage")
      }
      setItems([])
    }

    initialState()
  }, [])

  const addItem = async (newItem) => {
    const newItems = [newItem, ...items];
    setItems(newItems);
    try {
      await AsyncStorage.setItem("data", JSON.stringify(newItems))
    } catch (error) {
      console.log("Error saving")
    }
  }

  const deleteItem = async (item) => {
    const newItems = items.filter(el => el.id !== item.id)
    setItems(newItems)
    try {
      await AsyncStorage.setItem("data", JSON.stringify(newItems))
    } catch (error) {
      console.log("Error saving")
    }
  }

  const resetItems = () => {
    Alert.alert(
      "Delete all items?",
      "This action is irreversible",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            if (Platform.OS === "android") {
              ToastAndroid.showWithGravityAndOffset(
                "All items deleted!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            }
            setItems([])
            await AsyncStorage.removeItem("data")
          }
        }
      ],
      { cancelable: true }
    );
  }

  const editItem = item => {
    setItems(items.map(it => {
      if (it.id === item.id) {
        return item
      }
      return it
    }))
  }

  useEffect(() => {
    if (activeFilter) {
      let newItems = items.filter(el => el.type === activeFilter);
      return setFilteredItems(newItems)
    }
    return setFilteredItems(items)
  }, [activeFilter, items])


  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ height: '100%' }}>
        <DrawerLayoutAndroid
          drawerWidth={200}
          drawerPosition={"left"}
          renderNavigationView={() => <Drawer setFilter={setActiveFilter} resetItems={resetItems} />}
        >
          <Stack.Navigator initialRouteName="Homepage">

            <Stack.Screen name="Homepage" options={{ title: 'Pandemic Inventory' }}>
              {props => <Homepage {...props} item={filteredItems} deleteItem={deleteItem} />}
            </Stack.Screen>

            <Stack.Screen name="NewItem" options={{ title: 'Add a new Item' }}>
              {props => <NewItem {...props} addItem={addItem} />}
            </Stack.Screen>

            <Stack.Screen name="EditItem" options={{ title: 'Edit an existing item' }}>
              {props => <EditItem {...props} editItem={editItem} />}
            </Stack.Screen>

          </Stack.Navigator>
        </DrawerLayoutAndroid>
      </SafeAreaView>
    </NavigationContainer>
  );
};


export default App;
