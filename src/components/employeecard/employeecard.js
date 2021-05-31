import API from "../../utils/API";
import React, { useState, useEffect } from 'react';
import './style.css'
import ReactDOM from 'react-dom';
import Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import NavLink from 'react-bootstrap/NavLink'
import NavItem from 'react-bootstrap/NavItem'
import Accordion from 'react-bootstrap/Accordion'
import Modals from '../Modal/modal'
import Card from 'react-bootstrap/Card'

const EmployeeCards = (props) => {
    const [skills, setSkills] = useState([''])
    const [area, setArea] = useState()

    console.log(props.children)

    useEffect(() => {

        async function getAreas() {
            const areas = await API.getAllAreas()
            //const json = await areas.json()
            setArea(areas.data)

            async function getSkills(){
                const allSkills = await API.getSkillUserSkill()
                setSkills(allSkills.data)
            }
            getSkills()

        }
        getAreas()
    }, [] )

    function employeeSkills(user){
        let userData = skills;
        let userSkills = []
        skills.forEach(element => {
            if ( element.userskills.filter(skill => skill.userId === user.id).length > 0 ) {
                const arrays = element.userskills.filter(skill => skill.userId === user.id);

                arrays.forEach(element => {
                    //console.log(element)
                    userSkills = [...userSkills, element]
                    // userData.forEach((e, index, ) => {
                    //     //console.log(element)
                    //     userData[index].userskills = [...userData[index].userskills, element]
                    //     // userData.userskills[index].skillId = skills.filter(skill => e.skillId === skill.id)[0].name;
                    //     // userData.userskills[index].areaId = area.filter(areaName =>  e.areaId === areaName.id)[0].name;
                    //     })
                    // // userData.userskills = [...userData.userskills, element]
                })

            }
        })
        console.log(userSkills)
        // const skillList = [{skillname: '', username: '', areaname: '', }]
        console.log(userData)
        return (
            <>
            <Accordion.Toggle as={Card.Header} eventKey={user.id}>
                {user.name} 
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={user.id}>
                <Card.Body>
                    {skills.map((userskill) => {
                       const items = userSkills.filter(e => userskill.id === e.skillId)
                        items.forEach((e, index) => {
                            items[index].skillId = skills.filter(skill => e.skillId === skill.id)[0].name;
                            items[index].areaId = area.filter(areaName =>  e.areaId === areaName.id)[0].name;

                        })
                        return (
                        <div>
                            {items.length > 0 &&
                            <Accordion>
                                <Accordion.Toggle as={Card.Header} eventKey={userskill.id}>
                                    {userskill.name} 
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={userskill.id}>
                                    <Card.Body>
                                    
                                       { items.map((e) => 
                                        <div>{e.areaId} {e.level} </div>
                                        )
}
                                    
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Accordion>
                            }
                            
                        </div>
                        )
                    })}
                </Card.Body>
            </Accordion.Collapse>
            </>
        )
    }

    useEffect(() => {
        if (props.children){
            const createCard = async () => props.children.map((users) => employeeSkills(users))
            createCard().then((dom) => ReactDOM.render(<div><Accordion>{dom}</Accordion></div>, document.getElementById('employeeSkills')));    
        }
    }, [skills])

    return (
        <div id="employeeSkills">

        </div>
    )

}

export default EmployeeCards;