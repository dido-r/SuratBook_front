import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { request } from '../../services/request';
import { Spinner } from '../Spinner/Spinner';

export function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { values, onChangeHandler } = useForm({

        email: '',
        pass: '',
        rememberMe: false
    });

    const onLoginSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);
        var result = await request('post', 'api/user/login', values);

        if (result.data === 'Successful login') {

            var isAdmin = await request('get', 'api/user/is-admin');
            isAdmin.data ? navigate("/admin", { state: isAdmin.data }) : navigate("/");

        } else {

            setError('Invalid credentials');
            setLoading(false);
        }
    }

    return (
        <>
            <div className={styles['login-body']}>
                <h2 className={styles['welcome-header']}>Welcome to SuratBook</h2>
                <div className={styles['border-wrap']}>
                    <div className={styles['login-container']}>
                        <h2 className={styles['login-header']}>Login</h2>
                        {error !== null ? <div className={styles['error-msg']}>
                            {error}
                        </div> : null}
                        <form className={styles['login-form']} onSubmit={(e) => onLoginSubmit(e)}>
                            <div><input className={styles['login-input']} required="required" type="email" placeholder="Email" name="email" value={values.email} onChange={(e) => onChangeHandler(e)} /></div>
                            <div><input className={styles['login-input']} required="required" type="password" placeholder="Password" name="pass" value={values.pass} onChange={(e) => onChangeHandler(e)} /></div>
                            <div>{loading ? <Spinner /> : <button type="submit">Sign in</button>}</div>
                        </form>
                        <footer>Don't have a SURAT? <Link className={styles['login-a']} to="/register">Sign up here</Link></footer>
                    </div>
                </div>
            </div>

        </>
    );
}