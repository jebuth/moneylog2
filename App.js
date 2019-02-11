import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View , Text, Button } from 'react-native';
import Header from './src/components/Header';
import UpdateForm from './src/components/UpdateForm';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import Input from './src/components/Input';
import CardSection from './src/components/CardSection';

export default class App extends Component {
  state = {
    disabled: '',
    signedIn: false,
    accessToken: '',
    userInfo: ''
  }

  componentWillMount(){
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '900377601007-r8md298tu3q8qeghpbrbgtfiv12b4jd4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '900377601007-p6okufst1m4k299t9kmpvi2p7d0l3h4a.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    const googleUser = GoogleSignin.currentUser();
    if(googleUser.length > 0){
      this.setState({signedIn: true});
      //console.log({googleUser});
    }
    else{
      this.setState({signedIn: false});
    }
  }
  // Somewhere in your code
  signIn = async () => {
    try {
      //console.log('signIn()')
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, signedIn: true });
    } catch (error) {
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
  };

  // get the access token from thisstate userInfo
  getAccessToken(){
    return JSON.stringify(this.state.userInfo.accessToken);
  }

  signOut(){
    GoogleSignin.signOut();
    //this.setState({signedIn: false});
    this.setState({signedIn: false});
  }

  renderContent(){
    console.log('access token: ' + this.getAccessToken());
    console.log('signedIn: ' + this.state.signedIn);
    
    switch(this.state.signedIn){
      case true:
        return (
          <React.Fragment>
            <CardSection>
                  <Button style={buttonStyle} onPress={this.signOut.bind(this)} title='Log Out'></Button>
                </CardSection>
          </React.Fragment>
        );
      case false:
        return (
          <React.Fragment>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                // onPress={this._signIn}
                onPress={this.signIn.bind(this)}
                disabled={this.state.isSigninInProgress} 
                />

              <CardSection>
                {/* <Text onPress={this.myFunction.bind(this)}
                style={{ width: 192, height: 48 }} >{this.disabled}</Text> */}
              </CardSection>
            
            </React.Fragment>
        );

      default:
      //todo
    }
  }

  render() {
    return (
      
      <View>
        <Header headerText='moneylog'/>
      
        {this.renderContent()}
      
    
      </View>
    );
  }
}

const buttonStyle = {
  width: '200px',
  height: '75px',
  backgroundColor: 'blue'
}

// export PATH="/Users/justin/.npm-global/bin:$PATH";
