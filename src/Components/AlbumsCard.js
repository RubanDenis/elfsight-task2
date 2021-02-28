import React from 'react'
import '../Styles/AlbumCard.css'

//карточка в списке альбомов
export default function AlbumsCard({ album, onClick }) {

    return (
        <div className="albumCard" onClick={() => onClick(album.id)}>
            <div className="cardHeader">
                <img src={album.img} alt="" />
            </div>
            <div className="cardBody">
                <div className="cardContent">
                    <h1>{album.title}</h1>

                    <div className="cardInfo">
                        <div className="photoCount">
                            {album.countPhoto} фотографий
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
