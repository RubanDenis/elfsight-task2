import React from 'react'
import UserCard from './UserCard'


//компонент со списком доступных пользователей
export default function Users(props) {
    return (
        <div className='cardContainer'>
            {props.usersList.map((user) => {
                return <UserCard user={user} key={user.id} onClick={props.selectUser} />
            })}
        </div>
    )
}
