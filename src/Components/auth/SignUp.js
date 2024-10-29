import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Platform,
  Touchable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import appTheme from '../../utils/constants/color';
import images from '../../utils/constants/images';
import Input from '../common/Input';
import { appStyles } from '../common/styles';
import { showToast } from '../common/Toaster';
import DateTimePicker from '../common/DateTimePicker';
import Moment from 'moment';
import httpService from '../../services/http-service';
import { SIGN_UP } from '../../utils/constants/apiConstants';
import Loader from '../common/Loader';
import {
  LOGIN_USER_ACTION,
  LOGIN_USER_RESPONSE_ACTION,
} from '../../utils/redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../utils/services/helperService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setDatePicker] = useState(false);
  const [isLoading, setLoading] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const state = useSelector(state => state.account);

  function goToLogin() {
    navigation.navigate('Login');
  }

  const dispatch = useDispatch();

  useEffect(() => {
  });


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

          <Text variant="labelSmall" style={{ marginTop: -10, marginTop: 10, marginBottom: 40, color: appTheme.COLORS.WHITE }}>
            Bring your car back to life
          </Text>

          <View style={styles.inputView}>

            <Input
              placeholder={'Full Name'}
              value={name}
              icon={images.user}
              onChangeText={text => setName(text)}
            />

            <View style={{ height: 20 }} />

            <Input
              placeholder={'Email Address'}
              value={email}
              icon={images.email}
              onChangeText={text => setEmail(text)}
            />

            <View style={{ height: 20 }} />

            <Input
              placeholder={'**********'}
              value={password}
              secureTextEntry={showPassword}
              icon={images.lock}
              rightIcon={showPassword ? images.eye : images.eyeSlashDark}
              _inputIconRight={{ width: showPassword ? wp('5%') : wp('6.5%') }}
              onRightBtnPress={() => setShowPassword(!showPassword)}
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.signUpView}>
              <Button
                style={styles.signupBtn}
                mode="contained"
                onPress={() => console.log("signUpUser")
                }>
                Sign Up
              </Button>
              <View style={styles.loginView}>
                <Text variant="labelMedium">Already have account?</Text>
                <Button
                  labelStyle={styles.loginBtn}
                  style={styles.loginBtn}
                  textColor={appTheme.COLORS.DEFAULT}
                  mode="text"
                  compact={true}
                  onPress={goToLogin}>
                  Login
                </Button>
              </View>
              <View style={styles.policyView}>
                <Text variant="labelSmall">
                  By creating your account you agree to our
                </Text>
              </View>
            </View>
          </View>



          <Loader show={isLoading} />
          {showDatePicker && (
            <DateTimePicker
              showDatePicker={showDatePicker}
              onConfirm={date => {
                let _date = Moment(date).format('DD-MM-YYYY');
                setDOB(_date);
                setDatePicker(false);
              }}
              onCancel={() => {
                setDatePicker(false);
              }}
            />
          )}

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
  welcomeImg: {
    width: wp('50%'),
    height: hp('10%'),
    alignSelf: 'center',
    marginBottom: 40,
  },
  topText: {
    marginTop: hp('2%'),
    ...appStyles.labelLargeMedium,
  },
  cakeImg: {
    width: wp('5%'),
    height: hp('5%'),
  },
  dobUnSelected: {
    color: appTheme.COLORS.GREY,
    fontFamily: 'Popins-regular',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('6%'),
  },
  dobSelected: {
    color: appTheme.COLORS.BLACK,
    fontFamily: 'Popins-regular',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: wp('6%'),
  },
  inputView: {
    height: hp('50%'),
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
  policyView: {
    marginTop: 60
  },
  signupBtn: {
    width: wp('85%'),
    borderRadius: 10,
    height: hp('5%'),
    backgroundColor: appTheme.COLORS.BLACK,
    marginTop: 40
  },
  loginView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    alignItems: 'flex-start',
    fontSize: wp('3.2%'),
  },
  policyBtn: {
    alignItems: 'flex-start',
    fontSize: wp('2.8%'),
  },
  labelTxt: {
    marginTop: wp('5%'),
    marginBottom: wp('1%'),
    alignSelf: 'flex-start',
  },
  birthInput: {
    height: wp('11%'),
    backgroundColor: appTheme.COLORS.WHITE,
    justifyContent: 'center',
    borderColor: appTheme.COLORS.DEFAULT,
    borderRadius: 15,
    alignSelf: 'stretch',
    borderColor: appTheme.COLORS.GREY,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});