import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'

interface Props {
    roles: string[]
}

const PrivateRoutes = ({ roles }: Props) => {
    const { authenticated, user } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!user) {
        navigate("/login")
    }

    const userHasRequiredRole = user && roles.includes(user.role.name) ? true : false

    if(authenticated && !userHasRequiredRole) {
        navigate("/access-denied")
    }

    return <Outlet/>
}

export default PrivateRoutes