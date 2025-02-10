import { useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import useWindowDimensions from "../hooks/useDimensions";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import SignModal from "../components/SignModal";
import ShareModal from "../components/ShareModal";
import WaitlistModal from "../components/WaitlistModal";
import ChatSettingsModal from "../components/ChatSettingsModal";
import UsernameModal from "../components/UsernameModal";
import { RefContext } from "../contexts/RefContextProvider";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setProfile } from "../redux/reducers/AuthReducer";
import axios from "../utilities/axiosConfig";
import ForgetPasswordModal from "../components/ForgetPasswordModal";
import VerifyModal from "../components/VerifyModal";
import DeleteAccountModal from "../components/DeleteAccountModal";
import { getDaysBetweenDates } from "../utilities/format";
import JoinBar from "../components/JoinBar";
import UncensoredWaitlistModalStep3 from "../components/UncensoredWaitlistModalStep3";
import SetupVaultModal from "../components/SetupVaultModal";
import EnterPinModal from "../components/EnterPinModal";
import SetupVaultMobileModal from "../components/SetupVaultMobileModal";
import EnterPinMobileModal from "../components/EnterPinMobileModal";
import 'react-lazy-load-image-component/src/effects/blur.css';
import MessageSentModal from "../components/MessageSentModal";
import CookieModal from "../components/CookieModal";
import DopplePlusModal from "../components/DopplePlusModal";

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const [openSearch, setOpenSearch] = useState(false);
  const [actionInterval, setActionInterval] = useState(null);
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const loc = useLocation();
  const matches = useMediaQuery('(min-width:1024px)');
  const { themeID, setThemeID, isTyping, setCount, dopple, setAllUsers, dopplesInfo, doppleName, setOpenCookieModal, openChatSettings } = useContext(RefContext);
  const profile = useSelector(store => store.AuthReducer.profile);
  const [cookies, setCookies] = useCookies(["profile", "themeid", "accepted"])

  const _info = dopple ? dopplesInfo.find(y => y.sender === dopple.dopple_name) : (doppleName && dopplesInfo.find(y => y.sender === doppleName))

  useMemo(async () => {
    const username = cookies?.profile?.id || cookies?.profile?._id || cookies?.userid;
    const runEvent = () => axios.post(`/events`, {
      username,
      type: 'user.view',
      source: loc.pathname
    });

    runEvent();
    clearInterval(actionInterval);
    setActionInterval(setInterval(() => runEvent(), 60000));
  }, [loc, cookies])

  useMemo(() => {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    if (screenWidth > 0 && screenHeight > 0) appHeight()
  }, [screenWidth, screenHeight])

  useMemo(() => {
    if (themeID === 0) document.body.style.background = "#141518"
  }, [themeID])

  useMemo(() => {
    if (profile && !cookies.profile) {
      setCookies("profile", JSON.stringify(profile))
    }
  }, [profile, cookies.profile])

  useMemo(async () => {
    if (cookies.profile && (cookies.profile.id || cookies.profile._id)) {
      const data = await axios.get(`/user/${cookies.profile.id || cookies.profile._id}`)
      if (!data.data?.success) return;
      const userData = data.data.data;
      if (userData.orderId) {
        setCount(userData.orderId || 0);
      }
      setAllUsers([userData])
      dispatch(setProfile(userData))
    }
  }, [cookies.profile])

  useMemo(() => {
    if (cookies?.themeid) setThemeID(parseInt(cookies?.themeid))
    else setThemeID(0)
  }, [cookies?.themeid, setThemeID])

  useMemo(() => {
    // Returning user: 3 unique sessions
    if (!localStorage.getItem("sessionCount")) localStorage.setItem("sessionCount", "1")
    else if (parseInt(localStorage.getItem("sessionCount")) === 3) {
      window.fbq("track", "ReturningUser")
      window.ttq.track("ReturningUser")
      window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/QcPCCJbTqdoYEJ2mi4oq' });
    }
    localStorage.setItem("previousSession", new Date() * 1)
    if (Math.abs(new Date() * 1 - parseInt(localStorage.getItem("previousSession"))) / 36e5 >= 1) {
      localStorage.setItem("sessionCount", parseInt(localStorage.getItem("sessionCount")) + 1)
    }

    // Retention
    const now = new Date()
    if (localStorage.getItem("initialSession")) {
      const past = parseInt(localStorage.getItem("initialSession"))
      console.log("You entered after " + getDaysBetweenDates(now, new Date(past)) + " days!")
      if (getDaysBetweenDates(now, new Date(past)) >= 1) {
        window.fbq("track", "D1Return")
        window.ttq.track("AddToWishlist")
        window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/nms9CPyZ694YEJ2mi4oq' })
        window.snaptr("track", "CUSTOM_EVENT_1")
      }
      if (getDaysBetweenDates(now, new Date(past)) >= 3) {
        window.fbq("track", "D3Return")
        window.ttq.track("AddToCart")
        window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/uOwwCP-Z694YEJ2mi4oq' })
        window.snaptr("track", "CUSTOM_EVENT_2")
      }
      if (getDaysBetweenDates(now, new Date(past)) >= 7) {
        window.fbq("track", "D7Return")
        window.ttq.track("InitiateCheckout")
        window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/8PIrCIKa694YEJ2mi4oq' })
        window.snaptr("track", "CUSTOM_EVENT_3")
      }
      if (getDaysBetweenDates(now, new Date(past)) >= 28) {
        window.fbq("track", "D28Return")
        window.ttq.track("CompletePayment")
        window.gtag('event', 'conversion', { 'send_to': 'AW-11295445789/Gr1GCIWa694YEJ2mi4oq' })
        window.snaptr("track", "CUSTOM_EVENT_4")
      }
    }
    localStorage.setItem("initialSession", now * 1)
  }, [])

  useMemo(() => {
    if (cookies?.accepted === "all" || cookies?.accepted === "partially" || profile?.acceptedCookies === "all" || profile?.acceptedCookies === "partially")
      setOpenCookieModal(false)
    else
      setOpenCookieModal(true)
  }, [cookies?.accepted, profile?.acceptedCookies])

  return (
    <div className={"jeans flex flex-col relative overflow-hidden" + (loc.pathname !== "/messages" ? " bg-black15" : (themeID === 0 ? " bg-black15" : themeID === 1 ? " bg-white1" : themeID === 2 ? " bg-white" : themeID === 3 ? " bg-galaxynav" : "") + (loc.pathname === "/messages" ? " h-[100svh]" : " min-h-[100svh]"))}>
      {loc.pathname !== "/account" && !openChatSettings && <JoinBar />}
      {loc.pathname !== "/messages" && loc.pathname !== "/waitingroom" && loc.pathname !== "/waitingroom-no-buttons" &&
        <Header openSearch={openSearch} setOpenSearch={setOpenSearch} />
      }
      <main className={"flex-1 relative" + (loc.pathname === "/messages" ? " h-0" : "")}>
        <div className="h-full">
          {children}
        </div>
      </main>
      {(loc.pathname !== "/messages" && loc.pathname !== "/community" && loc.pathname !== "/waitingroom" && loc.pathname !== "/waitingroom-no-buttons") && <Footer openSearch={openSearch} />}
      {(((!isTyping && !_info) || loc.pathname !== "/messages") && loc.pathname !== "/waitingroom" && loc.pathname !== "/waitingroom-no-buttons") && <Nav openSearch={openSearch} />}
      {openSearch && <div className={`block md1:hidden absolute w-full h-full bg-menuback transition-all z-[3] backdrop-blur-[5px]`} />}

      <SignModal />
      <WaitlistModal />
      <ShareModal />
      <UsernameModal />
      <ForgetPasswordModal />
      <DeleteAccountModal />
      <VerifyModal />
      <UncensoredWaitlistModalStep3 />
      <SetupVaultModal />
      <SetupVaultMobileModal />
      <EnterPinModal />
      <EnterPinMobileModal />
      <MessageSentModal />
      <DopplePlusModal />
      {(loc.pathname === "/" || loc.pathname.includes("/category/")) && <CookieModal />}
      {matches && <ChatSettingsModal />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
