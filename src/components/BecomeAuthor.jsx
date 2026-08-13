import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function BecomeAuthor(){
    const {isAuthor, setIsAuthor} = useContext(AuthContext);
    const navigate = useNavigate();
    if(isAuthor){ return alert("You are already an author")};

    async function handleClick(){
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8000/auth/become-author', {
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
        });

        const data = await response.json();
        if(!response.ok){
            console.log(data.message);
        }
        console.log(data);
        setIsAuthor(true);
        navigate('/');
    }
    return(
        <>
        <button onClick={handleClick}>Become an Author</button>
        </>
    );

}

export default BecomeAuthor;