import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AppCard from '../../components/AppCard';
import AppDate from '../../components/AppDate';
import AppDeleteSwipe from '../../components/AppDeleteSwipe';
import AppIcon from '../../components/AppIcon';
import AppHorizontal from '../../components/AppHorizontal';
import AppListItem from '../../components/AppListItem';
import AppScreen from '../../components/AppScreen';
import AppSelect from '../../components/AppSelect';
import AppText from '../../components/AppText';
import defaultStyles from '../../config/styles';

import { mealTypes, sampleDate, sampleUpcomingMeals, sampleSelect } from '../../config/data';

function Dietary() {
  const [ items, setItems ] = useState( sampleSelect );
  const [ value, setValue ] = useState( sampleSelect.at( 0 ).value );
  
  return (
    <AppScreen>
      <View style={[ styles.header ]}>
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Dietary</AppText>
      </View>
      <View style={ styles.actionContainer }>
        <View style={ styles.selectContainer }>
          <AppSelect
            items={ items }
            setItems={ setItems }
            value={ value }
            setValue={ setValue }
            placeholder="Select an item"
            searchable={ false }
            searchPlaceholder="Search..."
          />
        </View>
        <AppHorizontal
          data={ sampleDate }
          renderItem={({ item }) => <AppDate
            day={ item?.day }
            date={ item?.date }
            onPress={() => console.log("HIT")}
          />}
        />
      </View>
      <ScrollView>
        <View style={[ styles.container ]}>
          <FlatList
            data={ mealTypes }
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => {
              const { recipe } = sampleUpcomingMeals.at( 0 ).meals.find( elem => elem?.type === item );

              return(
                <>
                  <AppListItem
                    containerStyle={ styles.mealType.containerStyle }
                    title={ item }
                    textStyle={ styles.mealType.textStyle }
                    titleStyle={ styles.mealType.titleStyle }
                    PostscriptComponent={
                      <AppIcon
                        name="plus-box"
                        onPress={() => console.log("YES")}
                        color= { defaultStyles.colors.primary_brown }
                        size={ 60 }
                        containerStyle={ styles.mealType.icon }
                      />
                    }
                  />
                  <FlatList
                    data={ recipe }
                    keyExtractor={( item, index ) => index.toString()}
                    renderItem={({ item }) => (
                      <AppCard
                        image={ item?.image }
                        title={ item?.title }
                        description={ item?.description }
                        tags={ item.tags }
                        onPress={() => console.log("View More")}
                        renderRightActions={() => (
                          <AppDeleteSwipe onPress={() => console.log("delete")}/>
                        )}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={ styles.separator }/> 
                    )}
                  />
                </>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={ styles.separator }/>
            )}
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    borderBottomColor: defaultStyles.colors.secondary,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
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
  mealType: {
    containerStyle: {
      backgroundColor: defaultStyles.colors.primary,
      borderColor: defaultStyles.colors.primary_brown,
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 10,
      padding: 10
    },
    icon: {
      alignItems: null,
      backgroundColor: null,
      borderRadius: null,
      height: null,
      justifyContent: null,
      width: null
    },
    textStyle: {
      color: defaultStyles.colors.primary_brown,
      fontWeight: 'bold'
    },
    titleStyle: {
      fontSize: 17
    }
  },
  pageHeader: {
    color: defaultStyles.colors.secondary_brown,
    fontSize: 30,
    fontWeight: 'bold'
  },
  selectContainer: {
    paddingHorizontal: defaultStyles.size.width * 0.25,
    marginBottom: 5,
    zIndex: 1
  },
  separator: {
    height: 10
  }
})

export default Dietary;