import React, { useState, useEffect } from "react";
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button';
import Skill from '../../components/Skill/skill'
import Userskillcards from "../../components/Userskills/userskill";
import API from "../../utils/API";
import ReactDOM from 'react-dom';
import Yourskill from "../../components/Yourskills/yourskill"
import './style.css'

const Yourskills = (props) => {
    const [addSkills, setAddSkills] = useState([])
    let currentSkills = []
    const loadSkill = async () => {
        const apiCall = await API.getUskills();
        const data = await apiCall.data;
        //const json = await data.json();
        return(data)
    };


    const filter = async () => await loadSkill().then((skillList) => {    
        const skill = async () => skillList.map((skill) => 
            popupSkill(skill)
            
        )
        skill().then((dom) => ReactDOM.render(<div>{dom}</div>, document.getElementById('userskill')));
        console.log(skillList)
    });



    function change(evt){
        if ( evt.currentTarget.style.boxShadow[0] != 'g'){
            evt.currentTarget.style.boxShadow = '0 3px 6px green, 0 3px 6px green'
            currentSkills.push(evt.currentTarget.id)
            setAddSkills(currentSkills)
        }
        else{
            evt.currentTarget.style.boxShadow = '0 3px 6px #999, 0 3px 6px #999'
            currentSkills = currentSkills.filter(item => item !== evt.currentTarget.id)
            setAddSkills(currentSkills)
        }
    }

    const removeSkill = (evt) => {
        addSkills.forEach((element) => 
        {  
            const data = {id: element}
            new API.delUserSkills(data)
        })
        window.location.reload();

    }

    useEffect(() => {
        filter()
        //console.log(skills)
    }, [])


    function popupSkill(data){

        let areaName;
        let skillName;
        const area = props.children[0];
        const skill = props.children[1];

        area.forEach((element) => {

            if (element.id === data.areaId){
                return areaName = element.name;
            }
        })
        skill.forEach((element) => {


            if (element.id === data.skillId){
                return skillName = element.name;
            }
        })

        return (
            <>
                        
                <div className="yourskills" onClick={change} id={data.id}>
                        <div className="content">
                            <ul>
                            <li key={data.skill}>
                                <strong>Skill:</strong> {skillName}
                                <br/>
                                <strong>Area:</strong> {areaName}

                            </li>
                            </ul>
                        </div>
                </div>
            </>
        )
    }

    return(
        <div>
            <h1>Your skills</h1>
            <Button onClick={removeSkill}>Remove</Button>
            <div id="userskill">

            </div>
        </div>

    )
}

export default Yourskills;