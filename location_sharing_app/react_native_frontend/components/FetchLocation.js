import React from 'react';
import { Button, StyleSheet } from 'react-native';

const fetchLocation = props => {
  return (
    <Button title="Get my Location" onPress={props.onGetLocation} value={true} />
  );
};


export default fetchLocation;
