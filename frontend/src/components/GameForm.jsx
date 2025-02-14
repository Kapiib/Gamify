import {useState} from "react";
import axios from "axios";

export default function GameForm() {
    const [gameForm, setGameForm] = useState({
        title: '',
        shortDescription: '',
        description: '',
        publisher: '',
        developer: '',
        price: 0,
        discount: 0,
        status: '',
        releaseDate: Date.now(),
        tags: '',
        img: '',
    });

    const [msg, setMsg] = useState();


    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/games/`, gameForm, {withCredentials: true})
        .then((respone) => {
            console.log(respone.data);
            setMsg(respone.data.msg);
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        })
    }

    function handleChange(e) {
        const {id, value} = e.target;
        console.log(id, value);

        setGameForm((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    return (
        <div className="gameForm">
            <form onSubmit={handleSubmit}>
                <input type="text" id="title" placeholder="title" onChange={handleChange}/>
                <input type="text" id="shortDescription" placeholder="short description" onChange={handleChange}/>
                <textarea id="desc" placceholder="description" onChange={handleChange}/>
                <input type="text" id="publisher" placeholder="publisher" onChange={handleChange}/>
                <input type="text" id="developer" placeholder="developer" onChange={handleChange}/>
                <input type="number" id="price" placeholder="price" onChange={handleChange}/>
                <input type="number" id="discount" placeholder="discount" onChange={handleChange}/>
                <select id="status" onChange={handleChange}>
                    <option value="" id="notReleased">Not released</option>
                    <option value="" id="preOrder" >Pre-order</option>
                    <option value="" id="released">Released</option>
                </select>
                <input type="date" id="releaseDate" min={Date.now()} onChange={handleChange}/>
                <input type="text" id="tags" placeholder="tags" onChange={handleChange}/>
                <input type="file" id="img" onChange={handleChange}/>
                <button type="sumbit">Create game</button>
            </form>

            {msg? <div>{msg}</div>:<div></div>}
        </div>
    )
}