import React, { useState } from 'react';
import styles from "../styles/main.module.css";

const index = () => {
  const [question, setQuestion] = useState('');
  const [textSending, settextSending] = useState([]);


  const handleSubmit = async (e) => {
    if (e.keyCode == 13 && question.trim(' ') != '') {
      try {
        const response = await fetch('./api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: question }),
        });
        const data = await response.json();
        settextSending([...textSending, { id: 'me', message: question }, { id: 'ai', message: data.result }])
        setQuestion('');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };


  return (
    <div>
      <div className={styles.chat_wrap}>
        <div className={styles.header}>
          CHAT EXAMPLE
        </div>
        <div className={styles.chat}>
          <ul>
            {textSending.length > 0 && (
              textSending.map((chat, index) => {
                return (
                  <li key={index}>
                    <div>
                      {chat.message}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className={styles.input_div}>
          <input
            placeholder="엔터키를 눌러 메시지를 보내보세요."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => handleSubmit(e)}
          >
          </input>
        </div>
      </div>
    </div>
  );
};

export default index;