import React, {useState, useEffect} from 'react';
import {version} from '../../package.json';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from 'react-native-elements';
import GetHeight from '../Functions/GetHeight';
import {round} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');

const ProfileHomeScreen = ({navigation}) => {
  const [isLogin, setLogin] = useState(false);
  const NavigationBar = () => {
    const {
      headingRightView,
      headingText,
      headingView,
      headingViewLeft,
      locationButtonText,
      navigationImageStyle,
      RoundView,
    } = navigationStyle;
    return (
      <View style={headingView}>
        <View style={headingViewLeft}>
          <Text style={headingText}>{!isLogin ? 'Hey!' : 'Hi! Divyang'}</Text>
          {isLogin && (
            <TouchableOpacity onPress={() => {}}>
              <Text style={locationButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={headingRightView}>
          <View
            style={[RoundView, !isLogin && {backgroundColor: 'transparent'}]}>
            <Image
              source={
                isLogin
                  ? require('../assets/images/bmsIcon.png')
                  : require('../assets/images/icon/navigation/person.png')
              }
              style={
                isLogin
                  ? navigationImageStyle
                  : [RoundView, {backgroundColor: 'transparent'}]
              }
              resizeMode={'contain'}
            />
          </View>
        </View>
      </View>
    );
  };

  const ContainersViews = () => {
    const {
      CornerView,
      loginView,
      mainView,
      middleView,
      settingView,
      buttonText,
      leftIcon,
      loginMiddleView,
      loginRightView,
      rightIcon,
      loginButtonView,
      morethanView,
      detailText,
      subDetailText,
      separatorView,
      bottomInformationView,
      InformationView,
      topInformationView,
      shareText,
      bookSmile,
      appVersion,
    } = containerStyle;
    return (
      <View style={mainView}>
        {!isLogin && (
          <View style={loginView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/bmsgift.png')}
                style={leftIcon}
              />
            </View>
            <View style={loginMiddleView}>
              <Text>Unlock Special offer and great benefits</Text>
            </View>
            <View style={loginRightView}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('LoginScreen')}>
                <View style={loginButtonView}>
                  <Text style={buttonText}>Login/Registration</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
        <View style={separatorView} />
        <TouchableWithoutFeedback>
          <View
            pointerEvents={isLogin ? 'auto' : 'none'}
            style={[settingView, !isLogin && {opacity: 0.5}]}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/shopping.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>Purchase History</Text>
              <Text style={subDetailText}>
                View All Your Booking and Purchases
              </Text>
            </View>
            <View style={CornerView}>
              <Image
                source={
                  isLogin
                    ? require('../assets/images/moreThan.png')
                    : require('../assets/images/lock.png')
                }
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={settingView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/gift.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>Reward</Text>
              <Text style={subDetailText}>
                View your reward and unlock a new one
              </Text>
            </View>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isLogin && (
          <>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('AccountScreen', {isLogin})}>
              <View style={settingView}>
                <View style={CornerView}>
                  <Image
                    source={require('../assets/images/setting.png')}
                    style={leftIcon}
                  />
                </View>
                <View style={middleView}>
                  <Text style={detailText}>Account and Setting</Text>
                </View>
                <View style={CornerView}>
                  <Image
                    source={require('../assets/images/moreThan.png')}
                    style={rightIcon}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={separatorView} />
          </>
        )}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('OffersScreen')}>
          <View style={settingView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/offer.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>Offers</Text>
            </View>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={settingView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/giftcard.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>GiftCard</Text>
            </View>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={settingView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/fast-food.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>Foods and Beverages</Text>
            </View>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {!isLogin && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('AccountScreen', {isLogin})}>
            <View style={settingView}>
              <View style={CornerView}>
                <Image
                  source={require('../assets/images/setting.png')}
                  style={leftIcon}
                />
              </View>
              <View style={middleView}>
                <Text style={detailText}>Account and Setting</Text>
              </View>
              <View style={CornerView}>
                <Image
                  source={require('../assets/images/moreThan.png')}
                  style={rightIcon}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback>
          <View style={settingView}>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/support.png')}
                style={leftIcon}
              />
            </View>
            <View style={middleView}>
              <Text style={detailText}>Helps and Support</Text>
            </View>
            <View style={CornerView}>
              <Image
                source={require('../assets/images/moreThan.png')}
                style={rightIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
        </View>
      </View>
      // </View>
    );
  };

  const {safeAreaView, mainView, headerView, containerView} = styles;
  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={headerView}>
          <NavigationBar />
        </View>
        <ScrollView bounces={false}>
          <View style={containerView}>
            <ContainersViews />
          </View>
        </ScrollView>
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
    backgroundColor: '#f0f0f0',
  },
  headerView: {
    height: '9%',
    width,
  },
  containerView: {
    height: '91%',
    width,
  },
});

const navigationStyle = StyleSheet.create({
  headingView: {
    width,
    height: '100%',
    backgroundColor: Colors.headingColor,
    flexDirection: 'row',
  },
  headingViewLeft: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  headingRightView: {
    width: '20%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: normalize(22),
    marginLeft: width * 0.03,
    fontWeight: 'bold',
    marginBottom: '1%',
  },
  locationButtonText: {
    color: '#f0f0f0',
    fontSize: height * 0.015,
    marginLeft: width * 0.03,
    fontFamily: 'Helvetica',
  },

  navigationImageStyle: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.05,
    backgroundColor: 'transparent',
  },
  RoundView: {
    width: width * 0.11,
    marginRight: width * 0.03,
    height: width * 0.11,
    borderRadius: width * 0.055,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
});

const containerStyle = {
  mainView: {
    width,
    height: '100%',
  },
  loginView: {
    flexDirection: 'row',
    width,
    height: GetHeight(9.5, true),
    alignItems: 'center',
    backgroundColor: 'white',
    //   marginBottom: width * 0.03,
  },
  CornerView: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    width: '70%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: width * 0.02,
  },
  loginMiddleView: {
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginRightView: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonView: {
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: Colors.blue,
  },
  buttonText: {
    fontSize: normalize(13),
    color: Colors.blue,
    fontWeight: '500',
  },
  leftIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  rightIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  settingView: {
    flexDirection: 'row',
    width,
    height: GetHeight(7.5),
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: width * 0.005,
  },
  separatorView: {
    width,
    height: width * 0.04,
    backgroundColor: '#f0f0f0',
  },
  morethanView: {
    width: width * 0.03,
    height: width * 0.03,
  },
  detailText: {
    fontSize: normalize(13.2),
    color: Colors.lightBlack,
    fontWeight: '500',
  },
  subDetailText: {
    fontSize: normalize(12),
    color: Colors.lightBlack,
    fontWeight: '400',
    marginTop: width * 0.01,
  },
  InformationView: {
    width,
    height: GetHeight(12),
  },
  topInformationView: {
    width,
    height: '70%',
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
};
export default ProfileHomeScreen;
