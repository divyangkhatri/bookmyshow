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
} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import GetHeight from '../Functions/GetHeight';
import SafeAreaInset from 'react-native-static-safe-area-insets';
const {width, height} = Dimensions.get('window');

const safeAreaHeight =
  height - SafeAreaInset.safeAreaInsetsTop - SafeAreaInset.safeAreaInsetsBottom;
const filterData = [
  {
    key: 'CATEGORY',
    data: [
      {
        name: 'Musics Shows',
        isMore: true,
      },
      {
        name: 'Online Streaming Events',
        isMore: true,
      },
      {
        name: 'Workshops',
        isMore: true,
      },
      {
        name: 'Meetsup',
        isMore: false,
      },
      {
        name: 'Comedy Shows',
        isMore: true,
      },
      {
        name: 'Talks',
        isMore: true,
      },
      {
        name: 'Performances',
        isMore: true,
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
const FilterScreen = ({navigation, route}) => {
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

  const [paramValue, setParamValue] = useState(route.params?.selCategory);
  const [paramKey, setParamKey] = useState(route.params?.key);
  const [selected, setSelected] = useState([]);
  const [dateSelected, setDateSelected] = useState(undefined);
  const [categorySelected, setCategorySelected] = useState(undefined);
  const [isShowMore, setShowMore] = useState(false);
  const [isAnimating, setAnimating] = useState(false);
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
    console.log('param1', route.params?.selCategory);
    if (route.params?.selCategory) {
      setCategorySelected(route.params?.selCategory);
    } else {
      setCategorySelected(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.key, route.params?.selCategory]);

  React.useEffect(() => {
    console.log('lome', route);
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
  ]);

  useEffect(() => {
    if (
      (categorySelected !== route.params?.applyCategory ||
        dateSelected !== route.params?.applyDate ||
        (selected !== route.params?.applyPrice && selected.length !== 0) ||
        paramKey) &&
      JSON.stringify(buttonHeight) === JSON.stringify(0)
    ) {
      showAnimation();
    } else if (
      categorySelected === route.params?.applyCategory &&
      dateSelected === route.params?.applyDate &&
      (selected === route.params?.applyPrice || selected.length === 0) &&
      !paramKey
    ) {
      buttonHeight.setValue(0);
      listHeight.setValue(
        Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, dateSelected, selected, paramKey]);

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
    console.log(section);

    if (item.name === 'Show All' || item.name === 'Show Less') {
      setShowMore(!isShowMore);
    } else if (item.isMore && item.name !== 'Date Range') {
      // setCategorySelected(undefined);
      navigation.navigate('FilterDetailScreen', {
        name: item.name,
        selectedValue:
          categorySelected === item.name ? 'All' : categorySelected,
      });
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
          if (categorySelected || paramKey) {
            setCategorySelected(undefined);
            setParamKey(undefined);
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

  const tempDataFilter = () => {
    tempData = JSON.parse(JSON.stringify(filterData));
    if (!isShowMore) {
      tempData[0].data.splice(3, 4);
      tempData[0].data.push({name: 'Show All'});
    } else {
      tempData[0].data.push({name: 'Show Less'});
    }
  };
  tempDataFilter();

  const renderedView = (item, section, index) => {
    console.log('section', section);
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
                      categorySelected && paramKey === item.name
                        ? require('../assets/images/moreThanSelected.png')
                        : require('../assets/images/moreThan.png')
                    }
                    style={moreThanImage}
                  />

                  {paramKey === item.name && (
                    <Text style={renderSelectedText}>{categorySelected} </Text>
                  )}
                  {console.log('category sel', categorySelected)}
                  {categorySelected === item.name && (
                    <Text style={renderSelectedText}>{'All'} </Text>
                  )}
                </>
              )}
              {item.name === 'Date Range' && (
                <Text style={renderText}>Select</Text>
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
      style={safeAreaView}
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
              navigation.navigate('EventsScreen');
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
              navigation.navigate('EventsScreen', {
                applyCategory: categorySelected,
                applyDate: dateSelected,
                applyPrice: selected,
                applyMainCategory: paramKey ? paramKey : categorySelected,
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
export default FilterScreen;
