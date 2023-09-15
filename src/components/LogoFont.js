import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PUBLIC from "../assets/module/PUBLIC";

function LogoFont() {
  const [logoIdx, setLogoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIdx((prevIndex) => (prevIndex + 1) % 7);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LogoStyle>
      <img
        src={`${PUBLIC}/images/logo_font_svg/logo${logoIdx}.svg`}
        alt="반스 로고 디자인"
      />
    </LogoStyle>
  );
}

const LogoStyle = styled.div`
  img {
    width: 80%;
  }
`;

export default LogoFont;
