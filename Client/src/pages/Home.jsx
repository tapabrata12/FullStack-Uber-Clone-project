import { MoveRight } from 'lucide-react';
import trafficLightImg from '../assets/traffic-light.jpg';
import logo from "../assets/Logo.png";

const Home = () => {
    return (
        <div className='relative w-full h-screen flex flex-col justify-between'>
            {/* The best way to use the logo is inside an img tag within your h1 */}
            <h1 className='absolute top-0 left-0 w-full p-6'>
                <img className='w-16' src={logo} alt="Uber Logo" />
            </h1>
            <img className='h-full w-full object-cover' src={trafficLightImg} alt="Signal Light" />
            {/* Absolute makes it float. We also changed 'color-white' to Tailwind's 'text-white' */}
            <div className='h-[20%] bg-amber-100 absolute w-full flex flex-col justify-center items-center bottom-0 left-0 p-3 gap-3 text-white text-2xl font-bold'>
                <h1 className='text-2xl text-black'>Get started with Uber</h1>
                <button className='bg-black cursor-pointer font-bold flex justify-center items-center gap-5 text-white p-4 w-full rounded-lg active:scale-95'>Continue<MoveRight className='mt-1 flex justify-center items-center' /></button>
            </div>
        </div>
    )
}

export default Home;