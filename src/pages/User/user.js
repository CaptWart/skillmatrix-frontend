import React, { useState, useEffect } from "react";
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import API from "../../utils/API";
import ReactDOM from 'react-dom';
import Yourskill from "../../components/Yourskills/yourskill"
import { Form, Button } from 'react-bootstrap'
import Addas from "../../components/Addas/addas"
import './style.css'

function User(props){
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState([''])
    const [skills, setSkills] = useState()

    const [area, setArea] = useState()

 
    // handle input change
   
    // handle click event of the Add button
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const handleLogout = (evt) => {
        fetch('http://localhost:3001/logout', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include'
          })
            .then(response => {
                window.location.href = "/login";
            })
    }


    React.useEffect(function effectFunction() {
        async function fetchUser() {
            const response = await fetch('http://localhost:3001/user', { method: "GET", credentials: 'include' })
            if(!response || response.status === 500 || response.status === 401){
                window.location.href = "/login";
            }
            else{
                const json = await response.json();
                setUser(json)
            }
        }
        fetchUser()



    }, []);

    // useEffect(() => {
        
    // }, [user.id]); 

    useEffect(() => {
        
    }, [area]); 


    const loadSkill = async () => {
        async function getAreas() {
            const areas = await API.getAllAreas()
            //const json = await areas.json()
            
            setArea(areas.data)
        }
        await getAreas();

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
    

    useEffect(() => {
        if(skills)
        {
            const regexp = new RegExp(`${search.toString().toLowerCase()}.*`);        
            const res = skills.filter((skill) => skill.name.toLowerCase().match(regexp))
                const skill = async () => res.map((skillName) => 
                popupSkill(skillName)
                )
                skill().then((dom) => ReactDOM.render(<div>{props.children}{dom}</div>, document.getElementById('skill')));
        }
    }, [search]);

    function popupSkill(skillName){
        

        return (
            <>
            
            <div key={skillName.id} className="skillCard" id={skillName.id}>
            <strong>Name:</strong> {skillName.name}
                <div className="addAreaSkill">

                <div id='getAreas'>
                    <Addas>{area}</Addas>
                </div>
                </div>
                    <div className="content">
                            <strong>Description:</strong> {skillName.description}

                    </div>
            </div>
            </>
        )
    }
      
    useEffect(() => {
        if ( area ){
            const skill = async () => skills.map((skillName) => 
            popupSkill(skillName))
    
            skill().then((dom) => ReactDOM.render(<div>{props.children}{dom}</div>, document.getElementById('skill')));
        }

    }, [skills])
    
    return(
        <div>
            <Header/>
            <p>Hello your user is {user.id}. Your ID is {user.userid} If you see this message then you have successfully logged in</p>
            <Button onClick={handleLogout}> Logout </Button>
            
            {area && skills &&
                <Yourskill>{area}{skills}</Yourskill>
            }

            <div>
                <h1>Skills</h1>
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
            <Footer/>
        </div>
    )
}

export default User;