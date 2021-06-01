import React from 'react'
import blank_profile_img from '../auth/blank_profile_img.png'
import './TweetForm.css'

import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import GifIcon from '@material-ui/icons/Gif';
import PollIcon from '@material-ui/icons/Poll';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

function TweetIcon(Icon, onClick, isImage=false){
    // add image uploading functionality
    return (
        <div className="tweetForm__icon" onClick={onClick}>
            <Icon />
        </div>
    )
}

function TweetForm() {
    return (
        <form className="tweetForm">
            <div className="tweetForm__img">
                <img src={blank_profile_img} alt=""/>
            </div>

            <div className="tweetForm__main">
                <div className="tweetForm__input">
                   <textarea rows="2" cols="60" type="text" placeholder="What's Happening?" className="tweetForm__text"></textarea>  
                </div>
                
                <div className="tweetForm__bottom">
                    <div className="tweetForm__icons">
                        {TweetIcon(InsertPhotoOutlinedIcon,()=>{},true)}
                        {TweetIcon(GifIcon,()=>{})}
                        {TweetIcon(PollIcon,()=>{})}
                        {TweetIcon(InsertEmoticonOutlinedIcon,()=>{})}
                        {TweetIcon(DateRangeOutlinedIcon,()=>{})}
                    </div>

                    <button type="submit">Tweet</button>
                </div>
                
            </div>
        </form>
    )
}

export default TweetForm
