import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
      }
    }, []);

    return <Component {...props} />;
  };
}
