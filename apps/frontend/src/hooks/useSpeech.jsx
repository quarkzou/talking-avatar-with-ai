import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJSSHA1 from "crypto-js/sha1";
import CryptoJSEncHex from "crypto-js/enc-hex";

const backendUrl = "http://43.133.65.177:8080/api";
const token = 'qsdf12rtyu907816'

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  let chunks = [];

  const initiateRecording = () => {
    chunks = [];
  };

  const onDataAvailable = (e) => {
    chunks.push(e.data);
  };

  const sendAudioData = async (audioBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async function () {
      const base64Audio = reader.result.split(",")[1];
      setLoading(true);
      try {
        const ts = new Date().getTime().toString();
        const nonce = uuidv4();
        const sign = computeSign(ts, nonce, token)

        const data = await fetch(`api/audio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "ts": ts,
            "nonce": nonce,
            "sign": sign,
          },
          body: JSON.stringify({ audio: base64Audio }),
        });
        const response = (await data.json());
        console.log(response)
        tts(response.message);
        // setMessages((messages) => [...messages, ...response]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = initiateRecording;
          newMediaRecorder.ondataavailable = onDataAvailable;
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: "audio/webm" });
            try {
              await sendAudioData(audioBlob);
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    }
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const computeSign = (ts, uuid, token) => {
    const concat = ts + uuid + token;
    return CryptoJSSHA1(concat).toString(CryptoJSEncHex)
  };

  const tts = async (message) => {
    setLoading(true);
    try {
      const messageList = [
        {
          role: "system",
          content: "你的名字叫小路，你是一个学习小助手。如果回答内容比较长，需要格式化你的回答。",
        },
      ];

      messageList.push({ role: "user", content: message });

      const ts = new Date().getTime().toString();
      const nonce = uuidv4();
      const sign = computeSign(ts, nonce, token)

      const data = await fetch(`api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "ts": ts,
          "nonce": nonce,
          "sign": sign,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          // stream: true,
          messages: messageList,
        }),
      });
      const response = (await data.json()).choices[0].message.content;
      console.log(response);
      setResponse(response);
      // setMessages((messages) => [...messages, ...response]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <SpeechContext.Provider
      value={{
        startRecording,
        stopRecording,
        recording,
        tts,
        message,
        response,
        onMessagePlayed,
        loading,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeech must be used within a SpeechProvider");
  }
  return context;
};
