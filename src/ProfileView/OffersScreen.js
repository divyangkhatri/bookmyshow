import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Platform,
  Modal,
} from 'react-native';
import Colors from '../assets/Colors';
import SafeAreaInset from 'react-native-static-safe-area-insets';
import {normalize} from '../Functions/normalize';
import {SearchBar, Icon} from 'react-native-elements';
const {width, height} = Dimensions.get('window');
const offerData = [
  {
    key: '001',
    name: 'SBI signature card get two movie ticket every month',
    detail:
      'SBI signature credit card holder get 2 Movie ticket every month for free  upto rs 500',
    validity: '31-dec-2020 23:59',
    type: 'Credit Card',
    image: require('../assets/images/sbi.jpg'),
  },
  {
    key: '002',
    name: 'Bank Of Baroda buy 1 get 1',
    detail:
      'Customer purchase 1 ticket of movie and get another ticket for free.',
    validity: '31-Dec-2020 23:59',
    type: 'Credit Card',
    image: require('../assets/images/bob.jpg'),
  },
  {
    key: '003',
    name: 'HDFC 25% off on Times Card',
    detail:
      'All the customer which Times Card of HDFC get 25% off on their movies booking.',
    validity: '31-Jul-2021 23:59',
    type: 'Credit Card',
    image: require('../assets/images/hdfc.jpg'),
  },
  {
    key: '004',
    name: 'RBL Popcorn + Movies',
    detail:
      'Customer from RBL bank get discount of Rs 500 on movies,popcorn and fun.',
    validity: '31-Oct-2020 23:59',
    type: 'Debit Card',
    image: require('../assets/images/rblbank.png'),
  },
];
const filters = [
  {
    id: '101',
    name: 'Credit Card',
  },
  {
    id: '102',
    name: 'Debit Card',
  },
  {
    id: '103',
    name: 'BookMyShow',
  },
  {
    id: '104',
    name: 'Rewards',
  },
];

let filtersData;

const OffersScreen = ({navigation}) => {
  const {
    safeAreaView,
    mainView,
    flatListView,
    containerView,
    rightView,
    imageView,
    imageStyle,
    bottomRightView,
    cardDetail,
    cardText,
    cardValidity,
    mainListView,
    topRightView,
  } = styles;
  const {
    headingText,
    navigationCornerView,
    navigationMiddleView,
    navigationStyle,
    crossButton,
    filterView,
    searchView,
    sectionHeaderView,
    filterButton,
    filterText,
    filterImage,
    resetButton,
    redView,
  } = navigationStyles;
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectType, setSelectType] = useState([]);
  const [result, setResult] = useState([]);

  const filteringData = (text) => {
    if (
      ((text && text.length > 0) || searchText.length > 0) &&
      result.length > 0
    ) {
      filtersData = offerData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) &&
          result.indexOf(item.type) !== -1,
      );
    } else if (text && text.length > 0) {
      filtersData = offerData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
    } else if (result.length > 0) {
      filtersData = offerData.filter(
        (item) => result.indexOf(item.type) !== -1,
      );
    }
  };
  filteringData();
  const OpenModal = () => {
    const {
      buttonText,
      buttonView,
      checkBoxStyle,
      containerView,
      flatListView,
      leftView,
      mainView,
      rightView,
      safeAreaView,
      nameStyle,
    } = modalStyle;

    return (
      <Modal
        presentationStyle={'fullScreen'}
        visible={isModalOpen}
        animationType={'slide'}
        onRequestClose={() => setModalOpen(false)}>
        <SafeAreaView style={{backgroundColor: Colors.headingColor}} />
        <SafeAreaView style={safeAreaView}>
          <View style={mainView}>
            <View style={navigationStyle}>
              <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
                <View style={navigationCornerView}>
                  <Text style={crossButton}>x</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={navigationMiddleView}>
                <Text style={headingText}>Filters</Text>
              </View>
              {selectType.length > 0 && (
                <TouchableWithoutFeedback onPress={() => setSelectType([])}>
                  <View style={navigationCornerView}>
                    <Text style={resetButton}>Reset</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
            <View style={flatListView}>
              <FlatList
                style={flatListView}
                data={filters}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (selectType.indexOf(item.name) !== -1) {
                        setSelectType(
                          selectType.filter((items) => items !== item.name),
                        );
                      } else {
                        setSelectType([...selectType, item.name]);
                      }
                    }}>
                    <View style={containerView}>
                      <View style={leftView}>
                        <Image
                          source={
                            selectType.indexOf(item.name) !== -1
                              ? require('../assets/images/checkboxSelectedOrange.png')
                              : require('../assets/images/checkboxOrange.png')
                          }
                          style={checkBoxStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <View style={rightView}>
                        <Text style={nameStyle}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                setResult(selectType);
                setModalOpen(false);
              }}>
              <View
                style={[
                  {height: 0},
                  JSON.stringify(selectType) !== JSON.stringify(result) &&
                    buttonView,
                ]}>
                <Text style={buttonText}>Apply</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={navigationStyle}>
          <View style={navigationCornerView}>
            <TouchableWithoutFeedback onPress={() => navigation.pop()}>
              <Text style={crossButton}>x</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={navigationMiddleView}>
            <Text style={headingText}> Offers</Text>
          </View>
          <View style={navigationCornerView} />
        </View>
        <View style={sectionHeaderView}>
          <View style={searchView}>
            <SearchBar
              placeholderTextColor={'#98989B'}
              placeholder={'Search offers'}
              value={searchText}
              onChangeText={(text) => {
                filteringData(text);
                setSearchText(text);
              }}
              returnKeyType={'search'}
              searchIcon=<Icon
                name={'search'}
                type={'Fontisto'}
                color={'#888888'}
                size={width * 0.07}
              />
              inputContainerStyle={{
                backgroundColor: '#CBCBCC',
                height: 40,
                borderRadius: 8,
                marginTop: '1%',
              }}
              inputStyle={{color: '#444444'}}
              style={{color: 'white'}}
              containerStyle={{
                backgroundColor: 'transparent',
                height: 64,
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
              }}
            />
          </View>
          <View style={filterView}>
            <TouchableWithoutFeedback onPress={() => setModalOpen(true)}>
              <View style={filterButton}>
                {result.length > 0 && <View style={redView} />}
                <Image
                  source={require('../assets/images/filterHori.png')}
                  style={filterImage}
                />
                <Text style={filterText}>Filters</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={flatListView}>
          {isModalOpen && OpenModal()}
          <FlatList
            style={flatListView}
            keyExtractor={(item, index) => item + index}
            data={
              searchText.length > 0 || result.length > 0
                ? filtersData
                : offerData
            }
            renderItem={({item, index}) => (
              <View style={[mainListView, !index && {marginTop: '1.5%'}]}>
                <View style={containerView}>
                  <View style={imageView}>
                    <Image
                      source={item.image}
                      style={imageStyle}
                      resizeMode={'stretch'}
                    />
                  </View>
                  <View style={rightView}>
                    <View style={topRightView}>
                      <Text numberOfLines={2} style={cardText}>
                        {item.name}
                      </Text>
                      <Text numberOfLines={2} style={cardDetail}>
                        {item.detail}
                      </Text>
                    </View>
                    <View style={bottomRightView}>
                      <Text style={cardValidity}>
                        {'Valid Till : ' + item.validity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
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
  },
  flatListView: {
    width,
    height: '87%',
  },
  mainListView: {
    width,
    height: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    width: '96%',
    height: '94%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * 0.01,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.7,
    shadowRadius: 0.5,
    elevation: 5,
  },
  imageView: {
    width: '35%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '90%',
    height: '100%',
  },
  rightView: {
    width: '65%',
    height: '90%',
    paddingLeft: width * 0.02,
  },
  topRightView: {
    width: '100%',
    height: '55%',
    justifyContent: 'space-between',
  },
  bottomRightView: {
    width: '100%',
    height: '45%',
    justifyContent: 'flex-end',
  },
  cardText: {
    fontSize: normalize(13.5),
    fontWeight: '600',
    color: Colors.lightBlack,
  },
  cardDetail: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'gray',
  },
  cardValidity: {
    fontSize: normalize(11),
    fontWeight: '400',
    color: 'gray',
  },
});

const navigationStyles = StyleSheet.create({
  navigationStyle: {
    width,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.headingColor,
  },
  navigationCornerView: {
    width: '18%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationMiddleView: {
    width: '64%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  crossButton: {
    color: 'white',
    fontSize: normalize(20),
    fontWeight: '800',
    marginBottom: width * 0.017,
  },
  resetButton: {
    color: 'white',
    fontSize: normalize(13),
    fontWeight: '500',
  },
  sectionHeaderView: {
    height: 64,
    width,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchView: {
    height: '100%',
    width: '70%',
  },
  filterView: {
    height: '100%',
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: width * 0.01,
  },
  filterText: {
    color: '#777777',
    fontSize: normalize(13),
    fontWeight: '500',
  },
  filterImage: {
    width: width * 0.045,
    height: width * 0.045,
  },
  redView: {
    position: 'absolute',
    top: '23%',
    left: '20%',
    width: width * 0.017,
    height: width * 0.017,
    borderRadius: width * 0.0075,
    backgroundColor: 'red',
    zIndex: 1,
  },
});

const modalStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  buttonView: {
    width,
    height: 44,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: 'white',
  },
  flatListView: {
    width,
    height:
      Platform.OS === 'ios'
        ? height -
          SafeAreaInset.safeAreaInsetsTop -
          SafeAreaInset.safeAreaInsetsBottom -
          88
        : height - 88,
  },
  containerView: {
    width,
    height: width * 0.15,
    flexDirection: 'row',
  },
  leftView: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxStyle: {
    width: width * 0.06,
    height: width * 0.06,
  },
  rightView: {
    width: '85%',
    height: '100%',
    justifyContent: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.3,
  },
  nameStyle: {
    fontSize: normalize(13),
    fontWeight: '500',
    color: Colors.lightBlack,
  },
});

export default OffersScreen;
