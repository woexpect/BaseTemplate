import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// Custom components
import { login as loginAction } from '../../../redux/slices/sessionSlice';
// User tools
import styles from '../../../common/styles';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, loaded, error } = useSelector((state) => state.session);

  const login = () => {
    dispatch(loginAction());
  };

  return (
    <View style={[styles.completeScreen, styles.centerAll]}>
      <Text>Login</Text>
      <Button onPress={login} title={"login"} />
    </View>
  );
}

export default React.memo(Login);
