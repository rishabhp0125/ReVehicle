import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import Map from '../components/Map'

const CarPage = ({ match, history }) => {

    const [destinationQuery, setDestinationQuery] = useState('')
    const contact = "\n\nContact Info: "
    
    let carId = match.params.id
    let [car, setCar] = useState(null)

    useEffect(()=> {
        getCar()
       //eslint-disable-next-line
    }, [carId])


    useEffect(()=> {
        if (destinationQuery) {
            setCar((prevCar) => ({ ...prevCar, body: destinationQuery.concat(contact) }))
        }
    }, [destinationQuery])

    let getCar = async () => {
        if (carId === 'new') return
        
        let response = await fetch(`/api/cars/${carId}/`)
        let data = await response.json()
        setCar(data)
    }

    let updateCar = async () => {
        fetch(`/api/cars/${carId}/update/`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(car)
        })
    }

    let createCar = async () => {
        fetch(`/api/cars/create/`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(car)
        })
    }

    let deleteCar = async () => {
        fetch(`/api/cars/${carId}/delete/`, {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        history.push('/cars')
        window.location.reload()
    }

    let handleSubmit = () => {
        if (carId !== 'new' && car.body === ''){
            deleteCar()
        } else if (carId !== 'new') {
            updateCar()
        } else if (carId === 'new' && car !== '') {
            createCar()
        }
        history.push('/cars')
        window.location.reload()
    }

    let handleChange = (value) => {
        setCar(car => ({...car, 'body':value}))
    }

    return (
        <div className="car">
            <div className="car-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {carId !== 'new' ? (
                    <button onClick={deleteCar}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                ) }
            </div>
            <Map setDestinationQuery={setDestinationQuery} destinationQuery={destinationQuery}/>
            <textarea onChange={(e) => { handleChange((e.target.value)) }} value={car?.body} placeholder="More Info"></textarea>
        </div>
    )
}

export default CarPage