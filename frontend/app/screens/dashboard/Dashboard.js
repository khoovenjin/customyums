import React, { useRef } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '../../components/AppScreen';

import AppCard from '../../components/AppCard';
import AppDeleteSwipe from '../../components/AppDeleteSwipe';
import AppSearch from '../../components/AppSearch';
import AppText from '../../components/AppText';
import defaultStyles from '../../config/styles';

import { sampleUpcomingMeals } from '../../config/data';

function Dashboard() {
  const searchRef = useRef();

  return (
    <AppScreen>
      <View style={ styles.header } >
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Custom Yums</AppText>
      </View>
      <ScrollView>
        <View style={ styles.container }>
          <AppSearch
            onChange={ text => console.log( text ) }
            ref={ searchRef }
          />
          <AppText style={[ defaultStyles.text, styles.title ]}>Upcoming Meals</AppText>
          <FlatList
            data={ sampleUpcomingMeals.at( 0 ).meals }
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => {
              if( item?.recipe?.length )
                return (
                  <View>
                    <AppText
                      style={[ defaultStyles.text, styles.subTitle ]}
                    >
                      { item?.type }
                    </AppText>
                    <FlatList
                      data={ item?.recipe }
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
                        <View style={ styles.seperator }/> 
                      )}
                    />
                  </View>
                );
            }}
            ItemSeparatorComponent={() => (
              <View style={ styles.seperator }/> 
            )}
          />

          <AppText style={[ defaultStyles.text, styles.title ]}>New Recipes</AppText>
          <FlatList
            data={ sampleUpcomingMeals?.at(0)?.meals?.at(1)?.recipe }
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => (
              <AppCard
                image={ item?.image }
                title={ item?.title }
                description={ item?.description }
                tags={ item.tags }
                onPress={() => console.log("View More")}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={ styles.seperator }/> 
            )}
          />

          <AppText style={[ defaultStyles.text, styles.title ]}>Pantry Recipes</AppText>
          <FlatList
            data={ sampleUpcomingMeals?.at(0)?.meals?.at(0)?.recipe }
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item }) => (
              <AppCard
                image={ item?.image }
                title={ item?.title }
                description={ item?.description }
                tags={ item.tags }
                onPress={() => console.log("View More")}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={ styles.seperator }/> 
            )}
          />
        </View>
        
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    color: defaultStyles.colors.secondary_brown,
    fontSize: 30,
    fontWeight: 'bold'
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
  title: {
    color: defaultStyles.colors.primary_grey,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  seperator: {
    height: 15
  },
  subTitle: {
    color: defaultStyles.colors.secondary_brown,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  }
})

export default Dashboard;