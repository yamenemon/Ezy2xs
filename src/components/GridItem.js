import React , { Components } from 'react';
import { Image,View,TouchableOpacity,TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

const GridItem = (props) =>{


    
    return(
        <View style={[styles.itemContainer, { backgroundColor:props.colorCode}]}>
        <TouchableHighlight style={styles.imageContainer} underlayColor={props.highlightColor} onPress={props.onPress}>
            <Image source={{uri: props.imageName }} style={styles.imageStyle}>
            </Image>
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

