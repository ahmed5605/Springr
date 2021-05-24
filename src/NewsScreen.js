import React, {Component} from 'react';
import { Text, 
    ScrollView, 
    ActivityIndicator, 
    StyleSheet, 
    Alert, 
    TouchableOpacity, 
    Dimensions, 
    Image, 
    View, 
    PermissionsAndroid, 
    ToastAndroid
  } from 'react-native';

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const windowWidth = Dimensions.get('window').width;

class NewsScreen extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            url: '',
            name: '',
            image: '',
            loading: true
        }
    };


    componentDidMount(){
     
        const id = this.props.route.params.id;
        const description = this.props.route.params.description;
        const url = this.props.route.params.url;
        const name = this.props.route.params.name;
        const image = this.props.route.params.image;

        this.setState({
            id: id,
            description: description,
            url: url,
            name: name,
            image: image
        })

        setTimeout(() => {
          this.setState({loading: false})
        }, 1000);

    }

    async request_storage_runtime_permission ()  {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                'title': 'ReactNativeCode Storage Permission',
                'message': 'ReactNativeCode App needs access to your storage to download Photos.'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Storage Permission Granted.")
             // Alert.alert("Storage Permission Granted.");
            }
            else {
              console.log("Storage Permission Not Granted.")
              Alert.alert("Storage Permission Not Granted");
         
            }
          } catch (err) {
            console.warn(err)
          }
    }

    downloadImage() {

        this.request_storage_runtime_permission()

        var date = new Date();
        var image_URL = this.state.image;
        var ext = this.getExtention(image_URL);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: PictureDir + "/image_" + Math.floor(date.getTime()
              + date.getSeconds() / 2) + ext,
            description: 'Image'
          }
        }
        config(options).fetch('GET', image_URL).then((res) => {
          this.showSavedToast()
        });
      }
     
      
    getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
          undefined;
    }


    onShareUrl() {
      Share.open({
        url: this.state.url
      });
    }

    showSavedToast = () => {
      ToastAndroid.showWithGravity(
        'Image saved successfully to your device.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    };



  render() {

    return (

          <>
              {this.state.loading 
              ?
              <View style={styles.loader} >
                  <ActivityIndicator color="#d84315" size={50} />
              </View>
              :
              <View style={styles.container} > 
                  <ScrollView>     
                          <View style={styles.cardContainer} >
                  
                                <View style={styles.imageContainer} >
                                      <Image
                                          source={require('../assets/news.jpeg')}
                                          style={styles.image}
                                      />
                                </View>



                                <View style={styles.saveImageContainer} >
                                      <TouchableOpacity 
                                          style={styles.saveImageStyle} 
                                          onPress={() => this.downloadImage()}    
                                      >
                                          <Text>Save Image</Text>
                                      </TouchableOpacity>
                                </View>


                                <View style={{marginTop: 10}} >
                                    <Text style={styles.titleStyle} >{this.state.name}</Text> 
                                </View>


                                <View style={styles.shareContainer} >
                                    <Text style={styles.shareStyle}  >Billy Bambrough</Text> 
                                
                                    <TouchableOpacity 
                                        style={styles.imageStyle}
                                        onPress={() => this.onShareUrl()}   
                                    >
                                      <Image
                                        source={require('../assets/share.png')}
                                        style={styles.imageStyle}
                                      />
                                    </TouchableOpacity>

                                    <Text style={styles.shareStyle}  >6 July, 2020</Text> 
                                </View>

                                <View style={styles.descriptionContainer} >
                                      <Text style={[styles.descriptionStyle]}  >{this.state.description}</Text> 

                                      <Text style={[styles.descriptionStyle], {marginTop: 20}} >The coronavirus pandemic has caused on unprecedented global economic crisis, not unlik the 2008 global financial crisis that led to bitcoin's creation.</Text> 

                                      <Text style={[styles.descriptionStyle], {marginTop: 20}} >A number od investors have turned to bitcoin in recent months to combt the inflation they see coming as a result of the unprecedented coronavirus stimulus measures the U.S. Federal Reserve and other central banks have pumped into the system.</Text> 
                                  </View>
                          </View>
                    </ScrollView>
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
      marginTop: 20
  },
  imageContainer: { 
      borderWidth: 1, 
      borderColor: 'black'
  },
  saveImageContainer: {
      justifyContent: 'center', 
      alignItems: 'center'
  },
  shareContainer: {
      marginTop: 10, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
  },
  descriptionContainer: {
      marginTop: 25
  },
  titleStyle: {
      fontSize: 26, 
      fontWeight: '700', 
      color: 'black'
  },
  image: {
      width: windowWidth-40
  },
  imageStyle: {
      height: 20, 
      width: 20
  },
  saveImageStyle: {
      height: 40, 
      width: 100,
      borderRadius: 4, 
      marginTop: 10, 
      borderWidth: 1, 
      borderColor: 'black', 
      justifyContent: 'center', 
      alignItems: 'center'
  },
  descriptionStyle: {
      fontSize: 16, 
      fontWeight: 'bold', 
      color: 'black'
  },
  shareStyle: {
      fontSize: 16, 
      color: '#999999', 
      fontWeight: 'bold'
  },
  loader: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 1
  }
})

export default NewsScreen;
