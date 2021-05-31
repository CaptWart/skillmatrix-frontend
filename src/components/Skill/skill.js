import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import API from "../../utils/API";
import { Form, Button } from 'react-bootstrap'
import './style.css'

const Skill = () => {
    const [inputList, setInputList] = useState([{ name: "", description: "" }]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { name: "", description: "" }]);
    };

    const handleAddskill = async () => {
        const data = inputList ;
        //console.log(data)
        data.forEach(element => API.addSkills(element))

        // new API.addSkills(data)
        // return window.location.reload();
    }

    return(
        <div id='addskill' >

            <Form >
            {inputList.map((x, i) => {
                return (
                <div className="box">
                    <input
                        name="name"
                        placeholder="Enter Name"
                        value={x.name}
                        onChange={e => handleInputChange(e, i)}
                    />
                    <input
                        className="ml10"
                        name="description"
                        placeholder="Enter Description"
                        value={x.description}
                        onChange={e => handleInputChange(e, i)}
                    />
                    <div className="btn-box">
                    {inputList.length !== 1 && <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}>Remove</button>}
                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                    </div>
                </div>
                );
            })}
            </Form>
            <Button onClick={handleAddskill}> Add New Skill </Button>
        </div>
    )
}

export default Skill;