import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import AccessDenied from '../pages/errors/AccessDenied'

interface Props {
    roles: string[]
}

const PrivateRoutes = ({ roles }: Props) => {
    const { authenticated, user } = useContext(AuthContext)
    
    const userHasRequiredRole = user && roles.includes(user.role.name) ? true : false

    if(authenticated && !userHasRequiredRole) {
        return <AccessDenied/>
    }

    return (
        <Outlet/>
    )
}

export default PrivateRoutes