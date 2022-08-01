import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  SectionList,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
  Easing,
  Alert,
  Platform,
} from 'react-native';
import SafeAreaInset from 'react-native-static-safe-area-insets';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ImageSlider from '../Components/ImageSlider';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import index from 'react-native-get-location';

const upComingMovies = [
  {
    date: '17th Apr, 2020',
    movies: [
      {
        id: '001',
        name: 'Trolls the world Tour',
        image: require('../assets/images/trolls.jpg'),
        votes: 1011,
        releaseDate: 'Fri, 17th Apr',
      },
      {
        id: '002',
        name: 'The Pushkar Lodge',
        image: require('../assets/images/pushkar.jpeg'),
        votes: 700,
        releaseDate: 'Fri, 17th Apr',
      },
    ],
  },
  {
    date: '1st May, 2020',
    movies: [
      {
        id: '003',
        name: 'Coolie No 1',
        image: require('../assets/images/coolie.jpg'),
        votes: 2500,
        releaseDate: 'Fri, 1st May',
      },
      {
        id: '004',
        name: 'Babloo Bachelor',
        image: require('../assets/images/babloo.jpg'),
        votes: 1500,
        releaseDate: 'Fri, 1st May',
      },
    ],
  },
];
const {width, height} = Dimensions.get('window');
const safeAreaHeight =
  height - SafeAreaInset.safeAreaInsetsTop - SafeAreaInset.safeAreaInsetsBottom;
const MoviesScreen = ({navigation, route}) => {
  const {
    safeAreaView,
    mainView,
    navigationImageStyle,
    headingView,
    containerView,
    filterView,
    filterImage,
    dotView,
  } = styles;

  const [state, setState] = useState({
    index: 0,
    isModalOpen: false,
  });
  const [checkboxResult, setCheckboxResult] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Image
            source={require('../assets/images/icon/navigation/search.png')}
            style={navigationImageStyle}
            width={width * 0.06}
            height={height * 0.06}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, state.index]);
  useLayoutEffect(() => {
    if (route && route.params && route.params.selectedCity) {
      navigation.setOptions({
        title:
          state.index === 0
            ? 'Movies is ' + route.params.selectedCity
            : 'Upcoming Movies is ' + route.params.selectedCity,
      });
    }
  }, [state.index, route, navigation]);

  useEffect(() => {
    if (route.params && route.params.initialParams) {
      let tempData = {};
      upComingMovies.forEach((item) => {
        item.movies.forEach((item2) => {
          if (item2.id === route.params.initialParams) {
            tempData = item2;
          }
        });
      });
      navigation.navigate('UpComingMoviesDetailScreen', {
        data: tempData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.initialParams]);
  const OpenModal = () => {
    const languages = [
      {
        key: 'LANGUAGES',
        data: [
          'English',
          'Hindi',
          'Gujarati',
          'Tamil',
          'Telugu',
          'Bengali',
          'Punjabi',
          'Kannada',
          'Malayalam',
          'Marathi',
          'Bhojpuri',
          'Ladhakhi',
          'Rajasthani',
        ],
      },
    ];

    const {
      buttonStyle,
      buttonRightStyle,
      modalHeadingView,
      modalContainerView,
      titleStyle,
      modalMainView,
      containerSubView,
      sectionHeader,
      sectionListStyle,
      listContainerView,
      sectionHeaderText,
      contentText,
      contentButtonText,
      checkboxStyle,
      applyButtonView,
      applyButton,
      applyButtonText,
    } = modalStyles;
    const [modalState, modalSetState] = useState({
      isShowAll: true,
    });
    const [listHeight] = useState(new Animated.Value(safeAreaHeight - 44));
    const [buttonHeight] = useState(new Animated.Value(0));
    const [isButtonVisible, setButtonVisible] = useState(false);
    const [isAnimating, setAnimating] = useState(false);

    useEffect(() => {
      if (
        state.isModalOpen &&
        checkbox !== checkboxResult &&
        checkboxResult &&
        JSON.parse(JSON.stringify(buttonHeight)) ===
          JSON.parse(JSON.stringify(0))
      ) {
        showAnimation();
      } else {
        if (checkbox === checkboxResult) {
          buttonHeight.setValue(0);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkbox]);

    const showAnimation = () => {
      buttonHeight.setValue(0);
      listHeight.setValue(safeAreaHeight - 44);
      setAnimating(true);

      Animated.parallel([
        Animated.timing(listHeight, {
          duration: 300,
          easing: Easing.linear,
          toValue:
            Platform.OS === 'ios'
              ? (safeAreaHeight - 44) * 0.93
              : (height - 44) * 0.93,
          useNativeDriver: false,
        }),
        Animated.timing(buttonHeight, {
          duration: 300,
          easing: Easing.linear,
          toValue:
            Platform.OS === 'ios'
              ? (safeAreaHeight - 44) * 0.08
              : (height - 44) * 0.07,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setAnimating(false);
      });
    };
    let tempData = [];
    if (modalState.isShowAll) {
      tempData.push({
        key: languages[0].key,
        data: languages[0].data.splice(0, 3),
      });
      tempData[0].data.push('Show All');
    } else {
      tempData = languages;
      tempData[0].data.push('Show Less');
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={state.isModalOpen}
        presentationStyle={'fullScreen'}
        onRequestClose={() => {
          if (checkbox !== checkboxResult) {
            Alert.alert(
              'Confirmation',
              'Your changes have not been applied.\nDo you wish to apply them',
              [
                {
                  style: 'default',
                  onPress: () => {
                    setState({...state, isModalOpen: false});
                    modalSetState({...modalState, isShowAll: true});
                    setCheckboxResult(checkbox);
                    buttonHeight.setValue(0);
                    listHeight.setValue(safeAreaHeight - 44);
                  },
                  text: 'Yes',
                },
                {
                  style: 'default',
                  onPress: () => {
                    setState({...state, isModalOpen: false});
                    modalSetState({...modalState, isShowAll: true});
                    setCheckbox(checkboxResult);
                    buttonHeight.setValue(0);
                    listHeight.setValue(safeAreaHeight - 44);
                  },
                  text: 'No',
                },
              ],
            );
          } else {
            setState({...state, isModalOpen: false});
            modalSetState({...modalState, isShowAll: true});
          }
        }}>
        <SafeAreaView
          style={modalMainView}
          pointerEvents={isAnimating ? 'none' : 'auto'}>
          <View style={modalMainView}>
            <StatusBar barStyle={'dark-content'} />
            <View style={modalHeadingView}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (checkbox !== checkboxResult) {
                    Alert.alert(
                      'Confirmation',
                      'Your changes have not been applied.\nDo you wish to apply them',
                      [
                        {
                          style: 'default',
                          onPress: () => {
                            setState({...state, isModalOpen: false});
                            modalSetState({...modalState, isShowAll: true});
                            setCheckboxResult(checkbox);
                            buttonHeight.setValue(0);
                            listHeight.setValue(safeAreaHeight - 44);
                          },
                          text: 'Yes',
                        },
                        {
                          style: 'default',
                          onPress: () => {
                            setState({...state, isModalOpen: false});
                            modalSetState({...modalState, isShowAll: true});
                            setCheckbox(checkboxResult);
                            buttonHeight.setValue(0);
                            listHeight.setValue(safeAreaHeight - 44);
                          },
                          text: 'No',
                        },
                      ],
                    );
                  } else {
                    setState({...state, isModalOpen: false});
                    modalSetState({...modalState, isShowAll: true});
                  }
                }}>
                <Text style={buttonStyle}>Close</Text>
              </TouchableWithoutFeedback>
              <Text style={titleStyle}>Filters</Text>
              {checkbox.length > 0 && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setCheckbox([]);
                  }}>
                  <Text style={buttonRightStyle}>Reset All</Text>
                </TouchableWithoutFeedback>
              )}
            </View>
            <View style={modalContainerView}>
              <Animated.SectionList
                style={[sectionListStyle, {height: listHeight}]}
                sections={tempData}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({section}) => (
                  <View style={sectionHeader}>
                    <Text style={sectionHeaderText}>{section.key}</Text>
                  </View>
                )}
                renderItem={({item, index}) => (
                  <View style={listContainerView}>
                    {index !== tempData[0].data.length - 1 ? (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          if (checkbox.includes(item)) {
                            setCheckbox(
                              checkbox.filter((data) => data !== item),
                            );
                          } else {
                            setCheckbox([...checkbox, item]);
                          }
                        }}>
                        <View style={containerSubView}>
                          <Text style={contentText}>{item}</Text>
                          <Image
                            source={
                              checkbox.includes(item)
                                ? require('../assets/images/icon/Common/checkboxSelected.png')
                                : require('../assets/images/icon/Common/checkbox.png')
                            }
                            resizeMode={'contain'}
                            style={checkboxStyle}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    ) : (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          modalSetState({
                            ...modalState,
                            isShowAll: !modalState.isShowAll,
                          })
                        }>
                        <View style={containerSubView}>
                          <Text style={contentButtonText}>{item}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                )}
              />
              <Animated.View
                style={[
                  applyButtonView,
                  {
                    height: buttonHeight,
                  },
                ]}>
                <TouchableOpacity
                  style={applyButton}
                  onPress={() => {
                    setState({...state, isModalOpen: false});
                    modalSetState({...modalState, isShowAll: true});
                    buttonHeight.setValue(0);
                    listHeight.setValue(safeAreaHeight - 44);
                    setCheckboxResult(checkbox);
                  }}>
                  <Text style={applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={headingView}>
          <SegmentControl
            index={state.index}
            onTabPress={(stateChange) =>
              setState({...state, index: stateChange})
            }
          />
        </View>
        {OpenModal()}
        <View style={containerView}>
          {state.index === 0 ? (
            <FlatListView chkResult={checkboxResult} />
          ) : (
            SectionListView(navigation)
          )}
          <View style={filterView}>
            <TouchableWithoutFeedback
              onPress={() => {
                setState({...state, isModalOpen: true});
              }}>
              <Image
                source={require('../assets/images/filter.png')}
                style={filterImage}
                resizeMode={'cover'}
              />
            </TouchableWithoutFeedback>
            {checkboxResult.length > 0 ? <View style={dotView} /> : <View />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  filterView: {
    position: 'absolute',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: Colors.blue,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    right: width * 0.03,
    bottom: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotView: {
    width: width * 0.03,
    height: width * 0.03,
    position: 'absolute',
    borderRadius: width * 0.015,
    backgroundColor: 'red',
    top: width * 0.03,
    right: width * 0.03,
    flex: 1,
  },
  filterImage: {
    width: width * 0.08,
    height: width * 0.08,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  headingView: {
    width,
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  containerView: {
    width: '94%',
    height: '92%',
  },
  navigationImageStyle: {
    width: width * 0.06,
    height: height * 0.06,
    marginRight: width * 0.03,
  },
});

const modalStyles = StyleSheet.create({
  modalMainView: {
    flex: 1,
  },
  modalHeadingView: {
    width,
    height: 44,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    color: Colors.blue,
    fontSize: normalize(14),
    fontWeight: '400',
    position: 'absolute',
    left: width * 0.05,
  },
  buttonRightStyle: {
    color: Colors.blue,
    fontSize: normalize(14),
    fontWeight: '400',
    position: 'absolute',
    right: width * 0.05,
  },
  titleStyle: {
    fontSize: normalize(16),
    fontWeight: '600',
  },
  modalContainerView: {
    width,
    height: safeAreaHeight - 44,
    backgroundColor: '#f0f0f0',
  },
  sectionListStyle: {
    width,
    height: '100%',
    backgroundColor: '#f0f0f0',
    position: 'absolute',
  },
  sectionHeader: {
    width,
    height: (safeAreaHeight - 44) * 0.067,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#444444',
    fontSize: normalize(14),
    fontWeight: '400',
    marginLeft: width * 0.05,
  },

  listContainerView: {
    width,
    height: (safeAreaHeight - 44) * 0.067,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 1,
  },
  containerSubView: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    alignItems: 'center',
    borderColor: '#444444',
  },
  contentText: {
    fontSize: normalize(13),
  },
  contentButtonText: {
    fontSize: normalize(13),
    color: Colors.blue,
  },
  checkboxStyle: {
    width: width * 0.07,
    height: width * 0.07,
  },
  applyButtonView: {
    position: 'absolute',
    height: 0,
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  applyButton: {
    height: '100%',
    width: '90%',
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(14),
  },
});
const SegmentControl = (prop) => {
  const {
    activeTabStyle,
    tabStyle,
    containerTabStyle,
    tabTextStyle,
  } = segmentStyles;
  return (
    <SegmentedControlTab
      values={['NOW SHOWING', 'COMING SOON', 'EXCLUSIVE']}
      selectedIndex={prop.index}
      tabStyle={tabStyle}
      tabsContainerStyle={containerTabStyle}
      activeTabStyle={activeTabStyle}
      enabled={true}
      tabTextStyle={tabTextStyle}
      onTabPress={prop.onTabPress}
    />
  );
};
const segmentStyles = StyleSheet.create({
  containerTabStyle: {
    borderRadius: 0,
    width: '95%',
    height: width * 0.08,
  },
  activeTabStyle: {
    backgroundColor: 'black',
  },
  tabStyle: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
  },
  tabTextStyle: {
    color: 'black',
    fontSize: width * 0.032,
    fontWeight: '500',
  },
});

const FlatListView = (prop) => {
  const {chkResult} = prop;
  const {
    contentView,
    flatList,
    imageStyle,
    mainView,
    moviesText,
    subText,
    subTextView,
    heartImage,
    componentHeaderStyle,
  } = flatListStyles;
  const [tempData, setTempData] = useState([]);
  const data = [
    {
      key: '01',
      name: 'Saaho',
      image: require('../assets/images/saaho.jpg'),
      rating: '70%',
      language: ['Hindi'],
    },
    {
      key: '02',
      name: 'Welcome',
      image: require('../assets/images/welcome.jpg'),
      rating: '86%',
      language: ['Hindi'],
    },
    {
      key: '03',
      name: 'De Dana Dan',
      image: require('../assets/images/Dedanadan.jpg'),
      rating: '84%',
      language: ['Hindi'],
    },
    {
      key: '04',
      name: 'Drishyam',
      image: require('../assets/images/drishyam.jpg'),
      rating: '89%',
      language: ['English', 'Hindi'],
    },
  ];
  useEffect(() => {
    setTempData(data);
    filterLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chkResult]);

  const filterLanguage = () => {
    if (chkResult.length > 0) {
      setTempData(
        tempData.filter((items) =>
          chkResult.some((item) => items.language.indexOf(item) >= 0),
        ),
      );
    }
  };
  const renderView = (items) => {
    return (
      <View
        /* eslint-disable-next-line react-native/no-inline-styles */
        style={[contentView, {marginRight: items.index % 2 === 0 ? '4%' : 0}]}>
        <Image
          source={items.item.image}
          style={imageStyle}
          resizeMode={'stretch'}
        />
        <View style={subTextView}>
          <Image
            source={require('../assets/images/heart.png')}
            resizeMode={'cover'}
            style={heartImage}
          />
          <Text style={subText}>{items.item.rating} </Text>
        </View>
        <Text style={moviesText}>{items.item.name}</Text>
      </View>
    );
  };

  return (
    <View style={mainView}>
      <FlatList
        data={tempData}
        showsVerticalScrollIndicator={false}
        style={flatList}
        numColumns={2}
        ListHeaderComponent={HeaderView}
        ListHeaderComponentStyle={componentHeaderStyle}
        renderItem={(items) => renderView(items)}
      />
    </View>
  );
};
const flatListStyles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
  },

  flatList: {
    width: '100%',
    height: '100%',
  },
  componentHeaderStyle: {
    width: '100%',
    height: height * 0.35,
  },
  contentView: {
    width: '48%',
    height: height * 0.4,
    marginTop: '4%',
    marginBottom: '4%',
  },
  imageStyle: {
    height: '85%',
    width: '100%',
  },
  dateView: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: '17%',
    left: '5%',
    zIndex: 1,
  },
  dateText: {
    color: 'white',
    fontSize: width * 0.03,
    fontWeight: '400',
  },
  subTextView: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    color: 'gray',
    fontSize: width * 0.035,
    marginLeft: 5,
  },
  moviesText: {
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  heartImage: {
    width: width * 0.03,
    height: width * 0.03,
  },
});
const HeaderView = () => {
  const {
    browseCinemaCenterView,
    browseCinemaCornerView,
    browseCinemaView,
    mainView,
    imageStyle,
    slideShowView,
    cinemaText,
    browseView,
  } = headerStyles;
  return (
    <View style={mainView}>
      <View style={browseView}>
        <View style={browseCinemaView}>
          <View style={browseCinemaCornerView}>
            <Image
              source={require('../assets/images/marker.png')}
              resizeMode={'contain'}
              style={imageStyle}
            />
          </View>
          <View style={browseCinemaCenterView}>
            <Text style={cinemaText}> Browse by Cinemas</Text>
          </View>
          <View style={browseCinemaCornerView}>
            <Image
              source={require('../assets/images/moreThan.png')}
              resizeMode={'cover'}
              style={imageStyle}
            />
          </View>
        </View>
      </View>
      <View style={slideShowView}>
        <ImageSlider />
      </View>
    </View>
  );
};
const headerStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  slideShowView: {
    height: '75%',
    width: '100%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  browseView: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  browseCinemaView: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#444444',
  },
  browseCinemaCornerView: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseCinemaCenterView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.04,
    height: width * 0.04,
  },
  cinemaText: {
    color: '#444444',
  },
});

const SectionListView = (navigation) => {
  const data = [
    {
      date: '17th Apr, 2020',
      data: ['abc'],
    },
    {
      date: '1st May, 2020',
      data: ['xyz'],
    },
  ];

  const upComingMovies = [
    {
      date: '17th Apr, 2020',
      movies: [
        {
          id: '001',
          name: 'Trolls the world Tour',
          image: require('../assets/images/trolls.jpg'),
          votes: 1011,
          releaseDate: 'Fri, 17th Apr',
        },
        {
          id: '002',
          name: 'The Pushkar Lodge',
          image: require('../assets/images/pushkar.jpeg'),
          votes: 700,
          releaseDate: 'Fri, 17th Apr',
        },
      ],
    },
    {
      date: '1st May, 2020',
      movies: [
        {
          id: '003',
          name: 'Coolie No 1',
          image: require('../assets/images/coolie.jpg'),
          votes: 2500,
          releaseDate: 'Fri, 1st May',
        },
        {
          id: '004',
          name: 'Babloo Bachelor',
          image: require('../assets/images/babloo.jpg'),
          votes: 1500,
          releaseDate: 'Fri, 1st May',
        },
      ],
    },
  ];
  const {sectionList, headerText, headerView} = sectionListStyle;

  const UpcomingSectionHeader = (items) => {
    return (
      <View style={headerView}>
        <Text style={headerText}>{items.section.date}</Text>
      </View>
    );
  };

  const renderView = (items) => {
    const {
      contentView,
      heartImage,
      imageStyle,
      moviesText,
      subText,
      subTextView,
      dateText,
      dateView,
    } = flatListStyles;
    return (
      <TouchableWithoutFeedback
        // activeOpacity={1}
        onPress={() =>
          navigation.navigate('UpComingMoviesDetailScreen', {
            data: items.item,
          })
        }>
        <View
          /* eslint-disable-next-line react-native/no-inline-styles */
          style={[
            contentView,
            {marginRight: items.index % 2 === 0 ? '4%' : 0},
          ]}>
          <Image
            source={items.item.image}
            style={imageStyle}
            resizeMode={'stretch'}
          />
          <View style={dateView}>
            <Text style={dateText}>{items.item.releaseDate}</Text>
          </View>
          <View style={subTextView}>
            <Image
              source={require('../assets/images/thumbsup.png')}
              resizeMode={'cover'}
              style={heartImage}
            />
            <Text style={subText}>{items.item.votes} Votes </Text>
          </View>
          <Text style={moviesText}>{items.item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const RenderItem = (items) => {
    const key = items.section.date;

    const temp = upComingMovies.find((item) => item.date === key);

    return (
      <FlatList
        data={temp.movies}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        renderItem={(item) => renderView(item)}
      />
    );
  };

  return (
    <SectionList
      style={sectionList}
      sections={data}
      keyExtractor={(item, index) => item + index}
      ListHeaderComponent={UpComingHeaderView}
      renderSectionHeader={(item) => UpcomingSectionHeader(item)}
      renderItem={(item) => RenderItem(item)}
    />
  );
};
const sectionListStyle = StyleSheet.create({
  sectionList: {
    height: '92%',
    width: '100%',
  },
  headerView: {
    height: width * 0.15,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});

const UpComingHeaderView = () => {
  const {slideShowView} = upcomingHeaderStyle;
  return (
    <View style={slideShowView}>
      <ImageSlider />
    </View>
  );
};
const upcomingHeaderStyle = StyleSheet.create({
  slideShowView: {
    width: '100%',
    height: height * 0.26,
    paddingBottom: width * 0.02,
    paddingTop: width * 0.02,
  },
});
export default MoviesScreen;
