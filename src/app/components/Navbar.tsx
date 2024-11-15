import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/LOGO_MD TIME_SECUNDARIO.png';
import Links from './Links';

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
                <button className="bg-dourado">Loja</button>
            </nav>
        </div>
    );
};

export default Navbar;
