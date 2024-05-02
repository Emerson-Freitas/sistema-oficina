import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/useAuth';

interface Props {
    roles: string[],
    children: React.ReactNode
}

const PrivateRoutes = ({ roles, children }: Props) => {
    const { user } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (user === undefined) {
            navigate('/login', { replace: true })
        }
        if (user !== undefined) {
            const acceptedRole = roles.includes(user.role.name)
            if (acceptedRole === false ) {
                navigate("/access-denied", { replace: true })
            }
        }
    }, [navigate, user])

    return children
    
};

export default PrivateRoutes