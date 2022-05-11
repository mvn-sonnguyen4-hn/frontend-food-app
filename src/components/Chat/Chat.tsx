import { ENV } from '@app/constants/env';
import { useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { addMessage } from '@app/utils/functions';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@app/redux/store';
import useFirebase from '@app/hooks/useFirebase';
import { MessageDef } from '@app/types/atom.type';
import { io } from 'socket.io-client';

function Chat() {
  const [isShowBoxChat, setIsShowBoxChat] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [messages, setMessages] = useState<MessageDef[]>([]);
  const messagesCollection = useFirebase({
    field: 'messages',
    listener_name: 'sender_id',
    listener_value: user?._id,
    dependent: user?._id
  });
  useEffect(() => {
    if (user?._id && messagesCollection && messagesCollection.length) {
      setMessages(messagesCollection);
    }
  }, [user?._id, messagesCollection]);
  const inputChat = useRef<any>();
  const socket = useRef<any>();

  function auto_grow() {
    inputChat.current.style = '10px';
    inputChat.current.style.height = inputChat.current.scrollHeight + 'px';
  }
  const onKeyPressChatBox = async (e: any) => {
    if (e.shiftKey) {
      return true;
    }
    if (e.key == 'Enter') {
      e.preventDefault();
      if (!e.target.value.trim()) {
        return;
      }
      const content = e.target.value.replace(/\r?\n/g, '/n');
      e.target.value = '';
      const id = uuidv4();
      await addMessage(id, user?._id ?? '', '2', content);
    }
  };
  const renderMessages = () => {
    const result = messages.map((item, index) => {
      const lines = item.content.split('/n');
      const content = lines.map((line, index) => {
        return (
          <p key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </p>
        );
      });
      return (
        <div key={index} className="my-2 relative">
          <div
            className={
              item.sender_id === user?._id
                ? styles.message_user
                : styles.message_admin
            }
          >
            {content}
          </div>
        </div>
      );
    });
    return result;
  };
  const messagesRef = useRef<any>();
  const [arrivalMessage, setArrivalMessage] = useState({
    sender: '',
    text: '',
    createdAt: ''
  });

  useEffect(() => {
    // scroll to bottom after message changed
    if (messagesRef?.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 50;
      inputChat.current.style = '10px';
    }
    socket.current = io(ENV.HOST_SOCKET);
    socket.current.on('getMessage', (data: any) => {
      setMessages(prev => [
        ...prev,
        {
          sender_id: data.senderId,
          receiver_id: data.receiverId,
          content: data.text,
          created_at: data.createAt
        }
      ]);
    });
  }, []);
  return (
    <div className="bg-white fixed bottom-10 right-10 flex-center rounded-full w-[3.5rem] h-[3.5rem]">
      <img
        src={ENV.URL_IMAGE_DEFAULT}
        alt=""
        className="cursor-pointer w-full h-full rounded-full object-cover"
        onClick={() => setIsShowBoxChat(!isShowBoxChat)}
      />
      <span className="absolute right-[-0.5rem] top-0 w-[1.5rem] h-[1.5rem] rounded-full bg-primary flex-center text-white">
        1
      </span>
      {isShowBoxChat && (
        <div className="absolute bottom-[95%] right-[95%] h-[25rem] w-[20rem] bg-white rounded-xl overflow-hidden flex flex-col">
          <div className={styles.title_chat}>
            <div className="flex items-center">
              <img
                src={ENV.URL_IMAGE_DEFAULT}
                className="rounded-full w-[3rem] h-[3rem] mr-2"
                alt=""
              />
              <p>Admin</p>
            </div>
            <div className="flex items-center">
              <span
                className="material-icons-outlined mr-2 cursor-pointer"
                onClick={() => setIsShowBoxChat(false)}
              >
                remove
              </span>
            </div>
          </div>
          <div className="relative flex flex-grow flex-col">
            <div
              className="flex-1 overflow-y-auto px-4 py-3 max-h-[300px] box-messages"
              ref={messagesRef}
            >
              {renderMessages()}
            </div>
            <div className="absolute bottom-0 left-0 flex items-center mb-3 w-full">
              <textarea
                placeholder="Aa"
                ref={inputChat}
                className=" ml-3 flex-1 px-4 outline-none leading-5 py-2 bg-[#f0f2f5] rounded-xl resize-none min-h-[2.5rem] h-[2.5rem] max-h-[5rem] custom-scrollbar"
                onInput={auto_grow}
                onKeyDown={e => {
                  onKeyPressChatBox(e);
                }}
              />
              <button type="button">
                <span className="material-icons text-[#1A6ED8] mx-3 leading-7">
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
