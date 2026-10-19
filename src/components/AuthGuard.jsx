import { useEffect } from "react"
import {useUserStore} from "../store/useUserStore"
import { useNavigate } from "react-router-dom"

export const AuthGuard = ({children}) => {
    const {session} = useUserStore()
    const navigate = useNavigate()
    useEffect(()=>{
if (!session?.token) navigate ('/login')

    }, [])

    if (!session?.token) return <></>
return children

}