import React, { useState, useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { Wrapper } from '@googlemaps/react-wrapper'
import { HStack, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaSearchLocation, FaTimes } from 'react-icons/fa'

const SearchBar = ({ google, updatedSearchResults, filterCars, updateSearchResults }) => {
  const [query, setQuery] = useState('')
  const autocompleteRef = useRef(null)

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      if (place && place.formatted_address) {
        console.log(place.formatted_address)
        var querySearch = autocompleteRef.current.getPlace().formatted_address

        updatedSearchResults(filterCars(querySearch))
      }
    }
  }

  function clearSearch() {
    setQuery('')
    window.location.reload()
  }

  const handleSearch = (event) => {
    const value = event.target.value
    setQuery(value)
    updateSearchResults(value) 
  }

  return (
    <div>
        <HStack>
          <Wrapper apiKey="AIzaSyAB4gZF2Zhm_fCGtew7vVM4FKTpxEA349E" libraries={["places"]}>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
            google={google}
          >
            <input type="text" value={query} onChange={handleSearch} className="query-bar"/>
          </Autocomplete>
          </Wrapper>
          <ButtonGroup>
              <IconButton 
                  className="search-button"
                  aria-label="center back"
                  icon={<FaSearchLocation className="search-icon"/>}
              />
              <IconButton
                  className="remove"
                  aria-label="center back"
                  icon={<FaTimes className="remove-icon"
                  onClick={clearSearch}/>}
              />
          </ButtonGroup>
        </HStack>
    </div>
  )
}

export default SearchBar
