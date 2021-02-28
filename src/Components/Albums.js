import React from 'react'
import AlbumsCard from './AlbumsCard'

//список альбомов выбранного пользователя
export default function Albums(props) {
    return (
        <>
            <button className='backBtn' onClick={props.bactToUsersList}>Вернуться к списку пользователей</button>
            <div className='cardContainer'>
                {props.albumsList.map((album) => {
                    return <AlbumsCard album={album} key={album.id} onClick={props.selectAlbum} />
                })}
            </div>
        </>
    )
}
