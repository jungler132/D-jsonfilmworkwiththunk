import { View,Text, ScrollView , Image} from 'react-native'
import {connect} from 'react-redux'
import allStyles from '../stylesfilm'
import React from 'react'

class FavoriteList extends React.Component {
    render() {
        return(
            <ScrollView style={{flex:1 , backgroundColor:'teal'}}>
                <Text style={{fontSize:25 , color:"white"}}>
                    Favorite Movie List :
                </Text>
                {this.props.favData?.map((item,index) => (
                <View key={index} style={allStyles.styles.mappedPieceViewStyle}>
                <Image source={{uri: item.image}} style={allStyles.styles.imageSourceStyle}/>
                <Text style={allStyles.styles.movieNameTextStyle}>
                    {item.nameMovie}
                </Text>
                </View>))}
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return { 
        favData : state.reducerFav.favData,
    }
}
export default connect (
    mapStateToProps
)(FavoriteList);