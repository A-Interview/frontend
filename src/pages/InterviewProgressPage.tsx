import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading";
import InterviewBackImage from "../assets/img/InterviewBackImage.png";
import InterviewBox from "../assets/img/InterviewBox.svg";
import axios from "axios";

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
  z-index: 1;
`;

const ProgressBox = styled.div`
  background-image: url(${InterviewBackImage});
  width: 100%;
  height: 100%;
  /* background-size: contain; */
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const InterviewBoxImage = styled.div`
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
  /* border-radius: 1rem;
  border: 0.1px solid white;
  background: transparent;
  backdrop-filter: blur(50px);
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem; */
  /* min-height: 100vh;*/
  padding: 0;
  margin: 0;
  background: linear-gradient(250deg, #a5dc86, #2778c4);
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  text-align: center;
`;

const ProgressCountDown = styled.div`
  border-radius: 2.75rem;
  background: transparent;
  /* box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset; */
  backdrop-filter: blur(50px);
  aspect-ratio: 1/1;
  @media (max-height: 900px) {
    height: 3rem;
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
  width: 120px;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  flex-shrink: 0;
  color: #ffffff;
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  cursor: pointer;
  border-radius: 1rem;
  background: transparent;
  outline: none;
  border: 1px solid white;
`;
const ProgressVideo = styled.video`
  /* top: 9rem; */
  transform: scaleX(-1);
  box-shadow: 0px 0px 0.29790791869163513px 0px rgba(66, 71, 76, 0.32);
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
  width: 99%;
  height: 30%;
  background: rgba(242, 242, 242, 0.15);
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.43);
  border-radius: 2rem;
`;

const InterviewProgressPage = (): JSX.Element => {
  // 페이지 네비게이션
  const navigate = useNavigate();
  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };
  /* ------------------------------------------------------------------------- */
  /* ------------------------------------------------------------------------- */

  // 비디오 관련 코드
  const [cameraToggle, setCameraToggle] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [userProfile, setuserProfile] = useState("");

  // 프로필 이미지 불러오기
  useEffect(() => {
    handlegetImage().catch((error) => {
      console.log("저장 실패:", error);
    });
  }, []);
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
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
        // Handle the error case here
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
    "면접을 시작하시려면 다음 질문을 클릭해주세요."
  );

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

  // 소켓 연결 함수, 메세지 처리 기능
  const connectWebSocket = (): void => {
    const ws = new WebSocket(`ws://localhost:8000/ws/interview/`);

    ws.onopen = () => {
      console.log("WebSocket connected");

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
      setFirstConnected(false);
      const data = JSON.parse(event.data);

      if (data.last_topic_answer != null) {
        setLastTopicAnswer(data.last_topic_answer);
      } else {
        const message: string = data.message;
        const finishReason: string = data.finish_reason;

        if (finishReason === "stop") {
          startRecording();
        }
        console.log("Received message:", message);
        setMessage((m) => m + message);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
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
      console.log("form_id : ", id);
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
    console.log(socket);
    if (socket != null) {
      console.log("send Initial Message");
      const data = {
        formId: postId,
        type: "withoutAudio",
        interviewType,
      };
      socket.send(JSON.stringify(data));
      setCount(10);
      setFirstConnected(false);
      setCurrentQNum((prev) => prev - 1);
      setMessage("");
    }
  };

  // 한 토픽의 마지막 메세지 요청 함수, 응답으로 오는 질문이 없음
  const sendMessageNoReply = (): void => {
    console.log("send Message No Reply");

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
    setMessage("");
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
    console.log("send Message With Audio");
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
          console.log("posted");
        }
        setAudioBlob(null);
      };
      reader.readAsDataURL(audioBlob);
    }
    setMessage("");
    setCount(10);
    setIsPost(true);
    setCurrentQNum((prev) => prev - 1);
  };
  /* ------------------------------------------------------------------------- */
  // 음성 녹음과 관련
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stopTrigger, setStopTrigger] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(false);
  // 10초 카운트 변수
  const [count, setCount] = useState(10);

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

  console.log(recording);

  // 음성 녹음 함수
  const startRecording = (): void => {
    console.log(currentQNum);
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

  // 카운트 다운 함수
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

  // 녹음 중지 함수
  const stopRecording = (): void => {
    if (mediaRecorderRef.current != null) {
      mediaRecorderRef.current.stop(); // Access mediaRecorder from the ref
      setRecording(false);
      setSaveTrigger(true);
    }
  };

  // 녹음 저장 함수
  const saveRecording = (): void => {
    const mergedBlob = new Blob(audioChunks, { type: "audio/wav" });
    setAudioBlob(mergedBlob);
    console.log(audioChunks);
    setAudioChunks([]); // Clear the audioChunks array
  };

  // 녹음 시 필요한 함수
  const handleDataAvailable = (event: BlobEvent): void => {
    setAudioChunks((prevChunks) => [...prevChunks, event.data]);
  };

  const getFormImage = async (): Promise<void> => {
    try {
      const userId: string | null = sessionStorage.getItem("user_id");
      if (userId !== null) {
        const response = await axios.get("/api/users/profile/", {
          params: { pk: userId },
        });
        setuserProfile(response.data);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handlegetImage = async (): Promise<void> => {
    try {
      await getFormImage();
    } catch (error) {
      console.log("오류 발생:", error);
    }
  };
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
        <ProgressBox>
          <InterviewBoxImage>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                justifyContent: "space-between",
                gap: "22rem",
                top: "1rem",
                // backgroundColor: "#fff",
              }}
            >
              <CameraButton
                onClick={() => {
                  setCameraToggle((prev) => !prev);
                }}
                style={{
                  transition: "all ease 0.5s",
                  width: "90px",
                  height: "48px",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  display: "flex",
                  justifyContent: cameraToggle ? "flex-end" : "flex-start",
                  borderRadius: "50px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    borderRadius: "50rem",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "white",
                  }}
                ></div>
              </CameraButton>
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
              <ProgressNextButton
                onClick={() => {
                  if (firstConnected && currentQNum > 0) {
                    sendMessage();
                  } else if (!firstConnected && currentQNum > 0) {
                    setStopTrigger(true);
                    setCount(10);
                  } else if (currentQNum === 0 && !firstConnected) {
                    setStopTrigger(true);
                    setCount(10);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <p>다음 질문</p>
              </ProgressNextButton>
            </div>

            <ProgressBox1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                bottom: "0.4rem",
                position: "absolute",
                zIndex: "1000",
              }}
            >
              <ProgressQuestionText>
                <div
                  style={{
                    position: "absolute",
                    lineHeight: "2.3rem",
                    top: "0",
                  }}
                >
                  {message}
                </div>
              </ProgressQuestionText>
            </ProgressBox1>
          </InterviewBoxImage>
        </ProgressBox>
        <LoadingPage></LoadingPage>
      </ProgressBackground>
    </>
  );
};

export default InterviewProgressPage;
