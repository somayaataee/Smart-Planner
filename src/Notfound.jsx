import { Link } from 'react-router-dom';
import notImage from '../src/assets/images/notfound.png'

export default function Notfound(){
    return(
        < div className='items-center justify-center flex flex-col'>
            <img src={notImage} alt="" />
            <p>Not found Page</p><br />
            <Link to='/dashboard' className='bg-white text-black px-4 py-2 rounded-2xl'>⬅️ Back to  Home</Link>
        </div>
    );
}