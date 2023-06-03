import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: #6497b1;
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const RemoteButton = () => {
  console.log("Remote-App (in remote) rendered");
  const [remoteCounter, setRemoteCounter] = useState(0);

  // Send message to parent && listen messages from parent
  useEffect(() => {
    let unsub;
    let messageTimeout;
    if (window.microAppEventBus) {
      const callback = (name) => {
        console.log(`Hey I am child and I got a new message: ${name}!`);
      };
      unsub = window.microAppEventBus.on("microAppParentEventsBus", callback);

      messageTimeout = setTimeout(() => {
        microAppEventBus.publish(
          "microAppChildEventsBus",
          "Oh, hey from child(remote) app"
        );
      }, 2000);
    }
    return () => {
      unsub && unsub();
      messageTimeout && clearTimeout(messageTimeout);
    };
  }, []);
  return (
    <>
      {/* <p>
        Remote Button counter Harish: {remoteCounter}{" "}
        <Button onClick={() => setRemoteCounter((c) => c + 1)}>Increase</Button>
      </p> */}
      <div class="main-content">
        <h2>Welcome to My Website</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          aliquam tortor augue, sit amet scelerisque lacus dapibus vitae. Donec
          sed massa a dui vestibulum gravida. Aliquam bibendum, enim in
          scelerisque consequat, ligula nulla ullamcorper arcu, in tristique
          magna nunc ac est.
        </p>

        <div class="section">
          <h3 class="section-title">Section 1</h3>
          <p class="section-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            aliquam tortor augue, sit amet scelerisque lacus dapibus vitae.
          </p>
          <div class="image-container">
            <img
              style={{
                width: "4rem",
              }}
              src="https://images.unsplash.com/photo-1485688809171-248861015a63?crop=entropy&cs=srgb&fm=jpg&ixid=M3wyNzIxODF8MHwxfHNlYXJjaHwxfHxtdXNpY3N8ZW58MHx8fHwxNjg1ODE4NjQ1fDA&ixlib=rb-4.0.3&q=85"
              alt="Image 1"
              class="image"
            />
          </div>
          <p class="section-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            aliquam tortor augue, sit amet scelerisque lacus dapibus vitae.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">Section 2</h3>
          <p class="section-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            aliquam tortor augue, sit amet scelerisque lacus dapibus vitae.
          </p>
          <div class="image-container">
            <img
              style={{
                width: "4rem",
              }}
              src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
              alt="Image 2"
              class="image"
            />
          </div>
          <p class="section-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            aliquam tortor augue, sit amet scelerisque lacus dapibus vitae.
          </p>
        </div>
      </div>
    </>
  );
};
export default RemoteButton;
