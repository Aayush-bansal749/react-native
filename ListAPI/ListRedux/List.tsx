import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {refresh, fetchList} from './redux/slice/ListSlice';

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const List = () => {
  const dispatch = useDispatch();
  const {data, isLoading, isRefreshing} = useSelector(state => state.ListItems);

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{padding: 10}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{padding: 10, alignItems: 'center'}}>
        <Text>End of List</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.title} />}
        onEndReached={() => {
          if (isLoading) {
            dispatch(fetchList());
          }
        }}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              dispatch(refresh());
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#212121',
  },
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default List;
