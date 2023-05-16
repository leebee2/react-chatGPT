import { useState } from 'react';

export default function Home() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('./api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }),
            });

            const data = await response.json();
            setAnswer(data.result);
            setQuestion('');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button type='submit'>질문하기</button>
            </form>
            <div>{answer}</div>
        </>
    );
}