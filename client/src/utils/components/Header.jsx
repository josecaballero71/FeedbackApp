import './Header.css';

import { Link } from 'react-router-dom';

import images from '../images/images'
import logout from '../use-cases/logout'



export default function Header() {

    return (
        <nav id='header-container'>
            <div className='left-container'>
                <div className='logo-container'>
                    <img src={images.dhg} alt="" />
                </div>
                <ul className='pages-container'>
                    <li><Link to="/Hub">Home</Link></li>
                    <li><Link to="/Survey">Survey</Link></li>
                    <li><Link to="/Dashboard">Dashboard</Link></li>
                    <li><Link to="/Data">Data</Link></li>
                    <li><Link to="/Admin">Admin</Link></li>
                </ul>
            </div>
            <div className="logout-container">
                <button onClick={logout}>
                    <img src={images.logout} alt="" />
                    <p>LOG OUT</p>
                </button>
            </div>
        </nav>
    );
}