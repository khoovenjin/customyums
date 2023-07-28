import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Yup from 'yup';

import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import { AppForm, AppFormButton, AppFormField, AppErrorMessage } from '../../components/forms';
import defaultStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  amount: Yup.number().required().label("Amount")
});

function AddPantry() {
  const nameInput = useRef();
  const amountInput = useRef();

  return (
    <AppScreen>
      <View style={[ styles.header ]}>
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Add Pantry</AppText>
      </View>
      <View style={[ styles.container ]}>
        <AppForm
          initialValues={{
            name: "",
            amount: ""
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
          <AppText style={[ defaultStyles.text, styles.title, styles.subseqFieldContainer ]}>Amount:</AppText>
          <AppFormField
            containerStyle={ styles.fieldContainer }
            name="amount"
            placeholder="Amount"
            icon="scale-balance"
            ref={ amountInput }
          />
          <AppFormButton
            containerStyle={ styles.subseqFieldContainer }
            title="Add"
          />
        </AppForm>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
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
  subseqFieldContainer: {
    marginTop: 10
  },
  title: {
    color: defaultStyles.colors.secondary,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default AddPantry;