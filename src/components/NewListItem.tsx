import {
  Linking,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Text} from 'react-native-paper';

interface NewListItemProps {
  author?: string;
  date?: string;
  topic?: string;
  url?: string;
  style?: StyleProp<ViewStyle>;
}

const NewListItem: FC<NewListItemProps> = ({
  author,
  date,
  topic,
  url,
  style,
}) => {
  const openUrl = () => {
    try {
      if (url) {
        Linking.openURL(`${url}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.firstSection}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.title} numberOfLines={4} ellipsizeMode="tail">
          {topic}
        </Text>

        <TouchableOpacity onPress={openUrl} style={styles.linkctn}>
          <Text style={styles.link}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
  },
  author: {
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  date: {
    fontWeight: '500',
    fontSize: 12,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondSection: {
    marginTop: 10,
    paddingRight: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkctn: {
    marginTop: 15,
  },
  link: {
    color: '#D64547',
    fontSize: 16,
  },
});
