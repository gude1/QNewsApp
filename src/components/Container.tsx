import {
  ColorValue,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

interface ContainerProps {
  children?: React.ReactNode;
  statusBarStyle?: StatusBarStyle;
  statusBarBackgroundColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}
const Container: FC<ContainerProps> = ({
  children,
  style,
  statusBarBackgroundColor = 'white',
  statusBarStyle = 'dark-content',
}) => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />
      {navigation.canGoBack() && (
        <View>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {minHeight: height}, style]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    marginRight: 16,
  },
});
