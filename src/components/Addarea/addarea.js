import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import API from "../../utils/API";
import { Form, Button } from 'react-bootstrap'
import './style.css'

const Addarea = () => {



    const [inputList, setInputList] = useState([{ name: "" }]);
 
    const handleAddarea = async () => {
        const data = {inputList} ;
        data.inputList.forEach(element => new API.addArea(element))
        // new API.addArea(data)
        // return window.location.reload();
    }

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
        setInputList([...inputList, { name: "" }]);
    };

    return(
        <div id='addskill' >

            <Form >
                {inputList.map((x, i) => {
                    return (
                        <div className="box">
                            <input
                                name="name"
                                placeholder="Name"
                                value={x.firstName}
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

            
                    

            <Button onClick={handleAddarea}> Add New Area </Button>
        </div>
    )
}

export default Addarea;