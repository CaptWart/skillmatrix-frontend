import API from "../../utils/API";
import React, { useState, useEffect } from 'react';
import './style.css'
import ReactDOM from 'react-dom';
import Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const Skillcards = (props) => {

    console.log(props)

    const Wrap = ({ children }) => <div>{modal}</div>

    const [search, setSearch] = useState([''])
    const [skills, setSkills] = useState([''])
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState()
    const handleClose = () => setShow(false);
    
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
    }, [] )
    
    function change(evt){
        const skillInfo = skills.filter((info) => info.id.toString().match(`^${evt.currentTarget.id}$`))
        console.log(Object.values(skillInfo[0]))
        setModal(Object.values(skillInfo[0]))
    }

    function popupSkill(skillName){
        return (
            <>
            
            <div className="card" onClick={change} id={skillName.id}>
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
        const skill = async () => skills.map((skillName) => 
        popupSkill(skillName)
    )
    skill().then((dom) => ReactDOM.render(<div>{props.children}{dom}</div>, document.getElementById('skill')));
    }, [skills])

    useEffect(() => {
        if(skills != '')
        {
            const regexp = new RegExp(`${search.toString().toLowerCase()}.*`);        
            const res = skills.filter((skill) => skill.name.toLowerCase().match(regexp))
                const skill = async () => res.map((skillName) => 
                popupSkill(skillName)
                )
                skill().then((dom) => ReactDOM.render(<div>{props.children}{dom}</div>, document.getElementById('skill')));
        }
    }, [search]);

    useEffect(() => {
        console.log('hit')
    }, [modal])
    return(
        <div>
            <Wrap>{modal}</Wrap>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{width: "323px", margin: "20px"}}
            />
          <div id="skill">
          
          </div>
        </div>
    )
}

export default Skillcards;