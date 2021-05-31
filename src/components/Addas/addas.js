import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import API from "../../utils/API";
import { Form, Button } from 'react-bootstrap'


const Skill = (props) => {
    const [inputList, setInputList] = useState([{ areaId: "", level: "", skillId: "" }]);


    const handleInputChange = (e, index) => {
        const skillId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        const { name, value } = e.target;
        const list = [...inputList];

        if (name === "areaId") {
            props.children.forEach(element => {
                if (element.name === value ){
                    return list[index][name] = element.id;
                }
            });
        }

        else{
            list[index][name] = value;
        }

        list[index].skillId = skillId;
        console.log(list)

        setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = (e, index)=> {
        e.preventDefault()
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { areaId: "", level: "", skillId: "" }]);
    };

    const addSkill = (evt) => {

        new API.addUserSkills(inputList);
        window.location.reload();
    }

    return(
        <div id='addskill' >

            <Form >
                {inputList.map((x, i) => {
                    return (
                    <div className="box">

                        <select name="areaId" onChange={e => handleInputChange(e,i)}>
                            <option value="Choose area">Choose an area</option>
                            {props.children && 
                                props.children.map((names) => <option value={names.name}>{names.name}</option> )
                            }
                        </select>
                        <br/>   
                        <select name="level" onChange={e => handleInputChange(e,i)}>
                            <option value="level">Choose a level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <div className="btn-box">
                        {inputList.length !== 1 && <button
                            className="mr10"
                            onClick={(e) => handleRemoveClick(e,i)}>Remove</button>}
                        {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    </div>
                    );
                })}
                <Button onClick={e => addSkill(e)}> Add New Skill </Button>
            </Form>
        </div>
    )
}

export default Skill;