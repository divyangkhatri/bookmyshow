import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  Image,
  SectionList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import GetHeight from '../Functions/GetHeight';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import CustomMapView, {Marker} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
let mapRef;
const data = [
  {
    key: 'Events At This Venue',
    data: [
      {
        key: '11',
        name: 'One Mic Stand',
        category: ['Comedy Shows', 'Performances'],
        date: '23',
        day: 'Fri',
        month: 'JUN',
        venue: 'Performing Art Center: Surat',
        image: require('../assets/images/oneMicStandHorizontal.jpg'),
        isOnwards: false,
        price: 1000,
      },
      {
        key: '12',
        name: 'Sir Sir Sarla',
        image: require('../assets/images/sirsirsarlahorizontal.jpeg'),
        category: ['Comedy'],
        date: '23',
        day: 'SUN',
        month: 'MAY',
        venue: 'Gandhi Smruti Bhavan',
        isOnwards: true,
        price: 999,
      },
      {
        key: '13',
        name: 'Natak Na Natak Nu Natak',
        image: require('../assets/images/natakhorizontal.jpg'),
        category: ['Comedy'],
        date: '30',
        day: 'SUN',
        month: 'MAY',
        venue: 'Gandhi Smruti Bhavan',
        isOnwards: true,
        price: 799,
      },
      {
        key: '14',
        venue: 'Pandit Dindayal Upadhyay Indoor Stadium',
        isOnwards: true,
        price: 799,
        name: 'Chess Championship',
        category: ['Indoor'],
        date: '09',
        day: 'SAT',
        month: 'MAY',
        image: require('../assets/images/chessChampion.jpg'),
      },
    ],
  },
];
let filterData = [];
let venue;
const DetailsMapScreen = ({navigation, route}) => {
  const [isMapLoaded, setMapLoaded] = useState(false);
  const [isLoad, setLoad] = useState(false);

  React.useLayoutEffect(() => {
    filterData = [];
    navigation.setOptions({
      title: route.params.venue.name,
      headerTitleContainerStyle: {
        paddingLeft: 20,
        paddingRight: 10,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route]);

  useEffect(() => {
    if (isMapLoaded) {
      mapAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapLoaded]);
  useEffect(() => {
    venue = route.params.venue.name;
    if (filterData.length === 0) {
      data.forEach((item) => {
        let temp = [];
        item.data.forEach((items) => {
          console.log(items.venue.split(','));
          if (items.venue.split(',')[0] === venue) {
            temp.push(items);
          }
        });
        filterData.push({key: venue, data: temp});
        setLoad(true);
      });
    }

    console.log('dd', filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapAnimation = () => {
    let initialRegion = Object.assign({}, route.params.venue.location);
    initialRegion.latitudeDelta = 0.01;
    initialRegion.longitudeDelta = 0.01;
    mapRef && mapRef.animateToRegion(initialRegion, 1500);
  };

  const {
    safeAreaView,
    mainView,
    mapView,
    addressText,
    addressView,
    headerStyle,
    locationImageStyle,
    locationView,
    venueText,
    renderView,
    buttonText,
    button,
    dateText,
    dayText,
    eventText,
    flatListStyle,
    ImageStyle,
    monthText,
    renderDetailLeftView,
    renderDetailMiddleView,
    renderDetailView,
    renderRightView,
    renderSubDetailView,
    sectionHeaderStyle,
    sectionHeaderTextStyle,
    separatorView,
    eventView,
    venueView,
    categoryView,
    subDetailText,
  } = styles;

  const _MapView = () => {
    const location = route.params.venue.location;
    if (route.params.venue.location) {
      return (
        <View style={headerStyle}>
          <CustomMapView
            style={mapView}
            ref={(ref) => {
              mapRef = ref;
            }}
            initialRegion={{
              latitude: location && location.latitude,
              longitude: location && location.longitude,
              latitudeDelta: 0.922,
              longitudeDelta: 0.421,
            }}
            r
            zoomEnabled={true}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsUserLocation={true}
            onMapReady={() => Platform.OS === 'ios' && setMapLoaded(true)}
            onMapLoaded={() => Platform.OS === 'android' && setMapLoaded(true)}>
            <Marker
              coordinate={route.params.venue.location}
              title={route.params.venue.name}
            />
          </CustomMapView>
          <View style={addressView}>
            <Text style={addressText}>{route.params.venue.address}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              const scheme = Platform.select({
                ios: 'maps:0,0?q=',
                android: 'geo:0,0?q=',
              });
              const latLng = `${route.params.venue.location.latitude},${route.params.venue.location.longitude}`;
              const label = route.params.venue.name;
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              });

              Linking.openURL(url);
            }}>
            <View style={locationView}>
              <Image
                source={require('../assets/images/navigation.png')}
                style={locationImageStyle}
                resizeMode={'cover'}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  };

  const sectionHeader = (item) => {
    return (
      <View style={sectionHeaderStyle}>
        <Text style={sectionHeaderTextStyle}>{item.key}</Text>
      </View>
    );
  };

  const renderedView = (item) => {
    return (
      <View style={renderView}>
        <Image source={item.image} style={ImageStyle} resizeMode={'stretch'} />
        <View style={renderDetailView}>
          <View style={renderDetailLeftView}>
            <Text style={monthText}>{item.month}</Text>
            <Text style={dateText}> {item.date}</Text>
            <Text style={dayText}>{item.day}</Text>
          </View>
          <View style={separatorView} />
          <View style={renderDetailMiddleView}>
            <View style={eventView}>
              <Text style={eventText}>{item.name}</Text>
            </View>
            <View style={venueView}>
              <Text style={venueText} numberOfLines={2}>{item.venue}</Text>
            </View>
          </View>
          <View style={renderRightView}>
            <TouchableOpacity style={button} activeOpacity={1}>
              <Text style={buttonText}>{'BOOK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={renderSubDetailView}>
          <View style={categoryView}>
            <Text style={subDetailText}>{item.category[0]}</Text>
          </View>
          <Text style={subDetailText}>{'₹ ' + item.price + ' Onwards'}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <SectionList
          style={flatListStyle}
          sections={filterData}
          ListHeaderComponent={_MapView()}
          renderSectionHeader={({section}) => sectionHeader(section)}
          renderItem={({item}) => renderedView(item)}
        />
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
  headerStyle: {
    height: GetHeight(35, true),
    width,
    alignItems: 'center',
  },
  mapView: {
    height: '70%',
    width,
  },
  addressView: {
    height: '30%',
    width,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomColor: Colors.lightGray,
    justifyContent: 'center',
  },
  addressText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: normalize(12),
    marginTop: width * 0.03,
  },
  locationView: {
    position: 'absolute',
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '22%',
    backgroundColor: Colors.lightGreen,
    zIndex: 1,
    paddingRight: 4,
    paddingTop: 2,
  },
  locationImageStyle: {
    width: '40%',
    height: '40%',
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  separatorView: {
    height: '66%',
    width: 0.8,
    backgroundColor: Colors.lightBlack,
  },
  sectionHeaderStyle: {
    width: width * 0.95,
    height: width * 0.1,
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  sectionHeaderTextStyle: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  renderView: {
    height: GetHeight(40, true),
    width: width * 0.96,
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    marginVertical: width * 0.02,
  },
  ImageStyle: {
    width: '100%',
    height: '60%',
  },
  renderDetailView: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.25,
  },
  renderSubDetailView: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  renderDetailLeftView: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderDetailMiddleView: {
    width: '55%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  renderRightView: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '35%',
    borderRadius: width * 0.012,
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(15),
    fontWeight: '600',
  },
  monthText: {
    fontSize: normalize(13.5),
    color: Colors.lightGreen,
  },
  dateText: {
    fontSize: normalize(14.5),
  },
  dayText: {
    fontSize: normalize(13),
    fontWeight: '600',
  },
  eventView: {
    width: '100%',
    height: '40%',
  },
  venueView: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
  },
  eventText: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  venueText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  categoryView: {
    borderWidth: 0.3,
    borderColor: 'gray',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 3,
  },
  subDetailText: {
    fontSize: normalize(12.5),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
});
export default DetailsMapScreen;
