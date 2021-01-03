import React, { Component } from 'react';
import allStyles from '../stylesfilm'
import { View,Text, ScrollView, TouchableOpacity, TextInput, Image, Modal, ImageBase} from 'react-native';
import {connect} from 'react-redux'
import {setMovieName , setDataBase , setFavFilm} from '../actions/actionone'
import reducerMovie from '../redusers/reducerone'
import reducerFav from '../redusers/reducertwo'

class ViewStyle extends React.Component {
    noImg = "https://thumbs.dreamstime.com/b/no-image-available-icon-vector-illustration-flat-design-140476186.jpg"
    componentDidMount(){
        this.getMovieData()
    }
    getMovieData = async () => {
        try{
            const answer = await fetch(`http://api.tvmaze.com/search/shows?q=${this.props.movieName}`)
            const dataBase = await answer.json()
            this.props.setDataForSearch(dataBase)
        }
        catch (e){
            console.log("ERROR INCORRECT URL")
        }
    }
    render() {
        return (
            <View style={allStyles.styles.mainScreenFilmFlex}> 
                <View style={allStyles.styles.mainScreenTopStyle}>
                <TouchableOpacity onPress={() => this.getMovieData()} style={allStyles.styles.touchOpPTF}>
                    <Text style={allStyles.styles.touchOpPTFTextStyle}>
                    PUSH TO FIND
                    </Text>
                </TouchableOpacity>
                <TextInput onChangeText={text => this.props.nameForSearch(text)} placeholder="Tap here" placeholderTextColor="teal" style={allStyles.styles.textInputtouchOpStyle}/>
                </View >
                <View style={allStyles.styles.searchPanelViewStyle}>
                <ScrollView style={{flex:1}}>
                <Text style={allStyles.styles.searchPanelTextStyle}>
                    SEARCH RESULTS :
                </Text>
                {this.props.dataBase?.map((item,index) => (
                <View key={index} style={allStyles.styles.mappedPieceViewStyle}>
                <Image source={{uri: item?.show?.image?.medium ?? this.noImg}} style={allStyles.styles.imageSourceStyle}/>
                <Text style={allStyles.styles.movieNameTextStyle}>
                    {item.show.name}
                </Text>
                <TouchableOpacity  onPress={() => this.props.setFavDataAdd(item?.show?.image?.medium ?? this.noImg , item.show.name)}style={{backgroundColor:"white" , borderRadius:45}}>
                    <Text>
                    add to favorite
                    </Text>
                </TouchableOpacity>
                </View>))}
                </ScrollView>
                </View >
            </View>
        );
    }
}
function mapStateToProps(state) {
    return { 
        movieName : state.reducerMovie.movie,
        dataBase : state.reducerMovie.arrayDataBase,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        nameForSearch:(movie) => dispatch(setMovieName(movie)),
        setDataForSearch:(dataBase) => dispatch(setDataBase(dataBase)),
        setFavDataAdd:(image , nameMovie) => dispatch(setFavFilm(image , nameMovie))
    }
}
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ViewStyle);