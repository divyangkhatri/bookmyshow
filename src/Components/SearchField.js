import React from 'react';
import {View, StyleSheet, Image, TextInput, Platform} from 'react-native';
import Colors from '../assets/Colors';
import {normalize} from '../Functions/normalize';
interface TextField {
  value: string;
  onChangeText: Function;
  placeHolder: string;
}
const SearchField = (prop: TextField) => {
  const {onChangeText, placeHolder, value} = prop;
  const {
    mainView,
    imageView,
    textField,
    textFieldView,
    textView,
    searchImage,
    placeholderStyle,
  } = styles;
  return (
    <View style={mainView}>
      <View style={textFieldView}>
        <View style={imageView}>
          <Image
            source={require('../assets/images/icon/Common/searchPurple.png')}
            resizeMode={'contain'}
            style={searchImage}
          />
        </View>
        <View style={textView}>
          <TextInput
            numberOfLines={1}
            style={textField}
            onChangeText={onChangeText}
            placeholder={placeHolder}
            value={value}
            placeholderTextColor={'lightgray'}
            returnKeyType={'search'}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.headingColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldView: {
    height: '60%',
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#5A5D6E',
  },
  imageView: {
    width: '10%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    width: '90%',
    height: '98%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    width: '100%',
    height: '100%',
    color: 'white',
    fontSize: normalize(13),
    backgroundColor: '#5A5D6E',
    paddingBottom: Platform.OS === 'ios' ? 0 : '1.5%',
  },
  placeholderStyle: {
    fontSize: normalize(12),
  },
  searchImage: {
    height: '70%',
    width: '70%',
  },
});
export default SearchField;
