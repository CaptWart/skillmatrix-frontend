import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button'
import Skillcards from '../../components/Skillcards/skillcards'
import Modals from '../../components/Modal/modal'
import API from "../../utils/API";

function Home(){
    const [allUsers, setAllUsers] = useState()

    const loadUsers = async () => {
        const getusers = await API.getAllUsers();
        const data = getusers;
        setAllUsers(await data.data);
    }


    useEffect(() => {
        loadUsers();

    }, [] )

    return(
        <div className='main'>
            <Header/>
            <Skillcards>{allUsers}</Skillcards>
            <Footer/>
        </div>
    )
}

export default Home;