"use client"

import React, {FC, FormEvent, useEffect, useState} from 'react'
import style from './styles/Chat.module.scss';

import chatIcon from '../../../public/img/icon/chat.svg';
import sendIcon from '../../../public/img/icon/send.svg';
import minimalizeIcon from '../../../public/img/icon/minimalize.svg';
import backIcon from '../../../public/img/icon/back.svg';
import logo from '../../../public/img/icon/logo.svg';
import user from '../../../public/img/icon/user.svg';


import Image from 'next/image';

interface ChatProps{}

const Chat: FC<ChatProps> = () => {

    const [opened, setOpened] = useState<boolean>(false)
    const [conversation, setConversation] = useState<boolean>(false)
    const [currentStyle, setCurrentStyle] = useState<string>('')

    const handleKeyDown = (e: KeyboardEvent)=>{
        if(e.key=='Escape') setOpened(false)
    }

    useEffect(()=>{
        addEventListener('keydown', handleKeyDown)
        return ()=> removeEventListener('keydown', handleKeyDown)
    })

    useEffect(()=>{
        if(!opened) setCurrentStyle('')
        else if(opened&&!conversation) setCurrentStyle(style.startConversation)
        else if(opened&&conversation) setCurrentStyle(style.conversation)
    }, [opened, conversation])

    const handleOpenBigChat = ()=>{
        if(!currentStyle) setOpened(true)
    }

    const handleSendMessage = (e: FormEvent)=>{
        e.preventDefault()
    }

    interface ImessagesArr{
        author: 'shop' | 'me',
        text: string
    } 

    const messagesArr: ImessagesArr[] = [
        {author: 'shop', text: 'Hello, you are messaging our shop. This is the best shop in Poland'},
        {author: 'me', text: 'O siema stary'},
        {author: 'shop', text: 'oisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfo'},
        {author: 'me', text: ' oij asdopf jadiof joaisd joidsa jopfi ajdfo'},
        {author: 'shop', text: ' ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfo'},
        {author: 'me', text: 'oisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfooisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfooisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfooisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfooisajd foaidsj fopasjd foiasdj ofiaj oij asdopf jadiof joaisd joidsa jopfi ajdfo'},
        {author: 'shop', text: 'O'},
    ]

    const messages = messagesArr.map((item, index)=>{
        return(
            <div 
            key={index}//zmień key na time
            className={item.author=='shop'?`${style.messageContainer}`: `${style.messageContainer} ${style.myMessage}`}
            >
                <div className={style.imageContainer}>
                    <Image 
                    src={item.author=='shop'?logo:user} 
                    alt="logo"
                    width={24}
                    height={24}
                    priority={false}
                    />
                </div>
                <div className={style.message}>
                    <div className={style.text}>
                        {item.text}
                    </div>
                    <span className={style.time}>21:37</span>
                </div>
            </div>
        )
    })

    return(
        <div
        className={`${style.Chat} ${currentStyle}`}
        onClick={handleOpenBigChat} 
        >
            {!currentStyle&&
            <Image 
            src={chatIcon} 
            alt="chat icon"
            width={36}
            height={36}
            priority={true}
            />
            }

            {opened&&!conversation&&
            <>
                <div 
                onClick={()=>setOpened(false)} 
                className={style.minimalize}>
                    <Image 
                    src={minimalizeIcon} 
                    alt='minimalize icon'
                    width={40}
                    height={40}
                    priority={false}
                    />
                </div>

                <span className={style.title}>Start a conversation</span>

                <div className={style.startContainer}>
                    <div onClick={()=>setConversation(true)} className={style.container}>
                        <Image 
                        src={sendIcon} 
                        alt="send icon"
                        width={24}
                        height={24}
                        priority={false}
                        />
                        <span>Send a message</span>
                    </div>
                </div>
            </>
            }

            {opened&&conversation&&
            <div className={style.conversation}>
                <div className={style.topBar}>
                    <Image 
                    src={minimalizeIcon} 
                    alt="minimalize icon"
                    width={40}
                    height={40}
                    priority={false}
                    onClick={()=>setOpened(false)}  
                    />
                </div>

                <div className={style.content}>
                    {messages}
                </div>

                <form onClick={handleSendMessage} className={style.writeMessage}>
                        <input type="text" placeholder='Send message...' />
                        <button className={style.sendContainer}>
                            <Image src={sendIcon} alt="send icon"/>
                        </button>
                </form>
            </div>
            }

        </div>
    )
}

export default Chat