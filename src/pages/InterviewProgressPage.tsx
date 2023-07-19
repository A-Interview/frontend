import React, { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import ProgressRobot from "../assets/img/ProgressRobot.gif";
import ProgressTimer2 from "../assets/img/ProgressTimer2.png";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading";
import { useRecoilValue } from "recoil";
import { signupState } from "../state/Atom";

const ProgressBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
`;
const BackWard = styled.div`
  display: inline-flex;
  height: 2.25rem;
  padding: 0.375rem 0.3125rem 0.375rem 0.4375rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: fixed;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  left: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  z-index: 1;
`;

const ProgressBox1 = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: rgba(242, 242, 242, 0.15);
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.43);
  flex: 1;
  border-radius: 2rem;
`;

const ProgressBox2 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
`;

const ProgressBox3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 13.8125rem;
  height: 32.4375rem;
  flex-shrink: 0;
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  padding: 1rem;
  padding-left: 1.9rem;
  padding-right: 1.9rem;
`;

const ProgressQuestionText = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  justify-content: center;
  align-items: center;
`;

const ProgressVideo = styled.video`
  width: 51.9375rem;
  height: 27.375rem;
  flex-shrink: 0;
  border-radius: 3.03713rem;
  box-shadow: 0px 0px 0.29790791869163513px 0px rgba(66, 71, 76, 0.32);
`;

const ProgressRobotStateBox = styled.div`
  width: 100%;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 2.75rem;
  justify-content: center;
  display: flex;
  align-items: center;
  aspect-ratio: 1/1;
`;

const ProgressRobotState = styled.img`
  width: 7.75rem;
  height: 7.5rem;
  flex-shrink: 0;
`;

const ProgressTimerState = styled.p`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: var(--font-l);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`;

const ProgressTimer2State = styled.img`
  width: 6.5625rem;
  height: 6.5625rem;
  flex-shrink: 0;
`;

const ProgressNextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: center;
  flex-shrink: 0;
  color: #59d4a9;
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  cursor: pointer;
  border-radius: 2rem;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  background: transparent;
`;

const ProgressTimerBox = styled.div`
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProgressCountDown = styled.div`
  border-radius: 2.75rem;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Count = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  color: white;
`;

const InterviewProgressPage = (): JSX.Element => {
  const navigate = useNavigate();
  const signupnow = useRecoilValue(signupState);
  useEffect(() => {
    console.log(signupnow);
    if (!signupnow) {
      navigate("/login");
    }
  }, []);

  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = (): void => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef?.current != null) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        // Handle the error case here
      });
  };

  /* ------------------------------------------------------------------------- */

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isPost, setIsPost] = useState(false);

  // 초기 웹 소켓 연결 상태 확인
  const [firstConnected, setFirstConnected] = useState(false);

  const connectWebSocket = (): void => {
    // const ws = new WebSocket("ws://localhost:8000/ws/deep-interview/");
    // const ws = new WebSocket("ws://localhost:8000/ws/situation-interview/");
    const ws = new WebSocket("ws://localhost:8000/ws/personality-interview/");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
      setFirstConnected(true);
    };

    ws.onmessage = (event) => {
      setFirstConnected(false);
      const data = JSON.parse(event.data);
      const message: string = data.message;
      const finishReason: string = data.finish_reason;

      if (finishReason === "stop") {
        startRecording();
      }
      console.log("Received message:", message);

      setMessage((m) => m + message);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
      setFirstConnected(false);
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  const sendMessage = (): void => {
    if (socket != null && socket.readyState === WebSocket.OPEN) {
      console.log("send message");
      const data = { formId: 1, type: "withoutAudio" };
      socket.send(JSON.stringify(data));
    }
  };

  const sendMessageWithAudio = (): void => {
    console.log(audioBlob);
    // Blob 객체를 읽어 데이터 URL로 변환합니다.
    if (audioBlob instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(",")[1];
        const data = { formId: 1, type: "withAudio", audioBlob: base64Data };
        if (socket != null && audioBlob != null) {
          socket.send(JSON.stringify(data));
          console.log("posted");
        }
        setAudioBlob(null);
      };
      reader.readAsDataURL(audioBlob);
    }
    setMessage("");
    setCount(10);
    setIsPost(true);
  };

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [count, setCount] = useState(10);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stopTrigger, setStopTrigger] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);

  useEffect(() => {
    if (stopTrigger) {
      setIsPost(false);
      stopRecording();
    }
  }, [stopTrigger]);

  useEffect(() => {
    if (saveTrigger) {
      saveRecording();
    }
  }, [audioChunks]);

  useEffect(() => {
    if (audioBlob != null && !isPost) {
      sendMessageWithAudio();
    }
    setStopTrigger(false);
    setSaveTrigger(false);
  }, [audioBlob]);

  console.log(recording);
  const startRecording = (): void => {
    countDown();
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
          mediaRecorder.start();
          mediaRecorderRef.current = mediaRecorder; // Store mediaRecorder in a ref
          setRecording(true);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
      console.log("Delayed function executed.");
    }, 10000); // 10초를 밀리초로 나타냅니다.
  };

  const countDown = (): void => {
    let dummyCount = 10;
    const timer = setInterval(() => {
      if (dummyCount > 0) {
        console.log(count);
        setCount((prev) => prev - 1);
        dummyCount--;
      } else {
        clearInterval(timer);
        console.log("Countdown finished!");
      }
    }, 1000);
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current != null) {
      mediaRecorderRef.current.stop(); // Access mediaRecorder from the ref
      setRecording(false);
      setSaveTrigger(true);
    }
  };

  const saveRecording = (): void => {
    const mergedBlob = new Blob(audioChunks, { type: "audio/wav" });
    setAudioBlob(mergedBlob);
    console.log(audioChunks);
    setAudioChunks([]); // Clear the audioChunks array
  };

  const handleDataAvailable = (event: BlobEvent): void => {
    setAudioChunks((prevChunks) => [...prevChunks, event.data]);
  };

  return (
    <>
      <ProgressBackground>
        <BackWard onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12C5 12.3946 5.14656 12.7328 5.46223 13.0259L14.2334 21.6167C14.4814 21.8647 14.7971 22 15.1691 22C15.9132 22 16.5107 21.4138 16.5107 20.6584C16.5107 20.2864 16.3529 19.9594 16.1048 19.7001L8.2018 12L16.1048 4.29989C16.3529 4.04059 16.5107 3.70237 16.5107 3.3416C16.5107 2.58625 15.9132 2 15.1691 2C14.7971 2 14.4814 2.13529 14.2334 2.38331L5.46223 10.9628C5.14656 11.2672 5 11.6054 5 12Z"
              fill="white"
            />
          </svg>
        </BackWard>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingLeft: "6rem",
            paddingRight: "6rem",
            paddingTop: "3rem",
            paddingBottom: "3rem",
            height: "100%",
          }}
        >
          <ProgressBox1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <ProgressQuestionText>
              <div>{message}</div>
            </ProgressQuestionText>
          </ProgressBox1>

          {/* 하단 부분 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flex: "2",
            }}
          >
            <ProgressBox2
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProgressVideo autoPlay ref={videoRef} />
              <button onClick={startVideo}>카메라 키기</button>
            </ProgressBox2>
            {/* 하단 오른쪽 박스 */}
            <ProgressBox3>
              <ProgressRobotStateBox>
                <ProgressRobotState src={ProgressRobot} />
              </ProgressRobotStateBox>

              <ProgressTimerBox>
                <ProgressTimerState>진행 시간: 0분 32초</ProgressTimerState>
              </ProgressTimerBox>

              <div
                style={{
                  display: "flex",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ProgressCountDown>
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                    }}
                  >
                    <ProgressTimer2State src={ProgressTimer2} />
                    <Count>{count}</Count>
                  </div>
                </ProgressCountDown>
              </div>

              <ProgressNextButton
                onClick={() => {
                  if (firstConnected) {
                    sendMessage();
                  } else {
                    setStopTrigger(true);
                  }
                }}
              >
                <p>다음 질문</p>
              </ProgressNextButton>
            </ProgressBox3>
          </div>
        </div>
        <LoadingPage></LoadingPage>
      </ProgressBackground>
    </>
  );
};

export default InterviewProgressPage;
