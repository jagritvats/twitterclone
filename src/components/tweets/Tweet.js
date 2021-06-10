import React, { useEffect, useState } from 'react'
import './Tweet.css'

import blank_profile_img from '../auth/blank_profile_img.png'

import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import LoopIcon from '@material-ui/icons/Loop';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import CircularProgress from '@material-ui/core/CircularProgress';
import { db } from '../../app/config/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';

const TweetButton = (Icon, num, color, onClick, name , active = false) => {
    return (
        <div className={"tweet__button active-" + color + (active?" active-btn":"")} onClick={onClick} data-tooltip={name}>
            <Icon />
            <p>{num}</p>
        </div>
    )
}


function Tweet({isSubTweet = false, id, user, tweet, likes, comments, retweets, time}) {

    // id refers to tweet id

    const currentUser = useSelector(selectUser)

    let [loading, setLoading] = useState(true)

    let [author, setAuthor] = useState(null)

    let isLiked = likes.includes(currentUser.user.uid);

    const attachments = []

    useEffect(()=>{
        db.collection('users').doc(user).get().then(doc=>{
            setAuthor(doc.data())
            setLoading(false)
        })
    },[id])

    // author, name, username, tweet, attachments,likes,comments,retweets,profPic

    const like = () => {
        if(isLiked){

            db.collection('users').doc(currentUser.user.uid).update({
                likes : [...currentUser.userData.likes.filter(like=>like!==id)]
            })

            db.collection('tweets').doc(id).update({
                likes : [...likes.filter(likers=>likers!==currentUser.user.uid)]
            })
        
        }else{
            db.collection('users').doc(currentUser.user.uid).update({
                likes : [...currentUser.userData.likes, id]
            })

            db.collection('tweets').doc(id).update({
                likes : [...likes, currentUser.user.uid]
            })
        }
    }

    const retweet = () => {
        
    }

    const comment = () => {
        
    }

    const share = () => {
        
    }

    return (
        <div className="tweet">
            {
                loading?<CircularProgress />
                :
                <>
                    <div className="tweet__authorImg">
                        <img src={author.photoURL?author.photoURL:blank_profile_img} alt="" />
                    </div>

                    <div className="tweet__content">
                        <Link to={"/profile/" + user} className="tweet__authorInfo">
                            <h5>{author.fname + " " + author.lname}</h5>
                            <p>@{author.username}</p>
                            <span>&middot;</span>
                            <p>{time.toString()}</p>
                        </Link>

                        <div className="tweet__main">
                            <p className="tweet__text">{tweet.tweetText}</p>
                            <div className="tweet__attachments">
                                {
                                    attachments?attachments.map(att=> (
                                        <div className="tweet__attachment">
                                            <img src={att.url} alt="" />
                                        </div>
                                    )):""
                                }
                            </div>
                        </div>

                        <div className="tweet__buttons">
                            {TweetButton(ChatBubbleOutlineRoundedIcon, comments?comments.length:"", "blue", comment , "Comment")}
                            {TweetButton(LoopIcon, retweets?.length, "green", retweet , "ReTweet")}
                            {TweetButton(isLiked?FavoriteIcon:FavoriteBorderIcon, likes?.length, "red", like , "Like",isLiked)}
                            {TweetButton(ShareIcon,"", "blue", share , "Share")}
                        </div>
                    </div>
                
                </>
            }
        </div>
    )
}

export default Tweet
