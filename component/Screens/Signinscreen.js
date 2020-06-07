import React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Card,
} from 'native-base';
import {TouchableWithoutFeedback} from 'react-native';
import {AuthContext} from '../Context';
import {GoogleLogIn} from './googlelogin';
import Icon from 'react-native-vector-icons/Ionicons';
/*import { Formik } from 'formik';
import * as yup from 'yup';*/

export const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const {signIn} = React.useContext(AuthContext);
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

  /*const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please, provide your Firstname!'),
    password: yup
      .string()
      .required('Please, provide your paassj!')
  });*/
  return (
    <>
      {/*<Formik
      initialValues={{ username:'',
    password: ''}}
      onSubmit={(values, actions) => {
        values
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
      validationSchema={validationSchema}
    >
 {formikProps => (
        <React.Fragment>*/}
      <Container style={{backgroundColor: '#1f65ff'}}>
        <Content>
          <Card
            style={{marginTop: 80, width: 350, marginLeft: 20, height: 550}}>
            <Icon
              name="ios-book"
              size={150}
              color="#4F8EF7"
              style={{marginTop:20,marginLeft:110}}
            />
            <Form style={{marginTop: 20, marginLeft: 25,width: 300}}>
              <Item fixedLabel>
                {/* <Label>Username</Label> */}
                <Input
                  placeholder="Phone or Email"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  // onChangeText={formikProps.handleChange('username')}
                />
              </Item>
              {/* <Text style={{ color: 'red' }}>{formikProps.errors.username}</Text> */}
              <Item fixedLabel last>
                {/* <Label>Password</Label> */}
                <Input
                  placeholder="Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                  // onChangeText={formikProps.handleChange('password')}
                />
              </Item>
              {/* <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text> */}
            </Form>
            <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}} block onPress={()=> loginHandle (data.username, data.password)}> 
              {/* <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}} block onPress={formikProps.handleSubmit}> */}
              <Text>Sign In</Text>
            </Button>
            <Text style={{fontSize: 14, marginTop: 20, marginLeft: 50}}>
              Don't hava an account?
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{color: '#750573',fontSize: 14,marginLeft:6}}>
                  Sign up here
                </Text>
              </TouchableWithoutFeedback>
            </Text>
            <GoogleLogIn />
          </Card>
        </Content>
      </Container>
      {/* </React.Fragment>
      )}
    </Formik>*/}
    </>
  );
};
  /*
  export class Login extends Component {
    static contextType = AuthContext
    componentDidMount() {
   const [isLoading, setIsLoading]  = this.context
  }
    render(){
        return(
     <>
      <Container  style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}}>
       <Content>
       <Card style={{marginTop:80,width:350,marginLeft:20,height:550}}>
       <Icon name="ios-book" size={150} color="#4F8EF7"  style={{marginTop:20,marginLeft:110}}/> 
             <Form  style={{marginTop:20,marginLeft:25,width:300}}>
           <Item fixedLabel>
             <Label>Username</Label>
             <Input />
           </Item>
           <Item fixedLabel last>
             <Label>Password</Label>
             <Input />
           </Item>
         </Form>
         <Button style={{marginTop:40,marginLeft:25,width:300, backgroundColor: '#1f65ff'}} block onPress={()=>signIn()}>
           <Text>Sign In</Text>
         </Button>
           <Text style={{fontSize: 14,marginTop:20,marginLeft:50}}>Don't hava an account?<Text style={{color: '#750573',fontSize: 14}}> Sign up here</Text></Text>
         <LoginController/>
          </Card>
       </Content>
     </Container>
   

     </>

   );
        }
 }
 */