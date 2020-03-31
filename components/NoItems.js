import React from "react";
import {View, Text, StyleSheet} from "react-native"
import {Icon} from "react-native-elements"

const NoItems = () =>{
    return(
        <View style={styles.mainContainer}>
            <Icon
                name='question-circle'
                type='font-awesome'
                color='black'
                size={45}
            />
            <Text style={styles.mainText}>You haven't created any items</Text>
            <Text style={styles.secondaryText}>Add more by pressing on the green button on the bottom right of your screen</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        paddingRight: 10,
        paddingLeft: 10
    },
    mainText:{
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 18
    },
    secondaryText:{
        textAlign:"center",
        fontSize:14,
        color:"gray"
    },
    image:{

    }
})

export default NoItems