import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  SectionList,
  FlatList,
  Modal,
  YellowBox,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import 'react-native-vector-icons/AntDesign';
import {SearchBar, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
import Colors from '../assets/Colors';
import ImageSlider from '../Components/ImageSlider';
import {normalize} from '../Functions/normalize';
import GetLocation from 'react-native-get-location';
const {width, height} = Dimensions.get('window');
const HomeScreen = ({route, navigation}) => {
  YellowBox.ignoreWarnings(['Require cycle:']);

  const openUrl = (event, value) => {
    const screen = event.url.split('/')[2];
    const id = event.url.split('/')[3];
    if (screen === 'moviesscreen') {
      navigation.navigate('MoviesScreen', {
        initialParams: id,
        selectedCity: value,
      });
    }
    // handleUrl(event.url, value);
  };
  const handleUrl = (url, value) => {
    const screen = url.split('/')[2];
    const id = url.split('/')[3];
    if (screen === 'moviesscreen') {
      navigation.navigate('MoviesScreen', {
        initialParams: id,
        selectedCity: value,
      });
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('selectedCity', (error, value) => {
      if (value !== null) {
        setSelectedCity(value);
        // SplashScreen.hide();
      }
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then((url) => {
          handleUrl(url, value);
        });
      } else {
        Linking.addEventListener('url', (event) => openUrl(event, value));
      }
      SplashScreen.hide();
    });

    return () => Linking.removeEventListener('url', openUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [searchText, setSearchText] = useState('');
  const [tempData1, setTempData1] = useState([]);
  const [tempData2, setTempData2] = useState([]);
  const [isLoading, setLoading] = useState(false);

  if (route.params && route.params.mode) {
    navigation.navigate('StoreDetail');
  }

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
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
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (isModalOpen) {
      setModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

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
      AsyncStorage.setItem('selectedCity', item, (err) => {
        if (!err) {
          setSelectedCity(item);
          setLoading(false);
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
                {selectedCity ? selectedCity : 'Change'}
              </Text>
            </View>
            <View style={navigationCornerView} />
          </View>
          <View style={mainView}>
            <SectionList
              // keyExtractor={(item) => item.id}
              sections={sectionList}
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
                      cancelButtonProps={{color: 'lightgray'}}
                      returnKeyType={'search'}
                      cancelButtonTitle={'Cancel'}
                      showCancel={false}
                      onCancel={() => {}}
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
                      value={searchText}
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
                          searchText.length > 0 && {height: 0},
                      ]}>
                      <Text style={sectionListText}>
                        {' '}
                        {tempData1.length === 0 && searchText.length > 0
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
                          searchText.length > 0 && {height: 0},
                      ]}>
                      <Text style={sectionListText}>
                        {tempData2.length === 0 && searchText.length > 0
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
                                  item.name === selectedCity
                                    ? item.selectedImage
                                    : item.image
                                }
                                resizeMode={'contain'}
                                style={popularCitiesImageStyle}
                              />
                              <View style={selectedPopularCityView}>
                                {selectedCity === item.name && (
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
                            {selectedCity === item && (
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

  const NavigationBar = ({selectedCity}) => {
    const {
      headingRightView,
      headingText,
      headingView,
      headingViewLeft,
      locationButtonText,
      navigationImageStyle,
    } = navigationStyle;
    return (
      <View style={headingView}>
        <View style={headingViewLeft}>
          <Text style={headingText}>It All Starts Here</Text>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
              setSearchText('');
            }}>
            <Text style={locationButtonText}>
              {selectedCity ? selectedCity + '  >' : 'Change'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={headingRightView}>
          <TouchableWithoutFeedback>
            <Image
              source={require('../assets/images/icon/navigation/search.png')}
              style={navigationImageStyle}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Image
              source={require('../assets/images/icon/navigation/notification.png')}
              style={navigationImageStyle}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  const {
    safeAreaView,
    mainView,
    categoryScrollView,
    categoryText,
    containerView,
    headerView,
    innerCategoryScrollView,
  } = styles;
  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={headerView}>
          <NavigationBar />
          <View style={categoryScrollView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={innerCategoryScrollView}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('MoviesScreen', {selectedCity})
                  }>
                  <Text style={categoryText}>Movies</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Events', {selectedCity})}>
                  <Text style={categoryText}>Events</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Plays', {selectedCity})}>
                  <Text style={categoryText}>Plays</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Sports', {selectedCity})}>
                  <Text style={categoryText}>Sport</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Activities', {selectedCity})
                  }>
                  <Text style={categoryText}>Activities</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={categoryText}>Monument</Text>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
          </View>
        </View>
        {isModalOpen && OpenModal()}
        <View style={containerView}>
          {SectionFlatList(navigation, selectedCity)}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    height: '15%',
    width,
  },
  containerView: {
    height: '85%',
    width,
  },
  categoryScrollView: {
    height: '40%',
    // width,
    backgroundColor: Colors.categoryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerCategoryScrollView: {
    height: '100%',
    // width,
    backgroundColor: Colors.categoryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: width * 0.044,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    color: 'white',
    fontWeight: '400',
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

const navigationStyle = StyleSheet.create({
  headingView: {
    width,
    height: '60%',
    backgroundColor: Colors.headingColor,
    flexDirection: 'row',
  },
  headingViewLeft: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  headingRightView: {
    width: '15%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: height * 0.025,
    marginLeft: width * 0.03,
    fontWeight: 'bold',
  },
  locationButtonText: {
    color: '#f0f0f0',
    fontSize: height * 0.015,
    marginLeft: width * 0.03,
    fontFamily: 'Helvetica',
  },
  navigationImageStyle: {
    width: width * 0.06,
    height: height * 0.06,
    marginRight: width * 0.03,
  },
});
const SectionFlatList = (navigation, selectedCity) => {
  const categoryList = [
    {key: 'SlideShow', data: [{id: '001', name: 'SlideShow'}]},
    {
      key: 'Movies',
      data: [{id: '002', name: 'Movies'}],
    },
    {key: 'Events', data: [{id: '003', name: 'Event'}]},
  ];
  const details = {
    Movies: [
      {
        key: '01',
        name: 'Saaho',
        image: require('../assets/images/saaho.jpg'),
      },
      {
        key: '02',
        name: 'Welcome',
        image: require('../assets/images/welcome.jpg'),
      },
      {
        key: '03',
        name: 'De Dana Dan',
        image: require('../assets/images/Dedanadan.jpg'),
      },
      {
        key: '04',
        name: 'Drishyam',
        image: require('../assets/images/drishyam.jpg'),
      },
    ],
    Events: [
      {
        key: '11',
        name: 'One Mic Stand',
        image: require('../assets/images/onemicstand.jpg'),
      },
      {
        key: '12',
        name: 'Auto Expo',
        image: require('../assets/images/autoexpo.jpg'),
      },
      {
        key: '13',
        name: 'WWDC',
        image: require('../assets/images/wwdc.png'),
      },
    ],
  };

  const {
    mainView,
    sectionHeaderViewStyle,
    sectionHeaderButton,
    sectionHeaderText,
    flatListStyle,
    flatListView,
    imageView,
    itemText,
    slideShowView,
  } = SectionFlatListStyles;

  const sectionRenderView = (items) => {
    const key = items.section.key;
    if (key === 'SlideShow') {
      return (
        <View style={slideShowView}>
          <ImageSlider />
        </View>
      );
    }
    return (
      <FlatList
        horizontal={true}
        style={flatListStyle}
        showsHorizontalScrollIndicator={false}
        data={details[key]}
        renderItem={(data) => (
          <TouchableWithoutFeedback>
            <View style={flatListView}>
              <Image
                source={data.item.image}
                style={imageView}
                resizeMode={'cover'}
              />
              <Text style={itemText}>{data.item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    );
  };

  const sectionHeaderView = (items) => {
    if (items.section.key === 'SlideShow') {
      return <View />;
    }
    return (
      <View style={sectionHeaderViewStyle}>
        <Text style={sectionHeaderText}>{items.section.key}</Text>
        <TouchableOpacity
          onPress={() => {
            if (items.section.key !== 'Events') {
              navigation.navigate(items.section.key + 'Screen', {selectedCity});
            } else {
              navigation.navigate(items.section.key, {selectedCity});
            }
          }}>
          <Text style={sectionHeaderButton}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={mainView}>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={categoryList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={(item) => sectionHeaderView(item, navigation)}
        renderItem={(item) => sectionRenderView(item)}
        style={mainView}
      />
    </View>
  );
};

const SectionFlatListStyles = StyleSheet.create({
  mainView: {
    width,
    height: '100%',
  },
  sectionHeaderViewStyle: {
    height: height * 0.05,
    width: width * 0.94,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: width * 0.03,
    marginLeft: width * 0.03,
    marginTop: width * 0.03,
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: height * 0.022,
    fontWeight: '500',
    color: 'black',
  },
  sectionHeaderButton: {
    fontSize: height * 0.016,
    fontWeight: '300',
    color: 'blue',
  },
  flatListStyle: {
    height: height * 0.25,
    width: width * 0.97,
    marginLeft: width * 0.03,
  },
  flatListView: {
    flexDirection: 'column',
    width: width * 0.27,
    height: height * 0.27,
    marginRight: width * 0.03,
  },
  imageView: {
    height: '80%',
    width: '100%',
  },
  slideShowView: {
    width: '100%',
    height: height * 0.25,
  },
  itemText: {
    fontSize: height * 0.018,
    fontWeight: '400',
    marginTop: 3,
  },
});
export default HomeScreen;
