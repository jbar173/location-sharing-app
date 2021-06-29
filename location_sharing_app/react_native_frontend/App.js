import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap.js';



class App extends React.Component {
  state = {
    user: {
      "id":1,
      "name":"Me",
      "location":null
    },
    friend: {
      "id":2,
      "name":"Friend",
      "location":null
    },
    updated: false,
    updatedTwo: false,
    userTBUpdated: false,
    friendLocationTBFetched: false,
    focusOnFriend: false,

    // For FetchLocation button (current location retrieved from maps api):
    userLocation: {
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0
    },
    // Data used to update user's location on drf api to their latest location:
    userLocationDetail:{
      'id':null,
      'latitude':0.0,
      'longitude':0.0,
    },
    // friend's latest location (retrieved from drf api):
    friendLocationDetail:{
      'id':null,
      'latitude':0.0,
      'longitude':0.0,
    }
  }

  componentDidUpdate(){
    console.log("updated")

    if(this.state.updated === true){
      var changed = this.locationHasChanged()
      if(changed === true){
        console.log("creating location")
        this.fetchLocationCreate()
      }
    }
    if(this.state.userTBUpdated === true){
      console.log("updating user's location")
      this.fetchUpdateUserLocation()
    }
    if(this.state.friendLocationTBFetched === true){
      console.log("friend's data has been fetched")
      console.log("fetching friend's location details")
      this.fetchFriendLocationDetail()
    }
    if(this.state.updatedTwo === true){
      console.log("finished updating")
      this.setState({
        updatedTwo:false,
      })
    }
  }

  locationHasChanged(){
    var current_lat = this.state.userLocation.latitude
    var current_long = this.state.userLocation.longitude
    var prev_lat = this.state.userLocationDetail.latitude
    var prev_long = this.state.userLocationDetail.longitude

    if(current_lat == prev_lat && current_long == prev_long){
      this.setState({
        updated:false
      })
      return false;
    }
    return true;
  }

  getUserLocationHandler = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421
          },
          updated: true,
          focusOnFriend: false
        })
        console.log(" 'Get my location' button pressed ");
        console.log(position);
    }, (error) => {
      console.log(error.code, error.message);
    },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

// Creates a new location on drf api with map api coordinates of user's latest position:
  fetchLocationCreate(){
    var ip_host = "your ip/host here"
    var url = `http://${ip_host}/api/create-location/`
    var lat = this.state.userLocation.latitude
    var long = this.state.userLocation.longitude
    fetch(url, {
      method:'POST',
      headers: {
        'Content-type':'application/json',
      },
      body:JSON.stringify({
        latitude: lat,
        longitude: long
      })
    })
    .then(response => response.json())
    .then(data =>
      this.setState({
        userLocationDetail:data,
        updated: false,
        userTBUpdated: true
      })
    )
    .catch(err => console.log("Create error: " + err));
  }

// Updates main user's location on drf api to current position/location:
  fetchUpdateUserLocation(){
    var ip_host = "your ip/host here"
    var id = this.state.user.id
    var url = `http://${ip_host}/api/update-user/${id}/`
    var name = this.state.user.name
    var new_location = this.state.userLocationDetail.id
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type':'application/json',
      },
      body:JSON.stringify({
        name:name,
        location:new_location
      })
    })
    .then(response => response.json())
    .then(data =>
        this.setState({
          user:data,
          userTBUpdated:false
        })
    ).catch(error => console.log("User update error: " + error));
  }

// Updates 'Friend' user's latest location data:
  getFriendLocationHandler = () => {
    console.log(" 'Get friend's location' button pressed ");
    var ip_host = "your ip/host here"
    var id = this.state.friend.id
    var url = `http://${ip_host}/api/user-detail/${id}/`
    fetch(url)
    .then(response => response.json())
    .then(data =>
        this.setState({
          friend:data,
          friendLocationTBFetched: true,
        })
    ).catch(error => console.log("userPin error: " + error))
  }

// Fetches location details (lat,long) for friend's updated location:
  fetchFriendLocationDetail(){
    var ip_host = "your ip/host here"
    var id = this.state.friend.location
    var url = `http://${ip_host}/api/location-detail/${id}/`
    fetch(url)
    .then(response => response.json())
    .then(data =>
        this.setState({
          friendLocationDetail:data,
          friendLocationTBFetched: false,
          updatedTwo: true,
          focusOnFriend: true
        }),
    ).catch(error => console.log("friend location error: " + error))
  }


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.locationButton} >Hello World!</Text>
        <View style={{marginBottom: 20}}>
          <Button title="Get friend's Location" onPress={this.getFriendLocationHandler} />
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation}
          friendLocationDetail={this.state.friendLocationDetail}
          focusOnFriend={this.state.focusOnFriend} />
        <StatusBar style="auto" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    marginBottom: 20,
    fontSize: 16
  },
});

export default App;
