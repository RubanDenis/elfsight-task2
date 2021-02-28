import React from 'react'
import ImgCard from './ImgCard'


//компонент со списком фотографий выбранного альбома
export default function Photos(props) {
    return (
        <>
            <button className='backBtn' onClick={props.bactToAlbumsList}>Вернуться к списку альбомов</button>
            <div className='cardContainer'>
                {props.photoList.map((photo) => {
                    return <ImgCard photo={photo} key={photo.id} onClick={props.showPopup} />
                })}
            </div>
        </>
    )
}
