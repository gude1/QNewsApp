import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hook';
import {fetchNews} from '../../redux/thunk/hackernews';
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import {Text} from 'react-native-paper';
import NewListItem from '../../components/NewListItem';
import {Hit} from '../../redux/types/hackernews';
import {formatDateString} from '../../utils';
import {showMessage} from 'react-native-flash-message';
import {useTheme} from '@react-navigation/native';

type NewsScreenProps = NativeStackScreenProps<MainStackParamList, 'News'>;

const NewsList = ({navigation}: NewsScreenProps) => {
  const news = useAppSelector(state => state.news);
  const [isfetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {colors} = useTheme();

  useEffect(() => {
    getNews(true);
  }, []);

  const keyExtractor = (item: Hit) => {
    return item.objectID;
  };

  const getNews = async (reset = false, pagenum = 1, perpage = 10) => {
    try {
      reset ? setIsFetching(true) : setIsLoading(true);
      const result = await dispatch(
        fetchNews({reset: reset, page: pagenum, hitsPerPage: perpage}),
      );

      const {meta} = result;
      if (meta.requestStatus === 'rejected') {
        showMessage({
          message: "Couldn't fetch news, please try again",
          type: 'danger',
          duration: 2000,
        });
      }
      setPage(page + 1);
    } catch (err) {
      showMessage({
        message: "Couldn't fetch news, please try again",
        type: 'danger',
        duration: 2000,
      });
    } finally {
      reset ? setIsFetching(false) : setIsLoading(false);
    }
  };

  const renderItem: ListRenderItem<Hit> | null | undefined = ({item}) => {
    return (
      <NewListItem
        topic={item.title}
        url={item.url}
        author={item.author}
        date={formatDateString(item.created_at)}
      />
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptylist}>
        {isfetching ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <>
            <Text>No stories yet!</Text>
            <Button
              onPress={() => getNews(true)}
              loading={isfetching}
              disabled={isfetching}
              mode="contained"
              elevation={5}
              contentStyle={[styles.btnCtn, {backgroundColor: colors.primary}]}
              style={styles.btn}>
              Retry
            </Button>
          </>
        )}
      </View>
    );
  };

  const renderRefreshComponent = () => {
    if (!news.list || news.list.length < 1) {
      return;
    }

    return (
      <RefreshControl
        tintColor={'white'}
        refreshing={isfetching}
        onRefresh={() => {
          getNews(true);
        }}
      />
    );
  };

  const renderListFooterComponent = () => {
    if (news.list.length < 1) {
      return;
    }
    return (
      <View style={styles.listfooter}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => getNews(false, page, 10)}>
            <IconButton icon="plus" size={25} style={styles.loadmoreicon} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Stories</Text>
        <TouchableRipple onPress={() => navigation.navigate('Profile')}>
          <Avatar.Icon
            size={35}
            icon="account"
            color="#B22222"
            style={styles.avatarIconBg}
          />
        </TouchableRipple>
      </View>
      <View style={styles.container}>
        <FlatList
          data={news.list}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListEmptyComponent={renderEmptyComponent()}
          initialNumToRender={5}
          refreshControl={renderRefreshComponent()}
          ListFooterComponent={renderListFooterComponent()}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: '32%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.2,
  },
  headerTitle: {
    fontWeight: '900',
    fontSize: 22,
  },
  avatarIconBg: {
    backgroundColor: '#F9B3B3',
  },
  list: {
    paddingHorizontal: 16,
    // height: '92.5%',
  },
  btn: {
    marginTop: 15,
    borderRadius: 10,
    alignSelf: 'center',
    maxWidth: 500,
    width: 'auto',
  },
  btnCtn: {
    padding: 7,
  },
  emptylist: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listfooter: {
    alignItems: 'center',
    minHeight: 40,
    marginTop: 10,
    justifyContent: 'center',
  },
  loadmoreicon: {
    borderWidth: 1,
  },
});
export default NewsList;
