import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

export function Login() {

    const navigate = useNavigate();

    const { values, onChangeHandler } = useForm({
        
        email: '',
        pass: '',
        rememberMe: false
    });

    const onLoginSubmit = async (e) => {
        
        e.preventDefault();

        try{

            await axios.post("https://localhost:7062/api/login", values,
            {
                withCredentials : true,
            });
            navigate("/")

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className={styles['login-body']}>
            <h2 className={styles['welcome-header']}>Welcome to SuratBook</h2>
            <div className={styles['border-wrap']}>
                <div className={styles['login-container']}>
                    <h2 className={styles['login-header']}>Login</h2>
                    <form className={styles['login-form']} onSubmit={(e) => onLoginSubmit(e)}>
                        <div><input className={styles['login-input']} type="email" placeholder="Email" name="email" value={values.email} onChange={(e) => onChangeHandler(e)}/></div>
                        <div><input className={styles['login-input']} type="password" placeholder="Password" name="pass" value={values.pass} onChange={(e) => onChangeHandler(e)}/></div>
                        <div><input className={styles['login-remember']} id='remember' type="checkbox" name="rememberMe" value={values.rememberMe} onChange={(e) => onChangeHandler(e)}/><label htmlFor='remember'>Remember me</label></div>
                        <div><button type="submit">Sign in</button></div>
                    </form>
                    <footer>Don't have a SURAT? <Link className={styles['login-a']} to="/register">Sign up here</Link></footer>
                </div>
            </div>
        </div>
    );
}