import type { GetStaticProps } from "next";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import DynamicRemoteApp from "../components/DynamicRemoteApp";
import styled from "@emotion/styled";
// import ""
const Button = styled.button`
  background-color: #4caf50;
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

const SkeletonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
`;

type Props = {
  innerHTMLContent: string;
};

const Home = ({ innerHTMLContent }: Props) => {
  console.log("Home rendered");

  const [parentCounter, setParentCounter] = useState(0);

  return (
    <>
      <div className="headerContent">
        <p>Hello from NextJS</p>
        <title>Header Example</title>

        <header>
          <div className="header-content">
            <div className="logo">
              <img
                className="logo"
                src={
                  "https://images.unsplash.com/photo-1541167789142-b241ead81115?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
                }
              />
            </div>
            <h1>Microfronted Sample Project in Next.js</h1>
            <p>
             These Project is build in the next.js and contains two main parts one is Header and Body Content and Footer
            </p>
            <ul className="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            <a href="#" className="cta-button">
              Learn More
            </a>
            <div className="header-info">
              <div className="info-box">
                <h3>Location</h3>
                <p>123 Main Street, City, Country</p>
              </div>
              <div className="info-box">
                <h3>Phone</h3>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="bodyContent">
        <DynamicRemoteApp
          remoteAppInfo={{
            url: "http://localhost:3001/remoteEntry.js",
            scope: "TestRemote",
            module: "./RemoteButtonApp",
          }}
          innerHTMLContent={innerHTMLContent}
          skeletonThreshold={500}
          skeleton={
            <SkeletonWrapper>
              <ContentLoader
                speed={1}
                width={380}
                height={84}
                viewBox="0 0 380 84"
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect x="0" y="4" rx="0" ry="0" width="210" height="13" />
                <rect x="220" y="4" rx="0" ry="0" width="50" height="13" />
              </ContentLoader>
            </SkeletonWrapper>
          }
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const preReadyEmotionStyles = [];
  // This will be an express server in your custom host
  const preRender = await fetch("http://localhost:3002/prerender").then((res) =>
    res.json()
  );

  preReadyEmotionStyles.push({
    key: preRender.appName,
    styleId: preRender.styleId,
    styles: preRender.styles,
  });

  return {
    props: {
      innerHTMLContent: preRender.content,
      preReadyEmotionStyles,
    },
  };
};
export default Home;
