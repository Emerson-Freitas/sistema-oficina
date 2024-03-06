import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'

interface Props {
    roles: string[]
}

const PrivateRoutes = ({ roles }: Props) => {
    const { user } = useContext(AuthContext)
    const [userHasRequiredRole, setUserHasRequiredRole] = useState<boolean>(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.role.name) {
            navigate("/login")
        }
        if (user && roles.includes(user.role.name)) {
            setUserHasRequiredRole(true)
        }
    }, [user])

    if(user && !userHasRequiredRole) {
        navigate("/access-denied")
    } else {
        return <Outlet/>
    }
    
}

export default PrivateRoutes