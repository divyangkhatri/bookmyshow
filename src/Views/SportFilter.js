import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
  Easing,
  Platform,
  SectionList,
  Modal,
} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import GetHeight from '../Functions/GetHeight';
import SafeAreaInset from 'react-native-static-safe-area-insets';
import CalendarPicker from 'react-native-calendar-picker';
const {width, height} = Dimensions.get('window');

const safeAreaHeight =
  height - SafeAreaInset.safeAreaInsetsTop - SafeAreaInset.safeAreaInsetsBottom;
const filterData = [
  {
    key: 'CATEGORY',
    data: [
      {
        name: 'Indoor',
        isMore: false,
      },
      {
        name: 'Outdoor',
        isMore: false,
      },
    ],
  },
  {
    key: 'PRICE RANGE',
    data: [
      {name: '0 - 500', isMore: false},
      {name: '501 - 2000', isMore: false},
      {name: 'Above 2000', isMore: false},
    ],
  },
  {
    key: 'DATE',
    data: [
      {name: 'Today', isMore: false},
      {name: 'Tomorrow', isMore: false},
      {name: 'Weekend', isMore: false},
      {name: 'Date Range', isMore: true},
    ],
  },
];
let tempData = [];
const PlaysFilter = ({navigation, route}) => {
  const {
    safeAreaView,
    mainView,
    navigationView,
    headingText,
    closeText,
    navigationCornerView,
    navigationMiddleView,
    renderRightView,
    renderView,
    renderLeftView,
    renderText,
    sectionHeaderText,
    sectionHeaderView,
    moreThanImage,
    applyButton,
    applyButtonText,
    applyButtonView,
    sectionListView,
    renderSelectedText,
    renderParentView,
  } = styles;

  const {
    buttonsView,
    calenderTitle,
    calenderView,
    dateTitle,
    headingView,
    leftHeadingView,
    modelMainView,
    selectedButton,
    SelectedButtonText,
    selectedView,
    subMainView,
    unselectedButton,
    unSelectedButtonText,
    yearTitle,
    RightHeadingView,
    crossButton,
  } = calenderStyle;
  const [paramKey, setParamKey] = useState(route.params?.key);
  const [selected, setSelected] = useState([]);
  const [dateSelected, setDateSelected] = useState(undefined);
  const [categorySelected, setCategorySelected] = useState(undefined);
  const [showCalender, setShowCalender] = useState(false);

  const [isShowMore, setShowMore] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
  const [isRangeSelect, setRangeSelect] = useState(false);
  const [isLeftViewSelected, setLeftViewSelected] = useState(true);
  const [dateChange, setDateChange] = useState(undefined);
  const [endDateChange, setEndDateChange] = useState(undefined);
  const [buttonHeight] = useState(new Animated.Value(0));
  const [listHeight] = useState(
    new Animated.Value(
      Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
    ),
  );

  React.useEffect(() => {
    if (route.params?.key) {
      setParamKey(route.params?.key);
    } else {
      setParamKey(undefined);
    }

    if (route.params?.selCategory) {
      setCategorySelected(route.params?.selCategory);
    } else {
      setCategorySelected(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.key, route.params?.selCategory]);

  React.useEffect(() => {
    if (
      route.params?.applyCategory ||
      route.params?.applyDate ||
      route.params?.applyPrice
    ) {
      setCategorySelected(route.params?.applyCategory);
      setDateSelected(route.params?.applyDate);
      setSelected(route.params?.applyPrice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyCategory,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyDate,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyPrice,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  useEffect(() => {
    if (
      (categorySelected !== route.params?.applyCategory ||
        dateSelected !== route.params?.applyDate ||
        (new Date(dateChange) !== route.params?.applyDate &&
          dateChange !== undefined) ||
        dateChange !== undefined ||
        selected !== route.params?.applyPrice) &&
      JSON.stringify(buttonHeight) === JSON.stringify(0)
    ) {
      showAnimation();
    } else if (
      categorySelected === route.params?.applyCategory &&
      (new Date(dateChange) === route.params?.applyDate ||
        dateChange === undefined) &&
      dateChange === undefined &&
      dateSelected === route.params?.applyDate &&
      selected === route.params?.applyPrice
      // !paramKey
    ) {
      buttonHeight.setValue(0);
      listHeight.setValue(
        Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, dateSelected, selected, dateChange]);

  const showAnimation = () => {
    buttonHeight.setValue(0);
    listHeight.setValue(
      Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
    );
    setAnimating(true);

    Animated.parallel([
      Animated.timing(listHeight, {
        duration: 300,
        easing: Easing.linear,
        toValue:
          Platform.OS === 'ios'
            ? (safeAreaHeight - 44) * 0.91
            : (height - 44) * 0.85,
        useNativeDriver: false,
      }),
      Animated.timing(buttonHeight, {
        duration: 300,
        easing: Easing.linear,
        toValue:
          Platform.OS === 'ios'
            ? (safeAreaHeight - 44) * 0.07
            : (height - 44) * 0.07,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setAnimating(false);
    });
  };

  const handleCellClick = (item, section) => {
    if (item.name === 'Show All' || item.name === 'Show Less') {
      setShowMore(!isShowMore);
    } else if (item.name === 'Date Range') {
      setShowCalender(true);
    } else {
      if (selected && selected.indexOf(item.name) !== -1) {
        setSelected(selected.filter((items) => item.name !== items));
      } else if (dateSelected && dateSelected.indexOf(item.name) !== -1) {
        setDateSelected(undefined);
      } else if (
        categorySelected &&
        categorySelected.indexOf(item.name) !== -1
      ) {
        setCategorySelected(undefined);
      } else {
        if (section.key === 'DATE' && item.name !== 'Date Range') {
          setDateSelected(item.name);
        } else if (section.key === 'CATEGORY') {
          if (categorySelected) {
            setCategorySelected(undefined);
          }
          setCategorySelected(item.name);
        } else if (section.key === 'PRICE RANGE') {
          setSelected([...selected, item.name]);
        }
      }
    }
  };

  const sectionHeader = (item) => {
    return (
      <View style={sectionHeaderView}>
        <Text style={sectionHeaderText}>{item.key}</Text>
      </View>
    );
  };

  const filterDate = (date) => {
    return date.toString().split(' ');
  };

  const tempDataFilter = () => {
    tempData = JSON.parse(JSON.stringify(filterData));
  };
  tempDataFilter();

  const renderedView = (item, section, index) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleCellClick(item, section)}>
        <View style={renderParentView}>
          <View style={[renderView, index === 0 && {borderTopWidth: 0}]}>
            <View style={renderLeftView}>
              <Text
                style={
                  item.name === 'Show All' || item.name === 'Show Less'
                    ? closeText
                    : renderText
                }>
                {item.name}
              </Text>
            </View>
            <View style={renderRightView}>
              {item.isMore && (
                <>
                  <Image
                    source={
                      dateChange
                        ? require('../assets/images/moreThanSelected.png')
                        : require('../assets/images/moreThan.png')
                    }
                    style={moreThanImage}
                  />

                  {paramKey === item.name && (
                    <Text style={renderSelectedText}>{categorySelected} </Text>
                  )}

                  {categorySelected === item.name && (
                    <Text style={renderSelectedText}>{'All'} </Text>
                  )}
                </>
              )}
              {item.name === 'Date Range' && (
                <Text style={dateChange ? renderSelectedText : renderText}>
                  {dateChange
                    ? dateChange.toString().split(' ')[0] +
                      ' ' +
                      dateChange.toString().split(' ')[2]
                    : 'Select'}
                </Text>
              )}
              {((selected && selected.indexOf(item.name) !== -1) ||
                dateSelected === item.name ||
                (!item.isMore && categorySelected === item.name)) && (
                <Image
                  source={require('../assets/images/checkmark.png')}
                  style={moreThanImage}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <SafeAreaView
      style={[safeAreaView, showCalender && {opacity: 0.5}]}
      pointerEvents={isAnimating ? 'none' : 'auto'}>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor={'#ffffff'}
      />
      <View style={navigationView}>
        <View style={navigationCornerView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SportsScreen');
            }}>
            <Text style={closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={navigationMiddleView}>
          <Text style={headingText}>Filters</Text>
        </View>
        <View style={navigationCornerView}>
          {((selected && selected.length > 0) ||
            (dateSelected && dateSelected.length > 0) ||
            (categorySelected && categorySelected.length > 0) ||
            paramKey) && (
            <TouchableOpacity
              onPress={() => {
                setCategorySelected(undefined);
                setDateSelected(undefined);
                setSelected([]);
                setParamKey(undefined);
                setCategorySelected(undefined);
              }}>
              <Text style={closeText}>Reset All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={mainView}>
        {showCalender && (
          <Modal
            animationType={'none'}
            transparent={true}
            onRequestClose={() => setShowCalender(false)}
            visible={showCalender}>
            <View style={modelMainView}>
              <View style={subMainView}>
                <View style={headingView}>
                  <TouchableWithoutFeedback
                    onPress={() => setLeftViewSelected(true)}>
                    <View style={leftHeadingView}>
                      <Text style={calenderTitle}>Start Date</Text>
                      <Text style={yearTitle}>
                        {dateChange && filterDate(dateChange)[3]}
                      </Text>
                      <Text style={dateTitle}>
                        {dateChange &&
                          filterDate(dateChange)[0] +
                            ', ' +
                            filterDate(dateChange)[1] +
                            ' ' +
                            filterDate(dateChange)[2]}
                      </Text>
                      <View
                        style={[
                          selectedView,
                          {
                            backgroundColor: isLeftViewSelected
                              ? 'white'
                              : Colors.lightblue,
                          },
                        ]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {isRangeSelect ? (
                    <View style={leftHeadingView}>
                      <Text style={calenderTitle}>End Date</Text>
                      <Text style={yearTitle}>
                        {endDateChange && filterDate(endDateChange)[3]}
                      </Text>
                      <Text style={dateTitle}>
                        {endDateChange &&
                          filterDate(endDateChange)[0] +
                            ', ' +
                            filterDate(endDateChange)[1] +
                            ' ' +
                            filterDate(endDateChange)[2]}
                      </Text>
                      <View
                        style={[
                          selectedView,
                          {
                            backgroundColor: !isLeftViewSelected
                              ? 'white'
                              : Colors.lightblue,
                          },
                        ]}
                      />
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setLeftViewSelected(true);
                          setRangeSelect(false);
                          //setEndDateChange(undefined);
                        }}>
                        <Text style={crossButton}>x</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setRangeSelect(true);
                        setLeftViewSelected(false);
                      }}>
                      <View style={RightHeadingView}>
                        <Text style={yearTitle}>Select a Date range</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
                <View style={calenderView}>
                  <CalendarPicker
                    onDateChange={(date) => {
                      if (endDateChange && date <= endDateChange) {
                        setEndDateChange(undefined);
                        setDateChange(date);
                      } else if (
                        dateChange &&
                        isRangeSelect &&
                        dateChange <= date
                      ) {
                        setEndDateChange(date);
                      } else {
                        setEndDateChange(undefined);
                        setDateChange(date);
                      }
                    }}
                    enableSwipe={true}
                    todayBackgroundColor={'white'}
                    todayTextStyle={{
                      color: 'black',
                    }}
                    selectedRangeStartStyle={{
                      backgroundColor: Colors.blue,
                    }}
                    selectedRangeStyle={{backgroundColor: 'lightblue'}}
                    selectedRangeEndStyle={{backgroundColor: Colors.blue}}
                    allowRangeSelection={isRangeSelect}
                    selectedDayColor={Colors.blue}
                    selectedDayTextColor={'white'}
                    dayShape={'square'}
                    previousTitleStyle={{color: 'white'}}
                    nextTitleStyle={{color: 'white'}}
                  />
                </View>

                <View style={buttonsView}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setShowCalender(false);
                      setDateChange(undefined);
                      setEndDateChange(undefined);
                    }}>
                    <View style={unselectedButton}>
                      <Text style={unSelectedButtonText}>Cancel</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (dateChange && !endDateChange) {
                        setDateSelected(undefined);
                      }
                      setShowCalender(false);
                    }}>
                    <View style={selectedButton}>
                      <Text style={SelectedButtonText}>OK</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Animated.View style={[sectionListView, {height: listHeight}]}>
          <SectionList
            sections={tempData}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({section}) => sectionHeader(section)}
            renderItem={({item, section, index}) =>
              renderedView(item, section, index)
            }
          />
        </Animated.View>
        <Animated.View style={[applyButtonView, {height: buttonHeight}]}>
          <TouchableOpacity
            style={applyButton}
            onPress={() => {
              navigation.navigate('SportsScreen', {
                applyCategory: categorySelected,
                applyDate: dateChange ? new Date(dateChange) : dateSelected,
                applyPrice: selected,
              });
            }}>
            <Text style={applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </Animated.View>
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
    // flex: 1,
    width,
    height: Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
    backgroundColor: '#f0f0f0',
  },
  sectionListView: {
    width,
    height: Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
    backgroundColor: '#f0f0f0',
  },
  navigationView: {
    height: 44,
    width,
    justifyContent: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    backgroundColor: 'white',
  },
  navigationCornerView: {
    width: '20%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  navigationMiddleView: {
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: Colors.blue,
    fontSize: normalize(12),
    fontWeight: '400',
  },
  headingText: {
    fontSize: normalize(15),
    fontWeight: '500',
  },
  sectionHeaderView: {
    backgroundColor: 'lightgray',
    width,
    height: GetHeight(4.5, true),
    paddingLeft: width * 0.03,
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#777777',
    fontSize: normalize(14.5),
    fontWeight: '500',
  },
  renderParentView: {
    width,
    height: GetHeight(5.5, true),
    backgroundColor: 'white',
  },
  renderView: {
    width: width * 0.94,
    height: GetHeight(5.5, true),
    alignSelf: 'center',
    borderTopWidth: 0.3,
    borderBottomColor: 'gray',
    flexDirection: 'row',
  },
  renderLeftView: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
  },
  renderRightView: {
    width: '40%',
    height: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  renderText: {
    fontSize: normalize(13.5),
    fontWeight: '400',
    color: Colors.lightBlack,
    marginRight: width * 0.03,
  },

  renderSelectedText: {
    fontSize: normalize(13.5),
    fontWeight: '400',
    color: Colors.blue,
  },
  moreThanImage: {
    width: width * 0.05,
    height: width * 0.05,
  },
  applyButtonView: {
    position: 'absolute',
    height: 0,
    width: '100%',
    bottom: Platform.OS === 'ios' ? 0 : height * 0.065,
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
const calenderStyle = StyleSheet.create({
  modelMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMainView: {
    width: width * 0.9,
    height: height * 0.7,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headingView: {
    width: '100%',
    height: '20%',
    backgroundColor: Colors.blue,
    flexDirection: 'row',
  },
  leftHeadingView: {
    width: '50%',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: width * 0.02,
  },
  RightHeadingView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedView: {
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    marginTop: width * 0.01,
  },
  calenderTitle: {
    fontSize: normalize(12),
    color: 'white',
    fontWeight: '400',
    marginLeft: width * 0.03,
  },
  yearTitle: {
    fontSize: normalize(12.5),
    color: 'white',
    fontWeight: '500',
    marginLeft: width * 0.03,
  },
  dateTitle: {
    fontSize: normalize(13),
    color: 'white',
    fontWeight: '600',
    marginLeft: width * 0.03,
  },
  calenderView: {
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
  },
  buttonsView: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  unselectedButton: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  selectedButton: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  unSelectedButtonText: {
    color: Colors.blue,
    fontWeight: '500',
    fontSize: normalize(13),
  },
  SelectedButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: normalize(13),
  },
  crossButton: {
    fontSize: normalize(32),
    fontWeight: '700',
    color: 'white',
    position: 'absolute',
    right: width * 0.05,
    top: width * 0.0,
  },
});
export default PlaysFilter;
