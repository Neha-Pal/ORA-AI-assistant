import React, { useContext, useRef, useState } from 'react';
import user_ora from '../../assets/user_ora.png'; 
import yt_icon from '../../assets/yt_icon.png'; 
import { FaRegLightbulb, FaCode, FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { VscCompass } from "react-icons/vsc";
import './Main.css'
import {Context} from '../../context/context'

// Exporting assets
export const assets = {
    user_ora,
    yt_icon,
};

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

    const fileInputRef = useRef(null); // Reference to the file input
    const [isListening, setIsListening] = useState(false); // State for listening status

     // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  // Speech Recognition Logic
  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    
    // Check if the browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; // Set language
      recognition.interimResults = false; // Get final results only
      recognition.maxAlternatives = 1; // Get one alternative

      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Recognized text:', transcript);
        setInput(transcript); // Set the recognized text in input
        setIsListening(false); // Stop listening after getting the result
      };

      recognition.onend = () => {
        setIsListening(false); // Stop listening when the recognition ends
      };

      recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ', event.error);
        setIsListening(false); // Stop listening if there is an error
      };
    } else {
      alert('Speech recognition not supported in this browser.');
      setIsListening(false); // Stop listening if not supported
    }
  };

  const stopListening = () => {
    // Logic to stop listening if necessary
    setIsListening(false); // Just updates the state for the UI
  };

  return (
    <div className='main'>
        <div className="nav">
            <p>ORA-AI assistant</p>
            <img src={assets.user_ora} alt='User ORA' />
        </div>
        <div className="main-container">
            {
                !showResult?
                <>
                    <div className="greet">
                <p><span>Hello User...</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on Hill Trils.</p>
                    <VscCompass />
                </div>
                <div className="card">
                    <p>North Kolkata best pandals.</p>
                    <FaRegLightbulb />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activies for work management.</p>
                    <FaMessage />
                </div>
                <div className="card">
                    <p>How to connect MongoDB with your code.</p>
                    <FaCode />
                </div>
            </div>
            </>
            :
            <div className='result'>
                <div className="result-title">
                    <img src={assets.user_ora} alt='User ORA' />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <h4>ORA</h4>
                    {loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        : 
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
            </div>
            }
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value = {input}
                        type='text' 
                        placeholder='Enter a prompt here..'/>
                    <div className='search-box-icon'>
                        
                        < FaMicrophone onClick={handleMicrophoneClick} style={{ cursor: 'pointer', color: isListening ? 'green' : 'orange' }} /> {/* Change color when listening */}
                        < IoSend onClick={()=>onSent()} />
                    </div>
                </div>
                {/* Hidden file input */}
            <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
            />
        </div>
    </div>
  );
};

export default Main;
