'use client'
import { useAuth } from '@/context/AuthContext'
import { login } from '@/helpers/auth.helper'
import { validateLoginForm } from '@/helpers/formValidation'
import { LoginErrorProps, LoginProps } from '@/types'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const Login = () => {
    const router = useRouter();
    const {userData, setUserData} = useAuth();
    const [dataUser, setDataUser] = useState<LoginProps>({
        email: "",
        password: "",
    })
    const [errorUser, setErrorUser] = useState<LoginErrorProps>({
        email: "",
        password: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
           try {
            const response = await login(dataUser);
            const {token, user} = response;
            // GUARDAR LA INFORMACIÓN DEL USUARIO, DE FORMA, PERSISTENTE
            // REDIRIGIR AL USUARIO
            // INFORMAR DE EL RESULTADO DE LA OPERACIÓN
            setUserData({token, userData: user})
            alert("You have successfully login")
            router.push("/")
           } catch (error: any) {
            throw new Error(error)
           }
    }

    useEffect(() => {
        const errors = validateLoginForm(dataUser)
        setErrorUser(errors)
    }, [dataUser])

  return (
    <div>
        <div>
            <h2>
                Sign in to T-STORE
            </h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email-address'>Email</label>
                <input 
                    id="email-address"
                    name="email"  
                    type='email'
                    value={dataUser.email}
                    required 
                    onChange={handleChange}
                    placeholder='example@gmail.com'
                />
                {errorUser.email && <p>{errorUser.email}</p>}
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    id="password"
                    name="password"  
                    type='password'
                    value={dataUser.password}
                    required 
                    onChange={handleChange}
                    placeholder='**********'
                />
                {errorUser.password && <p>{errorUser.password}</p>}
            </div>

            <div>
                <button type='submit'>Sign in</button>
            </div>

            <div>
               <p>Are you not registered yet?</p>
               <p>Register</p>
            </div>
        </form>
    </div>
  )
}

export default Login;