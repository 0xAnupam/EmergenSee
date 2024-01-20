import { useContext, useEffect } from 'react';
import AuthContext from '@/store/AuthContext';
import { useRouter } from 'next/router';

const LoginRoute = (Component) => {

    const LoginWrapper = (props) => {
        const authCtx = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (authCtx.isAuthenticated) {     // Redirect to the dashboard page if authenticated
                router.push('/dashboard');
            }
        }, [authCtx.isAuthenticated, router]);
        

        if(authCtx.isAuthenticated) return "";
        return <Component {...props}/>;
    };

    if (Component.getInitialProps) {
        LoginWrapper.getInitialProps = Component.getInitialProps;
    }

    return LoginWrapper;
};

export default LoginRoute;