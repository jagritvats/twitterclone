import React from 'react'
import './ProfileSummary.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import blank_profile_img from './auth/blank_profile_img.png'

function ProfileSummary() {
    return (
    <div className="profile">
        <div className="profile__img">
            <img src={blank_profile_img} alt="" />
        </div>
        <div className="profile__info">
            <h4>Net Surfer</h4>
            <p>@Username</p>
        </div>

        <div className="moreicon">
            <MoreHorizIcon/>
        </div>
    </div>
    )
}

export default ProfileSummary
