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
import axios from 'axios';

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const List = () => {
  const [data, setdata] = useState([]);
  const [offset, setoffset] = useState(0);
  const [isLoading, setload] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleLoadMore = (reset = false) => {
    const curroff = reset ? 0 : offset;
    if (isLoading || reset) {
      axios
        .get('https://api.escuelajs.co/api/v1/products', {
          params: {
            offset: curroff,
            limit: 10,
          },
        })
        .then(function (response) {
          if (reset) {
            setdata(response.data);
            setRefreshing(false);
          } else setdata(prev => [...prev, ...response.data]);
          console.log(response.data);
          if (response.data.length < 10) setload(false);
          setoffset(curroff + 10);
        });
    }
  };

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

  const handleRefresh = async () => {
    setRefreshing(true);
    setload(true);
    handleLoadMore(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item title={item.title} />}
        onEndReached={() => handleLoadMore()}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              handleRefresh();
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
