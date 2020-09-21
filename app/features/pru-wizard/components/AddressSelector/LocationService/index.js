import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import AppConfig from "../../../../../config/AppConfig"; 

Geocoder.init(AppConfig.getGeocodingApiKey());

export permissions from "./permission";

export const getLatLongFromAddress = address => {
  return Geocoder
    .from(address)
    .then(json => {
      const coordinates = json.results[0].geometry.location;
      if(coordinates && coordinates.lat && coordinates.lng) {
        return {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        }
      }
    })
}

export const getAddressFromLatLong = (latitude, longitude) => {
  return Geocoder.from(latitude, longitude)
    .then(json => {
      const address = json.results && json.results.length && json.results[0];
      return address && address.formatted_address;
    })
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(response => {
      const { latitude, longitude } = response.coords;
      resolve({
        latitude,
        longitude
      });
    }, err => {
      console.log(err);
      reject(err);
    }, {
      enableHighAccuracy: true,
    });
  });
};

export const getAddressObject = (latitude, longitude) => {
  return Geocoder.from(latitude, longitude)
    .then(json => {
      const address = json.results && json.results.length && json.results[0];
      const {address_components = []} = address;
      const result = {};
      let completeAddress = "";
      address_components.forEach(aC =>{
          const type = aC &&  aC.types; 
          if(Array.isArray(type)){
            if(type.includes("postal_code")){
              result.postalCode = aC.long_name;
            }
            // else if(type.includes("country")){
            //   result.country = aC.long_name;
            //   completeAddress += aC.long_name+", ";
            // }
            else if(type.includes("administrative_area_level_1")){
              result.state = aC.long_name;
              completeAddress += aC.long_name;
            }
            else if(type.includes("administrative_area_level_2")){
              result.district = aC.long_name;
              completeAddress += aC.long_name+", ";
            }
            else if(type.includes("locality")){
              result.city = aC.long_name;
            }
            else if(type.includes("sublocality")){
              result.localArea = aC.long_name;
              completeAddress += aC.long_name+", ";
            }
            else if(type.includes("route")){
              result.street = aC.long_name;
              completeAddress += aC.long_name+", ";
            }
            else if(type.includes("street_number")){
              result.streetNumber = aC.long_name;
              completeAddress += aC.long_name+", ";
            }
          }
      });
      result.completeAddress = completeAddress;
      return result;
    })
};
