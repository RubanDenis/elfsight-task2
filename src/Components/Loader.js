import React from 'react'
import '../Styles/Loader.css'

//показывает анимацию загрузки данных, при входе включен
export default function Loader() {
    return (
        <div className='loaderContainer'>
            <div className="loader"></div>
        </div>
    )
}
