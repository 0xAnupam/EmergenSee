import { useState, useEffect } from 'react'

function Location() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setUserAddress] = useState()

  const [GPSLatitude, setGPSLatitude] = useState()
  const [GPSLongitude, setGPSLongitude] = useState()

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      const geo = navigator.geolocation

      // Get User Current Location
      geo.getCurrentPosition(userCoords)
      function userCoords(position) {
        let userLatitude = position.coords.latitude
        let userLongitude = position.coords.longitude
        setLatitude(userLatitude)
        setLongitude(userLongitude)
      }

      // Get User GPS Current Location
      const watchID = geo.watchPosition(userGPSCoords)
      function userGPSCoords(position) {
        let userGPSLatitude = position.coords.latitude
        let userGPSLongitude = position.coords.longitude
        setGPSLatitude(userGPSLatitude)
        setGPSLongitude(userGPSLongitude)
      }

      return () => {
        // Stop GPS when component unmounts
        geo.clearWatch(watchID)
      }
    }
  }, [])

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=2b49750d01724192bb21fb47740f934e&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
    const loc = await fetch(url)
    const data = await loc.json()
    setUserAddress(data.results[0].formatted)
  }

  const handleGetUserAddress = () => {
    getUserAddress()
  }

  return (
    <>
      <h1>Current Location</h1>
      <h2>latitude- {latitude}</h2>
      <h2>longitude- {longitude}</h2>
      <h2>User Address- {userAddress}</h2>
      <button onClick={handleGetUserAddress}>Get User Address</button>
      <hr />
      <h1>GPS Tracking</h1>
      <h2>GPS Latitude:- {GPSLatitude}</h2>
      <h2>GPS Longitude:- {GPSLongitude}</h2>
    </>
  )
}

export default Location
