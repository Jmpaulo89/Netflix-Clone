import Input from '../Components/input'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn} from 'next-auth/react';
import { useRouter, NextRouter } from 'next/router'

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    const router: NextRouter = useRouter();
    const [email,setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [varient, setVarient] = useState('login');

    const toggleVarient = useCallback(()=> {
        setVarient((currentVarient) => currentVarient === 'login' ? 'register' : 'login');
      }, [])
      
      const login = useCallback(async() => {
          try{
              await signIn('credentials', {
                  email,
                  password,
                  redirect: false,
                  callbackUrl: '/'
              });
  
              router.push('/');
          } catch(error){
              console.log(error);
          }
      }, [email, password, router])

    const register = useCallback(async() => {
        try{
            await axios.post('/api/register', {
                email,
                name,
                password,
            });
            login();
        } catch(error){
            console.log(error);
        }
    }, [email, name, password]);


  return (
    <div className="relative 
    h-full w-full 
    bg-[url('/images/hero.jpg')]
    bg-no-repeat
    bg-center
    bg-fixed
    bg-cover">
        <div className='bg-black w-full h-full md:bg-opacity-40'>
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="Logo" className="h-12"/>
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        {varient === 'login' ? 'Sign in' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {varient === 'register' && (
                        <Input
                        label='Username'
                        onChange={(e: any)=> setName(e.target.value)}
                        id='name'
                        value={name}
                        />
                        )}
                        <Input
                        label='Email'
                        onChange={(e: any)=> setEmail(e.target.value)}
                        id='email'
                        type='email'
                        value={email}
                        />
                        <Input
                        label='Password'
                        onChange={(e: any)=> setPassword(e.target.value)}
                        id='password'
                        type='password'
                        value={password}
                        />
                    </div>
                    
                    <button onClick={varient === 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
                    >
                        {varient === 'login' ? 'login' : 'Sign up'}
                    </button>
                    <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                        <div
                        
                        onClick={() => signIn('google', {callbackUrl: '/'})}
                        className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                        '
                        >
                        <FcGoogle size={30}/>    
                        </div>
                        
                        <div
                        onClick={() => signIn('github', {callbackUrl: '/'})}
                        className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover:opacity-80
                        transition
                        '
                        >
                        <FaGithub size={30}/>    
                        </div>
                    </div>
                    <p className='text-neutral-500 mt-12'>
                        {varient === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                        <span onClick={toggleVarient} className='text-white ml-1 hover:underline cursor-pointer'
                        >{varient === 'login' ? 'Create an account' : 'Login'}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth