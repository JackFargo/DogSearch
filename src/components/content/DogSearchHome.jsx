import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './DogSearchHome.css';
import dog1 from '../../figures/dog1.jpg';
import dog2 from '../../figures/dog2.jpg';
import dog3 from '../../figures/dog3.jpg';
import dog4 from '../../figures/dog4.jpg'; 
import dog5 from '../../figures/dog5.jpg';
import dog6 from '../../figures/dog6.jpg';
import dog7 from '../../figures/dog7.jpg';
import dog8 from '../../figures/dog8.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faBone } from '@fortawesome/free-solid-svg-icons';

export default function DogSearchHome() {
    const [loginStatus, setLoginStatus] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = Boolean(sessionStorage.getItem("isLoggedIn"));
        setLoginStatus(isLoggedIn);
    }, [location]);

    const render_login_status = () => {
        if (loginStatus) {
            return (
                <>
                    <Link to="/search" className="bone-button">
                        <FontAwesomeIcon icon={faBone} className="bone-icon" />
                        <span>Find a Friend!</span>
                    </Link>
                </>
            )            
        } else {
            return (
                <>
                    <p>Must log in to start searching for dogs.</p>
                    <Link to="/login" className="bone-button">
                        <FontAwesomeIcon icon={faBone} className="bone-icon" />
                        <span>Find a Friend!</span>
                    </Link>
                </>
            )
        }
    }

    return (
        <Container className="split-screen">
            <div className="left-container">
                {/* Welcome message content for the left container on home screen */}
                <h1>Welcome to Dog Search!</h1>
                <p>Find your perfect furry friend!</p>
                {render_login_status()}
            </div>

            <div className="right-container">
                {/* Content for the right container on home screen */}
                <div className="card-container-right">    
                    <Card className="card-display animated1">
                        <Card.Img src={dog1} />
                    </Card>    
                    <Card className="card-display animated2">
                        <Card.Img src={dog2} />
                    </Card>
                    <Card className="card-display animated3">
                        <Card.Img src={dog3} />
                    </Card>
                    <Card className="card-display animated7">
                        <Card.Img src={dog7} />
                    </Card>
                    
                </div>
                <div className="card-container-left">
                    <Card className="card-display animated4">
                        <Card.Img src={dog4} />
                    </Card>
                    <Card className="card-display animated5">
                        <Card.Img src={dog5} />
                    </Card>
                    <Card className="card-display animated6">
                        <Card.Img src={dog6} />
                    </Card>
                    <Card className="card-display animated8">
                        <Card.Img src={dog8} />
                    </Card>
                </div>
            </div>
        </Container>    
    );
}   
