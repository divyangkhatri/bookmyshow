import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
import customDate from '../Functions/customDate';
const {height, width} = Dimensions.get('window');
const category = ['Gaming'];
const ActivitiesScreen = ({navigation, route}) => {
  const {
    safeAreaView,
    mainView,
    categoryText,
    innerCategoryScrollView,
    headerView,
    categoryBox,
    selectedCategoryBox,
    selectedCategoryText,
    crossStyle,
    navigationImageStyle,
    containerView,
    filterView,
    filterImage,
    dotView,
    navigationLeftImageStyle,
  } = styles;
  const [getDate, setDate] = useState(undefined);
  const [getCategory, setCategory] = useState(undefined);
  const [getApplyPrice, setApplyPrice] = useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sports in ' + route.params.selectedCity,
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
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image
            source={require('../assets/images/icon/navigation/back.png')}
            style={navigationLeftImageStyle}
            width={width * 0.06}
            height={height * 0.06}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  React.useEffect(() => {
    if (route.params?.applyDate) {
      setDate(route.params?.applyDate);
    } else {
      setDate(undefined);
    }

    if (route.params?.applyPrice) {
      setApplyPrice(route.params?.applyPrice);
    } else {
      setApplyPrice([]);
    }
    if (route.params?.applyCategory) {
      setCategory(route.params?.applyCategory);
    } else {
      setCategory(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyDate,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyPrice,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    route.params?.applyCategory,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);
  const HeaderCategory = () => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={innerCategoryScrollView}>
          {getDate && getCategory && (
            <View style={innerCategoryScrollView}>
              <TouchableWithoutFeedback onPress={() => setDate(undefined)}>
                <View style={selectedCategoryBox}>
                  <Text style={selectedCategoryText}>
                    {getDate !== 'Today' && getDate !== 'Tomorrow'
                      ? getDate.toString().split(' ')[1] +
                        ' ' +
                        getDate.toString().split(' ')[2]
                      : getDate}
                  </Text>
                  <Text style={crossStyle}>{'x'}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setCategory(undefined)}>
                <View style={selectedCategoryBox}>
                  <Text style={selectedCategoryText}>{getCategory}</Text>
                  <Text style={crossStyle}>{'x'}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {getDate && !getCategory && (
            <View style={innerCategoryScrollView}>
              <TouchableWithoutFeedback onPress={() => setDate(undefined)}>
                <View style={selectedCategoryBox}>
                  <Text style={selectedCategoryText}>
                    {' '}
                    {getDate !== 'Today' && getDate !== 'Tomorrow'
                      ? getDate.toString().split(' ')[1] +
                        ' ' +
                        getDate.toString().split(' ')[2]
                      : getDate}
                  </Text>
                  <Text style={crossStyle}>{'x'}</Text>
                </View>
              </TouchableWithoutFeedback>
              {category.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => setCategory(item)}>
                    <View style={categoryBox}>
                      <Text style={categoryText}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          )}
          {getCategory && !getDate && (
            <View style={innerCategoryScrollView}>
              <TouchableWithoutFeedback onPress={() => setCategory(undefined)}>
                <View style={selectedCategoryBox}>
                  <Text style={selectedCategoryText}> {getCategory}</Text>
                  <Text style={crossStyle}>{'x'}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setDate('Today')}>
                <View style={categoryBox}>
                  <Text style={categoryText}> Today</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setDate('Tomorrow')}>
                <View style={categoryBox}>
                  <Text style={categoryText}>Tomorrow</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setDate('Weekend')}>
                <View style={categoryBox}>
                  <Text style={categoryText}>Weekend</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {!getCategory && !getDate && (
            <View style={innerCategoryScrollView}>
              <TouchableWithoutFeedback onPress={() => setDate('Today')}>
                <View style={categoryBox}>
                  <Text style={categoryText}> Today</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setDate('Tomorrow')}>
                <View style={categoryBox}>
                  <Text style={categoryText}>Tomorrow</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setDate('Weekend')}>
                <View style={categoryBox}>
                  <Text style={categoryText}>Weekend</Text>
                </View>
              </TouchableWithoutFeedback>
              {category.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => setCategory(item)}>
                    <View style={categoryBox}>
                      <Text style={categoryText}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={headerView}>
          <HeaderCategory />
        </View>
        <View style={containerView}>
          <FlatListView
            category={getCategory}
            date={getDate}
            price={getApplyPrice}
            navigation={navigation}
          />
          <View style={filterView}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('ActivitiesFilter', {
                  applyDate: getDate,
                  applyCategory: getCategory,
                  applyPrice: getApplyPrice,
                });
              }}>
              <Image
                source={require('../assets/images/filter.png')}
                style={filterImage}
                resizeMode={'cover'}
              />
            </TouchableWithoutFeedback>
            {getCategory || getDate || getApplyPrice.length > 0 ? (
              <View style={dotView} />
            ) : (
              <View />
            )}
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
  mainView: {
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    height: '8%',
    width,
    backgroundColor: Colors.lightGray,
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
  navigationLeftImageStyle: {
    width: width * 0.06,
    height: height * 0.06,
    marginLeft: width * 0.03,
  },

  categoryScrollView: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerCategoryScrollView: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.02,
  },
  categoryBox: {
    height: '60%',
    borderRadius: height * 0.02,
    borderColor: Colors.lightBlack,
    borderWidth: 1,
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
    marginHorizontal: width * 0.01,
  },
  selectedCategoryBox: {
    height: '60%',
    borderRadius: height * 0.02,
    borderColor: Colors.lightBlack,
    borderWidth: 1,

    paddingLeft: width * 0.04,
    paddingRight: width * 0.03,
    backgroundColor: Colors.headingColor,
    alignItems: 'center',
    marginHorizontal: width * 0.01,
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: normalize(13),
    color: Colors.lightBlack,
    fontWeight: '500',
  },
  selectedCategoryText: {
    fontSize: normalize(13),
    color: '#ffffff',
    fontWeight: '500',
    marginRight: width * 0.02,
  },
  crossStyle: {
    fontSize: normalize(13),
    color: 'white',
    fontWeight: '600',
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
});
const FlatListView = (prop) => {
  const {
    contentView,
    flatList,
    imageStyle,
    mainView,
    categoryText,
    eventName,
    price,
    venue,
    componentHeaderStyle,
    dateText,
    dateView,
  } = flatListStyles;
  const data = [
    {
      key: '501',
      name: 'The Serial Killer',
      category: ['Gaming'],
      date: new Date(2020, 4, 11),
      venue: 'Online',
      image: require('../assets/images/serialKiller.jpeg'),
      isOnwards: true,
      price: 885,
    },
    {
      key: '502',
      name: 'The Escape of MR O',
      category: ['Gaming'],
      date: new Date(2020, 3, 11),
      venue: 'Online',
      image: require('../assets/images/TheEscapeofMRO.jpeg'),
      isOnwards: true,
      price: 590,
    },
    {
      key: '503',
      name: 'STEM Hacker',
      category: ['Gaming'],
      date: new Date(2020, 3, 11),
      venue: 'Online',
      image: require('../assets/images/hacker.jpg'),
      isOnwards: true,
      price: 885,
    },
  ];
  let tempData;
  if (prop.category || prop.date || prop.price.length > 0) {
    let tempDate = new Date();
    let dt =
      prop.date === 'Today'
        ? new Date(
            tempDate.getFullYear(),
            tempDate.getMonth(),
            tempDate.getDate(),
          )
        : new Date(
            tempDate.getFullYear(),
            tempDate.getMonth(),
            tempDate.getDate() + 1,
          );
    if (prop.date !== 'Today' && prop.date !== 'Tomorrow' && prop.date) {
      dt = new Date(
        prop.date.getFullYear(),

        prop.date.getMonth(),

        prop.date.getDate(),
      );
    }
    if (prop.category && prop.date && prop.price.length > 0) {
      tempData = data.filter((item) => {
        if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1
          );
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            item.price >= 501
          );
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            item.price >= 0 &&
            item.price <= 2000
          );
        } else if (
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            (item.price <= 500 || item.price >= 2000)
          );
        } else if (prop.price.indexOf('0 - 500') !== -1) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            item.price < 500
          );
        } else if (prop.price.indexOf('501 - 2000') !== -1) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            item.price >= 501 &&
            item.price <= 2000
          );
        } else if (prop.price.indexOf('Above 2000') !== -1) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.category.indexOf(prop.category) !== -1 &&
            item.price > 2000
          );
        }
      });
    } else if (prop.price.length > 0 && prop.category) {
      tempData = data.filter((item) => {
        if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return item.category.indexOf(prop.category) !== -1;
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1
        ) {
          return (
            item.category.indexOf(prop.category) !== -1 && item.price >= 501
          );
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.category.indexOf(prop.category) !== -1 &&
            item.price >= 0 &&
            item.price <= 2000
          );
        } else if (
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.category.indexOf(prop.category) !== -1 &&
            (item.price <= 500 || item.price >= 2000)
          );
        } else if (prop.price.indexOf('0 - 500') !== -1) {
          return (
            item.category.indexOf(prop.category) !== -1 && item.price < 500
          );
        } else if (prop.price.indexOf('501 - 2000') !== -1) {
          return (
            item.category.indexOf(prop.category) !== -1 &&
            item.price >= 501 &&
            item.price <= 2000
          );
        } else if (prop.price.indexOf('Above 2000') !== -1) {
          return (
            item.category.indexOf(prop.category) !== -1 && item.price > 2000
          );
        }
      });
    } else if (prop.price.length > 0 && prop.date) {
      tempData = data.filter((item) => {
        if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return item.date.getTime() === dt.getTime();
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1
        ) {
          return item.date.getTime() === dt.getTime() && item.price >= 501;
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.price >= 0 &&
            item.price <= 2000
          );
        } else if (
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return (
            item.date.getTime() === dt.getTime() &&
            (item.price <= 500 || item.price >= 2000)
          );
        } else if (prop.price.indexOf('0 - 500') !== -1) {
          return item.date.getTime() === dt.getTime() && item.price < 500;
        } else if (prop.price.indexOf('501 - 2000') !== -1) {
          return (
            item.date.getTime() === dt.getTime() &&
            item.price >= 501 &&
            item.price <= 2000
          );
        } else if (prop.price.indexOf('Above 2000') !== -1) {
          return item.date.getTime() === dt.getTime() && item.price > 2000;
        }
      });
    } else if (prop.category && prop.date) {
      tempData = data.filter(
        (item) =>
          item.date.getTime() === dt.getTime() &&
          item.category.indexOf(prop.category) !== -1,
      );
    } else if (prop.category) {
      tempData = data.filter(
        (item) => item.category.indexOf(prop.category) !== -1,
      );
    } else if (prop.price.length > 0) {
      tempData = data.filter((item) => {
        if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return item;
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('Above 2000') !== -1
        ) {
          return item.price >= 501;
        } else if (
          prop.price.indexOf('501 - 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return item.price >= 0 && item.price <= 2000;
        } else if (
          prop.price.indexOf('Above 2000') !== -1 &&
          prop.price.indexOf('0 - 500') !== -1
        ) {
          return item.price <= 500 || item.price >= 2000;
        } else if (prop.price.indexOf('0 - 500') !== -1) {
          return item.price < 500;
        } else if (prop.price.indexOf('501 - 2000') !== -1) {
          return item.price >= 501 && item.price <= 2000;
        } else if (prop.price.indexOf('Above 2000') !== -1) {
          return item.price > 2000;
        }
      });
    } else if (prop.date) {
      tempData = data.filter((item) => item.date.getTime() === dt.getTime());
    }
  } else {
    tempData = data;
  }
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

        {/*<View style={subTextView}>*/}
        <View style={dateView}>
          <Text style={dateText}>
            {customDate(
              items.item.date.getDay(),
              items.item.date.getDate(),
              items.item.date.getMonth(),
            )}
          </Text>
        </View>
        <Text style={categoryText} numberOfLines={1}>
          {items.item.category.toString()}
        </Text>
        {/*</View>*/}
        <Text style={eventName} numberOfLines={2}>
          {items.item.name}
        </Text>
        <Text style={venue} numberOfLines={1}>
          {items.item.venue}
        </Text>
        <Text style={price} numberOfLines={1}>
          {'₹' + items.item.price + ' Onwards'}
        </Text>
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
        ListHeaderComponent={HeaderView(prop.navigation)}
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
    height: width * 0.15,
    // backgroundColor: 'green',
  },
  contentView: {
    width: '48%',
    height: height * 0.4,
    marginTop: '4%',
    marginBottom: '4%',
    // backgroundColor: 'green',
  },
  imageStyle: {
    height: '73%',
    width: '100%',
  },
  venue: {
    fontSize: normalize(11),
    fontWeight: '600',
    color: 'lightgray',
    marginTop: width * 0.01,
  },
  eventName: {
    color: Colors.lightBlack,
    fontSize: normalize(14),
    fontWeight: '500',
    marginTop: width * 0.01,
  },
  price: {
    color: '#666666',
    fontSize: normalize(11),
    fontWeight: '400',
    marginTop: width * 0.01,
  },
  categoryText: {
    color: 'gray',
    fontSize: normalize(10),
    fontWeight: '400',
    marginTop: width * 0.02,
  },
  dateView: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: '28%',
    left: '5%',
    zIndex: 1,
  },
  dateText: {
    color: 'white',
    fontSize: normalize(11),
    fontWeight: '400',
  },
});
const HeaderView = (navigation) => {
  const {
    browseVenueCenterView,
    browseVenueCornerView,
    browseVenueView,
    mainView,
    imageStyle,
    slideShowView,
    venueText,
    browseView,
  } = headerStyles;
  return (
    <View style={mainView}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('MapViewScreen', {sports: 'Sports Venue'})
        }>
        <View style={browseView}>
          <View style={browseVenueView}>
            <View style={browseVenueCornerView}>
              <Image
                source={require('../assets/images/marker.png')}
                resizeMode={'contain'}
                style={imageStyle}
              />
            </View>
            <View style={browseVenueCenterView}>
              <Text style={venueText}> Browse by Venue</Text>
            </View>
            <View style={browseVenueCornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                resizeMode={'cover'}
                style={imageStyle}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const headerStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  browseView: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
  },
  browseVenueView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#444444',
  },
  browseVenueCornerView: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseVenueCenterView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.04,
    height: width * 0.04,
  },
  venueText: {
    color: Colors.lightBlack,
    fontSize: normalize(14),
    fontWeight: '500',
  },
});

export default ActivitiesScreen;
