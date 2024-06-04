'use client'
import { register } from '@/helpers/auth.helper'
import { validateRegisterForm } from '@/helpers/formValidation'
import { RegisterErrorProps, RegisterProps } from '@/types'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = useRouter();
    const [dataUser, setDataUser] = useState<RegisterProps>({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "", 
    })
    const [errorUser, setErrorUser] = useState<RegisterErrorProps>({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "", 
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
        await register(dataUser);
        // REDIRIGIR AL USUARIO
        // INFORMAR DE EL RESULTADO DE LA OPERACIÓN
        alert("You have successfully registered")
        router.push("/login")
       } catch (error: any) {
        throw new Error(error)
       }
    }

    useEffect(() => {
        const errors = validateRegisterForm(dataUser)
        setErrorUser(errors)
    }, [dataUser])


  return (
    <div>
        <div>
            <h2>
                Register to T-STORE
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
                <label htmlFor='name'>Name</label>
                <input 
                    id="name"
                    name="name"  
                    type='text'
                    value={dataUser.name}
                    required 
                    onChange={handleChange}
                    placeholder='John Doe'
                />
                {errorUser.name && <p>{errorUser.name}</p>}
            </div>

            <div>
                <label htmlFor='address'>Address</label>
                <input 
                    id="address"
                    name="address"  
                    type='text'
                    value={dataUser.address}
                    required 
                    onChange={handleChange}
                    placeholder='Posadas, M4 G5'
                />
                {errorUser.address && <p>{errorUser.address}</p>}
            </div>

            <div>
                <label htmlFor='phone'>Phone</label>
                <input 
                    id="phone"
                    name="phone"  
                    type='text'
                    value={dataUser.phone}
                    required 
                    onChange={handleChange}
                    placeholder='011 232323'
                />
                {errorUser.phone && <p>{errorUser.phone}</p>}
            </div>


            <div>
                <button type='submit'>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register;