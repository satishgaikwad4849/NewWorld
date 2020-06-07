import React, {Component} from 'react';
import data from '../countries';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Card,
} from 'native-base';
import {
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
  View,
  color,
} from 'react-native';
import firebase from 'firebase';
import * as yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

const firebaseConfig = {
  apiKey: "AIzaSyAlm1U20JLj6BAOgLfkhcCQDehsm80L03A",
  authDomain: "newworld-f5884.firebaseapp.com",
  databaseURL: "https://newworld-f5884.firebaseio.com",
  projectId: "newworld-f5884",
  storageBucket: "newworld-f5884.appspot.com",
  messagingSenderId: "1016024845465",
  appId: "1:1016024845465:web:82559341065fd0db30bc08",
  measurementId: "G-159HCXDJJM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const defaultdial_code = data.filter(
  obj => obj.name === 'India'
  )[0].dial_code


export class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phone: '',
      password: '',
      confirmPassword: '',
      dial_code: defaultdial_code,
      modalVisible: false,
    };
  }
  showModal = () => {
    this.setState({modalVisible: true});
  };
  hideModal = () => {
    this.setState({modalVisible: false});
    // Refocus on the Input field after selecting the country code
 // this.refs.PhoneInput._root.focus()
  }
  async selectCountry(country) {
    // Get data from Countries.js
    const countryData = await data;
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country,
      )[0].dial_code;
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country,
      )[0].flag;
      // Update the state then hide the Modal
      this.setState({phone: countryCode, dial_code: countryCode})
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  render() {
    const countryData = data;
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          emailAddress: '',
          phone: '',
          password: '',
          confirmPassword: '',
          country_code: this.state.dial_code,
        }}
        onSubmit={(values, actions) => {
          firebase
            .database()
            .ref('Users/')
            .push(delete values.confirmPassword && values)
            .then((data) => {
              console.log('data', data);
            })
            .catch((error) => {
              console.log('error', error);
            })
            .then(() => this.props.navigation.navigate('SignInScreen'))
            .then(
              Alert.alert(
                'Congrats!',
                'Your account is created!',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {
                  cancelable: false,
                },
              ),
            );
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required('Please, provide your Firstname!'),
          lastName: yup.string().required('Please, provide your Lastname!'),
          emailAddress: yup.string().email().required(),
          phone: yup
            .string()
            .min(10)
            .max(10, 'Phone should not excced 10 chars.')
            .required(),
          password: yup
            .string()
            .min(8)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Confirm Password must matched Password')
            .required('Confirm Password is required'),
        })}>
        {formikProps =>(
          <React.Fragment>
            <Container  style={{backgroundColor: '#1f65ff'}}>
              <Content>
                <Card style={{marginTop: 80, width: 350, marginLeft: 20, height: 550}}>
                  <Form style={{marginTop: 20, marginLeft: 25, width: 300}}>
                    <Item>
                      <Label>First Name</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('firstName')} 
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onChangeText={formikProps.handleChange('firstName')} />   
                    </Item>
                    <Text style={{marginLeft:20}}>
                      {formikProps.touched.firstName &&
                        formikProps.errors.firstName && (
                          <Text style={{fontSize: 12, color: '#FF0D10'}}>
                            {formikProps.errors.firstName}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Last Name</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('lastName')}
                        onChangeText={formikProps.handleChange('lastName')}
                      />
                    </Item>
                    <Text style={{marginLeft: 20}}>
                      {formikProps.touched.lastName &&
                        formikProps.errors.lastName && (
                          <Text style={{fontSize: 12, color: '#FF0D10'}}>
                            {formikProps.errors.lastName}
                          </Text>
                        )}
                    </Text>
                    <Item fixed>
                      <Label>Email Address</Label>
                      <Input
                        onBlur={() => formikProps.setFieldTouched('emailAddress')} 
                        autoCapitalize="none"
                        onChangeText={formikProps.handleChange('emailAddress')}
                      />
                    </Item>
                    <Text style={{marginLeft: 20}}>
                      {formikProps.touched.emailAddress &&
                        formikProps.errors.emailAddress && (
                          <Text style={{fontSize: 12, color: '#FF0D10'}}>
                            {formikProps.errors.emailAddress}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Phone</Label>
                      <Icon
                        active
                        name="md-arrow-dropdown"
                        color="#1f65ff"
                        size={25}
                        style={{marginLeft: 5}}
                        onPress={() => this.showModal()}
                      />
                      <Text style={{marginLeft: 10 }}>
                        {this.state.dial_code}
                      </Text>
                      <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flex: 7, marginTop: 80 }}>
                            {/* Render the list of countries */}
                            <FlatList
                              data={countryData}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item}) => (
                                <TouchableWithoutFeedback 
                                  onPress={() => this.selectCountry(item.name)}>
                                  <View>
                                    <Text>
                                      {item.flag} {item.name} ({item.dial_code})
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              )}
                            />
                          </View>
                          <TouchableOpacity onPress={() => this.hideModal()}>
                            <Icon
                              name="ios-close"
                              color={color}
                              size={45}
                              style={{marginLeft: 185}}
                            />
                          </TouchableOpacity>
                        </View>
                      </Modal>
                      <Input
                        onChangeText={formikProps.handleChange('phone')}
                        onBlur={() => formikProps.setFieldTouched('phone')}
                        secureTextEntry={true}
                        placeholder='+91766554433'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        //value={this.state.phone}
                        ref='PhoneInput'
                        // onFocus={(val) => this.onChangeText('phone', val)}
                      />
                    </Item>
                    <Text style={{marginLeft:20}}>
                      {formikProps.touched.phone &&
                        formikProps.errors.phone && (
                          <Text style={{fontSize: 12, color: '#FF0D10'}}>
                            {formikProps.errors.phone}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Password</Label>
                      <Input
                        onChangeText={formikProps.handleChange('password')}
                        secureTextEntry={true} 
                        onBlur={() => formikProps.setFieldTouched('password')}
                      />
                    </Item>
                    <Text style={{marginLeft:20 }}>
                      {formikProps.touched.password &&
                        formikProps.errors.password && (
                          <Text style={{ fontSize: 12, color: '#FF0D10' }}>
                            {formikProps.errors.password}
                          </Text>
                        )}
                    </Text>
                    <Item>
                      <Label>Confirm Password</Label>
                      <Input
                        onChangeText={formikProps.handleChange('confirmPassword')}
                        onBlur={() => formikProps.setFieldTouched('confirmPassword')}
                        secureTextEntry={true}
                      />
                    </Item>
                    <Text style={{marginLeft:20}}>
                      {formikProps.touched.confirmPassword &&
                        formikProps.errors.confirmPassword && (
                          <Text style={{ fontSize: 12, color: '#FF0D10' }}>
                            {formikProps.errors.confirmPassword}
                          </Text>
                        )}
                    </Text>
                  </Form>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}} onPress={formikProps.handleSubmit}>
                      <Text style={{marginLeft:110}}>Submit</Text>
                    </Button>
                  )}
                </Card>
              </Content>
            </Container>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}
