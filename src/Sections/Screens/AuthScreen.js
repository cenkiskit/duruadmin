import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ActionCreators } from '../Redux/InitialRedux';

export default function AuthScreen() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _setEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    const _setPassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const _login = () => {
        dispatch(ActionCreators.signIn({
            email: email,
            password: password
        }))
    }

    return (
        <div style={{
            flex: 1,
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingTop: 100,
            height: '100%',
            width: '100%',
            flexDirection: 'column'
        }}>
            <img src={require('../../Assets/duruadmin-logo.png')}
                style={{
                    width: 250,
                    height: 130,
                    marginBottom: 20
                }} />
            <Form style={{
                width: 300
            }}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="E-posta"
                    className="mb-3"
                    onChange={_setEmail}
                >
                    <Form.Control type="email" placeholder="isim@örnek.com" />
                </FloatingLabel>
                <FloatingLabel onChange={_setPassword} controlId="floatingPassword" label="Şifre">
                    <Form.Control type="password" placeholder="Şifre" />
                </FloatingLabel>
            </Form>
            <div onClick={_login} style={{
                width: 200,
                borderRadius: 10,
                height: 50,
                backgroundColor: 'rgb(59, 183, 126)',
                color: 'white',
                fontSize: 20,
                marginTop: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                Giriş
            </div>
        </div>
    )
}
