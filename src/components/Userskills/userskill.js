import React, { useState, useEffect } from 'react';
import Skill from '../../components/Skill/skill'
import Skillcards from '../Skillcards/skillcards'

const Userskillcards = (props) => {

    return(
        <div>
            <h1>Your skills</h1>

            <h1>Skill Cards</h1>
            <Skillcards/>
            <Skill/>
        </div>
    )
}

export default Userskillcards;