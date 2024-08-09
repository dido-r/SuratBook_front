import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { request } from '../../services/request';
import { Spinner } from '../Spinner/Spinner';

export function Register() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { values, onChangeHandler } = useForm({
        firstName: '',
        lastName: '',
        birthDate: 'Date of birth',
        email: '',
        pass: '',
        rePass: '',
    });

    const onRegisterSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);

        if (values.pass !== values.rePass) {

            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        let result = await request('post', 'api/user/register', values);

        if (result.name === "AxiosError") {
            console.log(result)
            setError(`${result.response.data.message}`);
            setLoading(false);
            
        } else {

            navigate("/")
        }
    }

    return (
        <div className={styles['login-body']}>
            <h2 className={styles['welcome-header']}>Welcome to SuratBook</h2>
            <div className={styles['border-wrap']}>
                <div className={styles['login-container']}>
                    <h2 className={styles['login-header']}>Register</h2>
                    <h2 className={styles['login-header']}>Login</h2>
                    {error !== null ? <div className={styles['error-msg']}>
                        {error}
                    </div> : null}
                    <form className={styles['login-form']} onSubmit={(e) => onRegisterSubmit(e)}>
                        <div><input className={styles['login-input']} type="text" placeholder="First name" name="firstName" required="required" value={values.firstName} onChange={(e) => onChangeHandler(e)} /></div>
                        <div><input className={styles['login-input']} type="text" placeholder="Last name" name="lastName" required="required" value={values.lastName} onChange={(e) => onChangeHandler(e)} /></div>
                        <div><input className={styles['login-input']} type="email" placeholder="Email" name="email" required="required" value={values.email} onChange={(e) => onChangeHandler(e)} /></div>
                        <div><input className={styles['login-input']} type="date" placeholder={values.birthDate} name="birthDate" required="required" value={values.birthDate} onChange={(e) => onChangeHandler(e)} /></div>
                        <div><input className={styles['login-input']} type="password" placeholder="Password" name="pass" required="required" value={values.pass} onChange={(e) => onChangeHandler(e)} /></div>
                        <div><input className={styles['login-input']} type="password" placeholder="Repeat password" name="rePass" required="required" value={values.rePass} onChange={(e) => onChangeHandler(e)} /></div>
                        <div>{loading ? <Spinner /> : <button type="submit">Sign up</button>}</div>
                    </form>
                    <footer>Already have a SURAT? <Link className={styles['login-a']} to="/login">Sign in here</Link></footer>
                </div>
            </div>
        </div>
    );
}