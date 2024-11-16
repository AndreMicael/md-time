import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/LOGO_MD TIME_SECUNDARIO.png';
import Links from './Links';
import { FaStore } from 'react-icons/fa';
const Navbar = () => {
    return (
        <div>
            <nav className="bg-azul flex flex-row justify-around  align-center  items-center text-white h-[5vw] ">
                <div>
                    <Image alt="Logo" src={logo} className="w-[8vw]" />
                </div>
                <div>
                    <Links />
                </div>
                <button className="px-3 py-1 rounded-lg border border-[1.5px] text-white font-semibold bg-white bg-opacity-0 hover:bg-opacity-40 flex gap-2 justify-center items-center align-center">
                    <div className=" ">
                        <FaStore />
                    </div>
                    <p className=" ">Loja</p>
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
