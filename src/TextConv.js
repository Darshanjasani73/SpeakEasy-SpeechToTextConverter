
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";

const TextConv = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [selectedLanguage, setSelectedLanguage] = useState("en-IN");
   
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
    
    const { transcript,resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    
    useEffect(() => {
        setTextToCopy(transcript); 
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <div className="container">Speech recognition not supported</div>;
    }

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        SpeechRecognition.abortListening(); 
    };

    const handleReset = () => {
        resetTranscript();
    };
    
    return (
        <div className="container">
           <h1 className="title">🎙️SpeackEasy🎙️</h1>
            <h2 className="heading">Speech to Text Converter</h2>
            <div className="transcript-container">
                <div className="transcript">{transcript}</div>
                <button className="copy-btn" onClick={setCopied}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div className="controls">
                <button className="control-btn" onClick={startListening}>Start Listening</button>
                <button className="control-btn" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                <button className="reset-btn" onClick={handleReset}>Reset</button>
                <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="en-IN">English</option>
                    <option value="hi-IN">Hindi</option>
                    <option value="gu-IN">Gujarati</option>
                </select>
                
            </div>
        </div>
    );
};

export default TextConv;
