import {useContext} from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Profile() {
    const {user} = useContext(AuthContext);
    
    if (!user) {
        return <div>Loading...</div>;
    }
    
    console.log(user.email);
    
    return (
        <div>
            <h1>Welcome to your profile, {user.email}</h1>
        </div>
    )
}