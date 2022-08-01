import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  Platform,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {normalize} from '../Functions/normalize';
import SafeAreaInset from 'react-native-static-safe-area-insets';
import Colors from '../assets/Colors';
import {useKeyboard} from '../Functions/useKeyboard';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const {width, height} = Dimensions.get('window');
let keyRef;
const safeAreaHeight =
  Platform.OS === 'ios'
    ? height -
      SafeAreaInset.safeAreaInsetsTop -
      SafeAreaInset.safeAreaInsetsBottom
    : height;
const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboard] = useKeyboard();
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  useEffect(() => {
    if (keyboard) {
      keyRef.props.scrollToPosition(
        0,
        safeAreaHeight - keyboard - safeAreaHeight * 0.18,
        true,
      );
    } else if (Platform.OS === 'android' && keyboard === 0) {
      keyRef.props.scrollToPosition(0, 0, true);
    }
  }, [keyboard]);

  const onAppleButtonPress = async () => {
    if (appleAuth.isSupported) {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        });

        // get current authentication state for user
        const credentialState = await appleAuth.getCredentialStateForUser(
          appleAuthRequestResponse.user,
        );

        // use credentialState response to ensure the user is authenticated
        if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
          // user is authenticated
        }
      } catch (e) {
        console.error('error in apple singin' + e);
      }
    } else {
      console.error('not supported device');
    }
  };

  const onFacebookButtonPress = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          let req = new GraphRequest(
            '/me',
            {
              httpMethod: 'GET',
              version: 'v2.5',
              parameters: {
                fields: {
                  string: 'name,picture.type,email',
                },
              },
            },
            (err, res) => {
              console.error(err, res);
            },
          );
          new GraphRequestManager().addRequest(req).start();
        }
      },
      function (error) {
        console.error('Login fail with error: ' + error);
      },
    );
  };

  const Navigator = () => {
    const {
      navigationCornerView,
      headingText,
      navigationMiddleView,
      crossButton,
      navigationStyle,
    } = navigationStyles;
    return (
      <View style={navigationStyle}>
        <View style={navigationCornerView} />
        <View style={navigationMiddleView}>
          <Text style={headingText}>Get Started</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.pop()}>
          <View style={navigationCornerView}>
            <Text style={crossButton}>x</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const {
    safeAreaView,
    mainView,
    imageStyle,
    flagStyle,
    containerView,
    middleView,
    appleView,
    cornerView,
    facebookView,
    googleTextStyle,
    googleView,
    socialMediaView,
    appleTextStyle,
    textFieldView,
    emailText,
    numberText,
    ORView,
    numberView,
    textFieldStyle,
    buttonText,
    continueButton,
    enabledContinueButton,
  } = styles;
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white'}} />
      <StatusBar backgroundColor={'white'} barStyle={'default'} />
      <SafeAreaView style={safeAreaView}>
        <View style={mainView}>
          <Navigator />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            innerRef={(ref) => {
              keyRef = ref;
            }}
            scrollEnabled={false}
            onKeyboardWillShow={() => {
              setKeyboardVisible(true);
            }}
            onKeyboardWillHide={() => setKeyboardVisible(false)}>
            <View style={containerView}>
              <View style={socialMediaView}>
                <TouchableWithoutFeedback onPress={() => onAppleButtonPress()}>
                  <View style={appleView}>
                    <View style={cornerView}>
                      <Image
                        source={require('../assets/images/apple.png')}
                        style={imageStyle}
                        resizeMode={'stretch'}
                      />
                    </View>
                    <View style={middleView}>
                      <Text style={appleTextStyle}> Continue with Apple </Text>
                    </View>
                    <View style={cornerView} />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => onFacebookButtonPress()}>
                  <View style={facebookView}>
                    <View style={cornerView}>
                      <Image
                        source={require('../assets/images/facebook.png')}
                        style={imageStyle}
                        resizeMode={'stretch'}
                      />
                    </View>
                    <View style={middleView}>
                      <Text style={appleTextStyle}>
                        {' '}
                        Continue with Facebook{' '}
                      </Text>
                    </View>
                    <View style={cornerView} />
                  </View>
                </TouchableWithoutFeedback>
                <View style={googleView}>
                  <View style={cornerView}>
                    <Image
                      source={require('../assets/images/google.png')}
                      style={imageStyle}
                      resizeMode={'stretch'}
                    />
                  </View>
                  <View style={middleView}>
                    <Text style={googleTextStyle}> Continue with Google </Text>
                  </View>
                  <View style={cornerView} />
                </View>
              </View>
              <View style={numberView}>
                <View style={ORView}>
                  <Text style={googleTextStyle}>OR</Text>
                </View>
                <View style={textFieldView}>
                  <Image
                    source={require('../assets/images/Flag-India.jpg')}
                    resizeMode={'stretch'}
                    style={flagStyle}
                  />
                  <Text style={numberText}>+91</Text>
                  <TextInput
                    style={textFieldStyle}
                    placeholder={'Continue with Number'}
                    keyboardType={'phone-pad'}
                    value={phoneNumber}
                    maxLength={10}
                    onChangeText={(text) => setPhoneNumber(text)}
                    returnKeyType={'done'}
                  />
                </View>
                <Text style={emailText}>Used to Login via email</Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        {(keyboard !== 0 || isKeyboardVisible) && (
          <View
            style={[
              phoneNumber.length === 10
                ? enabledContinueButton
                : continueButton,
              keyboard && {bottom: keyboard + width * 0.04},
            ]}>
            <Text style={buttonText}> Continue </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  containerView: {
    width,
    height: safeAreaHeight - 44,
    backgroundColor: '#f0f0f0',
  },
  socialMediaView: {
    height: '35%',
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: safeAreaHeight * 0.015,
  },
  appleView: {
    backgroundColor: 'black',
    width: '90%',
    height: '25%',
    flexDirection: 'row',
    borderRadius: width * 0.01,
  },
  facebookView: {
    backgroundColor: '#425A94',
    width: '90%',
    height: '25%',
    flexDirection: 'row',
    borderRadius: width * 0.01,
  },
  googleView: {
    backgroundColor: 'white',
    width: '90%',
    height: '25%',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.lightBlack,
    borderRadius: width * 0.01,
  },

  cornerView: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.07,
    height: width * 0.07,
  },
  appleTextStyle: {
    fontSize: normalize(13.5),
    fontWeight: '400',
    color: 'white',
  },
  googleTextStyle: {
    fontSize: normalize(13.5),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  numberView: {
    height: '20%',
    width,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ORView: {
    height: '20%',
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldView: {
    flexDirection: 'row',
    width: '90%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  numberText: {
    fontSize: normalize(13),
    fontWeight: '400',
  },
  emailText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: Colors.blue,
  },
  textFieldStyle: {
    marginTop: '.9%',
    width: '80%',
    height: Platform.OS == 'android' ? '130%' : '100%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    fontSize: normalize(13),
    fontWeight: '400',
  },
  flagStyle: {
    width: width * 0.06,
    height: width * 0.04,
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.9,
    height: width * 0.13,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    borderRadius: width * 0.01,
  },
  enabledContinueButton: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.9,
    height: width * 0.13,
    alignSelf: 'center',
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.01,
  },
  buttonText: {
    fontSize: normalize(14),
    color: 'white',
    fontWeight: '500',
  },
});

const navigationStyles = StyleSheet.create({
  navigationStyle: {
    width,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
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
    color: 'black',
    fontSize: normalize(14),
    fontWeight: '600',
  },
  crossButton: {
    color: '#666666',
    fontSize: normalize(20),
    fontWeight: '800',
    marginBottom: width * 0.017,
  },
});
export default LoginScreen;
