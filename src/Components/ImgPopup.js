import React from 'react'
import '../Styles/ImgCard.css'

//попап содержащий выбранную фотографию
export default function ImgPopup(props) {
    return (
        <div className='popupBackground'>
            <div className='closePopupContainer'>
                <div><button className="closePopupBtn" title='Закрыть' onClick={() => props.closePopup()}>X</button></div>
            </div>
            <div className="popupContainer">
                <button className="popupLeftBtn" onClick={() => props.movePrevPhoto()} title='Предыдущее фото'><i className="arrow"></i></button>
                <img className="carousel" src={props.selectedPhoto.url} alt="" />
                <button className="popupRightBtn" onClick={() => props.moveNextPhoto()} title="Следующее фото"><i className="arrow"></i></button>
            </div>
        </div>
    )
}