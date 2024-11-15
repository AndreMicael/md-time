import React from 'react';

const Newsletter = () => {
    return (
        <div className="flex-col clip-path-full-skew bg-azul w-full text-white justify-center align-center  items-center">
            <div className="w-[35vw]  flex flex-col gap-2 py-28 mx-auto">
                <h2 className="font-bold text-dourado text-2xl text-center">
                    Receba nossas novidades por e-mail
                </h2>
                <p className="text-center text-sm w-[25vw] mx-auto">
                    Insira seu e-mail abaixo e fique atualizado sobre o mundo da relojoaria.
                </p>
                <form className="flex flex-row gap-2">
                    <input
                        className="bg-gray-200 w-full text-sm p-2 rounded-lg  "
                        type="email"
                        placeholder="Seu melhor e-mail"
                    />
                    <button
                        className="bg-dourado hover:bg-[#9F863E] text-azul w-[15vw] font-semibold p-2 rounded-lg text-sm"
                        type="submit"
                    >
                        Assinar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
