import React from 'react'
import '../Styles/UserCard.css'
import UserSvg from './UserSvg'


//карточка пользователя в списке пользователей
export default function UserCard({user, onClick}) {
    return (
        <div className="userCard" onClick={() => onClick(user.id)}>
            <h2>{user.name}</h2>
            <div className="title title--epic">{user.website}</div>
            <div className="desc">{user.email}<br/>{user.phone}</div>
            <UserSvg />
        </div>
    )
}
