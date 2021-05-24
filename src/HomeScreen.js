import React, {Component} from 'react';
import {FlatList,ActivityIndicator, Text, TouchableOpacity, StyleSheet, View, Image, Dimensions} from 'react-native';
import {Header, Body,Title, Container} from 'native-base'

const windowWidth = Dimensions.get('window').width;


class HomeScreen extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    };


    componentDidMount(){
        console.log("fetch_data")
        this.fetch_data()
    }

    fetch_data = () => {
    
        fetch('https://newsapi.org/v2/sources?apiKey=d29d58aab88d4ea0b04ddb245a230068', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("class" + JSON.stringify(responseJson))
            this.setState({data: responseJson.sources})
            console.log("fetched");
            this.setState({loading: false})
        })
        .catch((error) => {
            console.error(error);
        });
    } 

  renderCard(item){
     return(
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('News', 
                { 
                  id: item.id, 
                  description: item.description, 
                  url: item.url, 
                  name: item.name,
                  image: 'https://previews.123rf.com/images/alhovik/alhovik1709/alhovik170900031/86481591-breaking-news-background-world-global-tv-news-banner-design.jpg'
                }
              )}
            >
                <View style={styles.cardContainer}  >
                    <View>
                        <Image
                          source={{uri: 'https://previews.123rf.com/images/alhovik/alhovik1709/alhovik170900031/86481591-breaking-news-background-world-global-tv-news-banner-design.jpg'}}
                          style={styles.imageStyle}
                        />
                    </View>
                    <View style={styles.textContainer} >
                        <Text style={styles.textStyle} >{item.description}</Text> 
                    </View>
                </View>
          </TouchableOpacity>
      )
  }


    render() {
        return (
            <>
            {this.state.loading 
            ?
            <View style={styles.loader} >
                <ActivityIndicator color="#d84315" size={50} />
            </View>
            :
            <View style={styles.container}>
                      
                <View style={{marginTop: 30}}>
                    <FlatList
                        data={this.state.data}
                        key={item => item.id}
                        renderItem={({item}) => this.renderCard(item)}
                    />
                </View>
          
            </View>
            }
            </>
        );
      }
    }


const styles =  StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1, 
        alignItems:'center'
    },
    cardContainer: {
        width: windowWidth-40,
    },
    textContainer: {
        marginTop: 10, 
        marginBottom: 20
    },
    imageStyle: {
        width: windowWidth-40, 
        height: 180
    },
    textStyle: {
        fontSize: 16, 
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1
    }
})


export default HomeScreen;