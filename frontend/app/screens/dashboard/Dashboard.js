import React, { Suspense, useRef } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '../../components/AppScreen';

import AppCard from '../../components/AppCard';
import AppDeleteSwipe from '../../components/AppDeleteSwipe';
import AppSearch from '../../components/AppSearch';
import AppText from '../../components/AppText';
import defaultStyles from '../../config/styles';

import useFeaturedRecipe from '../../hooks/useFeaturedRecipe';
import usePantryRecipe from '../../hooks/usePantryRecipe';
import useSearchRecipe from '../../hooks/useSearchRecipe';
import useUpcomingDietary from '../../hooks/useUpcomingDietary';

function Dashboard() {
  const searchRef = useRef();
  const user_id = "64c21f7904f05b8cc0e30746";
  const noOfFeaturedRecipes = 10;
  
  const [ deferredRecipes, setSearchQuery ] = useSearchRecipe();
  const [ dietariesLoading, dietariesError, upcomingDietaries ] = useUpcomingDietary();
  const pantryRecipes = usePantryRecipe( user_id );
  const featuredRecipes = useFeaturedRecipe( noOfFeaturedRecipes );

  return (
    <AppScreen>
      <View style={ styles.header } >
        <AppText style={[ defaultStyles.text, styles.pageHeader ]}>Custom Yums</AppText>
      </View>
      <ScrollView>
        <View style={ styles.container }>
          <AppSearch
            onChangeText={ text => setSearchQuery( text ) }
            ref={ searchRef }
          />
          { deferredRecipes.length > 0?
            (
              <Suspense fallback={ <AppText>Loading...</AppText> }>
                <FlatList
                  data={ deferredRecipes }
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={({ item }) => (
                    <AppCard
                      image={{ uri: item.image }}
                      title={ item.title }
                      description={ item.description }
                      tags={ item.tags }
                      onPress={() => console.log('Press')}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={ styles.separator }/> 
                  )}
                />
              </Suspense>
            )
            :
            (
              <>
                { upcomingDietaries && <AppText style={[ defaultStyles.text, styles.title ]}>Upcoming Meals</AppText> }
                { upcomingDietaries && <FlatList
                  data={ upcomingDietaries?.dietaries }
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={({ item }) => {
                    if( item?.recipes?.length )
                      return (
                        <View>
                          <AppText
                            style={[ defaultStyles.text, styles.subTitle ]}
                          >
                            { item?.meal }
                          </AppText>
                          <FlatList
                            data={ item?.recipes }
                            keyExtractor={( item, index ) => index.toString()}
                            renderItem={({ item }) => (
                              <AppCard
                                image={{ uri: item.image }}
                                title={ item.title }
                                description={ item.description }
                                tags={ item.tags }
                                onPress={() => console.log('Press')}
                                renderRightActions={() => (
                                  <AppDeleteSwipe onPress={() => console.log("delete")}/>
                                )}
                              />
                            )}
                            ItemSeparatorComponent={() => (
                              <View style={ styles.separator }/> 
                            )}
                          />
                        </View>
                      );
                  }}
                  ItemSeparatorComponent={() => (
                    <View style={ styles.separator }/> 
                  )}
                /> }

                { pantryRecipes && <AppText style={[ defaultStyles.text, styles.title ]}>Pantry Recipes</AppText> }
                { pantryRecipes && <FlatList
                  data={ pantryRecipes }
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={({ item }) => (
                    <AppCard
                      image={{ uri: item.image }}
                      title={ item.title }
                      onPress={() => console.log("View More")}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={ styles.separator }/> 
                  )}
                /> }

                { featuredRecipes && <AppText style={[ defaultStyles.text, styles.title ]}>Featured Recipes</AppText> }
                { featuredRecipes && <FlatList
                  data={ featuredRecipes }
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={({ item }) => (
                    <AppCard
                      image={{ uri: item.image }}
                      title={ item.title }
                      description={ item.description }
                      tags={ item.tags }
                      onPress={() => console.log("View More")}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={ styles.separator }/> 
                  )}
                /> }
              </>
            )
          }
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
  separator: {
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