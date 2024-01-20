import { useContext, useEffect } from 'react';
import AuthContext from '@/store/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = (Component) => {

    const Auth = (props) => {
        const authCtx = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (!authCtx.isAuthenticated) {     // Redirect to the login page if not authenticated
                router.push('/login');
            }
        }, [authCtx.isAuthenticated, router]);
        

        if(!authCtx.isAuthenticated) return "";
        return <Component {...props}/>;
    };

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
};

export default ProtectedRoute;