import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Yup from 'yup';

import AppIcon from '../../components/AppIcon';
import AppListItem from '../../components/AppListItem';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import { AppForm, AppFormButton, AppFormField, AppErrorMessage } from '../../components/forms';
import defaultStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  password: Yup.string().min(10).label("New Password"),
  confirmpassword: Yup.string().min(10).label("Confirm Password")
});

function Account() {
  const nameInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();

  const [ showPassword, setShowPassword ] = useState( true );
  const [ showConfirm, setShowConfirm ] = useState( true );

  const [ resetFailed, setResetFailed ] = useState( false );

  return (
    <AppScreen>
      <View style={[ styles.header ]}>
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Settings & Security</AppText>
      </View>
      <View style={[ styles.container ]}>
        <View style={[ styles.detailsContainer, styles.settingContainer ]}>
          <AppForm
            initialValues={{
              name: "",
              password: "",
              confirmpassword: ""
            }}
            validationSchema={ validationSchema }
          >
            <AppText style={[ defaultStyles.text, styles.title ]}>Name:</AppText>
            <AppFormField
              containerStyle={ styles.fieldContainer }
              maxLength={ 255 }
              name="name"
              placeholder="Name"
              icon="account"
              ref={ nameInput }
            />
            <AppErrorMessage error="Please make sure your passwords match." visible={ resetFailed }/>
            <AppText style={[ defaultStyles.text, styles.title, styles.subseqFieldContainer ]}>New Password:</AppText>
            <AppFormField
              containerStyle={ styles.fieldContainer }
              maxLength={ 255 }
              name="password"
              placeholder="New Password"
              icon="lock"
              ref={ passwordInput }
              secureTextEntry={ showPassword }
              handleShow={() => setShowPassword( !showPassword )}
            />
            <AppText style={[ defaultStyles.text, styles.title, styles.subseqFieldContainer ]}>Confirm Password:</AppText>
            <AppFormField
              containerStyle={ styles.fieldContainer }
              maxLength={ 255 }
              name="confirmpassword"
              placeholder="Confirm Password"
              icon="lock"
              ref={ confirmInput }
              secureTextEntry={ showConfirm }
              handleShow={() => setShowConfirm( !showConfirm )}
            />
            <AppFormButton
              containerStyle={ styles.subseqFieldContainer }
              title="Update"
            />
          </AppForm>
        </View>
        <AppListItem
          PrescriptComponent={
            <AppIcon
              size={ 30 }
              name="logout"
              color={ defaultStyles.colors.white }
              backgroundColor={ defaultStyles.colors.primary_red }
            />
          }
          containerStyle={[ styles.detailsContainer, styles.logoutContainer ]}
          title="Logout"
          titleStyle={[ styles.subTitle, styles.logout ]}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  detailsContainer: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: defaultStyles.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  fieldContainer: {
    borderColor: defaultStyles.colors.primary,
    borderWidth: 1
  },
  logout: {
    color: defaultStyles.colors.primary_red
  },
  logoutContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.colors.transparent,
    borderBottomColor: defaultStyles.colors.secondary,
    borderBottomWidth: 1,
    height: 70
  },
  pageHeader: {
    color: defaultStyles.colors.secondary_brown,
    fontSize: 30,
    fontWeight: 'bold'
  },
  settingContainer: {
    flex: 1
  },
  title: {
    color: defaultStyles.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  subseqFieldContainer: {
    marginTop: 10
  },
  subTitle: {
    color: defaultStyles.colors.secondary,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default Account;