import whiteLogo from '../assets/Logo3.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserdetails] = useState({});
  function submitHadelar(e) {
    e.preventDefault();
    setUserdetails({
      email: email,
      password: password
    });
    console.log(userDetails);

    setEmail('');
    setPassword('');
  }

  return (
    <div className='w-full h-screen flex flex-col'>
      <nav className='bg-black h-[12%] w-full overflow-hidden pl-5 mb-10'>
        <img className='w-20 pb-5' src={whiteLogo} alt="Logo" />
      </nav>

      <form className='flex flex-col gap-5 p-5' onSubmit={(e) => { submitHadelar(e) }}>
        <label className='text-xl font-medium' htmlFor="email">Enter your email address</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] w-full text-xl px-4 py-2 rounded-lg ' required type="email" placeholder='email@email.com' />
        <label className='text-xl font-medium' htmlFor="password">Enter your password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='bg-[#eeeeee] w-full text-xl px-4 py-2 rounded-lg' required type="password" placeholder='myPass@134' />
        <input className='bg-[#111] w-full text-xl text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95' type="submit" value={"Login"} />

      </form>
      <p className='pl-5 pr-5 w-full flex justify-center gap-2 tracking-wide'>
        New to Uber? <Link to={"/user-signup"} className='text-blue-400 no-underline hover:underline'>Create an account</Link>
      </p>
    </div>
  )
}

export default UserLogin