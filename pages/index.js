import styles from '../styles/Home.module.css';
import { OpenAI } from "langchain/llms/openai";
import React, { useState } from 'react';
import TypewriterEffect from '../components/TypewriterEffect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import * as dotenv from "dotenv";
dotenv.config();


export default function Home() {
  const [fileContent, setFileContent] = useState("");
  const [inputField, setInputField] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  // returns fileName with all the names of selected files
  const [fileNames, setFileNames] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastTypewriterIndex, setLastTypewriterIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (indexToRemove) => {
    setFileNames(prevNames => prevNames.filter((_, index) => index !== indexToRemove));
  };

  const pressedSubmit = () => {
    clearAllFileNames();
    runAI();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const newNames = Array.from(event.target.files).map(file => file.name);
    setFileNames(prevNames => [...prevNames, ...newNames]);
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            setFileContent(content);  // Setting the content to state so that you can display it later
        };
        reader.readAsText(file);
    }
  }
  const clearAllFileNames = () => {
    setFileNames([]);
  };


  const runAI = async (prompt) => {
    // Push user's message
    setMessages(prevMessages => [...prevMessages, { sender: 'user', content: prompt }]);
    setUserPrompt(prompt); // Store the user's message
    setInputField(""); // Clear the input field
    setIsLoading(true); // Start the loading indicator

    //Instantiante the OpenAI model 
    //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAI({ temperature: 0.7, openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

    //Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
    const res = await model.call(
      "Pretend you are an experienced tutor. You love helping students, and your explanations are top notch, explaining every detail. When a student asks you a question, you always give a long and through explanation of why the answer is what it is. A student comes to you for help. This is the documents that they provide: \n"
      + fileContent + "\n"
      + prompt
    );

    console.log({ res });
    setMessages(prevMessages => [...prevMessages, { sender: 'ai', content: res }]);
    setLastTypewriterIndex(messages.length);  // Store the index of the AI's message

    setIsLoading(false); // Stop the loading indicator after receiving the response
  };

  const UserOutput = ({ content }) => {
    return (
      <div className={styles.OutputStyle}>
        <div className={styles.userOutputAvatar}></div>
        <div className={styles.userOutputText}>{content}</div>
      </div>
    )
  };

  const GPTOutput = ({ content, index }) => {
    return (
      <div className={styles.OutputStyle}>
          <div className={styles.gptOutputAvatar}></div>
          <div className={styles.gptOutputText}>
            {index === lastTypewriterIndex ? <TypewriterEffect initialMessage={content} /> : content}
          </div>
      </div>
    )
  };
 


  return (
    <div className={styles.container}>
      <div className={styles.output}>
        {messages.map((message, index) => (
            message.sender === 'user' ? 
            <UserOutput key={index} content={message.content}/> : 
            <GPTOutput key={index} content={message.content} index={index} />
        ))}
      </div>

      <div className={styles.bottomBg}>
        <div className={styles.suggestionsContainer}>
          <button className={styles.suggestion} onClick={() => runAI("Walk me through the questions I got wrong.")}>
            <div className={styles.suggestionText}>Walk me through the questions I got wrong.</div>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>

          <button className={styles.suggestion} onClick={() => runAI("Generate a mock exam for me.")}>
            <div className={styles.suggestionText}>Generate a mock exam for me.</div>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>

        </div>
        

        <div className={styles.inputGroup}>
          <div>
            {/* <label for="files" class="btn">Select Image</label> */}
            <button className={styles.inputFile} onClick={() => document.getElementById('getFile').click()}></button>
            <label className={styles.fileLabel} htmlFor="file"><FontAwesomeIcon icon={faPlus} /></label>
            <input 
              type="file" 
              id="file" 
              className={styles.inputFile} 
              onChange={handleFileChange} // Add this to handle file selection
              multiple // Add this to allow selection of multiple files
            />
          </div>
          <input 
              className={isLoading ? `${styles.inputText} ${styles.inputTextDisabled}` : styles.inputText} 
              type="text" 
              placeholder={isLoading ? 'Loading...' : 'Send a message'}
              value={inputField}
              onChange={e => setInputField(e.target.value)}
              onKeyPress={e => {
                  if (e.key === 'Enter') {
                    pressedSubmit(); // optionally, you can also run the AI when Enter is pressed
                  }
              }}
              disabled={isLoading}  // This will disable the input box while loading
          />

          <button className={styles.inputSubmit} onClick={pressedSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>

        <div className={styles.showFiles}>
            {fileNames.map((name, index) => (
                <div className={styles.attachedFile} key={name + index} style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.attachedFileName}>{name}</span>
                    <button className={styles.deleteFile} onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            ))}
        </div>

      </div>  

      
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
