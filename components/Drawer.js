import React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import ItemTypes from "../constants/ItemTypes"

const Drawer = (props) => {
    return (
        <View>
           <View style={styles.filterSeparator}>
            <Text style={styles.filterText}>Filter By:</Text>
           </View>
            <FlatList
                data={ItemTypes}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>props.setFilter(item.label)} style={styles.filterItem}>
                        <Text style={styles.filterItemText}>{item.label}</Text>
                    </TouchableOpacity>
                    )}
                keyExtractor={item => item.label}
            />
            <TouchableOpacity onPress={()=>props.setFilter("")} style={styles.clearFilter}>
                <Text style={styles.filterItemText}>Clear filter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.resetItems} style={styles.deleteItems}>
                <Text style={styles.deleteItemsText}>Clear all items</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    filterText:{
        fontWeight: "bold",
        fontSize: 22,
        paddingLeft: 10
    },
    filterSeparator:{
        backgroundColor: "lightgray",
        paddingTop: 12,
        paddingBottom: 12,
    },
    filterItem:{
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: "lightgray"
    },
    filterItemText:{
        fontSize: 18,
        fontWeight: "400",
        paddingLeft: 25
    },
    clearFilter:{
        backgroundColor: "lightgray",
        paddingTop: 10,
        paddingBottom: 10,
    },
    deleteItemsText:{
        fontSize: 18,
        fontWeight: "400",
        paddingLeft: 25,
        color:"white"
    },
    deleteItems:{
        backgroundColor: "#e63c3c",
        paddingTop: 10,
        paddingBottom: 10,
    }
})
export default Drawer