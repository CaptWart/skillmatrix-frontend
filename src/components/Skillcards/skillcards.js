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

const Skillcards = (props) => {

    const [search, setSearch] = useState([''])
    const [skills, setSkills] = useState([''])
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState([{}])
    const handleClose = () => setShow(false);
    const [userSkills, setUserSkills] = useState()

    const [area, setArea] = useState()

    const allUsers = props.children;
    console.log(allUsers)

    const loadSkill = async () => {
        const apiCall = await API.getAllSkills();
        const data = await apiCall.data;
        return(data);
    };

    const filter = async () => await loadSkill().then((skillList) => {
        const regexp = new RegExp(`${search.toString().toLowerCase()}.*`);        
        const res = skillList.filter((skill) => skill.name.toLowerCase().match(regexp))
        setSkills(res)
    });
    

    useEffect(() => {
        filter()

        async function getAreas() {
            const areas = await API.getAllAreas()
            //const json = await areas.json()
            setArea(areas.data)
        }
        getAreas()

        async function getAllUserSkills(){
            const allUserSkills = await API.getAllUserSkills()
            setUserSkills(allUserSkills.data)
        }
        getAllUserSkills()
        //setUserSkills(new API.getAllUserSkills())
    }, [] )
    //May need to change it here to get the users
    async function change(evt){
        const skillInfo = skills.filter((info) => info.id.toString().match(`^${evt.currentTarget.id}$`))
        setModal(skillInfo)
        console.log(skillInfo[0].id)
        
        setShow(true)
    }

    function popupSkill(skillName){
        return (
            <>
            <div className="skillCard" key={skillName.id} onClick={change} id={skillName.id}>
                <div className="img-container">
                    image
                </div>
                    <div className="content">
                        <ul>
                        <li key={skillName.id}>
                            <strong>Name:</strong> {skillName.name}
                        </li>
                        <li key={skillName.name}>
                            <strong>Description:</strong> {skillName.description}
                        </li>
                        </ul>
                    </div>
            </div>
            </>
        )
    }
      
    useEffect(() => {
        const skill = async () => skills.map((skillName) => popupSkill(skillName))
        skill().then((dom) => ReactDOM.render(<div>{dom}</div>, document.getElementById('skill')));
    }, [skills])

    useEffect(() => {
        if(skills != '')
        {
            const regexp = new RegExp(`${search.toString().toLowerCase()}.*`);        
            const res = skills.filter((skill) => skill.name.toLowerCase().match(regexp))
                const skill = async () => res.map((skillName) => 
                popupSkill(skillName)
                )
                skill().then((dom) => ReactDOM.render(<div>{dom}</div>, document.getElementById('skill')));
        }
    }, [search]);

    function popup() {
        return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{modal[0].name}</Modal.Title>
                
                </Modal.Header>
                <Accordion>
                    { area.map((area) => {

                        function filterByName(name){
                            if (name.areaId === area.id && modal[0].id === name.skillId){
                                return true
                            }
                            return false;
                        }
                        const numOfArea = userSkills.filter(filterByName);
                        console.log(numOfArea)
                        return (
                            <Card key={area.id}>
                                <Accordion.Toggle as={Card.Header} eventKey={area.id}>
                                    {area.name} {numOfArea.length}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={area.id}>
                                    <Card.Body>
                                        { numOfArea.map((users) => {
                                            function findEmployeeId(id){
                                                console.log(id)
                                                console.log(allUsers)
                                                if (id.id === users.userId){
                                                    console.log('hit')
                                                    return true
                                                }
                                                return false
                                            }
                                            const employeeId = allUsers.filter(findEmployeeId)[0]
                                            console.log(employeeId)
                                            return ( <p  key={users.username}>{employeeId.employeeid} {employeeId.phone} {users.level}</p> ) 

                                        }
                                    )}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    }) }
                </Accordion>
                <Modal.Body>{modal[0].description}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
        )
    }


    useEffect(() => {
        
        if ( userSkills ){
            const popupModal = async () => popup();
            popupModal().then((dom) => ReactDOM.render(<div>{dom}</div>, document.getElementById('modal')))
            console.log(userSkills)
        }
        
    },[show])


    return(
        <div>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{width: "323px", margin: "20px"}}
            />
          <div id="skill">
          
          </div>
          <div id="modal">
            </div>
        </div>
    )
}

export default Skillcards;