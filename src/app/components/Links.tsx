import React from 'react';
import Link from 'next/link';

const Links = () => {
    return (
        <div>
            {' '}
            <ul className="flex flex-row gap-6">
                <li className="links">
                    <Link href="/">Início</Link>
                </li>
                <li className="links"><Link href="/video">Vídeos</Link></li>
                <li className="links"><Link href="/review">Review</Link></li>
                <li className="links"><Link href="/dicas">Dicas</Link></li>
                <li className="links"><Link href="/promocoes">Promoções</Link></li>
            </ul>
        </div>
    );
};

export default Links;
