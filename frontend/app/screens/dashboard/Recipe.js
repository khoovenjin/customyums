import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AppButton from '../../components/AppButton';
import AppCircularProgress from '../../components/AppCircularProgress';
import AppScreen from '../../components/AppScreen';
import AppImage from '../../components/AppImage';
import AppIndexText from '../../components/AppIndexText';
import AppHorizontal from '../../components/AppHorizontal';
import AppSwipeButton from '../../components/AppSwipeButton';
import AppTag from '../../components/AppTag';
import AppText from '../../components/AppText';
import defaultStyles from '../../config/styles';

import { nutrientComposition, sampleUpcomingMeals, sampleIngredients, sampleSteps } from '../../config/data';

function Recipe() {
  const [ steps, setSteps ] = useState( sampleSteps );
  const [ buttonToggled, setButtonToggled ] = useState( false );

  useEffect(() => {
    if( !steps.length )
      console.log('EMPTY');
  }, [ steps ]); 
  
  let totalNutrients = nutrientComposition.reduce(( acc, obj ) => {
    return acc + obj.amount;
  }, 0);

  const removeStep = ( item ) => setSteps( steps.filter( element => element !== item ) );

  const addStep = ( item ) => setSteps( [ ...steps, item ] );

  const handleToggle = ( value ) => setButtonToggled( value );

  return (
    <AppScreen>
      <AppImage
        style={ styles.image }
        image={ require('../../assets/tikka-masala.jpg') }
        height={ 300 }
      />      
      <ScrollView>
        <View style={ styles.container }>
          <View style={ styles.fillerContainer }/>
          <View style={ styles.detailsContainer }>
            <AppText style={[ defaultStyles.text, styles.title ]}>Glaze Doughnuts</AppText>
            <AppText style={[ defaultStyles.text, styles.text ]}>A small cake of sweetened or, sometimes, unsweetened dough fried in deep fat, typically shaped like a ring or, when prepared with a filling, a ball.</AppText>
          </View>
          <View style={ styles.rowContainer }>
            <View style={[
              styles.detailsContainer,
              styles.partitionContainer( true ),
              styles.variant_1.container
            ]}>
              <AppText style={[
                defaultStyles.text,
                styles.subTitle,
                styles.variant_1.darkText
              ]}>
                Approx. Time
              </AppText>
              <AppText style={[
                defaultStyles.text,
                styles.title,
                styles.variant_1.lightText
              ]}>
                25 min
              </AppText>
            </View>
            <View style={[
              styles.detailsContainer,
              styles.partitionContainer( false )
            ]}>
              <AppText style={[
                defaultStyles.text,
                styles.text,
                styles.subTitle,
                styles.tag
              ]}>
                Tags
              </AppText>
              <AppHorizontal
                data={ sampleUpcomingMeals.at( 0 ).meals.at( 2 ).recipe.at( 0 ).tags }
                renderItem={({ item }) => <AppTag
                  title={ item }
                  color={ defaultStyles.colors.primary_grey }
                />}
              />
            </View>
          </View>
          <AppHorizontal
            data={ nutrientComposition }
            seperatorWidth={ 10 }
            renderItem={({ item }) => (
              <View style={[ styles.detailsContainer, styles.alignContainer ]}>
                <AppCircularProgress
                  compositionValue={ parseFloat( item.amount ) }
                  compositionMax={ totalNutrients.toFixed( 0 ) }
                  title={ item.label }
                />
              </View>
            )}
          />
          <View style={[ styles.detailsContainer, { marginBottom: 100 } ]}>
            <AppText style={[ defaultStyles.text, styles.text, styles.title ]}>Ingredients</AppText>
            <FlatList
              contentContainerStyle={{ marginBottom: 20 }}
              data={ sampleIngredients }
              keyExtractor={( item, index ) => index.toString()}
              renderItem={({ item, index }) => (
                <AppIndexText
                  text={ `${ item.amount }g ${ item.name }` }
                  index={ index }
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={ styles.seperator } />
              )}
            />
            <AppText style={[ defaultStyles.text, styles.text, styles.title ]}>Steps:</AppText>
            <FlatList
              data={ sampleSteps }
              keyExtractor={( item, index ) => index.toString()}
              renderItem={({ item, index }) => (
                <AppIndexText
                  addItem={ addStep }
                  removeItem={ removeStep }
                  text={ item }
                  index={ index }
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={ styles.seperator } />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={ styles.sliderContainer }>
        <AppSwipeButton
          padding={ 30 }
          onToggle={ handleToggle }
          text='Slide to Complete'
        />
        {/* <AppButton
          color='white'
          backgroundColor='primary_brown'
          containerStyle={ styles.buttonContainer }
          onPress={() => console.log("Clicked")} 
          title="Add to Plan" 
        /> */}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  alignContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    borderRadius: 30,
    height: 50,
    width: '100%'
  },
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    zIndex: 1
  },
  detailsContainer: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: defaultStyles.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  fillerContainer: {
    height: 230
  },
  image: {
    position: 'absolute',
    width: '100%'
  },
  partitionContainer: ( flag ) => ({
    alignItems: flag? 'center': null,
    justifyContent: 'center',
    height: 100,
    width: defaultStyles.size.width * 0.4
  }),
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  seperator: {
    height: 10
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: defaultStyles.colors.white,
    height: 80,
    padding: 20,
    position: 'absolute',
    width: '100%'
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  tag: {
    alignSelf: 'center'
  },
  text: {
    fontSize: 14,
    marginBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  variant_1: {
    container: {
      backgroundColor: defaultStyles.colors.primary_grey
    },
    lightText: {
      color: defaultStyles.colors.white
    },
    darkText: {
      color: defaultStyles.colors.primary
    }
  }
})

export default Recipe;