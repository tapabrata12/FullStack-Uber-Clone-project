import whiteLogo from '../assets/Logo2.png';
import { MoveRight } from 'lucide-react';
import {Link} from "react-router-dom";

const Choice = () => {
    return (
        <div className="w-full h-screen bg-black flex flex-col text-white items-center justify-evenly">
            <img className='w-80' src={whiteLogo} alt="Logo" />
            <div className='bg-white w-full h-[.01%]'></div>
            <div className='flex flex-col w-full gap-5 font-bold text-2xl pt-1 pl-3 pr-3'>
                <Link to={'/user-login'} className='w-full p-4 active:scale-95 flex justify-between items-center border-b-2 cursor-pointer'>Rider <MoveRight className='mt-1 flex justify-center items-center' /></Link>
                <Link to={'/captain-login'} className='w-full  p-4 active:scale-95 flex justify-between items-center border-b-2 cursor-pointer'>Driver <MoveRight className='mt-1 flex justify-center items-center ' /></Link>
            </div>
        </div>
    )
}

export default Choice