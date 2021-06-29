import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';


const usersMap = props => {

  let userLocationMarker = null;
  let friendLocationMarker = null;
  var latType = typeof(props.friendLocationDetail['latitude'])

  if (props.userLocation) {
    userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
  }
  if(props.friendLocationDetail !== undefined){
        var coor = {}
        coor['latitude'] = props.friendLocationDetail['latitude']
        coor['longitude'] = props.friendLocationDetail['longitude']
        coor['latitudeDelta'] = 0.0622
        coor['longitudeDelta'] = 0.0421
        friendLocationMarker = <MapView.Marker pinColor={"green"} coordinate={coor}/>
  }

  if(props.focusOnFriend === false){

      return (
        <View style={styles.mapContainer}>
          <MapView
            region={props.userLocation}
            style={styles.map}>
                {userLocationMarker}
                {friendLocationMarker}
          </MapView>
        </View>
      );

  }else if(props.focusOnFriend === true){

      return (
        <View style={styles.mapContainer}>
          <MapView
            region={coor}
            style={styles.map}>
                {userLocationMarker}
                {friendLocationMarker}
          </MapView>
        </View>
      );

  }else{

      return(
        <View style={styles.container}>
            <Text>Sorry, there was an error. Please try again!</Text>
        </View>
      );
  }
};


const styles = StyleSheet.create({
    mapContainer: {
      width: '100%',
      height: 200,
      marginTop:20
    },
    map: {
      width: '100%',
      height: '100%'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})


export default usersMap;
