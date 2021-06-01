import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'

import './Feed.css';

function Feed() {
    const dispatch = useDispatch(logout())
    const doLogout = () => {
        dispatch(logout())
    }

    const tweets = [
        {
            author:'',
            name:'Jagrit Vats',
            username:'jagrit',
            tweet:'Hey this is a test'
        }
    ]
    return (
        <div className="feed">
            Feed
            <button onClick={doLogout}>Logout</button>
        </div>
    )
}

export default Feed
