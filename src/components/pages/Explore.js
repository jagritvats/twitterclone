import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../app/config/firebase'

function Explore() {

    let [users, setUsers] = useState(null)

    useEffect(()=>{
        db.collection('users').get().then((docs)=>{
            var usersList = []
            docs.forEach((doc)=>{
                let data = doc.data()
                usersList.push(data)
            })
            setUsers(usersList)
        })
    },[])
    return (
        <div>
            {
                users?
                users.map((user)=>(
                    <Link to={"/profile/" + user.uid} className="tweet__authorInfo">
                        <h5>{user.fname + " " + user.lname}</h5>
                        <p>@{user.username}</p>
                    </Link>
                )):
                "loading"
            }
        </div>
    )
}

export default Explore
