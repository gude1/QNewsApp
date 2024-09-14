import {
  ColorValue,
  KeyboardAvoidingView,
  Platform,
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
      <KeyboardAvoidingView
        style={styles.keyboardCtn}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}>
          <View style={[styles.container, {minHeight: height}, style]}>
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
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
  keyboardCtn: {},
  scrollview: {
    flexGrow: 1,
  },
});
