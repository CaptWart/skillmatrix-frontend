import React from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button'
import Skill from '../../components/Skill/skill'
import Skillcards from '../../components/Skillcards/skillcards'

function Home(){

    return(
        <div>
            <Header/>
            <h1>This is addpage. Add skills and Areas</h1>
            
            <Skillcards> <Skill/> </Skillcards>
            <br/>
            <Footer/>
        </div>
    )
}

export default Home;