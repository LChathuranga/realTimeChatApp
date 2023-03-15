import React from "react";
import styled from "styled-components";
import LogOut from "../logout/LogOut";

function ChatContainer({ currentChat }) {
  return (
    <>
      {console.log(currentChat)}
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64, ${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="user-name">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
            <LogOut/>
          </div>
          <div className="chat-messages"></div>
          <div className="chat-input"></div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .avatar{
        img{
            height: 3rem;
        }
    }
    .user-name{
        h3{
            color: #fff;
        }
    }
  }
`;

export default ChatContainer;
