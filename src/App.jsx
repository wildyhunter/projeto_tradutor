import { useState, useEffect } from 'react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ru', name: 'Russian' },
];

function App() {
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('pt');
    const [sourceText, setSourceText] = useState('');
    const [targetText, setTargetText] = useState('');
    const [isLoading, setLoading] = useState(false);

    const changeLaguage = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (sourceText.trim() === '') {
                setTargetText(''); // Limpa o texto alvo se o texto fonte estiver vazio
                return;
            }

            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
                sourceText
            )}`;

            setLoading(true);
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const translatedText = data[0][0][0]; // Acessa a tradução na estrutura de dados
                    setTargetText(translatedText);
                })
                .catch((error) => {
                    console.error('Error fetching translation:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 1000); // Espera 2 segundos

        return () => {
            clearTimeout(handler); // Limpa o timeout se sourceText mudar antes do tempo
        };
    }, [sourceLanguage, targetLanguage, sourceText]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
                    <h1 className="text-headerColor text-2xl font-bold ">
                        King Tradutor
                    </h1>
                </div>
            </header>

            <main className="flex-grow flex items-start justify-center px-4 py-8">
                <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <select
                            className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
                            value={sourceLanguage}
                            onChange={(e) => setSourceLanguage(e.target.value)}
                            name="languages"
                            id=""
                        >
                            {languages.map((language) => (
                                <option
                                    key={language.code}
                                    value={language.code}
                                >
                                    {language.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={changeLaguage}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <svg
                                className="w-5 h-5 text-headerColor"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                />
                            </svg>
                        </button>

                        <select
                            className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            name="languages"
                            id=""
                        >
                            {languages.map((language) => (
                                <option
                                    key={language.code}
                                    value={language.code}
                                >
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-4">
                            <textarea
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                placeholder="Type here..."
                                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none"
                            ></textarea>
                        </div>

                        <div className="relative p-4 bg-secondaryBackground border-l border-gray-200">
                            {isLoading ? (
                                <div className="absolute  inset-0  flex items-center justify-center">
                                    <div
                                        className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"
                                        role="status"
                                    ></div>
                                </div>
                            ) : (
                                <p className="text-lg text-textColor">
                                    {targetText}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
                    <p className="text-sm text-textColor">
                        Copyright © {new Date().getFullYear()}. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
