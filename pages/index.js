import styles from '../styles/Home.module.css';
import { OpenAI } from "langchain/llms/openai";
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import * as dotenv from "dotenv";
dotenv.config();


export const run = async () => {
    //Instantiante the OpenAI model 
    //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAI({ temperature: 0.9, openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

    //Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
    const res = await model.call(
        "What would be a good company name a company that makes colorful socks?"
    );
    console.log({ res });
};


export default function Home() {
  // returns fileName with all the names of selected files
  const [fileNames, setFileNames] = useState([]);

  // Handler for file selection
  const handleFileChange = (event) => {
    const newNames = Array.from(event.target.files).map(file => file.name);
    setFileNames(prevNames => [...prevNames, ...newNames]);
  };
  const handleDelete = (indexToRemove) => {
    setFileNames(prevNames => prevNames.filter((_, index) => index !== indexToRemove));
  };

  const UserOutput = () => {
    return (
      <div className={styles.OutputStyle}>
        <div className={styles.userOutputAvatar}></div>
        <div className={styles.userOutputText}>Lorem ipsum dolor sit amet consectetur. Est nunc facilisis commodo in viverra. Quisque ante sit fusce id purus. Mauris mauris sagittis neque vitae convallis aliquet dolor libero vitae. Convallis amet odio in aenean fames porttitor porttitor at. </div>
      </div>
    )
  };

  const GPTOutput = () => {
    return (
      <div className={styles.OutputStyle}>
        <div className={styles.gptOutputAvatar}></div>
        <div className={styles.gptOutputText}>Lorem ipsum dolor sit amet consectetur. Est nunc facilisis commodo in viverra. Quisque ante sit fusce id purus. Mauris mauris sagittis neque vitae convallis aliquet dolor libero vitae. Convallis amet odio in aenean fames porttitor porttitor at. </div>
      </div>
    )
  };

  return (
    <div className={styles.container}>
      <div className={styles.output}>
        <UserOutput/>
        <GPTOutput/>
        <UserOutput/>
        <GPTOutput/>
        <UserOutput/>
        <GPTOutput/>
        <UserOutput/>
        <GPTOutput/>
        <UserOutput/>
        <GPTOutput/>
      </div>


      <div className={styles.bottomBg}>
      <div className={styles.inputGroup}>
          <input 
            type="file" 
            id="file" 
            accept='image/*' 
            className={styles.inputFile} 
            onChange={handleFileChange} // Add this to handle file selection
            multiple // Add this to allow selection of multiple files
          />
          <label className={styles.fileLabel} htmlFor="file"><FontAwesomeIcon icon={faPlus} /></label>
          <input className={styles.inputText} type="text" placeholder='Send a message'></input>
          <button className={styles.inputSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
        </div>


        <div className={styles.showFiles}>
            {fileNames.map((name, index) => (
                <div className={styles.attachedFile} key={name + index} style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.attachedFileName}>{name}</span>
                    <button className={styles.deleteFile} onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            ))}
        </div>
        <button onClick={run}>Click Me</button>

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
