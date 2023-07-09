import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export function Login() {

    return (
        <div className={styles['login-body']}>
            <h2 className={styles['welcome-header']}>Welcome to SuratBook</h2>
            <div className={styles['border-wrap']}>
                <div className={styles['login-container']}>
                    <h2 className={styles['login-header']}>Login</h2>
                    <form className={styles['login-form']}>
                        <div><input type="email" placeholder="Email" name="email" /></div>
                        <div><input type="password" placeholder="Password" name="password"/></div>
                        <div><button type="submit">Sign in</button></div>
                    </form>
                    <footer>Don't have a SURAT? <Link className={styles['login-a']} to="/register">Sign up here</Link></footer>
                </div>
            </div>
        </div>
    );
}