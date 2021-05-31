import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const handleLogin = (evt) => {
        const data = {username, password} ;

        fetch('http://localhost:3001/login', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: headers,
            body: JSON.stringify(data)
          })
            .then(response => {
              window.location.href="/user"
            })
    }

    return(
        <div>
            <Header/>
            <h1>This is login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br></br>
            <Button onClick={handleLogin}> Login </Button>
            <Footer/>
        </div>
    )
}

export default Login;