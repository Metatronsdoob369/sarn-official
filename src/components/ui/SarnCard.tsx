'use client';

import React from 'react';
import styled from 'styled-components';

interface SarnCardProps {
  label?: string;
  value?: string;
  sub?: string;
  children?: React.ReactNode;
}

const SarnCard = ({ label = 'SARN+', value = 'Signal', sub, children }: SarnCardProps) => {
  return (
    <StyledWrapper>
      <div className="outer">
        <div className="card">
          <div className="ray" />

          {/* Corner brackets — machined */}
          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />

          {/* Horizontal rule lines */}
          <div className="line topl" />
          <div className="line bottoml" />

          {/* Vertical rule lines */}
          <div className="line leftl" />
          <div className="line rightl" />

          <div className="content">
            <div className="label">{label}</div>
            <div className="divider" />
            <div className="value">{value}</div>
            {sub && <div className="sub">{sub}</div>}
            {children}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-block;

  .outer {
    /* portrait display card */
    width: 180px;
    height: 260px;
    border-radius: 8px;
    padding: 1px;
    background: radial-gradient(circle 200px at 20% 10%, #b86c2a55, #0d0e13 70%);
    position: relative;

    /* reflection — sits on a surface */
    -webkit-box-reflect: below 6px linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.0) 0%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }

  .card {
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    border: solid 1px #1e1f24;
    background: radial-gradient(circle 220px at 20% 10%, #1c1d22, #0d0e13 80%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Copper ray — top-left sweep */
  .ray {
    width: 160px;
    height: 30px;
    border-radius: 100px;
    position: absolute;
    background-color: #b86c2a;
    opacity: 0.12;
    box-shadow: 0 0 30px #b86c2a88;
    filter: blur(10px);
    transform-origin: 10%;
    top: -5%;
    left: -10%;
    transform: rotate(35deg);
    pointer-events: none;
  }

  /* Corner bracket marks */
  .corner-tl, .corner-tr, .corner-bl, .corner-br {
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: rgba(184, 108, 42, 0.35);
    border-style: solid;
    border-width: 0;
  }
  .corner-tl { top: 10px;    left: 10px;   border-top-width: 1px;    border-left-width: 1px; }
  .corner-tr { top: 10px;    right: 10px;  border-top-width: 1px;    border-right-width: 1px; }
  .corner-bl { bottom: 10px; left: 10px;   border-bottom-width: 1px; border-left-width: 1px; }
  .corner-br { bottom: 10px; right: 10px;  border-bottom-width: 1px; border-right-width: 1px; }

  /* Rule lines */
  .line {
    position: absolute;
    background-color: #1e1f22;
  }
  .topl {
    width: 100%; height: 1px;
    top: 22%;
    background: linear-gradient(90deg, #b86c2a33 0%, #1d1f1f 70%);
  }
  .bottoml {
    width: 100%; height: 1px;
    bottom: 22%;
    background: linear-gradient(90deg, #1d1f1f 30%, #b86c2a22 100%);
  }
  .leftl {
    width: 1px; height: 100%;
    left: 15%;
    background: linear-gradient(180deg, #b86c2a22 0%, #1d1f1f 60%);
  }
  .rightl {
    width: 1px; height: 100%;
    right: 15%;
    background: linear-gradient(180deg, #1d1f1f 40%, #b86c2a11 100%);
  }

  /* Content */
  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .label {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: linear-gradient(160deg, #d4914a 0%, #e8c49a 50%, #b86c2a 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .divider {
    width: 32px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #b86c2a66, transparent);
  }

  .value {
    font-family: 'Inter', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #555a68;
  }

  .sub {
    font-family: 'Inter', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #2e3040;
    margin-top: 2px;
  }
`;

export default SarnCard;
