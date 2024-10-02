interface ResultModalProps {
    msg:string,
    callback:() => void,
}

function ResultModal({msg, callback}: ResultModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-blue-600 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Result</h2>
                <p className="mb-6">{msg}</p>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => callback()}
                >
                    닫기
                </button>

            </div>
        </div>
    );
}

export default ResultModal;