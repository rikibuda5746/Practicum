import react from "react"
import { Button } from "../../../components"
import { useDispatch } from "react-redux"
import { actions } from "../../../redux/data/user"


export const Logout: React.FC = () => {
    const dispach=useDispatch()

    const handleLogout=()=>{
        dispach(actions.onLogout())
    }
    return(
    <Button onClick={()=>handleLogout()}>
        logout
    </Button>
    )
}