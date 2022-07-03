import React, {useEffect, useState} from 'react';
import SafeAreaInsets from 'react-native-static-safe-area-insets';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Text,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import CustomMapView, {Marker} from 'react-native-maps';
import SearchField from '../Components/SearchField';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import getHeight from '../Functions/GetHeight';
const {width, height} = Dimensions.get('window');
let mapRef;
const safeAreaHeight =
  height -
  SafeAreaInsets.safeAreaInsetsTop -
  SafeAreaInsets.safeAreaInsetsBottom;
const venues = [
  {
    name: 'Performing Art Center: Surat',
    address:
      'L.P.Savani Road Near Hari Om Circle Adajan, Pal Gam, Surat, Gujarat 395009',
    location: {latitude: 21.201287, longitude: 72.785121},
    isFavorite: false,
  },
  {
    name: 'Surat International Exhibition and Convention Centre: Surat',
    address:
      '146/B, Althan Rd, Near Khajod Chowkdi, Sarsana, Surat, Gujarat 395017',
    location: {latitude: 21.123386, longitude: 72.79349},
    isFavorite: false,
  },
];

const playsVenue = [
  {
    name: 'Gandhi Smruti Bhavan',
    address:
      'Timiliyawad Rd, Near Mahavir Hospitals, Opp. Kanaknidhi appartment, Nanpura, Surat, Gujarat 395001',
    location: {latitude: 21.186228, longitude: 72.81409},
    isFavorite: false,
  },
  {
    name: 'Sanjeev Kumar Auditorium',
    address:
      '14, Hazira Rd, Behind Rajhans Theater, Adajan Gam, Pal Gam, Surat, Gujarat 395009',
    location: {latitude: 21.186122, longitude: 72.785109},
    isFavorite: false,
  },
];
const SportVenue = [
  {
    name: 'Pandit Dindayal Upadhyay Indoor Stadium',
    address:
      'Near Ritz Square, Maharaja Agrasen Rd, Meghdoot Society, Athwalines, Athwa, Surat, Gujarat 395001',
    location: {latitude: 21.177176, longitude: 72.801193},
    isFavorite: false,
  },
  {
    name: 'Lalbhai Contractor Stadium',
    address:
      'Surat - Dumas Rd, near Shri Govardhannathji Ki Haveli, Vesu, Surat, Gujarat 395007',
    location: {latitude: 21.155598, longitude: 72.769189},
    isFavorite: false,
  },
];

let temp;
const MapViewScreen = ({navigation, route}) => {
  const [isSortOpen, setSortOpen] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [searchText, setSearchText] = useState('');
  const [isMapLoaded, setMapLoaded] = useState(false);
  const [checkMarkIndex, setCheckMarkIndex] = useState(0);
  const [isShownToast, setShownToast] = useState(false);

  React.useLayoutEffect(() => {
    console.log(route);
    navigation.setOptions({
      title: route.params.plays
        ? route.params.plays
        : route.params.sports
        ? route.params.sports
        : route.params?.venue + 's',
      headerRight: () => (
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              setSortOpen(!isSortOpen);
            }}>
            <Image
              source={require('../assets/images/icon/navigation/sort.png')}
              style={navigationImageStyle}
              width={width * 0.06}
              height={width * 0.06}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
          {checkMarkIndex !== 0 && <View style={redView} />}
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, isSortOpen]);

  const [animatingValue] = useState(new Animated.Value(0));
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        const latitude = location.latitude;
        const longitude = location.longitude;
        temp = route.params?.plays
          ? playsVenue
          : route.params.sports
          ? SportVenue
          : venues;
        temp.forEach((item) => {
          const ans = convertToKM(item, location);
          item.km = ans;
        });

        setLocation({
          latitude,
          longitude,
        });
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isMapLoaded) {
      mapAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapLoaded]);
  useEffect(() => {
    console.log('called', isSortOpen);
    if (isSortOpen) {
      Animating();
    } else {
      closeAnimating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSortOpen]);

  const Animating = () => {
    console.log(isSortOpen);

    Animated.timing(animatingValue, {
      toValue: Platform.OS === 'ios' ? safeAreaHeight * 0.25 : height * 0.25,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const closeAnimating = () => {
    Animated.timing(animatingValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const mapAnimation = () => {
    let initialRegion = Object.assign({}, temp[0].location);
    initialRegion.latitudeDelta = 0.01;
    initialRegion.longitudeDelta = 0.01;
    mapRef && mapRef.animateToRegion(initialRegion, 1500);
  };

  const {
    safeAreaView,
    mainView,
    navigationImageStyle,
    searchView,
    mapView,
    flatListView,
    addressText,
    bottomRenderView,
    heartStyle,
    kmText,
    leftView,
    middleView,
    renderView,
    rightView,
    topRenderView,
    venueText,
    sortingContainerView,
    sortingDetailText,
    sortingHeadingText,
    sortingHeadingView,
    sortingImageStyle,
    sortingLeftView,
    sortingMiddleView,
    sortingRightView,
    sortingView,
    redView,
    toastText,
    toastViewStyle,
  } = styles;

  const toastView = () => {
    setTimeout(() => {
      setShownToast(false);
    }, 3000);
    return (
      <View style={toastViewStyle}>
        <Text style={toastText} numberOfLines={0}>
          Distance shown you is measure in a straight line from your current
          location
        </Text>
      </View>
    );
  };

  const _MapView = () => {
    if (location) {
      return (
        <CustomMapView
          style={[mapView, checkMarkIndex !== 0 && {height: 0}]}
          ref={(ref) => {
            mapRef = ref;
          }}
          initialRegion={{
            latitude: location && location.latitude,
            longitude: location && location.longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.421,
          }}
          zoomEnabled={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          showsUserLocation={true}
          onMapReady={() => Platform.OS === 'ios' && setMapLoaded(true)}
          onMapLoaded={() => Platform.OS === 'android' && setMapLoaded(true)}>
          {temp.map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={item.location}
                title={item.name}
                onCalloutPress={() =>
                  navigation.navigate('DetailsMapScreen', {venue: item})
                }
              />
            );
          })}
        </CustomMapView>
      );
    }
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <Animated.View style={[sortingView, {height: animatingValue}]}>
        <View style={sortingHeadingView}>
          <Text style={sortingHeadingText}>SORT VENUE BY</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheckMarkIndex(0);
            setSortOpen(false);
          }}>
          <View style={sortingContainerView}>
            <View style={sortingLeftView}>
              <Image
                source={require('../assets/images/default.png')}
                style={sortingImageStyle}
                resizeMode={'contain'}
              />
            </View>
            <View style={sortingMiddleView}>
              <Text style={sortingDetailText}>Default</Text>
            </View>

            <View style={sortingRightView}>
              {checkMarkIndex === 0 && (
                <Image
                  source={require('../assets/images/checkmark.png')}
                  style={sortingImageStyle}
                  resizeMode={'contain'}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (checkMarkIndex !== 1) {
              setShownToast(true);
            }
            setCheckMarkIndex(1);
            setSortOpen(false);
          }}>
          <View style={sortingContainerView}>
            <View style={sortingLeftView}>
              <Image
                source={require('../assets/images/markerSort.png')}
                style={sortingImageStyle}
                resizeMode={'contain'}
              />
            </View>
            <View style={sortingMiddleView}>
              <Text style={sortingDetailText}>Nearest Location</Text>
            </View>
            <View style={sortingRightView}>
              {checkMarkIndex === 1 && (
                <Image
                  source={require('../assets/images/checkmark.png')}
                  style={sortingImageStyle}
                  resizeMode={'contain'}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCheckMarkIndex(2);
            setSortOpen(false);
          }}>
          <View style={sortingContainerView}>
            <View style={sortingLeftView}>
              <Image
                source={require('../assets/images/sorting.png')}
                style={sortingImageStyle}
                resizeMode={'contain'}
              />
            </View>
            <View style={sortingMiddleView}>
              <Text style={sortingDetailText}>Alphabetical Order</Text>
            </View>
            <View style={sortingRightView}>
              {checkMarkIndex === 2 && (
                <Image
                  source={require('../assets/images/checkmark.png')}
                  style={sortingImageStyle}
                  resizeMode={'contain'}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>

      <View
        style={[mainView, isSortOpen && {opacity: 0.5}]}
        pointerEvents={isSortOpen ? 'none' : 'auto'}>
        <View style={searchView}>
          <SearchField
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeHolder={'Search by venue or area'}
          />
        </View>
        <FlatList
          data={
            checkMarkIndex === 0
              ? temp
              : checkMarkIndex === 1
              ? temp.sort((item, item2) => item.km > item2.km)
              : temp.sort((item, item2) => item.name > item2.name)
          }
          style={flatListView}
          ListHeaderComponent={_MapView()}
          bounces={false}
          ListHeaderComponentStyle={[
            mapView,
            checkMarkIndex !== 0 && {height: 0},
          ]}
          keyExtractor={(item, index) => index + ''}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('DetailsMapScreen', {venue: item})
                }>
                <View style={renderView}>
                  <View style={topRenderView}>
                    <View style={leftView}>
                      <Image
                        source={
                          item.isFavorite
                            ? require('../assets/images/heart.png')
                            : require('../assets/images/emptyHeart.png')
                        }
                        style={heartStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={middleView}>
                      <Text style={venueText}>{item.name}</Text>
                    </View>
                    <View style={rightView}>
                      <Text style={kmText}>{item.km + ' KM'}</Text>
                    </View>
                  </View>
                  <View style={bottomRenderView}>
                    <Text style={addressText} numberOfLines={2}>
                      {item.address}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        {isShownToast && toastView()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  navigationImageStyle: {
    width: width * 0.06,
    height: height * 0.06,
    marginRight: width * 0.03,
  },
  redView: {
    width: width * 0.02,
    height: width * 0.02,
    backgroundColor: 'red',
    borderRadius: width * 0.01,
    position: 'absolute',
    right: width * 0.027,
    top: Platform.OS === 'ios' ? '2%' : '20%',
  },
  searchView: {
    height: getHeight(8, true),
    width,
  },
  mapView: {
    width,
    height: Platform.OS === 'ios' ? safeAreaHeight * 0.35 : height * 0.35,
  },
  flatListView: {
    height: '92%',
    width,
  },
  renderView: {
    width,
    // height: width * 0.22,
    alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.lightBlack,
  },
  topRenderView: {
    width: '90%',
    // height: '50%',
    flexDirection: 'row',
    paddingTop: width * 0.03,
    // alignItems: 'center',
  },
  leftView: {
    width: '10%',
    // height: '100%',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: width * 0.006,
  },
  middleView: {
    width: '70%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: width * 0.01,
  },
  rightView: {
    width: '20%',
    // height: '100%',
    // justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: width * 0.008,
  },
  heartStyle: {
    height: width * 0.05,
    width: width * 0.05,
  },
  venueText: {
    fontSize: normalize(13),
    color: Colors.blue,
    fontWeight: '500',
  },
  kmText: {
    color: Colors.lightBlack,
    fontSize: normalize(12),
  },
  bottomRenderView: {
    width: '72%',
    // height: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingRight: width * 0.06,
    paddingBottom: width * 0.03,
    paddingTop: width * 0.008,
    // backgroundColor:'green'
  },
  addressText: {
    color: 'gray',
    fontSize: normalize(11),
  },
  sortingView: {
    height: 0,
    width,
  },
  sortingHeadingView: {
    height: '16%',
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortingContainerView: {
    width,
    height: '28%',
    flexDirection: 'row',
  },
  sortingLeftView: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortingMiddleView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  sortingRightView: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortingImageStyle: {
    height: '50%',
    width: '50%',
  },
  sortingHeadingText: {
    color: Colors.lightBlack,
    fontSize: normalize(15),
  },
  sortingDetailText: {
    color: Colors.lightBlack,
    fontSize: normalize(14),
  },
  toastViewStyle: {
    backgroundColor: 'black',
    width: width * 0.8,
    height: width * 0.15,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? safeAreaHeight * 0.1 : height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    alignSelf: 'center',
    borderRadius: width * 0.025,
  },
  toastText: {
    color: 'white',
    fontSize: normalize(12),
    textAlign: 'center',
    fontWeight: '400',
  },
});

const convertToKM = (item, location) => {
  let lat = item.location.latitude * 57.29577951;
  let log = item.location.longitude * 57.29577951;
  let curlat = location && location.latitude / 57.29577951;
  let curlog = location && location.longitude / 57.29577951;
  let dlat = Math.abs(curlat - lat);
  let dlog = Math.abs(curlog - log);
  let ans =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat) * Math.cos(curlat) * Math.pow(Math.sin(dlog / 2), 2);
  ans = 2 * Math.asin(Math.sqrt(ans));
  ans = ans * 6371;
  return (ans / 1000).toFixed(2);
};
export default MapViewScreen;
