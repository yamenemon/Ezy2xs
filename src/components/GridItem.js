import React , { Components } from 'react';
import { Platform,View,TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ratio = SCREEN_HEIGHT/SCREEN_WIDTH;
const GridItem = (props) =>{
    return(
        <View style={[styles.itemContainer, { backgroundColor:props.colorCode}]}>
        <TouchableHighlight style={styles.imageContainer} underlayColor={props.highlightColor} onPress={props.onPress}>
        <Icon
        size={Platform.isPad||ratio<=1.6?80:40}
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
        marginTop: Platform.isPad||ratio<=1.6?20:10,
        marginLeft: Platform.isPad||ratio<=1.6?10:0,
        borderRadius: Platform.isPad||ratio<=1.6?10:5,
        height: Platform.isPad||ratio<=1.6?210:100,
        width: Platform.isPad||ratio<=1.6?(SCREEN_WIDTH-80)/3:110
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

