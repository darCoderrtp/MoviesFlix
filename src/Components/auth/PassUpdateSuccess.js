import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import appTheme from '../../utils/constants/color';
import images from '../../utils/constants/images';
import { appStyles } from '../common/styles';
import { showToast } from '../common/Toaster';

export default function PassUpdateSuccess({ route, navigation }) {
    const { message } = route.params;
    useEffect(() => {
        // showToast({ text2: message })
    });

    return (

        <View style={styles.container}>
            <View style={styles.welcomeView}>
                <Image
                    resizeMode="contain"
                    style={styles.welcomeImg}
                    source={images.success}
                />
            </View>
            <View style={styles.txtView}>
                <Text style={styles.forgotPassTxt} variant="titleLarge" >Password Updated</Text>
                <Text style={styles.titleShortTxt} variant="labelMedium">Congratulations, Your password has been updated successfully.</Text>
            </View>
            <View style={styles.signUpView}>
                <Button style={styles.signBtn} mode="contained" onPress={() => navigation.navigate("Login")}>
                    Login
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: appTheme.COLORS.WHITE,
        paddingHorizontal: wp("3%")
    },
    welcomeView: {
        flex: 4,
    },
    txtView: {
        flex: 1,
        width: wp("90%"),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    welcomeImg: {
        width: wp("80%"),
        height: wp("80%"),
    },
    titleShortTxt: {
        ...appStyles.labelLargeMedium,
        textAlign: "center"
    },
    otpView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    signUpView: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: wp("15%"),
    },
    signBtn: {
        width: wp("60%"),
        borderRadius: 10,
        backgroundColor: appTheme.COLORS.DEFAULT
    },
    forgotPassView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        width: wp("95%"),
    },
    forgotPassTxt: {
        color: appTheme.COLORS.DEFAULT,
        ...appStyles.labelLargeMedium
    },
    policyBtn: {
        alignItems: "flex-start",
        fontSize: wp("2.5%")
    },
    policyView: {
        flex: 6,
    },
    loginView: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    loginBtn: {
        alignItems: "flex-start",
        fontSize: wp("3.2%")
    },
});