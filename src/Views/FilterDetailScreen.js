import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Text,
  Animated,
  Easing,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import GetHeight from '../Functions/GetHeight';
import SafeAreaInset from 'react-native-static-safe-area-insets';
const {height, width} = Dimensions.get('window');
const safeAreaHeight =
  height - SafeAreaInset.safeAreaInsetsTop - SafeAreaInset.safeAreaInsetsBottom;
let tempData;
const filterData = [
  {
    key: 'Musics Shows',
    data: ['Concerts', 'Club Gigs', 'Music Festivals'],
  },
  {
    key: 'Online Streaming Events',
    data: ['Kid Activities'],
  },
  {
    key: 'Talks',
    data: ['Acting'],
  },
  {
    key: 'Workshops',
    data: [
      'Health and Fitness',
      'Wellness',
      'Yoga',
      'Photography',
      'Education',
      'Food and Drinks',
      'Dance',
      'Music',
      'Kid Activities',
      'Writing',
      'Business',
      'Self Improvement',
      'Fashion and Beauty',
      'Arts and Crafts',
    ],
  },
  {
    key: 'Comedy Shows',
    data: ['Stand up Comedy'],
  },
  {
    key: 'Screening',
    data: ['Films'],
  },
  {
    key: 'Performances',
    data: ['Magic'],
  },
];
const FilterDetailScreen = ({navigation, route}) => {
  const [selected, setSelected] = useState(undefined);
  const [buttonHeight] = useState(new Animated.Value(0));
  const [isAnimating, setAnimating] = useState(false);
  const [listHeight] = useState(
    new Animated.Value(
      Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
    ),
  );
  const paramsValue = route.params.name;

  React.useEffect(() => {
    if (route.params?.selectedValue) {
      setSelected(route.params?.selectedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.selectedValue]);
  useEffect(() => {
    console.log('sel', selected);
    console.log('route', route.params?.selectedValue);
    if (
      selected !== route.params?.selectedValue &&
      JSON.stringify(buttonHeight) === JSON.stringify(0)
    ) {
      showAnimation();
    } else if (selected === route.params?.selectedValue) {
      buttonHeight.setValue(0);
      listHeight.setValue(
        Platform.OS === 'ios' ? safeAreaHeight - 44 : height - 44,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, route.params?.selectedValue]);

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
            : (height - 44) * 0.91,
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
    moreThanImage,
    applyButton,
    applyButtonText,
    applyButtonView,
    sectionListView,
    resetText,
    renderParentView,
  } = styles;

  const filteringData = () => {
    tempData = filterData.filter((item) => {
      return item.key === paramsValue;
    });
    if (tempData[0].data[0] !== 'All') {
      tempData[0].data.unshift('All');
    }
  };
  filteringData();
  const handleCellClick = (item) => {
    if (selected && selected.indexOf(item) !== -1) {
      setSelected(undefined);
    } else {
      setSelected(item);
    }
  };

  const renderedView = (item) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleCellClick(item)}>
        <View style={renderParentView}>
          <View style={renderView}>
            <View style={renderLeftView}>
              <Text style={renderText}>{item}</Text>
            </View>
            <View style={renderRightView}>
              {selected && selected === item && (
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
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')}>
            <Text style={closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={navigationMiddleView}>
          <Text style={headingText}>{paramsValue}</Text>
        </View>
        <View style={navigationCornerView}>
          {selected && selected.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSelected(undefined);
              }}>
              <Text style={resetText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={mainView}>
        <Animated.View style={[sectionListView, {height: listHeight}]}>
          <FlatList
            data={tempData[0].data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, section}) => renderedView(item, section)}
          />
        </Animated.View>
        <Animated.View style={[applyButtonView, {height: buttonHeight}]}>
          <TouchableOpacity
            style={applyButton}
            onPress={() => {
              console.log('sele', selected);
              if (selected) {
                navigation.navigate('FilterScreen', {
                  key: paramsValue,
                  selCategory: selected,
                });
              } else {
                navigation.navigate('FilterScreen', {
                  key: undefined,
                  selCategory: undefined,
                });
              }
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
    borderBottomWidth: 0.3,
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
  resetText: {
    color: Colors.blue,
    fontSize: normalize(12),
    fontWeight: '400',
    marginLeft: width * 0.05,
  },
  headingText: {
    fontSize: normalize(15),
    fontWeight: '500',
  },
  renderParentView: {
    width,
    height: GetHeight(5.5, true),
    backgroundColor: 'white',
  },

  renderView: {
    width: width * 0.96,
    height: GetHeight(5.5, true),
    alignSelf: 'center',
    borderBottomWidth: 0.3,
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
    // marginRight: width * 0.015,
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
  moreThanImage: {
    width: width * 0.05,
    height: width * 0.05,
  },
});
export default FilterDetailScreen;
