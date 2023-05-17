import React, { useEffect, useState } from 'react';
import styles from "../styles/main.module.css";
import { TypeAnimation } from 'react-type-animation';


const index = () => {
  const [question, setQuestion] = useState('');
  const [textSending, settextSending] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch("./api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: search }),
          });

          const data = await response.json();

          if (response.status !== 200) {
            throw (
              data.error || new Error(`request failed with status ${response.status}`)
            );
          }

          settextSending([...textSending, { id: 'ai', message: data.result.replace('\n\n', '') }])
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
    };
    
    if (search != '') {
      fetchData();
    }
  }, [search]);

  const handleSubmit = async (e) => {
    if (e.keyCode == 13 && question.trim(' ') != '') {
      settextSending([...textSending, { id: 'me', message: question }]);
      setQuestion('');
      setSearch(question);
    }
  };

  const handleOnClick = (e) => {
    if (question != '') {
      settextSending([...textSending, { id: 'me', message: question }]);
      setQuestion('');
      setSearch(question);
    }
  }


  return (
    <div>
      <div className={styles.chat_wrap}>
        <div className={styles.header}>
          무엇이든 질문해주세요.
        </div>
        <div className={styles.chat}>
          <ul>
            {textSending.length > 0 && (
              textSending.map((chat, index) => {
                return (
                  <li key={index} className={chat.id == "me" ? styles.right : styles.left}>
                    <div className={chat.id == "me" ? styles.sender : styles.message}>
                      {(index == textSending.length - 1 && chat.id == 'ai') ?
                        <TypeAnimation
                          sequence={[chat.message]}
                          speed={50}
                          repeat={0}
                          cursor={false}
                          style={{ whiteSpace: 'pre-line' }}
                        /> :
                        <span>{chat.message.replace(/(?:\r\n|\r|\n)/g, '<br />')}</span>}
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
          <button onClick={(e)=> handleOnClick(e)}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default index;