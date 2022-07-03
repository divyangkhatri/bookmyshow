import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableWithoutFeedback,
  Switch,
  Modal,
  ActivityIndicator,
  SectionList,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GetHeight from '../Functions/GetHeight';
import {normalize} from '../Functions/normalize';
import Colors from '../assets/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {version} from '../../package';
import 'react-native-vector-icons/AntDesign';
import {SearchBar, Icon} from 'react-native-elements';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

let isLogin;
let mySwitch;
const AccountScreen = ({navigation, route}) => {
  const [myLocation, setLocation] = useState(undefined);
  const [selectedCheckbox, setSelectedCheckbox] = useState(1);
  const [isFood, setFood] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isWhatsapp, setWhatsapp] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tempData1, setTempData1] = useState([]);
  const [tempData2, setTempData2] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
        axios
          .get(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              location.latitude +
              ',' +
              location.longitude +
              '&key=' +
              'AIzaSyBrS7UQTv9z3z3R7v-FHwjhRZFHVp0YVrY',
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const OpenModal = () => {
    const sectionList = [
      {
        key: 'Popular Cities',
        data: [{id: '001', name: 'abc'}],
      },
      {
        key: 'Other Cities',
        data: [{id: '002', name: 'xyz'}],
      },
    ];
    const cities = [
      {
        key: 'Popular Cities',
        data: [
          {
            name: 'Mumbai',
            image: require('../assets/images/mumbai.png'),
            selectedImage: require('../assets/images/mumbaiSelected.png'),
          },
          {
            name: 'Delhi-NCR',
            image: require('../assets/images/delhi.png'),
            selectedImage: require('../assets/images/delhiSelected.png'),
          },
          {
            name: 'Bengaluru',
            image: require('../assets/images/bengaluru.png'),
            selectedImage: require('../assets/images/bengaluruSelected.png'),
          },
          {
            name: 'Hyderabad',
            image: require('../assets/images/hydrabad.png'),
            selectedImage: require('../assets/images/hydrabadSelected.png'),
          },
          {
            name: 'Ahmedabad',
            image: require('../assets/images/ahmedabad.png'),
            selectedImage: require('../assets/images/ahmedabadSelected.png'),
          },
          {
            name: 'Chandigarh',
            image: require('../assets/images/chandigarh.png'),
            selectedImage: require('../assets/images/chandigarhSelected.png'),
          },
          {
            name: 'Chennai',
            image: require('../assets/images/chennai.png'),
            selectedImage: require('../assets/images/chennaiSelected.png'),
          },
          {
            name: 'Pune',
            image: require('../assets/images/pune.png'),
            selectedImage: require('../assets/images/puneSelected.png'),
          },
          {
            name: 'Kolkata',
            image: require('../assets/images/kolkata.png'),
            selectedImage: require('../assets/images/kolkataSelected.png'),
          },
          {
            name: 'Kochi',
            image: require('../assets/images/Kochi.png'),
            selectedImage: require('../assets/images/KochiSelected.png'),
          },
        ],
      },
      {
        key: 'Other Cities',
        data: [
          'Agra',
          'Ajmer',
          'Balod',
          'Bhilwara',
          'Bhopal',
          'Drawad',
          'Goa',
          'Guwahati',
          'Gwalior',
          'Indore',
          'Jaipur',
          'Kota',
          'Lonawala',
          'Nagpur',
          'Patna',
          'Raipur',
          'Simla',
          'Surat',
          'Vadodara',
          'Varanasi',
        ],
      },
    ];

    const filterData = (text) => {
      // tempData1 = JSON.parse(JSON.stringify(cities[0].data));
      // tempData2 = JSON.parse(JSON.stringify(cities[1].data));

      // if (searchText !== '') {
      setTempData1(
        cities[0].data.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      setTempData2(
        cities[1].data.filter((item) =>
          item.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      // }
    };

    const handleClick = (item) => {
      setLoading(true);
      console.log(item);
      AsyncStorage.setItem('selectedCity', item, (err) => {
        console.log('MYError', err);
        if (!err) {
          setLocation(item);
          setLoading(false);
          setModalOpen(false);
        }
      });
    };

    const {
      locationImage,
      locationText,
      locationView,
      navigationCornerView,
      navigationMiddleView,
      headingText,
      navigationStyle,
      otherCitiesText,
      otherCitiesView,
      popularCitiesImageStyle,
      popularCitiesText,
      popularCitiesView,
      searchView,
      sectionHeaderView,
      sectionListHeading,
      sectionListText,
      selectedCityImageStyle,
      selectedPopularCityView,
    } = modalStyle;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalOpen}
        presentationStyle={'fullScreen'}
        onRequestClose={() => setModalOpen(false)}>
        <SafeAreaView style={{backgroundColor: Colors.headingColor}} />
        <SafeAreaView style={safeAreaView}>
          <View style={navigationStyle}>
            <Modal
              transparent={true}
              animationType={'none'}
              visible={isLoading}
              // presentationStyle={'fullScreen'}>
            >
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  }}>
                  <ActivityIndicator animating={isLoading} size={'large'} />
                </View>
              </View>
            </Modal>
            <View style={navigationCornerView}>
              <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: normalize(24),
                    color: 'white',
                    marginBottom: '25%',
                  }}>
                  x
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={navigationMiddleView}>
              <Text style={headingText}>
                {myLocation ? myLocation : 'Change'}
              </Text>
            </View>
            <View style={navigationCornerView} />
          </View>
          <View style={mainView}>
            <SectionList
              // keyExtractor={(item) => item.id}
              sections={sectionList}
              style={{backgroundColor: 'white'}}
              bounces={false}
              ListHeaderComponent={
                <View style={sectionHeaderView}>
                  <View style={searchView}>
                    <SearchBar
                      placeholderTextColor={'lightgray'}
                      placeholder={'Search for your city'}
                      onChangeText={(text) => {
                        setSearchText(text);
                        filterData(text);
                      }}
                      value={searchText}
                      cancelButtonProps={{color: 'lightgray'}}
                      returnKeyType={'search'}
                      cancelButtonTitle={'Cancel'}
                      showCancel={false}
                      // onCancel={() => {}}
                      searchIcon=<Icon
                        name={'search'}
                        type={'Fontisto'}
                        color={Colors.headingColor}
                        size={width * 0.07}
                      />
                      inputContainerStyle={{
                        backgroundColor: '#5A5D6E',
                      }}
                      inputStyle={{color: 'white'}}
                      style={{color: 'white'}}
                      containerStyle={{
                        backgroundColor: Colors.headingColor,
                        borderWidth: 0,
                        borderColor: Colors.headingColor,
                        height: 44,
                      }}
                      platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                    />
                  </View>
                  <View style={locationView}>
                    <Image
                      source={require('../assets/images/locationBlue.png')}
                      style={locationImage}
                      resizeMode={'contain'}
                    />
                    <TouchableWithoutFeedback onPress={() => getLocation()}>
                      <Text style={locationText}>Detect My location</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              }
              renderSectionHeader={({section}) => {
                if (section.key === 'Popular Cities') {
                  return (
                    <View
                      style={[
                        sectionListHeading,
                        tempData1.length === 0 &&
                          searchText &&
                          searchText.length > 0 && {height: 0},
                      ]}>
                      <Text style={sectionListText}>
                        {tempData1.length === 0 &&
                        searchText &&
                        searchText &&
                        searchText.length > 0
                          ? ''
                          : section.key}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={[
                        sectionListHeading,
                        tempData2.length === 0 &&
                          searchText &&
                          searchText.length > 0 && {height: 0},
                      ]}>
                      <Text style={sectionListText}>
                        {tempData2.length === 0 &&
                        searchText &&
                        searchText.length > 0
                          ? ''
                          : section.key}
                      </Text>
                    </View>
                  );
                }
              }}
              renderItem={({section, item}) => {
                if (section.key === 'Popular Cities') {
                  return (
                    <FlatList
                      data={searchText === '' ? cities[0].data : tempData1}
                      numColumns={4}
                      keyExtractor={(item1, index1) => item1 + index1}
                      renderItem={({item}) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => handleClick(item.name)}>
                            <View style={popularCitiesView}>
                              <Image
                                source={
                                  item.name === myLocation
                                    ? item.selectedImage
                                    : item.image
                                }
                                resizeMode={'contain'}
                                style={popularCitiesImageStyle}
                              />
                              <View style={selectedPopularCityView}>
                                {myLocation === item.name && (
                                  <Image
                                    source={require('../assets/images/online.png')}
                                    style={[
                                      selectedCityImageStyle,
                                      {marginRight: width * 0.014},
                                    ]}
                                  />
                                )}
                                <Text style={popularCitiesText}>
                                  {item.name}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  );
                } else {
                  return (
                    <FlatList
                      data={searchText === '' ? cities[1].data : tempData2}
                      keyExtractor={(item1, index1) => item1 + index1}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => handleClick(item)}>
                          <View style={otherCitiesView}>
                            <Text style={otherCitiesText}>{item}</Text>
                            {myLocation === item && (
                              <Image
                                source={require('../assets/images/online.png')}
                                style={selectedCityImageStyle}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  );
                }
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Account & Setting',
    });
    isLogin = route.params.isLogin;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.isLogin]);
  useEffect(() => {
    AsyncStorage.getItem('selectedCity', (error, value) => {
      if (value !== null) {
        setLocation(value);
      }
    });
  }, []);

  const {
    safeAreaView,
    mainView,
    subDetailText,
    separatorView,
    appVersion,
    bookSmile,
    detailText,
    rightIcon,
    settingView,
    shareText,
    buttonView,
    middleView,
    bottomInformationView,
    InformationView,
    topInformationView,
  } = styles;

  const BottomView = () => {
    return (
      <View style={InformationView}>
        <View style={topInformationView}>
          <TouchableWithoutFeedback>
            <Text style={shareText}>Share</Text>
          </TouchableWithoutFeedback>
          <Text>|</Text>
          <TouchableWithoutFeedback>
            <Text style={shareText}>Rate Us</Text>
          </TouchableWithoutFeedback>
          <Text>|</Text>
          <TouchableWithoutFeedback>
            <Image
              source={require('../assets/images/bookasmile.png')}
              style={bookSmile}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={bottomInformationView}>
          <Text style={appVersion}> {'App Version : ' + version}</Text>
        </View>
        <View style={bottomInformationView}>
          <Text style={shareText}> Terms & Conditions</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <ScrollView>
          <View style={separatorView} />
          <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
            <View style={settingView}>
              <View style={middleView}>
                <Text style={detailText}>My Location</Text>
                <Text style={subDetailText}>
                  {myLocation ? myLocation : 'Change'}
                </Text>
              </View>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          {isLogin && (
            <>
              <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
                <View style={settingView}>
                  <View style={middleView}>
                    <Text style={detailText}>Save Payment Mode</Text>
                  </View>
                  <Image
                    source={require('../assets/images/moreThan.png')}
                    style={rightIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
                <View style={settingView}>
                  <View style={middleView}>
                    <Text style={detailText}>Favourite Venue</Text>
                  </View>
                  <Image
                    source={require('../assets/images/moreThan.png')}
                    style={rightIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
                <View style={settingView}>
                  <View style={middleView}>
                    <Text style={detailText}>Payback</Text>
                  </View>
                  <Image
                    source={require('../assets/images/moreThan.png')}
                    style={rightIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
          <View style={separatorView} />
          <TouchableWithoutFeedback onPress={() => setSelectedCheckbox(0)}>
            <View style={buttonView}>
              <View style={middleView}>
                <Text style={detailText}>M-Ticket</Text>
                <Text style={subDetailText} numberOfLines={2}>
                  Get the ticket on your mobile no print out needed.
                </Text>
              </View>
              <Image
                source={
                  selectedCheckbox
                    ? require('../assets/images/radio.png')
                    : require('../assets/images/radioChecked.png')
                }
                style={rightIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedCheckbox(1)}>
            <View style={buttonView}>
              <View style={middleView}>
                <Text style={detailText}>Box Office Pickup</Text>
                <Text style={subDetailText} numberOfLines={2}>
                  Show your booking id and collect your ticket from the box
                  office.
                </Text>
              </View>
              <Image
                source={
                  !selectedCheckbox
                    ? require('../assets/images/radio.png')
                    : require('../assets/images/radioChecked.png')
                }
                style={rightIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={separatorView} />
          <TouchableWithoutFeedback onPress={() => setFood(!isFood)}>
            <View style={settingView}>
              <View style={middleView}>
                <Text style={detailText}>Foods and Beverages</Text>
                <Text style={subDetailText}>
                  You will see foods and beverages while booking.
                </Text>
              </View>
              <Switch
                trackColor={{false: '#CCCCCC', true: '#000000'}}
                thumbColor={isFood ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#EEEEEE"
                style={{
                  transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                  marginLeft: width * 0.045,
                }}
                onValueChange={() => setFood(!isFood)}
                value={isFood}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFood(!isFood)}>
            <View style={settingView}>
              <View style={middleView}>
                <Text style={detailText}>Mobile Notification</Text>
                <Text style={subDetailText}>
                  Get notified what new and exciting around you.
                </Text>
              </View>
              <Switch
                trackColor={{false: '#CCCCCC', true: '#000000'}}
                thumbColor={isFood ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#EEEEEE"
                style={{
                  transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                  marginLeft: width * 0.045,
                }}
                onValueChange={() => setMobile(!isMobile)}
                value={isMobile}
              />
            </View>
          </TouchableWithoutFeedback>
          {isLogin && (
            <>
              <TouchableWithoutFeedback
                onPress={() => setWhatsapp(!isWhatsapp)}>
                <View style={settingView}>
                  <View style={middleView}>
                    <Text style={detailText}>Mobile Notification</Text>
                    <Text style={subDetailText}>
                      Get notified what new and exciting around you.
                    </Text>
                  </View>
                  <Switch
                    trackColor={{false: '#CCCCCC', true: '#000000'}}
                    thumbColor={isFood ? '#FFFFFF' : '#FFFFFF'}
                    ios_backgroundColor="#EEEEEE"
                    style={{
                      transform: [{scaleX: 0.6}, {scaleY: 0.6}],
                      marginLeft: width * 0.045,
                    }}
                    onValueChange={() => setWhatsapp(!isWhatsapp)}
                    value={isWhatsapp}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={separatorView} />
              <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
                <View style={settingView}>
                  <View style={middleView}>
                    <Text style={detailText}>Sign Out</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
          {isModalOpen && OpenModal()}
          <BottomView />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  rightIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  settingView: {
    flexDirection: 'row',
    width,
    height: GetHeight(9.5),
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: width * 0.005,
    paddingHorizontal: width * 0.03,
    justifyContent: 'space-between',
  },
  buttonView: {
    flexDirection: 'row',
    width,
    height: GetHeight(11),
    alignItems: 'center',
    backgroundColor: 'white',
    padding: width * 0.03,
    justifyContent: 'space-between',
  },
  middleView: {
    width: '85%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: width * 0.02,
  },
  separatorView: {
    width,
    height: width * 0.04,
    backgroundColor: '#f0f0f0',
  },
  shareText: {
    color: 'gray',
    fontWeight: '400',
    fontSize: normalize(12.5),
    textDecorationLine: 'underline',
  },
  appVersion: {
    color: 'gray',
    fontWeight: '400',
    fontSize: normalize(12),
  },
  bookSmile: {
    width: width * 0.18,
    height: width * 0.045,
  },
  detailText: {
    fontSize: normalize(13.2),
    color: Colors.lightBlack,
    fontWeight: '500',
  },
  subDetailText: {
    fontSize: normalize(12),
    color: 'darkgray',
    fontWeight: '400',
    marginTop: width * 0.01,
  },
  InformationView: {
    width,
    height: GetHeight(25),
  },
  topInformationView: {
    width,
    height: '40%',
    flexDirection: 'row',
    paddingHorizontal: width * 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomInformationView: {
    width,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const modalStyle = StyleSheet.create({
  navigationStyle: {
    width,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.headingColor,
  },
  navigationCornerView: {
    width: '10%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  navigationMiddleView: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: normalize(13),
    fontWeight: '600',
  },
  sectionHeaderView: {
    height: width * 0.3,
    width,
    backgroundColor: Colors.headingColor,
  },
  searchView: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
  },
  locationView: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    alignItems: 'center',
  },
  locationImage: {
    height: width * 0.07,
    width: width * 0.07,
  },
  locationText: {
    color: Colors.blue,
    fontSize: normalize(14),
    marginLeft: width * 0.015,
    fontWeight: '400',
  },
  sectionListHeading: {
    height: width * 0.12,
    width,
    paddingHorizontal: '3%',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  sectionListText: {
    color: '#888888',
    fontSize: normalize(13.5),
    fontWeight: '500',
  },
  popularCitiesView: {
    width: width / 4,
    height: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.25,
    borderColor: 'lightgray',
  },
  popularCitiesImageStyle: {
    width: '60%',
    height: '60%',
  },
  popularCitiesText: {
    fontSize: normalize(12),
    fontWeight: '300',
    color: Colors.lightBlack,
    alignSelf: 'center',
  },
  selectedPopularCityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  otherCitiesView: {
    width: width * 0.98,
    height: width * 0.14,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
  },
  selectedCityImageStyle: {
    width: width * 0.03,
    height: width * 0.03,
    marginRight: width * 0.06,
  },
  otherCitiesText: {
    fontSize: normalize(13.5),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
});

export default AccountScreen;
