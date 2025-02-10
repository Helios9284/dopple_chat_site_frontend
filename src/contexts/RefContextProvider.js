import { createContext, useState } from "react";

export const RefContext = createContext(null);

export default function RefContextProvider({ children }) {
  const [isTyping, setIsTyping] = useState(false);
  const [themeID, setThemeID] = useState(0);
  const [dopple, setDopple] = useState();
  const [openChatSettings, setOpenChatSettings] = useState(false);
  const [alignment, setAlignment] = useState(1);
  const [language, setLanguage] = useState(0);
  const [textSize, setTextSize] = useState(16);
  const [history, setHistory] = useState([]);
  const [dopples, setDopples] = useState([]);
  const [doppleName, setDoppleName] = useState();
  const [dopplesInfo, setDopplesInfo] = useState([]);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [openMessageSentModal, setOpenMessageSentModal] = useState(false);
  const [openCookieModal, setOpenCookieModal] = useState(false);
  const [openChatSettingsModal, setOpenChatSettingsModal] = useState(false);
  const [openSetupVaultModal, setOpenSetupVaultModal] = useState(false);
  const [openSetupVaultMobileModal, setOpenSetupVaultMobileModal] = useState(false);
  const [openPinCodeModal, setOpenPinCodeModal] = useState(false);
  const [openEnterPinMobileModal, setOpenEnterPinMobileModal] = useState(false);

  const [openPinConfirmModal, setOpenPinConfirmModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [openArchiveConfirmModal, setOpenArchiveConfirmModal] = useState(false);
  const [openUnarchiveConfirmModal, setOpenUnarchiveConfirmModal] = useState(false);
  const [openDuplicateConfirmModal, setOpenDuplicateConfirmModal] = useState(false);
  const [openClearConfirmModal, setOpenClearConfirmModal] = useState(false);
  const [openVoiceCaptionsModal, setOpenVoiceCaptionsModal] = useState(false);
  const [openDopplePlusModal, setOpenDopplePlusModal] = useState(false);
  const [openLLMActivateModal, setOpenLLMActivateModal] = useState(false);
  const [openDeleteDoppleConfirmModal, setOpenDeleteDoppleConfirmModal] = useState(false);
  const [openDeleteThreadConfirmModal, setOpenDeleteThreadConfirmModal] = useState(false);
  const [openShareDoppleConfirmModal, setOpenShareDoppleConfirmModal] = useState(false);

  const [deleteThreadConfirmContent, setDeleteThreadConfirmContent] = useState();
  const [deleteDoppleConfirmContent, setDeleteDoppleConfirmContent] = useState();
  const [shareDoppleConfirmContent, setShareDoppleConfirmContent] = useState();
  const [pinConfirmContent, setPinConfirmContent] = useState();
  const [deleteConfirmContent, setDeleteConfirmContent] = useState();
  const [archiveConfirmContent, setArchiveConfirmContent] = useState();
  const [unarchiveConfirmContent, setUnarchiveConfirmContent] = useState();
  const [duplicateConfirmContent, setDuplicateConfirmContent] = useState();
  const [clearConfirmContent, setClearConfirmContent] = useState();
  const [voiceCaptionConfirmContent, setVoiceCaptionConfirmContent] = useState();

  const [allUsers, setAllUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [openUncensoredWaitlistModalStep3, setOpenUncensoredWaitlistModalStep3] = useState(false);
  const [exists, setExists] = useState(false);
  const [openSignModal, setOpenSignModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [hasAccessToLLM, setHasAccessToLLM] = useState();
  const [loadedMsgs, setLoadedMsgs] = useState(true);
  const [loadedDopples, setLoadedDopples] = useState(false);

  return <RefContext.Provider value={{
    openUncensoredWaitlistModalStep3, setOpenUncensoredWaitlistModalStep3, joinedWaitlist, setJoinedWaitlist, count, setCount, dopplesInfo, setDopplesInfo, doppleName, setDoppleName,
    openChatSettingsModal, setOpenChatSettingsModal, openMessageSentModal, setOpenMessageSentModal,
    openCookieModal, setOpenCookieModal, openDopplePlusModal, setOpenDopplePlusModal,
    openSetupVaultModal, setOpenSetupVaultModal, openSetupVaultMobileModal, setOpenSetupVaultMobileModal,
    openPinCodeModal, setOpenPinCodeModal, openEnterPinMobileModal, setOpenEnterPinMobileModal,
    pinConfirmContent, setPinConfirmContent, openPinConfirmModal, setOpenPinConfirmModal,
    deleteConfirmContent, setDeleteConfirmContent, openDeleteConfirmModal, setOpenDeleteConfirmModal,
    archiveConfirmContent, setArchiveConfirmContent, openArchiveConfirmModal, setOpenArchiveConfirmModal,
    unarchiveConfirmContent, setUnarchiveConfirmContent, openUnarchiveConfirmModal, setOpenUnarchiveConfirmModal,
    duplicateConfirmContent, setDuplicateConfirmContent, openDuplicateConfirmModal, setOpenDuplicateConfirmModal,
    clearConfirmContent, setClearConfirmContent, openClearConfirmModal, setOpenClearConfirmModal,
    voiceCaptionConfirmContent, setVoiceCaptionConfirmContent, openVoiceCaptionsModal, setOpenVoiceCaptionsModal,
    openLLMActivateModal, setOpenLLMActivateModal,
    deleteThreadConfirmContent, setDeleteThreadConfirmContent, openDeleteThreadConfirmModal, setOpenDeleteThreadConfirmModal,
    deleteDoppleConfirmContent, setDeleteDoppleConfirmContent, openDeleteDoppleConfirmModal, setOpenDeleteDoppleConfirmModal,
    shareDoppleConfirmContent, setShareDoppleConfirmContent, openShareDoppleConfirmModal, setOpenShareDoppleConfirmModal,
    exists, setExists, openSignModal, setOpenSignModal,
    allUsers, setAllUsers, navCollapsed, setNavCollapsed, history, setHistory, isTyping, setIsTyping, themeID, setThemeID, dopple, setDopple, openChatSettings, setOpenChatSettings, language, setLanguage, alignment, setAlignment, textSize, setTextSize, dopples, setDopples,
    sending, setSending, hasAccessToLLM, setHasAccessToLLM, loadedMsgs, setLoadedMsgs, loadedDopples, setLoadedDopples
  }}>{children}</RefContext.Provider>
};