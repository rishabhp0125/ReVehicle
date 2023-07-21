import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { HStack, IconButton, Button, ButtonGroup } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'

const center = { lat: 40.2983, lng: -74.6186}

const Map = ({ setDestinationQuery, destinationQuery }) => {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyAB4gZF2Zhm_fCGtew7vVM4FKTpxEA349E",
        libraries: ['places']
    })

    const[directionsResponse, setDirectionsResponse] = useState(null)
    //eslint-disable-next-line
    const [distance, setDistance] = useState('')

    const originRef = useRef()
    
    const destinationRef = useRef()

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }
        //eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService()
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            //eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.value)
        const destinationQuery = destinationRef.current.value
        setDestinationQuery(destinationQuery)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    return (
        <div>
            <HStack className="search-bar">
                <Autocomplete>
                    <input id="1" type="text "placeholder="Origin" ref={originRef} />
                </Autocomplete>
                <Autocomplete>
                    <input id="2" type="text" placeholder="Destination" ref={destinationRef} />
                </Autocomplete>
            </HStack>
            <HStack className="Buttons">
                <ButtonGroup>
                    <Button className="calculate" type="submit" colorScheme="pink" onClick={calculateRoute}>
                        Calculate Route
                    </Button>
                    <IconButton
                        className="remove"
                        aria-label="center back"
                        icon={<FaTimes />}
                        onClick={clearRoute}
                    />
                </ButtonGroup>
            </HStack>
            <div className="car">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '58.4vh', height: '39vh'  }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                        <Marker position={center} />
                        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                </GoogleMap>
            </div>
        </div>    
    )

}

export default Map