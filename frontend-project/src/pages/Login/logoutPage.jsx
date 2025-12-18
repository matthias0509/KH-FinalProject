import * as AuthService from './LoginService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
        navigate('/');
    }, [navigate]);

    return null;
}
