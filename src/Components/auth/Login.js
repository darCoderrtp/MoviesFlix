import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Alert, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import appTheme from '../../utils/constants/color';
import images from '../../utils/constants/images';
import Input from '../common/Input';
import { appStyles } from '../common/styles';
import { useDispatch, useSelector } from 'react-redux';
import httpService from '../../services/http-service';
import { LOGIN } from '../../utils/constants/apiConstants';
import {
  LOGIN_USER_ACTION,
  LOGIN_USER_RESPONSE_ACTION,
} from '../../utils/redux/user';
import { showToast } from '../common/Toaster';
import Loader from '../common/Loader';
import { validateEmail } from '../../utils/services/helperService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const state = useSelector(state => state.account);
  const [isLoading, setLoading] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const mounted = useRef();

  function goToForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  return (

    <KeyboardAwareScrollView
      ref={this._scrollViewRef}
      scrollEventThrottle={16}
      contentInsetAdjustmentBehavior="always"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enableOnAndroid={false}
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={Platform.OS == 'android' ? 32 : 0}
      enableResetScrollToCoords={true}
      onKeyboardDidShow={this._keyboardDidShowHandler}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      bounces={false}>
      <View style={{ height: hp('100%') }}>

        <View
          style={styles.BlackView}
        />
        <View
          style={styles.WhiteView}
        />

        <View style={styles.container}>
          <Image
            style={{ height: wp('20%'), width: wp('70%') }}
            source={images.logoBlack} />

          <Text variant="labelSmall" style={{ marginTop: -10, marginBottom: 40, color: appTheme.COLORS.WHITE }}>
            Bring your car back to life
          </Text>

          <View style={styles.inputView}>

            <Input
              placeholder={'Email Address'}
              value={email}
              icon={images.email}
              onChangeText={text => setEmail(text)}
            />

            <View style={{ height: 20 }} />

            <Input
              _inputIconRight={{ width: showPassword ? wp('5%') : wp('6.5%') }}
              placeholder={'*******'}
              value={password}
              secureTextEntry={showPassword}
              icon={images.lock}
              onChangeText={text => setPassword(text)}
              onRightBtnPress={() => setShowPassword(!showPassword)}
              rightIcon={showPassword ? images.eye : images.eyeSlashDark}
            />
            <View style={styles.forgotPassView}>
              <Button
                labelStyle={styles.SignUpBtn}
                style={styles.SignUpBtn}
                textColor={appTheme.COLORS.DEFAULT}
                mode="text"
                compact={true}
                onPress={goToForgotPassword}>
                Forgot Password?
              </Button>
            </View>
            <View style={styles.signUpView}>
              <Button
                style={styles.signBtn}
                mode="contained"
                onPress={() => console.log("logInUser")}>
                Login
              </Button>
              <View style={styles.loginView}>
                <Text variant="labelMedium">Don't have account?</Text>
                <Button
                  labelStyle={styles.SignUpBtn}
                  style={styles.SignUpBtn}
                  textColor={appTheme.COLORS.DEFAULT}
                  mode="text"
                  compact={true}
                  onPress={() => navigation.navigate('SignUp')}>
                  Signup
                </Button>
              </View>
            </View>
          </View>
          <Loader show={isLoading} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('20'),
    alignItems: 'center',
    backgroundColor: appTheme.COLORS.BLACK,
    paddingHorizontal: wp('3%'),
    paddingTop: hp('5%'),
    position: 'absolute',
  },
  BlackView: {
    height: hp('38%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    backgroundColor: appTheme.COLORS.BLACK
  },
  WhiteView: {
    height: hp('50%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    backgroundColor: appTheme.COLORS.GREY_BG
  },
  welcomeView: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  welcomeImg: {
    width: wp('50%'),
    height: hp('10%'),
    marginBottom: 40,
    alignSelf: 'center',
  },

  topText: {
    marginBottom: hp('2%'),
    ...appStyles.labelLargeMedium,
  },

  titleShortTxt: {
    ...appStyles.labelLargeMedium,
  },
  inputView: {
    height: hp('45%'),
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: appTheme.COLORS.WHITE,
    borderRadius: 10,
  },
  signUpView: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  signBtn: {
    width: wp('85%'),
    borderRadius: 10,
    height: hp('5%'),
    backgroundColor: appTheme.COLORS.BLACK,
  },
  loginView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpBtn: {
    alignItems: 'flex-start',
    fontSize: wp('3.2%'),
  },
  forgotPassView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  labelTxt: {
    marginTop: wp('5%'),
    marginBottom: wp('1%'),
    alignSelf: 'flex-start',
  },
});