'use client';

import React from 'react';
import Image from 'next/image';
import logoAzul from '@/app/assets/LOGO_MD TIME_TRANSPARENTE_PADRAO.png';
import { FaInstagram, FaStore } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center bg-white text-slate-500 relative bottom-0 p-10">
                <aside>
                    <Image className="w-[10vw]" src={logoAzul} alt="Logo" />
                    <p className="font-bold text-azul">Seu tempo é precioso.</p>
                    <p className="text-slate-800">
                        Copyright © {new Date().getFullYear()} - Todos os direitos reservados.
                    </p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-azul transition-colors"
                        >
                            <FaInstagram />
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-azul transition-colors"
                        >
                            <IoLogoYoutube />
                            YouTube
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-azul transition-colors"
                        >
                            <FaStore />
                            Loja
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
