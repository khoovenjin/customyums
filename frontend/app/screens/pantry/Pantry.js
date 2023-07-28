import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AppIcon from '../../components/AppIcon';
import AppListItem from '../../components/AppListItem';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import defaultStyles from '../../config/styles';

import { pantryButton, sampleIngredients } from '../../config/data';

function Pantry() {
  return (
    <AppScreen>
      <View style={[ styles.header ]}>
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Pantry</AppText>
        <AppText style={[ defaultStyles.text, styles.pageDescription ]}>You have 8 ingredients</AppText>
      </View>
      <View style={ styles.actionContainer }>
        <FlatList
          data={ pantryButton }
          keyExtractor={( item, index ) => index.toString()}
          horizontal
          renderItem={({ item }) => (
            <AppListItem
              PrescriptComponent={
                <AppIcon
                  size={ 30 }
                  name={ item?.icon }
                  color={ defaultStyles.colors.white }
                  backgroundColor={ defaultStyles.colors.primary_brown }
                />
              }
              containerStyle={ styles.action_Button.container }
              title={ item?.label }
              textStyle={ styles.action_Button.textStyle }
              titleStyle={ styles.action_Button.titleStyle }
            />
          )}
        />
      </View>
      <ScrollView>
        <View style={[ styles.container ]}>
          <AppText style={[ defaultStyles.text, styles.title ]}>Ingredients</AppText>
          <FlatList
            data={ sampleIngredients }
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => (
              <AppListItem
                containerStyle={ styles.ingredient.container }
                title={ item.name }
                textStyle={ styles.ingredient.textStyle }
                titleStyle={ styles.ingredient.titleStyle }
                subTitle={ `${ item.amount } g` }
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={ styles.seperator }/>
            )}
          />

          {/* Optional */}
          {/* <View style={ styles.optionalContainer }>
            <AppText style={[ defaultStyles.text, styles.optional ]}>No Ingredients</AppText>
          </View> */}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    borderBottomColor: defaultStyles.colors.secondary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 20
  },
  action_Button: {
    container: {
      backgroundColor: defaultStyles.colors.white,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: defaultStyles.colors.primary_brown,
      paddingLeft: 10,
      paddingVertical: 5,
      marginRight: 10
    },
    textStyle: {
      color: defaultStyles.colors.primary_brown,
      fontWeight: 'bold'
    },
    titleStyle: {
      fontSize:17
    }
  },
  container: {
    padding: 20
  },
  optional: {
    color: defaultStyles.colors.primary_brown,
    fontSize: 18,
    fontWeight: 'bold'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.colors.transparent,
    borderBottomColor: defaultStyles.colors.secondary,
    borderBottomWidth: 1,
    height: 70
  },
  ingredient: {
    container: {
      backgroundColor: defaultStyles.colors.primary_brown,
      borderColor: defaultStyles.colors.primary_brown,
      borderRadius: 10,
      borderWidth: 1,
      paddingLeft: 10,
      paddingVertical: 5
    },
    textStyle: {
      color: defaultStyles.colors.white,
      fontWeight: 'bold'
    },
    titleStyle: {
      fontSize: 17
    }
  },
  optionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: defaultStyles.colors.primary_grey,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    height: 70
  },
  pageHeader: {
    color: defaultStyles.colors.secondary_brown,
    fontSize: 30,
    fontWeight: 'bold'
  },
  pageDescription: {
    color: defaultStyles.colors.primary_grey,
    fontSize: 14,
    fontWeight: 'bold'
  },
  seperator: {
    height: 10
  },
  title: {
    color: defaultStyles.colors.primary_grey,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
})

export default Pantry;