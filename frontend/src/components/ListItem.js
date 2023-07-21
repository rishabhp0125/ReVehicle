import React from 'react'
import { Link } from 'react-router-dom'

let getTime = (car) => {
  return new Date(car.updated).toLocaleTimeString()
}

let getTitle = (car) => {
  let title = car.body.split(',')[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}

let getContent = (car) => {
  let title = getTitle(car)
  let content = car.body.replaceAll('\n', ' ')
  content = content.replaceAll(',', '')
  content = content.replaceAll(title, '')

  if (content.length > 45) {
    return content.slice(0, 45) + '...'
  } else {
    return content
  }
}

const ListItem = ({ car }) => {
  if (!car) {
    return <div>Loading...</div>
  }

  return (
    <Link to={`/cars/${car.id}`}>
      <div className="cars-list-item">
        <h3>{getTitle(car)}</h3>
        <p>
          <span>{getTime(car)}</span>
          {getContent(car)}
        </p>
      </div>
    </Link>
  )
}

export { getTitle }
export default ListItem
