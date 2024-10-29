import { useEffect, useState } from 'react';
import { useColorScheme, SafeAreaView, StyleSheet, Image, StatusBar, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import appTheme from './utils/constants/color';
import { AuthStack } from './components/auth/AuthStack';
import { ProfileStack } from './components/profile/ProfileStack';
import images from './utils/constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PaperProvider } from 'react-native-paper';
import CustomTheme from './components/common/Theme';
import { BookNowStack } from './components/Booking/BookNowStack';
import { HomeStack } from './components/home/HomeStack';
import { BookStack } from './components/Book/BookStack';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/common/Toaster';
import httpService from './services/http-service';
import { USER_DETAILS } from './utils/constants/apiConstants';
import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from 'react-native-splash-screen';
import { fcmService } from '../FCMService';
import { localNotificationService } from '../LocalNotificatonService';

const Tab = createMaterialBottomTabNavigator();

export default function AppComponent() {
  const state = useSelector(state => state.account);
  const [profileImg, setProfileImage] = useState(null);

  const { account } = state;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  useEffect(() => {
    SplashScreen.hide();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      if (notify.data.body === 'msg') {
        //   setTimeout(() => {
        //     RootNavigation.navigate('UserHome', {screen: 'Messages'});
        //   }, 1000);
        // } else if (notify.data.body === 'prof') {
        //   setTimeout(() => {
        //     RootNavigation.navigate('UserHome', {
        //       screen: 'ProfInbox',
        //     });
        //   }, 1000);
        // } else if (notify.data.body === 'project') {
        //   setTimeout(() => {
        //     RootNavigation.navigate('UserHome', {
        //       screen: 'NetworkInbox',
        //     });
        //   }, 1000);
      } else {
        console.log('ok');
      }

      console.log('[App] onOpenNotification: ', notify);
    }

    if (account && account.id) getUserProfile();
    let eventListner = EventRegister.addEventListener('profileImage', data => {
      console.log('IMAGEEEE', 'updated image');
      if (account && account.id) getUserProfile();
    });
    return () => {
      EventRegister.removeEventListener(eventListner);
    };
  }, [account]);

  async function getUserProfile() {
    console.log('app. jsss');
    let requestObj = {
      user_id: account.id,
      licence_plate: '1',
    };

    console.log('request', requestObj);
    let res = await httpService.POST(USER_DETAILS, requestObj);

    if (res.status) {
      console.log('response', res);
      if (res.data.user != null) {
        setProfileImage(res.data.user.profile_image);
      }
    } else {
      console.log('response', res);
      //showToast({text2: res.message, type: 'error'});
    }
  }

  return (
    <PaperProvider theme={CustomTheme()}>
      <View style={{ flex: 1 }}>
        {Platform.OS == "ios" && <SafeAreaView
          style={{ height: 40, backgroundColor: 'black' }} />}

        <NavigationContainer
          theme={{ colors: { secondaryContainer: 'black' } }}>
          {/* {false && <AppLoader show={state.isLoading} />} */}
          {state.account ? (
            <Tab.Navigator
              initialRouteName="Home"
              activeColor={appTheme.COLORS.DEFAULT}
              inactiveColor="#000"
              sceneAnimationEnabled={true}
              compact={true}
              barStyle={{
                height: 70,
                backgroundColor: appTheme.COLORS.BLACK,
                overflow: 'hidden',
                borderRadius: 50,
                margin: 10,
                display: 'null',
                marginBottom: 30,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10.0,
                elevation: 10,
              }}>
              {/* <Tab.Screen name="Home" component={HomeStack}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ focused, color }) => { 
                    return (
                      <Image
                        resizeMode="contain"
                        style={styles.bottomNavImg}
                        source={focused ? images.home_bn_active : images.home_bn} />
                    )
                  },
                }} /> */}
              <Tab.Screen
                name="Home"
                component={BookNowStack}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({ focused, color }) => {
                    return (
                      <Image
                        resizeMode="contain"
                        style={styles.bottomNavImg}
                        source={
                          focused ? images.homeWhiteNew : images.homeBlackNew
                        }
                      />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Booking"
                component={BookStack}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({ focused, color }) => {
                    return (
                      <Image
                        resizeMode="contain"
                        style={styles.bottomNavImg}
                        source={
                          focused
                            ? images.calenderWhiteNew
                            : images.calenderBlackNew
                        }
                      />
                    );
                  },
                }}
              />

              <Tab.Screen
                name="Notification"
                component={HomeStack}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({ focused, color }) => {
                    return (
                      <Image
                        resizeMode="contain"
                        style={styles.bottomNavImg}
                        source={focused ? images.notificationWhiteNew : images.notificationBlackNew}
                      />
                    );
                  },
                }}
              />

              <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({ focused, color }) => {
                    return (
                      <Image
                        style={[
                          styles.profileNavImg,
                          profileImg ? { borderRadius: 50 } : {},
                        ]}
                        source={
                          profileImg
                            ? { uri: profileImg }
                            : focused
                              ? images.profileWhiteNew
                              : images.profileBlackNew
                        }
                      // source={{ uri: profileImg }}
                      />
                    );
                  },
                }}
              />
            </Tab.Navigator>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
        <Toast config={toastConfig} />

      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bottomNavImg: {
    marginTop: -10,
    width: wp('10%'),
    height: hp('6%'),
  },

  profileNavImg: {
    width: wp('8%'),
    height: wp('8%'),
  },
});
