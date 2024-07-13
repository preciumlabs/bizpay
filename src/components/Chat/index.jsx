import React, { useState, useEffect } from 'react';
import { Launcher } from 'react-beautiful-chat';
import { useApi } from 'api';

const Chat = () => {
  const { getChats } = useApi();
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tmp = messagesList[messagesList.length - 1];
      console.log(tmp);
      if (tmp && tmp.author === 'me') {
        let res = await getChats(tmp.data.text);
        _sendMessage(res.data);
      }
    }
    fetchData();
  }, [messagesList]);

  const _onMessageWasSent = async message => {
    setMessagesList([...messagesList, message]);
    // let res = await getChats(message);
  };

  const _onClickEnter = async message => {
    console.log('message', message);
  };

  const _sendMessage = text => {
    if (text.length > 0) {
      console.log('messages', messagesList);
      setMessagesList([
        ...messagesList,
        {
          author: 'them',
          type: 'text',
          data: { text },
        },
      ]);
    }
  };

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'Ask anything..(AI in training)',
          imageUrl: '/chatbot-logo_2_34x34.png',
        }}
        onMessageWasSent={_onMessageWasSent.bind(this)}
        onKeyPress={_onClickEnter.bind(this)}
        messageList={messagesList}
        showEmoji
      />
    </div>
  );
};

export default Chat;
