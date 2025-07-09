import React, { useEffect, useRef, useState } from 'react';

function Card(){
    let [wholeData, setWholeData] = useState([])
    let [data, setData] = useState([])

    let pagesize = 4
    let [page,setPage] = useState(0)
    let start = page * pagesize
    let end = start + pagesize

    useEffect(() => {
    fetch('https://api.github.com/users').then (response => {

        response.json().then(data => {
            console.log("Data fetched successfully: ",data)
            setWholeData(data)
            setData(data.slice(0, pagesize))
            setData(data)
        }).catch(error => {
            console.log("Error parsing JSON: ",error)
        })
    }).catch(error => {
        console.log("Error fetching data: ",error)
    })
    }, [])

    let inputRef = useRef()
    function handleSearch(event){
        event.preventDefault()
        console.log(inputRef)
        const query = inputRef.current.value.trim()
        data = data.filter(user => user.login.toLowerCase().includes(query.toLowerCase()))
        setData(data)
        inputRef.current.value = ''
    }

    return (
        <div>
            <h1>Github Users</h1>

            <form>
                <input type='text' placeholder='Search for a user' ref={inputRef}></input>
                <button onClick={handleSearch} type='submit'>Search</button>
            </form>
            {
                data.map((user,index) => (
                    <div key={index} className="card">
                        <img src={user.avatar_url} alt={user.login} style={{height:"200px", width:"300px"}}/>
                        <h2>{user.login}</h2>
                        <p>ID: {user.id}</p>
                        {/* <a href={user.url} target="_blank" rel='noopener noreferrer'>URL</a> */}
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
                    </div>
                ))
            }
        </div>
    )
}
export default Card