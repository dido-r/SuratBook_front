import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export function Register() {

    return (
        <div className={styles['login-body']}>
            <h2 className={styles['welcome-header']}>Welcome to SuratBook</h2>
            <div className={styles['border-wrap']}>
                <div className={styles['login-container']}>
                    <h2 className={styles['login-header']}>Register</h2>
                    <form className={styles['login-form']}>
                        <div><input type="text" placeholder="First name" name="firstName" /></div>
                        <div><input type="text" placeholder="Last name" name="lastName" /></div>
                        <div><input type="email" placeholder="Email" name="email" /></div>
                        <div><input type="date" placeholder="Date of birth" name="birthDate" onFocus={() => this.type = 'date'} /></div>
                        <div><input type="password" placeholder="Password" name="password" /></div>
                        <div><input type="password" placeholder="Repeat password" name="rePassword" /></div>
                        <div><button type="submit">Sign up</button></div>
                    </form>
                    <footer>Already have a SURAT? <Link className={styles['login-a']} to="/login">Sign in here</Link></footer>
                </div>
            </div>
        </div>
    );
}