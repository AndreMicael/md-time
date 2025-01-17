interface ErrorMessageProps {
    message: string;
    retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
    return (
        <div className="text-center py-8">
            <p className="text-red-500 mb-4">{message}</p>
            {retry && (
                <button 
                    onClick={retry}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tentar novamente
                </button>
            )}
        </div>
    );
} 