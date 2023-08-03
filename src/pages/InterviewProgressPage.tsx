import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading";
import InterviewBackImage from "../assets/img/InterviewBackImage.png";
import InterviewBox from "../assets/img/InterviewBox.svg";
import cuterobot from "../lottie/cuterobot.json";
import Lottie from "react-lottie-player";

const ProgressBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
  position: relative;
`;
const BackWard = styled(motion.div)`
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
  z-index: 100;
`;

const ProgressBox = styled(motion.div)`
  background-image: url(${InterviewBackImage});
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const InterviewBoxImage = styled(motion.div)`
  background-image: url(${InterviewBox});
  position: relative;
  width: 65rem;
  height: 46rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CameraButton = styled(motion.button)`
  padding: 0;
  margin: 0;
  background: transparent;
  background-repeat: no-repeat;
  display: flex;
  font-family: sans-serif;
  text-align: center;
  transition: all ease 0.5s;
`;

const Recording = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.45em;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5.25em;
  width: 95px;
`;

const ProgressCountDown = styled.div`
  border-radius: 3.75rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(50px);
  aspect-ratio: 1/1;
  @media (max-height: 900px) {
    height: 2rem;
    width: 4rem;
  }
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
const ProgressNextButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  outline: none;
  z-index: 2000;
  border: 0;
  background-color: transparent;
`;
const ProgressVideo = styled.video`
  transform: scaleX(-1);
  box-shadow: 0px 0px 0.29790791869163513px 0px rgba(66, 71, 76, 0.32);
`;

const ProgressQuestionText = styled(motion.div)`
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
  overflow: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ccc;
  }
  position: relative;
`;
const ProgressBox1 = styled.div`
  width: 100%;
  height: 30%;
  background: rgba(0, 0, 0, 0.5);
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.43);
  border-radius: 0 0 1rem 1rem;
`;

const InterviewProgressPage = (): JSX.Element => {
  // 페이지 네비게이션
  const navigate = useNavigate();
  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };
  /* ------------------------------------------------------------------------- */
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  const variants: Variants = {
    hidden: {
      opacity: 0.2,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  /* ------------------------------------------------------------------------- */

  // 비디오 관련 코드
  const [cameraToggle, setCameraToggle] = useState(false);
  const toggleSwitch = (): void => {
    setCameraToggle(!cameraToggle);
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  // 핸들 애니메이션을 위한 변형(variants)
  const handleVariants = {
    on: { x: 21, y: -15 }, // 켜진 상태일 때 핸들을 오른쪽으로 80px 이동
    off: { x: 0, y: -15 }, // 꺼진 상태일 때 핸들을 원래 위치로 이동
  };
  // 비디오 키는 함수
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
      });
  };

  // 비디오 끄는 함수
  const stopVideo = (): void => {
    if (videoRef?.current != null && videoRef.current.srcObject != null) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  // 비디오 on/off
  useEffect(() => {
    if (cameraToggle) {
      startVideo();
    } else {
      stopVideo();
    }
  }, [cameraToggle]);

  /* ------------------------------------------------------------------------- */

  // 질문 주고 받는 소켓 통신

  // 소켓 변수 정의
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>(
    "면접을 시작하시려면 우측의 버튼을 클릭해주세요."
  );
  const [info, setInfo] = useState<string>(
    "왼쪽 상단에 있는 버튼을 누르고 카메라가 켜진 상태로 면접을 시작하세요.\n" +
      "질문을 듣고 3초 뒤에 빨간 불이 들어오면 답변을 한 뒤 우측의 버튼을 누르세요.\n " +
      "*말을 하지 않고 넘기면 다음 질문으로 넘어가지 않습니다!*"
  );
  const [speechmessage, setSpeechmessage] = useState(0);

  // 메세지가 post되었는 지 확인하는 변수, 트리거를 위해 필요
  const [isPost, setIsPost] = useState(false);

  // post_id
  const [postId, setPostId] = useState<number>(-1);

  // 질문 갯수 설정 변수
  const [defaultQuestionNum, setDefaultQuestionNum] = useState<number>(-1);
  const [situationQuestionNum, setSituationQuestionNum] = useState<number>(-1);
  const [deepQuestionNum, setDeepQuestionNum] = useState<number>(-1);
  const [personalityQuestionNum, setPersonalityQuestionNum] =
    useState<number>(-1);

  // 현재 토픽의 몇 번째 질문인 지 체크하는 변수
  const [currentQNum, setCurrentQNum] = useState(0);

  // 현재 토픽의 종류를 결정하는 변수
  const [interviewType, setInterviewType] = useState("default");

  // 초기 웹 소켓 연결 상태 확인
  const [firstConnected, setFirstConnected] = useState(false);

  // last_topic_answer 토큰 변수
  const [lastTopicAnswer, setLastTopicAnswer] = useState("");

  const [buttonUnAble, setButtonUnAble] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  // 소켓 연결 함수, 메세지 처리 기능
  const connectWebSocket = (): void => {
    const ws = new WebSocket(`ws://localhost:8000/ws/interview/`);
    // const ws = new WebSocket(`wss://ainterview.site/ws/interview/`);

    ws.onopen = () => {
      // 초기 세팅
      ws.send(
        JSON.stringify({
          type: "initialSetting",
          formId: postId,
          questionNum:
            defaultQuestionNum +
            situationQuestionNum +
            deepQuestionNum +
            personalityQuestionNum,
          defaultQuestionNum,
          situationQuestionNum,
          deepQuestionNum,
          personalityQuestionNum,
        })
      );
      setFirstConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setLoadingCheck((prev) => !prev);
      setFirstConnected(false);
      const data = JSON.parse(event.data);

      if (data.last_topic_answer != null) {
        setLastTopicAnswer(data.last_topic_answer);
      } else {
        const message: string = data.message;
        const finishReason: string = data.finish_reason;

        if (finishReason === "stop") {
          setSpeechmessage((prev) => prev + 1);
        }
        setMessage((m) => m + message);
      }
    };

    ws.onclose = () => {
      setSocket(null);
    };
  };

  // 페이지 접속 시, 필요한 데이터 정보를 세션 스토리지로 부터 불러옴.
  useEffect(() => {
    const id = Number(sessionStorage.getItem("form_id"));
    const defaultValue = Number(sessionStorage.getItem("default"));
    const situationValue = Number(sessionStorage.getItem("situation"));
    const deepValue = Number(sessionStorage.getItem("deep"));
    const personalityValue = Number(sessionStorage.getItem("personality"));

    if (
      id != null &&
      defaultValue != null &&
      situationValue != null &&
      deepValue != null &&
      personalityValue != null
    ) {
      setDefaultQuestionNum(defaultValue);
      setSituationQuestionNum(situationValue);
      setDeepQuestionNum(deepValue);
      setPersonalityQuestionNum(personalityValue);
      setPostId(id);
    }
  }, []);

  useEffect(() => {
    if (
      postId !== -1 &&
      defaultQuestionNum !== -1 &&
      situationQuestionNum !== -1 &&
      deepQuestionNum !== -1 &&
      personalityQuestionNum !== -1
    ) {
      if (
        defaultQuestionNum === 0 &&
        situationQuestionNum === 0 &&
        deepQuestionNum === 0
      ) {
        setInterviewType("personality");
        setCurrentQNum(personalityQuestionNum);
      } else if (
        defaultQuestionNum === 0 &&
        situationQuestionNum === 0 &&
        deepQuestionNum !== 0
      ) {
        setInterviewType("deep");
        setCurrentQNum(deepQuestionNum);
      } else if (defaultQuestionNum === 0 && situationQuestionNum !== 0) {
        setInterviewType("situation");
        setCurrentQNum(situationQuestionNum);
      } else if (defaultQuestionNum !== 0) {
        setInterviewType("default");
        setCurrentQNum(defaultQuestionNum);
      }

      connectWebSocket();
    }
  }, [
    postId,
    defaultQuestionNum,
    situationQuestionNum,
    deepQuestionNum,
    personalityQuestionNum,
  ]);

  useEffect(() => {
    // 현재 토픽의 마지막 질문인 경우 설정.
    if (lastTopicAnswer === "default_last") {
      setCurrentQNum(situationQuestionNum);
      setFirstConnected(true);
      sendMessage();
    } else if (lastTopicAnswer === "situation_last") {
      setCurrentQNum(deepQuestionNum);
      setFirstConnected(true);
      sendMessage();
    } else if (lastTopicAnswer === "deep_last") {
      setCurrentQNum(personalityQuestionNum);
      setFirstConnected(true);
      sendMessage();
    } else if (lastTopicAnswer === "last") {
      navigate("/interview-result");
    }
  }, [lastTopicAnswer]);

  // 초기 메세지 요청 함수
  const sendMessage = (): void => {
    if (socket != null) {
      const data = {
        formId: postId,
        type: "withoutAudio",
        interviewType,
      };
      socket.send(JSON.stringify(data));
      setCount(3);
      setFirstConnected(false);
      setCurrentQNum((prev) => prev - 1);
      setMessage("로딩 중...");
      setInfo("");
    }
  };

  // 한 토픽의 마지막 메세지 요청 함수, 응답으로 오는 질문이 없음
  const sendMessageNoReply = (): void => {
    if (audioBlob instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(",")[1];
        const data = {
          formId: postId,
          type: "noReply",
          audioBlob: base64Data,
          interviewType,
        };
        if (socket != null && audioBlob != null) {
          socket.send(JSON.stringify(data));
        }
        setAudioBlob(null);
      };
      reader.readAsDataURL(audioBlob);
    }
    setMessage("로딩 중...");
    setIsPost(true);
    checkInterviewType();
  };

  // 토픽 종류를 확인하고, 바꾸는 함수
  const checkInterviewType = (): void => {
    if (interviewType === "default") {
      if (
        situationQuestionNum === 0 &&
        deepQuestionNum === 0 &&
        personalityQuestionNum === 0
      ) {
        setInterviewType("last");
      } else if (situationQuestionNum === 0 && deepQuestionNum === 0) {
        setInterviewType("personality");
      } else if (situationQuestionNum === 0) {
        setInterviewType("deep");
      } else {
        setInterviewType("situation");
      }
    } else if (interviewType === "situation") {
      if (deepQuestionNum === 0 && personalityQuestionNum === 0) {
        setInterviewType("last");
      } else if (deepQuestionNum === 0) {
        setInterviewType("personality");
      } else {
        setInterviewType("deep");
      }
    } else if (interviewType === "deep") {
      if (personalityQuestionNum === 0) {
        setInterviewType("last");
      } else {
        setInterviewType("personality");
      }
    } else if (interviewType === "personality") {
      setInterviewType("last");
    }
  };

  // 음성 녹음과 함께 질문 요청 함수
  const sendMessageWithAudio = (): void => {
    // Blob 객체를 읽어 데이터 URL로 변환합니다.
    if (audioBlob instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(",")[1];
        const data = {
          formId: postId,
          type: "withAudio",
          audioBlob: base64Data,
          interviewType,
        };
        if (socket != null && audioBlob != null) {
          socket.send(JSON.stringify(data));
        }
        setAudioBlob(null);
      };
      reader.readAsDataURL(audioBlob);
    }
    setMessage("로딩 중...");
    setCount(3);
    setIsPost(true);
    setCurrentQNum((prev) => prev - 1);
  };
  /* ------------------------------------------------------------------------- */
  // 음성 녹음과 관련
  const [recording, setRecording] = useState(false);
  const [recordColor, setRecordColor] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stopTrigger, setStopTrigger] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);
  // 3초 카운트 변수
  const [count, setCount] = useState(3);

  // 버튼 누를 시 녹음 본 전달하는 트리거
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

  // 한 토픽의 마지막 질문인지 아닌지 구분하는 함수, 이를 통해 실질적인 소켓 요청과 연결
  useEffect(() => {
    if (audioBlob != null && !isPost && currentQNum !== 0) {
      sendMessageWithAudio();
    } else if (audioBlob != null && !isPost && currentQNum === 0) {
      sendMessageNoReply();
    }
    setStopTrigger(false);
    setSaveTrigger(false);
  }, [audioBlob]);

  // 음성 녹음 함수
  const startRecording = (): void => {
    if (recording) return;
    countDown();
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
          mediaRecorder.start();
          mediaRecorderRef.current = mediaRecorder; // Store mediaRecorder in a ref
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }, 3000); // 3초를 밀리초로 나타냅니다.
  };
  useEffect(() => {
    // 카운트가 진행 중이면 무조건 파란색으로 변경
    if (count > 0 && count <= 3) {
      setRecordColor(false); // 녹음 상태를 해제하여 Recording 컴포넌트에서 빨간색을 표시하지 않도록 함
    }
  }, [count]);

  // 카운트 다운 함수
  const countDown = (): void => {
    let dummyCount = 3;
    const timer = setInterval(() => {
      if (dummyCount > 0) {
        setCount((prev) => prev - 1);
        dummyCount--;
      } else {
        clearInterval(timer);
        setRecording(true);
        setRecordColor(true);
      }
    }, 1000);
  };
  // 녹음 중지 함수
  const stopRecording = (): void => {
    if (!recording || mediaRecorderRef.current == null) return;
    mediaRecorderRef.current.stop(); // Access mediaRecorder from the ref
    setRecording(false);
    setSaveTrigger(true);
  };

  // 녹음 저장 함수
  const saveRecording = (): void => {
    const mergedBlob = new Blob(audioChunks, { type: "audio/wav" });
    setAudioBlob(mergedBlob);
    setAudioChunks([]); // Clear the audioChunks array
  };

  // 녹음 시 필요한 함수
  const handleDataAvailable = (event: BlobEvent): void => {
    setAudioChunks((prevChunks) => [...prevChunks, event.data]);
  };

  // TTS 구현
  const speakText = (text: any): any => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.rate = 2.0;
    synth.speak(utterThis);
    utterThis.onend = () => {
      startRecording();
    };
  };

  // 처음 화면에서 TTS가 나오는 것을 방지
  useEffect(() => {
    if (message !== "면접을 시작하시려면 우측의 버튼을 클릭해주세요.") {
      speakText(message);
    }
  }, [speechmessage]);

  // 버튼 비활성화
  const [buttonTrigger, setButtonTrigger] = useState(false);
  useEffect(() => {
    if (buttonUnAble && buttonTrigger) {
      if (firstConnected && currentQNum > 0) {
        sendMessage();
      } else if (!firstConnected && currentQNum > 0) {
        setStopTrigger(true);
        setCount(3);
      } else if (currentQNum === 0 && !firstConnected) {
        setStopTrigger(true);
        setCount(3);
      }
    }
  }, [buttonUnAble, buttonTrigger]);
  useEffect(() => {
    if (recording) {
      setButtonUnAble(false);
      setButtonTrigger(true);
    }
  }, [recording]);
  useEffect(() => {
    if (message === "로딩 중...") {
      setMessage("");
    }
  }, [loadingCheck]);

  return (
    <>
      <ProgressBackground>
        <BackWard
          onClick={handleGoBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
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
        <ProgressBox
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <InterviewBoxImage
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {cameraToggle ? (
              <ProgressVideo
                autoPlay
                ref={videoRef}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  flexShrink: "0",
                  borderRadius: "2rem",
                  zIndex: "-1",
                }}
              />
            ) : (
              <Lottie
                loop={true}
                animationData={cuterobot}
                play
                style={{ width: 400, height: 400 }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                justifyContent: "space-between",
                gap: "23rem",
                top: "1rem",
                // backgroundColor: "#fff",
              }}
            >
              <CameraButton
                onClick={() => {
                  setCameraToggle((prev) => !prev);
                  toggleSwitch();
                }}
                style={{
                  width: "64px",
                  height: "31px",
                  backgroundColor: cameraToggle
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(255, 255, 255, 0.201)",
                  justifyContent: cameraToggle ? "flex-start" : "flex-end",
                  borderRadius: "50px",
                  padding: "10px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    top: "56%",
                    left: "10px",
                    borderRadius: "50rem",
                    width: "25px",
                    height: "25px",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                  animate={cameraToggle ? "on" : "off"} // isOn 상태에 따라 "on"과 "off" 변형 간 전환
                  variants={handleVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 5000, damping: 100 }}
                ></motion.div>
              </CameraButton>
              <Recording>
                <div
                  style={{
                    backgroundColor: recordColor ? "red" : "rgba(86,86,86,1)",
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    animation: recording ? "pulse 2s infinite" : "none",
                    marginRight: "0.25rem",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "white",
                  }}
                >
                  Recording
                </div>
              </Recording>
              <ProgressCountDown>
                <div
                  style={{
                    // position: "absolute",
                    display: "flex",
                  }}
                >
                  <Count>{count}</Count>
                </div>
              </ProgressCountDown>
            </div>

            <ProgressBox1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                bottom: "0rem",
                position: "absolute",
                zIndex: "1000",
              }}
            >
              <ProgressQuestionText
                initial={{ opacity: 0, y: 50 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    whiteSpace: "pre-line",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "3rem",
                      display: "block",
                      marginBottom: " -0.6999999999999993rem",
                    }}
                  >
                    {message}
                  </span>
                  <br />
                  <span style={{ fontSize: "1rem", lineHeight: "2rem" }}>
                    {info}
                  </span>
                </div>
              </ProgressQuestionText>
              <ProgressNextButton
                disabled={buttonUnAble}
                onClick={() => {
                  setButtonUnAble(true);
                  setButtonTrigger(true);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                initial="hidden"
                animate="visible"
                variants={variants}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 88 88"
                  fill="none"
                >
                  <path
                    d="M18.3885 47.7907H61.5612L48.3473 63.662C48.0413 64.0301 47.8109 64.4548 47.6691 64.912C47.5273 65.3691 47.4769 65.8497 47.5209 66.3263C47.6096 67.2889 48.0771 68.1768 48.8205 68.7947C49.5639 69.4125 50.5223 69.7098 51.4848 69.6211C52.4474 69.5323 53.3353 69.0648 53.9532 68.3214L72.1541 46.4803C72.2766 46.3065 72.3861 46.124 72.4818 45.9342C72.4818 45.7522 72.6638 45.643 72.7366 45.461C72.9016 45.0436 72.988 44.5993 72.9914 44.1505C72.988 43.7018 72.9016 43.2575 72.7366 42.8401C72.7366 42.6581 72.5546 42.5489 72.4818 42.3669C72.3861 42.1771 72.2766 41.9945 72.1541 41.8208L53.9532 19.9797C53.6109 19.5688 53.1823 19.2383 52.6979 19.0118C52.2134 18.7853 51.685 18.6683 51.1502 18.6692C50.2997 18.6675 49.4754 18.9638 48.8205 19.5064C48.4519 19.812 48.1472 20.1873 47.9239 20.6109C47.7005 21.0344 47.563 21.4978 47.519 21.9746C47.475 22.4514 47.5256 22.9321 47.6677 23.3894C47.8098 23.8466 48.0408 24.2713 48.3473 24.6391L61.5612 40.5104H18.3885C17.423 40.5104 16.4971 40.8939 15.8145 41.5765C15.1318 42.2592 14.7483 43.1851 14.7483 44.1505C14.7483 45.116 15.1318 46.0419 15.8145 46.7246C16.4971 47.4072 17.423 47.7907 18.3885 47.7907Z"
                    fill="white"
                  />
                </svg>
              </ProgressNextButton>
            </ProgressBox1>
          </InterviewBoxImage>
        </ProgressBox>
        <LoadingPage></LoadingPage>
      </ProgressBackground>
    </>
  );
};

export default InterviewProgressPage;
