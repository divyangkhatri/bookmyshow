import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  SectionList,
  FlatList,
  Platform,
} from 'react-native';
import {normalize} from 'react-native-elements';
import Colors from '../assets/Colors';
import YouTube from 'react-native-youtube';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('window');

const movieDetail = [
  {
    id: '001',
    detail: {
      youID: 'P9A6hOg9QQ0',
      language: ['English', 'Hindi'],
      genere: ['Kids', 'Comedy'],
      vision: ['2D', '3D'],
    },
  },
  {
    id: '002',
    detail: {
      youID: 'tVzS8lYzeDA',
      language: ['Hindi'],
      genere: ['Thriller', 'Crime'],
      vision: ['2D'],
    },
  },
  {
    id: '003',
    detail: {
      youID: 'tVzS8lYzeDA',
      language: ['Hindi'],
      genere: ['Comedy', ''],
      vision: ['2D'],
    },
  },
  {
    id: '004',
    detail: {
      youID: 'XIQRwZ-gza4',
      language: ['Hindi'],
      genere: ['Thriller', 'Comedy'],
      vision: ['2D'],
    },
  },
];

const sectionData = [
  {
    key: 'Cast',
    data: [{id: '1', name: 'xyz'}],
  },
  {
    key: 'Crew',
    data: [{id: '2', name: 'abc'}],
  },
];

const mainData = [
  {
    id: '001',
    Cast: [
      {
        name: 'Dwayne Johnson',
        image: require('../assets/images/DwayneJohnSon.jpg'),
        inMovie: '',
      },
      {
        name: 'Rachel Bloom',
        image: require('../assets/images/RachelBloom.jpg'),
        inMovie: 'Barb',
      },
      {
        name: 'Kelly Clarkson',
        image: require('../assets/images/KillyClarkson.jpg'),
        inMovie: 'Delta Down',
      },
      {
        name: 'Anna Kendrick',
        image: require('../assets/images/AnnaKendrick.jpg'),
        inMovie: 'Poppy',
      },
      {
        name: 'Jamie Dornan',
        image: require('../assets/images/JamieDornan.jpg'),
        inMovie: 'chez',
      },
    ],
    Crew: [
      {
        name: 'Walt Dohrn',
        image: require('../assets/images/WaltDohrn.jpg'),
        inMovie: 'Director',
      },
      {
        name: 'Gina Shay',
        image: require('../assets/images/GinaShay.jpg'),
        inMovie: 'Producer',
      },
    ],
  },
  {
    id: '002',
    Cast: [
      {
        name: 'Ayushmann Khurrana',
        image: require('../assets/images/AyushmannKhurrana.jpg'),
        inMovie: '',
      },
      {
        name: 'Bhumi Padnekar',
        image: require('../assets/images/BhumiPadnekar.jpg'),
        inMovie: '',
      },
      {
        name: 'Yami Gautam',
        image: require('../assets/images/YamiGautam.jpg'),
        inMovie: '',
      },
    ],
    Crew: [
      {
        name: 'Vijay Suthar',
        image: require('../assets/images/VijaySuthar.jpg'),
        inMovie: 'Director',
      },
    ],
  },
  {
    id: '003',
    Cast: [
      {
        name: 'Varun Dhawan',
        image: require('../assets/images/varunDhawan.jpg'),
        inMovie: 'Raju',
      },
      {
        name: 'Sara Ali Khan',
        image: require('../assets/images/SaraAliKhan.jpg'),
        inMovie: 'Kahu Chopra',
      },
      {
        name: 'Paresh Rawal',
        image: require('../assets/images/PareshRawal.jpg'),
        inMovie: 'Hoshiyaar Chand',
      },
    ],
    Crew: [
      {
        name: 'Dawid Dhawan',
        image: require('../assets/images/VijaySuthar.jpg'),
        inMovie: 'Director',
      },
    ],
  },
  {
    id: '004',
    Cast: [
      {
        name: 'Sharman Joshi',
        image: require('../assets/images/SharmanJoshi.jpg'),
        inMovie: 'Babloo',
      },
      {
        name: 'Pooja Chopra',
        image: require('../assets/images/PoojaChopra.jpg'),
        inMovie: 'Avantika',
      },
      {
        name: 'Tajashree Pradhan',
        image: require('../assets/images/TajashreePradhan.jpg'),
        inMovie: '',
      },
      {
        name: 'Rajesh Sharma',
        image: require('../assets/images/RajeshSharma.jpg'),
        inMovie: '',
      },
    ],
    Crew: [
      {
        name: 'AgniDev Chattergy',
        image: require('../assets/images/AgnidevChattergy.jpg'),
        inMovie: 'Director',
      },
    ],
  },
];

const UpComingMoviesDetailScreen = ({navigation, route}) => {
  const [movie, setMovie] = useState({});
  const [isReady, setReady] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.data.name,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            Share.open({
              title: 'Share file',
              message:
                'All that you would like to explore and know about the movie\n' +
                route.params.data.name,
              failOnCancel: false,
              url: 'bookmyshow://moviesscreen/' + route.params.data.id,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log(err);
              });
          }}>
          <Image
            source={require('../assets/images/icon/navigation/share.png')}
            style={navigationImageStyle}
            width={width * 0.06}
            height={height * 0.06}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    let tempData = route.params.data;
    let filterData = movieDetail.filter((item) => item.id === tempData.id);
    // filterData[0].detail.merge(tempData);
    // console.log(fil);
    setMovie({...filterData[0].detail, ...tempData});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    safeAreaView,
    mainView,
    navigationImageStyle,
    bottomView,
    mainContainerView,
    bottomLeftView,
    buttonInterested,
    interestedText,
    likeText,
    subLikeText,
    thumbsUpImage,
    dateText,
    flatListStyle,
    flatListView,
    castImage,
    castNameText,
    castDetailText,
    descriptionView,
    DimensionsText,
    genereText,
    innerDimensionView,
    languageText,
    mainHeaderView,
    moviesDetailView,
    moviesDimensionView,
    moviesText,
    offerDetailText,
    offerMainText,
    descriptionDetailText,
    offerSubText,
    offerView,
    sectionHeadingView,
    subLeftOfferView,
    subOfferView,
    subRightOfferView,
    youtube,
    youtubeView,
    offerImageStyle,
  } = styles;

  const MainSectionHeader = () => {
    console.log(isReady);
    return (
      <View style={mainHeaderView}>
        <View style={youtubeView}>
          <YouTube
            apiKey={'AIzaSyBrS7UQTv9z3z3R7v-FHwjhRZFHVp0YVrY'}
            videoId={movie.youID} // The YouTube video ID
            play={false} // control playback of video with true/false
            // fullscreen // control whether the video should play in fullscreen or inline
            // loop // control whether the video should loop when ended
            style={youtube}
            // onReady={(e) => setReady(true)}
            // onChangeState={(e) => setReady(true)}
            // onChangeQuality={(e) => this.setState({quality: e.quality})}
            onError={(e) => console.log('err', e)}
          />
        </View>
        <View style={moviesDetailView}>
          <Text style={moviesText}>{movie.name}</Text>
          <Text style={dateText}>{movie.releaseDate}</Text>
          <Text style={genereText}>
            {movie.genere && movie.genere.toString()}
          </Text>
          <Text style={languageText}>
            {movie.language && movie.language.toString()}
          </Text>
          <View style={moviesDimensionView}>
            {movie &&
              movie.vision &&
              movie.vision.map((item, index) => (
                <View style={innerDimensionView} key={index}>
                  <Text style={DimensionsText}>{item}</Text>
                </View>
              ))}
          </View>
        </View>
        <View style={offerView}>
          <Text style={offerMainText}>Applicable Offers</Text>
          <View style={subOfferView}>
            <View style={subLeftOfferView}>
              <Image
                source={require('../assets/images/bmsOffer.png')}
                style={offerImageStyle}
                resizeMode={'contain'}
              />
            </View>
            <View style={subRightOfferView}>
              <Text style={offerSubText}>Filmy Pass</Text>
              <Text style={offerDetailText}>
                Save upto Rs.225 on your 3 movies Buy filmy pass @Rs 99
              </Text>
            </View>
          </View>
        </View>
        <View style={descriptionView}>
          <Text style={descriptionDetailText}>
            When the Queen of the Hard Rock Trolls tries to take over all the
            Troll kingdoms, Queen Poppy and her friends try different ways to
            save all the Trolls.
          </Text>
        </View>
      </View>
    );
  };
  const SectionHeader = (item) => {
    return (
      <View style={sectionHeadingView}>
        <Text style={moviesText}>{item.key}</Text>
      </View>
    );
  };

  const RenderView = (item, section) => {
    let filterData = mainData.filter((item) => item.id === movie.id);
    filterData = filterData[0];
    let key = section.key;
    return (
      <FlatList
        bounces={false}
        data={filterData && filterData[key]}
        style={flatListStyle}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item1, index) => item1 + index}
        horizontal={true}
        renderItem={({item}) => (
          <View style={flatListView}>
            <Image source={item.image} style={castImage} />
            <Text style={castNameText}>{item.name}</Text>
            <Text style={castDetailText}>
              {item.inMovie !== '' && 'as ' + item.inMovie}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <View style={mainContainerView}>
          <SectionList
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{flex: 1}}
            sections={sectionData}
            ListHeaderComponent={MainSectionHeader()}
            renderSectionHeader={({section}) => SectionHeader(section)}
            renderItem={({item, section}) => RenderView(item, section)}
          />
        </View>
        <View style={bottomView}>
          <View>
            <View style={bottomLeftView}>
              <Image
                source={require('../assets/images/thumbsup.png')}
                style={thumbsUpImage}
                resizeMode={'contain'}
              />
              <Text style={likeText}>
                {movie.votes > 1000
                  ? (movie.votes / 1000).toFixed(
                      movie.votes % 1000 < 100 ? 0 : 1,
                    ) + 'K'
                  : movie.votes}
              </Text>
            </View>
            <Text style={subLikeText}>People interested</Text>
          </View>
          <View style={buttonInterested}>
            <Text style={interestedText}>Interested?</Text>
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
  },
  navigationImageStyle: {
    width: width * 0.06,
    height: height * 0.06,
    marginRight: width * 0.03,
  },
  bottomView: {
    position: 'absolute',
    width,
    height: width * 0.2,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
    borderTopWidth: 0.3,
    borderTopColor: 'lightgray',
  },
  bottomLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbsUpImage: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: width * 0.02,
  },
  likeText: {
    fontSize: normalize(15),
    fontWeight: '600',
  },
  subLikeText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  buttonInterested: {
    width: '40%',
    height: '60%',
    borderWidth: 0.5,
    borderColor: Colors.blue,
    borderRadius: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestedText: {
    color: Colors.blue,
    fontSize: normalize(13.5),
    fontWeight: '500',
  },
  mainContainerView: {
    flex: Platform.OS === 'ios' ? 0.89 : 0.87,
  },
  mainHeaderView: {
    width,
    height: height * 0.8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  youtubeView: {
    width: '96%',
    height: '35%',
    alignItems: 'center',
    marginVertical: '3%',
  },
  youtube: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
  },
  moviesDetailView: {
    width,
    height: '22%',
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginBottom: width * 0.03,
  },
  moviesDimensionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerDimensionView: {
    paddingHorizontal: width * 0.02,
    paddingVertical: width * 0.005,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginRight: width * 0.02,
  },
  moviesText: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  dateText: {
    fontSize: normalize(13),
    fontWeight: '500',
    color: Colors.lightBlack,
  },
  genereText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: 'gray',
  },
  languageText: {
    fontSize: normalize(11),
    fontWeight: '300',
    color: 'gray',
  },
  DimensionsText: {
    fontSize: normalize(12.5),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  offerView: {
    width,
    height: '19%',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  subOfferView: {
    flexDirection: 'row',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  subLeftOfferView: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerImageStyle: {
    width: '50%',
    height: '50%',
  },
  subRightOfferView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    paddingRight: width * 0.01,
  },
  offerMainText: {
    fontSize: normalize(14),
    fontWeight: '500',
  },
  offerSubText: {
    fontSize: normalize(13),
    fontWeight: '600',
  },
  offerDetailText: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  descriptionDetailText: {
    fontSize: normalize(12.6),
    fontWeight: '400',
    color: Colors.lightBlack,
  },
  descriptionView: {
    backgroundColor: '#f0f0f0',
    height: '23%',
    width,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.05,
  },
  sectionHeadingView: {
    height: width * 0.12,
    justifyContent: 'center',
    paddingHorizontal: width * 0.03,
    backgroundColor: 'white',
  },
  flatListStyle: {
    width,
    height: width * 0.38,
    backgroundColor: 'white',
  },
  flatListView: {
    width: width * 0.25,
    height: width * 0.38,
    backgroundColor: 'white',
    marginHorizontal: width * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  castImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.01,
  },
  castNameText: {
    fontSize: normalize(12),
    color: Colors.blue,
  },
  castDetailText: {
    fontSize: normalize(11.5),
    color: Colors.lightBlack,
    paddingBottom: width * 0.02,
  },
});
export default UpComingMoviesDetailScreen;
