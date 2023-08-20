import styles from '../styles/Home.module.css';
import { OpenAI } from "langchain/llms/openai";


export default function Home() {
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
          <div>
            {/* <label for="files" class="btn">Select Image</label> */}
            <button className={styles.inputFile}  onclick="document.getElementById('getFile').click()"></button>
            <input className={styles.inputFileInput} id="getFile" type="file" style="display:none"></input>
          </div>
          <input className={styles.inputText} type="text" placeholder='Send a message'></input>
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
