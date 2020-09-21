import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyBN7511_6iwTgoGJ0L16_uqrR550BJX8-U"); //change this api to GOOGLE_API_KEY contant #Todo 


//Get Latitude and Longitude from Address
export const getLatLngFromAddress=(address)=>{
    let location=Geocoder.from(address)
        .then(json => {
            var latAndLng = json.results[0].geometry.location;
            return latAndLng
        })
        .catch(error => error);
        return location
}

//Get Address form Latitude and Longitude
export const getAddressFromLatLng=(lat,lng)=>{
    let address = Geocoder.from(lat,lng)
        .then(json => {
            var address = json.results[0];
           return address
        })
        .catch(error => error);
    return address;
}




