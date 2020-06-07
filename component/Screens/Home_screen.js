import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {db} from '../../android/app/src/config';
import {Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const apiURL = 'https://www.breakingbadapi.com/api/characters?limit=6'
    fetch(apiURL)
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          data: resJson,
        });
      });
  };
  renderRow = ({item, index}) => {
    if (index === 5) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Top Professionals')}>
            <ImageBackground
              style={styles.prof_sal_imgbg}
              resizeMode="cover"
              source={{uri: item.img}}>
              <Text style={styles.prof_sal_text}>See All...</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
    // const { signIn } = React.useContext(AuthContext);

    return (
      <View>
        <Image
          style={styles.prof_sal_img}
          resizeMode="cover"
          source={{uri: item.img}}
        />
      </View>
    );
  };

  renderRows = ({item, index}) => {
    if (index === 5) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Top Salloons')}>
            <ImageBackground
              style={styles.prof_sal_imgbg}
              resizeMode="cover"
              source={{uri: item.img}}>
              <Text style={styles.prof_sal_text}>See All...</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <Image
          style={styles.prof_sal_img}
          resizeMode="cover"
          source={{uri: item.img}}
        />
      </View>
    );
  };
  render() {
    return (
      <View>
        <Title style={styles.text_list}>Top Professionals</Title>
        <View style={styles.separator} />
        <FlatList
          data={this.state.data}
          SeparatorComponent={() => <View style={styles.prof_sal_seprator} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={this.renderRow}
        />

        <Title style={styles.text_list}>Top Salloons</Title>
        <View style={styles.separator} />
        <FlatList
          data={this.state.data}
          SeparatorComponent={() => <View style={styles.prof_sal_seprator} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={this.renderRows}
        />
        <View style={styles.button_search}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('List')}>
            <LinearGradient
              colors={['#0099ff', '#3399ff']}
              style={styles.add_item}>
              <MaterialIcons name="search" color="white" size={30} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class TopProfessionals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const apiURL = 'https://www.breakingbadapi.com/api/characters?_limit=10&page=2'
    fetch(apiURL)
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          data: resJson,
        });
      });
  };
  renderRow = ({item}) => {
    return (
      <View style={styles.container}>
        <Image style={styles.prof_sal_tab} source={{uri: item.img}} />
      </View>
    );
  };

  render() {
    return (
      <View>
        <Title style={styles.text_list}>Top Professionals</Title>
        <View style={styles.separator} />
        <FlatList
          data={this.state.data}
          SeparatorComponent={() => <View style={styles.prof_sal_seprator} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}
export class TopSalloons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const apiURL =
      'https://www.breakingbadapi.com/api/characters?_limit=10&page=3';
    fetch(apiURL)
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          data: resJson,
        });
      });
  };
  renderRow = ({item}) => {
    return (
      <View style={styles.container}>
        <Image style={styles.prof_sal_tab} source={{uri: item.img}} />
      </View>
    );
  };

  render() {
    return (
      <View>
        <Title style={styles.text_list}>Top Salloons</Title>
        <View style={styles.separator} />
        <FlatList
          data={this.state.data}
          SeparatorComponent={() => <View style={styles.prof_sal_seprator} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}
export const Details = ({route}) => (
  <View>
    <Text>Details Screen</Text>
    {route.params.title && <Text>{route.params.title}</Text>}
  </View>
);
export const List = () => (
  <View>
    <Text>Search2 Screen</Text>
  </View>
);

let addItem = (item) => {
  db.ref('/items').push({
    name: item,
  });
};

export class AddItem extends Component {
  state = {
    name: '',
  };

  handleChange = (e) => {
    this.setState({
      name: e.nativeEvent.text,
    });
  };
  handleSubmit = () => {
    addItem(this.state.name);
    Alert.alert('Item saved successfully');
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export const Splash = () => (
  <View style={styles.splash_indicator}>
    <ActivityIndicator size="large" />
  </View>
);


/*export class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false
    }
  }
 
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '1016024845465-ok8veubdd07v9863f9g9d7tvc1riaoti.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    })
  }

  firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
      // create a new firebase credential with the token
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      return firebase.auth().signInWithCredential(googleCredential).then(() =>
      this.props.navigation.navigate('Home'));
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  

  render() {
    const { navigation } = this.props;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.firebaseGoogleLogin}
                  disabled={this.state.isSigninInProgress} />
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}
*/

const styles = StyleSheet.create({
  prof_sal_imgbg: {
    flex: 1,
    flexDirection: 'column',
    width: 120,
    height: 100,
    margin: 3,
    opacity: 0.3,
    position: 'relative',
  },
  prof_sal_text: {
    position: 'absolute',
    fontWeight: 'bold',
    color: '#750573',
    marginTop: 40,
    marginLeft: 30,
    justifyContent: 'center',
  },
  prof_sal_img: {
    flex: 1,
    flexDirection: 'column',
    width: 120,
    height: 100,
    margin: 3,
  },
  prof_sal_tab: {
    width: '60%',
    height: 110,
    margin: 3,
  },
  prof_sal_seprator: {
    width: 5,
  },
  splash_indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 100,
    height: 100,
  },
  container_Home: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text_list: {
    color: '#750573',
    fontSize: 14,
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: '#e1e6e4',
    borderBottomWidth: 2,
  },
  add_item: {
    width: 180,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  button_search: {
    alignItems: 'center',
    marginTop: 12,
  },
});
