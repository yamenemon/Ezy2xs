import React , { Components } from 'react';
import { Image,View,TouchableHighlight, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'


const GridItem = (props) =>{


    
    return(
        <View style={[styles.itemContainer, { backgroundColor:props.colorCode}]}>
        <TouchableHighlight style={styles.imageContainer} underlayColor={props.highlightColor} onPress={props.onPress}>
        <Icon
        size={40}
            name={props.imageName}
            type='font-awesome'
            color='#fff'
           />
        </TouchableHighlight>
        </View>
    );
    


}

styles = {
    itemContainer: {
        marginTop: 10,
        borderRadius: 5,
        height: 100,
        width: 110
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        borderRadius: 5,
        alignSelf: "stretch",
        

      },
      imageStyle: {
        width: 40,
        height: 40,

      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      },
};

export default GridItem;

