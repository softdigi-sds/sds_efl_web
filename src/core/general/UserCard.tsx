import React from 'react'
import "./general.scss"
import { UserCardProps } from './SmartGeneralInterface'


const UserCard:React.FC<UserCardProps> = (props) => {
    const{ProfileImage,icons, title,subTitle,content}=props
  return (
    <div className='m-6 smart-user-card-container p-6'>
<div className="smart-user-card">
   {ProfileImage && <div className="smart-user-image">
        <img src={ProfileImage} alt="User Image"/>
    </div>}
    <div className="smart-user-info">
       {title&& <h2>{ title}</h2>}
      {subTitle &&  <p className="smart-title">{subTitle}</p>}
      {content &&  <p className="smart-about">
           {content}
        </p>}
      {icons &&  <div className="smart-social-icons">
        {icons}
        </div>}
      
    </div>
</div>
    </div>
  )
}

export default UserCard
