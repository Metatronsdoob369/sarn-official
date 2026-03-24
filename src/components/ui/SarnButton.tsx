'use client';

import React from 'react';
import styled from 'styled-components';

interface SarnButtonProps {
  label?: string;
  loadingLabel?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const SarnButton = ({ label = 'Signal', loadingLabel = 'Reading', onClick, icon }: SarnButtonProps) => {
  return (
    <StyledWrapper>
      <div className="btn-wrapper">
        <button className="btn" onClick={onClick}>
          {icon ?? (
            <svg className="btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          )}
          <div className="txt-wrapper">
            <div className="txt-1">
              {label.split('').map((char, i) => (
                <span key={i} className="btn-letter">{char}</span>
              ))}
            </div>
            <div className="txt-2">
              {loadingLabel.split('').map((char, i) => (
                <span key={i} className="btn-letter">{char}</span>
              ))}
            </div>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-wrapper {
    position: relative;
    display: inline-block;
  }

  .btn {
    --border-radius: 6px;
    --padding: 4px;
    --transition: 0.4s;
    --button-color: #0d0e13;
    --copper-hue: 30deg;

    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.55em 0.9em 0.55em 0.75em;
    font-family: "Inter", "Segoe UI", sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    background-color: var(--button-color);

    box-shadow:
      inset 0px 1px 1px rgba(184, 108, 42, 0.12),
      inset 0px 2px 2px rgba(184, 108, 42, 0.08),
      inset 0px 4px 4px rgba(255, 255, 255, 0.04),
      0px 1px 1px rgba(0, 0, 0, 0.4),
      0px 2px 4px rgba(0, 0, 0, 0.3);

    border: solid 1px rgba(184, 108, 42, 0.2);
    border-radius: var(--border-radius);
    cursor: pointer;
    position: relative;

    transition:
      box-shadow var(--transition),
      border var(--transition),
      background-color var(--transition);
  }

  .btn::before {
    content: "";
    position: absolute;
    top: calc(0px - var(--padding));
    left: calc(0px - var(--padding));
    width: calc(100% + var(--padding) * 2);
    height: calc(100% + var(--padding) * 2);
    border-radius: calc(var(--border-radius) + var(--padding));
    pointer-events: none;
    background-image: linear-gradient(0deg, #0004, #000a);
    z-index: -1;
    transition: box-shadow var(--transition), filter var(--transition);
    box-shadow:
      0 -8px 8px -6px #0000 inset,
      1px 1px 1px rgba(184, 108, 42, 0.1),
      2px 2px 2px rgba(184, 108, 42, 0.05),
      -1px -1px 1px #0002;
  }

  .btn::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: inherit;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      #b86c2a,
      hsl(var(--copper-hue), 70%, 60%),
      hsla(var(--copper-hue), 70%, 60%, 50%),
      8%,
      transparent
    );
    opacity: 0;
    transition: opacity var(--transition), filter var(--transition);
  }

  .btn-letter {
    position: relative;
    display: inline-block;
    color: #555a68;
    animation: letter-anim 3s ease-in-out infinite;
    transition: color var(--transition), text-shadow var(--transition);
  }

  @keyframes letter-anim {
    50% {
      text-shadow: 0 0 4px rgba(184, 108, 42, 0.6);
      color: #b8bdc8;
    }
  }

  .btn-svg {
    height: 14px;
    width: 14px;
    margin-right: 0.5rem;
    color: #b86c2a;
    animation: flicker 3s linear infinite;
    animation-delay: 0.5s;
    filter: drop-shadow(0 0 3px rgba(184, 108, 42, 0.5));
    transition: color var(--transition), filter var(--transition);
    flex-shrink: 0;
  }

  @keyframes flicker {
    50% { opacity: 0.4; }
  }

  .txt-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 4rem;
  }
  .txt-1, .txt-2 {
    position: absolute;
    white-space: nowrap;
    word-spacing: -1em;
  }
  .txt-1 { animation: appear-anim 1s ease-in-out forwards; }
  .txt-2 { opacity: 0; }

  @keyframes appear-anim {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }

  .btn:focus .txt-1 {
    animation: opacity-anim 0.3s ease-in-out forwards;
    animation-delay: 1s;
  }
  .btn:focus .txt-2 {
    animation: opacity-anim 0.3s ease-in-out reverse forwards;
    animation-delay: 1s;
  }
  @keyframes opacity-anim {
    0%   { opacity: 1; }
    100% { opacity: 0; }
  }

  /* Hover — copper gradient sweep, text darkens into it */
  .btn:hover {
    border: solid 1px rgba(184, 108, 42, 0.5);
    background: linear-gradient(
      270deg,
      rgba(184, 108, 42, 0.55) 0%,
      rgba(212, 145, 74, 0.82) 60%
    );
    color: #0d0e13;
  }
  .btn:hover::before {
    box-shadow:
      0 -8px 8px -6px rgba(184,108,42,0.4) inset,
      0 -16px 16px -8px rgba(184,108,42,0.2) inset,
      1px 1px 1px rgba(184,108,42,0.2);
  }
  .btn:hover .btn-svg {
    color: #0d0e13;
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.4));
    animation: none;
  }
  .btn:hover .btn-letter {
    color: #0d0e13;
    text-shadow: none;
    animation: none;
  }

  /* Active — press down */
  .btn:active {
    scale: 0.92;
    border: solid 1px rgba(184, 108, 42, 0.8);
    background: linear-gradient(
      270deg,
      rgba(140, 80, 28, 0.7) 0%,
      rgba(184, 108, 42, 0.9) 60%
    );
  }
  .btn:active .btn-letter {
    color: #0d0e13;
    animation: none;
  }

  /* Animation delays */
  ${Array.from({ length: 16 }, (_, i) => `
    .btn-letter:nth-child(${i + 1}) { animation-delay: ${i * 0.07}s; }
  `).join('')}
`;

export default SarnButton;
