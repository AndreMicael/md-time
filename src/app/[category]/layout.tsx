import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

export async function generateMetadata({
    params,
}: {
    params: { category: string };
}): Promise<Metadata> {
    const { category } = params;

    return {
        title: `Categoria: ${category}`,
        description: 'Generated by create next app',
    };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar></Navbar>
            {children}
            <Newsletter></Newsletter>
        </>
    );
}
