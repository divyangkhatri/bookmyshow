import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
let scrollRef = null;

function useInterval(callback, delay) {
  const savedCallback = useRef(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
let i = 0;
const ImageSlider = () => {
  const imageArray = [
    require('../assets/images/book-my-show-offers.jpg'),
    require('../assets/images/Giftcard.jpg'),
    require('../assets/images/stayHome.jpg'),
  ];
  const [iterator, setIterator] = useState(0);
  useInterval(() => {
    if (i === imageArray.length - 1) {
      i = 0;
    } else {
      i++;
    }
    setIterator(i);
  }, 4000);

  const {mainView, imgView} = styles;

  return (
    <View style={mainView}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        ref={(scrollView) => {
          scrollRef = scrollView;
          scrollRef &&
            scrollRef.scrollTo({
              animated: true,
              x: iterator * width,
            });
        }}>
        {imageArray.map((image) => (
          <Image
            key={image}
            source={image}
            style={imgView}
            resizeMode={'stretch'}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
  },
  imgView: {
    width,
    height: '100%',
  },
  containerView: {height: '100%'},
});
export default ImageSlider;
