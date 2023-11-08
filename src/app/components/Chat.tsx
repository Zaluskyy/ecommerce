"use client";

import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import style from "./styles/Chat.module.scss";
import Image from "next/image";

import chatIcon from "../../../public/img/icon/chat.svg";
import sendIcon from "../../../public/img/icon/send.svg";
import minimalizeIcon from "../../../public/img/icon/minimalize.svg";
import logo from "../../../public/img/icon/logo.svg";
import user from "../../../public/img/icon/user.svg";

import ButtonAnimation from "../UI/ButtonAnimation";

import { useCookies } from "react-cookie";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  interface ImessagesArr {
    createdAt: Date;
    text: string;
    token: string;
    user: boolean;
  }

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [cookies, setCookie] = useCookies(["conversationToken"]);

  const [opened, setOpened] = useState<boolean>(false);
  const [conversation, setConversation] = useState<boolean>(false);
  const [currentStyle, setCurrentStyle] = useState<string>("");

  const [newMessage, setNewMessage] = useState<string>("");
  const [messagesArr, setMessagesArr] = useState<ImessagesArr[]>([]);

  const [token, setToken] = useState<string>("");

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    function generateSessionId(length: number) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let sessionId = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        sessionId += charset[randomIndex];
      }
      return sessionId;
    }

    const tokenFromCookies = cookies.conversationToken || "";

    if (tokenFromCookies == "") {
      const newToken = generateSessionId(20);
      setCookie("conversationToken", newToken);
      setToken(newToken);
    } else {
      setToken(tokenFromCookies);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Escape") setOpened(false);
  };

  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (!opened) setCurrentStyle("");
    else if (opened && !conversation) setCurrentStyle(style.startConversation);
    else if (opened && conversation) setCurrentStyle(style.conversation);
  }, [opened, conversation]);

  const handleOpenBigChat = () => {
    if (!currentStyle) setOpened(true);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage == "") return;
    try {
      await addDoc(messagesRef, {
        createdAt: new Date(),
        text: newMessage,
        token,
        user: true,
      });
      setNewMessage("");
    } catch {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    const queryMessage = query(
      messagesRef,
      where("token", "==", token),
      orderBy("createdAt")
    );

    let timeId: NodeJS.Timeout;

    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const newMessagesArr: ImessagesArr[] = snapshot.docs.map((doc) => ({
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        token: doc.data().token,
        user: doc.data().user,
      }));

      setMessagesArr(newMessagesArr);
      timeId = setTimeout(() => {
        if (contentRef.current)
          contentRef.current.scrollTop = contentRef.current.scrollHeight + 100;
      }, 50);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeId);
    };
  }, [token]);

  const messages = messagesArr.map((item) => {
    return (
      <div
        key={item.createdAt.getTime()}
        className={
          item.user
            ? `${style.messageContainer} ${style.myMessage}`
            : `${style.messageContainer}`
        }
      >
        <div className={style.imageContainer}>
          <Image
            src={item.user ? user : logo}
            alt="logo"
            width={24}
            height={24}
            priority={false}
          />
        </div>
        <div className={style.message}>
          <div className={style.text}>{item.text}</div>
          <span className={style.time}>{`${item.createdAt.getHours()}:${
            item.createdAt.getMinutes() < 10
              ? "0" + item.createdAt.getMinutes()
              : item.createdAt.getMinutes()
          }`}</span>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`${style.Chat} ${currentStyle}`}
      onClick={handleOpenBigChat}
    >
      {!currentStyle && (
        <Image
          src={chatIcon}
          alt="chat icon"
          width={36}
          height={36}
          priority={true}
        />
      )}

      {opened && !conversation && (
        <>
          <div onClick={() => setOpened(false)} className={style.minimalize}>
            <Image
              src={minimalizeIcon}
              alt="minimalize icon"
              width={40}
              height={40}
              priority={false}
            />
          </div>

          <span className={style.title}>Start a conversation</span>

          <div className={style.startContainer}>
            <ButtonAnimation
              onClick={() => setConversation(true)}
              className={style.container}
            >
              <Image
                src={sendIcon}
                alt="send icon"
                width={24}
                height={24}
                priority={false}
              />
              <span>Send a message</span>
            </ButtonAnimation>
          </div>
        </>
      )}

      {opened && conversation && (
        <div className={style.conversation}>
          <div className={style.topBar}>
            <Image
              src={minimalizeIcon}
              alt="minimalize icon"
              width={40}
              height={40}
              priority={false}
              onClick={() => setOpened(false)}
            />
          </div>

          <div ref={contentRef} className={style.content}>
            {messages}
          </div>

          <form onClick={handleSendMessage} className={style.writeMessage}>
            <input
              type="text"
              placeholder="Send message..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <ButtonAnimation className={style.sendContainer}>
              <Image src={sendIcon} alt="send icon" />
            </ButtonAnimation>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
