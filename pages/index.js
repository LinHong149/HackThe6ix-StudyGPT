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
    // const res = await model.call(
    //   "Pretend you are an experienced tutor, well versed in all subjects. A student comes to you for help. This is the documents that they provide: \n"
    //   + fileContent + "\n"
    //   + userPrompt
    // );
    // console.log({ res });

    console.log("Pretend you are an experienced tutor, well versed in all subjects. A student comes to you for help. This is the documents that they provide: \n"
    + fileContent + "\n"
    + userPrompt)
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

      <div>{fileContent}</div>


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
        <div className={styles.inputGroup}>
          <div>
            {/* <label for="files" class="btn">Select Image</label> */}
            <button className={styles.inputFile} onClick={() => document.getElementById('getFile').click()}></button>
            <input 
                className={styles.inputFileInput} 
                id="getFile" 
                type="file" 
                style={{display: "none"}}
                onChange={handleFileChange}
            />
          </div>
          <input 
              className={styles.inputText} 
              type="text" 
              placeholder='Send a message'
              value={userPrompt}  // bind the value to the state
              onChange={e => setUserPrompt(e.target.value)} // update state on input change
              onKeyPress={e => {
                  if (e.key === 'Enter') {
                      runAI(); // optionally, you can also run the AI when Enter is pressed
                  }
              }}
          />

        </div>
        <button onClick={run}>Click Me</button>

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
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
