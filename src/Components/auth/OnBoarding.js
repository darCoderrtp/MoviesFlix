import { Image, Platform, StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import appTheme from '../../utils/constants/color';
import { connect } from 'react-redux';
import React from 'react';
import { appStyles } from '../common/styles';
import { Text } from 'react-native-paper';
import { color } from 'color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../../utils/constants/images';
import SwipeButton from 'rn-swipe-button';


class OnBoarding extends React.Component {


  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  CheckoutButton() {
    return (
      <View style={{ width: 100, height: 30, backgroundColor: '#C70039', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ffffff' }}>Checkout</Text>
      </View>
    );
  }

  thumbIconComponent() {
    return (
      <View >
        <Image
          resizeMode="contain"
          style={[styles.sliderImg]}
          source={images.getStarted}
        />
      </View>
    )
  }

  titleComponent() {
    return (
      <View style={{ marginLeft: wp("20%") }}>
        <Image
          resizeMode="center"
          style={styles.sliderImg}
          source={images.rightArrows}
        />
      </View >
    )
  }

  render() {
    const { navigation } = this.props
    return (

      <View style={styles.container}>
        <View style={{ flex: .8, justifyContent: "flex-end", paddingHorizontal: wp("5%") }}>
          <Text style={[styles.white, { ...appStyles.labelLargeExtraBold }]} variant="headlineMedium">
            Bringing back
          </Text>
          <Text style={[styles.white, { ...appStyles.labelLargeExtraBold }]} variant="headlineMedium">
            that new vehicle
          </Text>
          <Text style={[styles.white, { ...appStyles.labelLargeExtraBold }]} variant="headlineMedium">
            feeling
          </Text>
          <Text style={[styles.white, { ...appStyles.labelLargeMedium, marginVertical: hp("2%") }]} variant="labelLarge">
            Restore the shine of your vehicle with Splash & Drip's professional car washing and alloy wheel refurbishment services.
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.welcomeImg}
            source={images.carNew}
          />
        </View>
        <View style={{ flex: .3, justifyContent: "flex-end", alignItems: "center", marginBottom: 30 }}>
          <SwipeButton
            onSwipeSuccess={() =>
              navigation.navigate("Login")
            }
            shouldResetAfterSuccess={true}
            height={hp("7%")}
            width={wp("90%")}
            thumbIconComponent={() => this.thumbIconComponent()}
            railBackgroundColor={appTheme.COLORS.BLACK_SHADE}
            railStyles={{
              backgroundColor: appTheme.COLORS.BLACK_SHADE,
              borderColor: appTheme.COLORS.BLACK_SHADE,
            }}
            thumbIconWidth={wp("32%")}
            title={this.titleComponent()}
            titleStyles={styles.titleStyles}
          />
        </View>


      </View>


    );
  }
}

const styles = StyleSheet.create({
  titleStyles: {
    right: wp("15%")
  },
  sliderImg: {
    width: wp('38%'),
    height: hp('10%'),
    alignSelf: Platform.OS == 'ios' ? 'flex-end' : ''
  },
  welcomeImg: {
    width: wp('100%'),
    height: hp('40%'),
    left: wp("10%")
  },
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.BLACK,
  },
  white: {
    color: appTheme.COLORS.WHITE,
  }
});

const mapStateToProps = state => {
  return {}
};

export default connect(mapStateToProps)(OnBoarding);
