import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import ListItem, { getTitle } from '../components/ListItem'
import SearchBar from '../components/SearchBar'
import { HStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const filterCars = (query, cars) => {
  if (typeof query !== 'string' || !cars || cars.length === 0) {
    return []
  }

  return cars.filter((car) => {
    const carTitle = getTitle(car);
    return carTitle.toLowerCase().includes(query.toLowerCase())
  })
}

const CarsListPage = () => {
  const [cars, setCars] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [querySearch, setQuerySearch] = useState('')

  useEffect(() => {
    getCars()
  }, [])

  const getCars = async () => {
    let response = await fetch('/api/cars/')
    let data = await response.json()
    setCars(data)
  }

  const updateSearchResults = (query) => {
    setQuerySearch(query)
    if (cars && cars.length > 0) {
      setSearchResults(filterCars(query, cars))
    } else {
      setSearchResults([])
    }
  }
  

  useEffect(() => {
    updateSearchResults(querySearch)
    // eslint-disable-next-line
  }, [cars, querySearch])

  const navigateLogin = () => {
    window.location.href = '/'
  }

  return (
    <div className="cars">
      <div className="cars-header">
        <h2 className="cars-title">&#9782; Cars</h2>
        <p className="cars-count">{cars.length}</p>
        <button className="log-out" onClick={navigateLogin}>
          <FontAwesomeIcon aria-label="center-back" icon={faRightFromBracket} />
        </button>
      </div>

      <div className="searchbar">
        <HStack>
          {/* Pass the updateSearchResults function and querySearch to SearchBar */}
          <SearchBar updateSearchResults={updateSearchResults} updatedSearchResults={updateSearchResults} filterCars={filterCars} />
        </HStack>
      </div>

        <div className="cars-list">
            {searchResults.length > 0 ? (
                searchResults.map((car, index) => <ListItem key={index} car={car} />)
            ) : (
                <p className="no-cars">No cars found.</p>
            )}
        </div>

      <AddButton />
    </div>
  )
}

export default CarsListPage