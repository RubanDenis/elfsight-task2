import React from 'react'
import '../Styles/ImgCard.css'

//карточка фотографии в списке фотографий
//с одной стороны сама картика, с другой ее title
export default function ImgCard({ photo, onClick }) {
    return (
        <div className="imgContainer" onClick={() => onClick(photo)}>
            <div className='frontCard'>
                <img src={photo.thumbnailUrl} alt="img" />
            </div>
            <div className='backCard'>
                <p>{photo.title}</p>
            </div>
        </div>
    )
}