import React, { useState, useEffect } from "react";
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import ReactDOM from 'react-dom';
import Skill from '../../components/Skill/skill'
import Area from '../../components/Addarea/addarea'
import API from "../../utils/API";
import './style.css'

function Admin(){

    const [showskill, setShowskill] = useState(false);
    const [showarea, setShowarea] = useState(false);
    const [modal, setModal] = useState([{}])
    const handleSkillClose = () => setShowskill(false);
    const handleAreaClose = () => setShowarea(false);
    const [area, setArea] = useState()
    const [skills, setSkills] = useState()

    function addSkill(){
        setShowskill(true)
    }

    function addArea(){
        setShowarea(true)
    }
    console.log(skills)

    function removeSkill(e){
        new API.delSkill({id: e.currentTarget.parentElement.parentElement.value}); 
    }
    function removeArea(e){
        new API.delArea({id: e.currentTarget.parentElement.parentElement.value}); 
    }

    useEffect(() => {

        async function getAreas() {
            const areas = await API.getAllAreas()
            // const skills = await API.getAllSkills()
            //const json = await areas.json()
            
            setArea(areas.data)
            // setSkills(skills.data)
        }
        getAreas()

        async function getSkills() {
            const skills = await API.getAllSkills()

            setSkills(skills.data)
        }
        getSkills()


        
    }, [] )


    useEffect(() => {
        console.log(skills)
        if (!area){
            console.log('nada')
        }
        else{
            console.log('yeet')
            function ListAreas(){
                return(
                    <>
                    <h1>Areas</h1>
                        <ul>
                            <div>{area.map((names) => <li value={names.id} key={names.id}>
                                
                                <div style={{float: "left", width: "50%"}} value={names.id} >{names.name}</div>
                                <div><span onClick={removeArea} className="button">-</span></div>

                                
                                </li> )}</div>
                        </ul>    
                    </>
                )
            }
            ReactDOM.render(<ListAreas />, document.getElementById('areaList'))
        }
       
    }, [area])


    useEffect(() => {
        console.log(skills)
        if (!skills){
            console.log('nada')
        }
        else{
            console.log('yeet')
            function ListSkills(){
                return(
                    <>
                    <h1>Skills</h1>
                    <ul>
                        <div>{skills.map((names) => <li value={names.id} key={names.id}>
                            <div style={{float: "left", width: "50%"}} value={names.id}>{names.name}</div>  
                            
                            <div><span onClick={removeSkill} className="button">-</span></div>
                            
                            

                            </li> )}</div>
                    </ul>    
                    </>
                )
            }
            ReactDOM.render(<ListSkills />, document.getElementById('skillList'))
        }
       
    }, [skills])

    useEffect(() => {
        function Popup(){
        return (
            <>
                <Modal show={showskill} onHide={handleSkillClose}>
                <Skill/>
                </Modal>
            </>
        )
    }
    ReactDOM.render(<Popup />, document.getElementById('skill'))
    },[showskill])

    useEffect(() => {
        function Popup(){
        return (
            <>
                
                <Modal show={showarea} onHide={handleAreaClose}>
                <Area/>
                </Modal>
            </>
        )
    }
    ReactDOM.render(<Popup />, document.getElementById('area'))
    },[showarea])

    return(
        <div>
            <Header/>
            <h1>This Admin page</h1>

            <div id="skill">

            </div>
            
            <div id="area">

            </div>
            
            <div className="adminTable">
                <div id="areaList"></div>
                <Button onClick={addArea}>Add Area</Button>
            </div>
            <div className="adminTable">
                <div id="skillList"> </div>
                <Button onClick={addSkill}>Add Skill</Button>
            </div>
            <Footer/>
        </div>
    )
}

export default Admin;