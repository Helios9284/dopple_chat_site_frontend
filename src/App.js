import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import Layout from "./layouts";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import MyDopples from "./pages/MyDopples";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import TopCharts from "./pages/TopCharts";
import Category from "./pages/Category";
import Messages from "./pages/Messages";
import Community from "./pages/Community";
import Account from "./pages/Account";
import Create from "./pages/Create";
import WaitingRoom from "./pages/WaitingRoom";
import Contact from "./pages/Contact";
import WaitingRoomWithoutButtons from "./pages/WaitingRoomWithoutButtons";
import Unsubscribe from "./pages/Unsubscribe";
import UncensoredWaitlistModal from "./components/UncensoredWaitlistModal";
import About from "./pages/About";

const App = () => {
  const profile = useSelector(store => store.AuthReducer.profile);
  const [cookies, setCookies] = useCookies(["userid", "profile", "themeid"])
  const [socketState, setSocketState] = useState({});
  const [streamText, setStreamText] = useState({});
  const token = localStorage.getItem("accessToken");

  useMemo(async () => {
    let userid = Math.random().toString(36).slice(2);
    if (!cookies?.userid) setCookies("userid", userid)
    else userid = cookies?.userid

    if (socketState.connected) {
      socketState.disconnect();
    }

    const socket = io(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
      secure: true,
      query: {
        token: token?.replace('Bearer ', '') || '',
        username: profile?.email || cookies?.userid || userid
      }
    });

    setSocketState(socket);

    let textArray = {};
    let currentText = {};
    let text = {};

    socket.on("message", (message) => {
      const chatId = message.chat_id;

      if (!textArray[chatId]) {
        textArray[chatId] = [];
      }

      textArray[chatId].push(message);
    });

    socket.on("connection", () => {
      console.log("new client connected");
    });

    socket.on("joined-room", (room) => {
      console.log("successfully joined", room);
    });

    setInterval(() => {
      Object.keys(textArray).map(function (chatId) {
        const element = textArray[chatId];

        if (!element.length && !currentText[chatId]?.length) {
          delete textArray[chatId];
          text[chatId] = '';
          return setStreamText({ text: '[End_of_Text]' });
        }

        if (!currentText[chatId] || !currentText[chatId].length) {
          const firstElement = element.shift();
          const firstWord = firstElement.message;
          const finishReason = firstElement.finish_reason;

          // if (firstWord === '[End_of_Text]' || finishReason === 'stop') {
          //   text[chatId] = '';
          //   return setStreamText({ text: firstWord });
          // }

          currentText[chatId] = firstWord?.split("");
        }

        if (!currentText[chatId]?.length) {
          text[chatId] = '';
          return;
        }

        const firstTextElement = currentText[chatId]?.shift();

        if (!firstTextElement) {
          text[chatId] = '';
          delete streamText[chatId];
          return setStreamText(streamText);
        }

        if (!text[chatId]) {
          text[chatId] = '';
        }

        text[chatId] += firstTextElement;
        return setStreamText({
          ...streamText,
          [chatId]: { text: text[chatId], chat_id: chatId },
        });
      });
    }, 15);
  }, [cookies.profile])

  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/topcharts" element={<TopCharts />} />
          {/* <Route path="/create" element={<Create />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/waitlist" element={<UncensoredWaitlistModal />} />
          <Route path="/account" element={profile ? <Account /> : <Error404 />} />
          <Route path="/messages" element={<Messages streamText={streamText} />} />
          <Route path="/category/:key" element={<Category />} />
          <Route path="/profile/:key" element={<Profile />} />
          <Route path="/unsubscribe/:email" element={<Unsubscribe />} />
          <Route path="/settings" element={(profile && profile.type === 2) ? <Settings /> : <Error404 />} />
          <Route path="/mydopples" element={profile ? <MyDopples /> : <Error404 />} />
          <Route path="/waitingroom" element={<WaitingRoom />} />
          <Route path="/waitingroom-no-buttons" element={<WaitingRoomWithoutButtons />} />
          <Route path="/error" element={<Error404 />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;