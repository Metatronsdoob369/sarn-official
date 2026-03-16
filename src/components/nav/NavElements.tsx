"use client";
import React from "react";

const keyframesCSS = `
  @keyframes chitchat {
    0% { content: "#"; }
    5% { content: "."; }
    10% { content: "^{"; }
    15% { content: "-!"; }
    20% { content: "#$_"; }
    25% { content: "№:0"; }
    30% { content: "#{+.";}
    35% { content: "@}-?";}
    40% { content: "?{4@%";}
    45% { content: "=.,^!";}
    50% { content: "?2@%";}
    55% { content: "\\\\;1}]";}
    60% { content: "?{%:%"; right: 0;}
    65% { content: "|{f[4"; right: 0;}
    70% { content: "{4%0%"; right: 0;}
    75% { content: "'1_0<"; right: 0;}
    80% { content: "{0%"; right: 0;}
    85% { content: "]>'"; right: 0;}
    90% { content: "4"; right: 0;}
    95% { content: "2"; right: 0;}
    100% { content: ""; right: 0;}
  }
`;

export function StatusBar() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .status-btn {
          margin: 0;
          height: auto;
          background: transparent;
          padding: 0;
          border: none;
          cursor: pointer;
          --border-right: 2px;
          --text-color: rgba(255, 255, 255, 0.4);
          --animation-color: #ff8c42;
          letter-spacing: 2px;
          text-decoration: none;
          position: relative;
          text-transform: uppercase;
          color: var(--text-color);
        }
        .status-hover-text {
          position: absolute;
          box-sizing: border-box;
          content: attr(data-text);
          color: var(--animation-color);
          width: 0%;
          inset: 0;
          border-right: var(--border-right) solid var(--animation-color);
          overflow: hidden;
          transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }
        .status-btn:hover .status-hover-text {
          width: 100%;
          filter: drop-shadow(0 0 10px rgba(255, 140, 66, 0.5));
        }
      `}} />
      <button data-text="STATUS: GOVERNED" className="status-btn font-mono text-[10px] tracking-widest hidden lg:block">
        <span className="actual-text">&nbsp;STATUS: GOVERNED&nbsp;</span>
        <span className="status-hover-text" aria-hidden="true">&nbsp;STATUS: GOVERNED&nbsp;</span>
      </button>
    </>
  );
}

export function DecodeLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        ${keyframesCSS}
        .decode-link {
          --btn-transition: 0.3s;
          --btn-letter-spacing: 0.1rem;
          --btn-animation-duration: 1.2s;
          --hover-btn-color: #8effa6;
          --default-btn-color: #a3a3a3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--default-btn-color);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: var(--btn-transition);
          position: relative;
        }
        .decode-link span {
          letter-spacing: var(--btn-letter-spacing);
          transition: var(--btn-transition);
          box-sizing: border-box;
          position: relative;
          background: transparent;
        }
        .decode-link span::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          background: transparent;
          color: var(--hover-btn-color);
        }
        .decode-link:hover span {
          color: var(--hover-btn-color);
        }
        .decode-link:hover span::before {
          animation: chitchat linear both var(--btn-animation-duration);
        }
      `}} />
      <a href={href} className="decode-link font-mono text-xs tracking-widest">
        <span>{children}</span>
      </a>
    </>
  );
}

export function InitializeButton() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        ${keyframesCSS}
        .init-btn {
          --btn-default-bg: #ff8c42;
          --btn-padding: 10px 24px;
          --btn-hover-bg: #0a0a0a;
          --btn-transition: 0.4s;
          --btn-letter-spacing: 0.1rem;
          --btn-animation-duration: 1.2s;
          --hover-btn-color: #ff8c42;
          --default-btn-color: #050505;
          box-sizing: border-box;
          border-radius: 4px;
          padding: var(--btn-padding);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--default-btn-color);
          background: var(--btn-default-bg);
          border: 1px solid #ff8c42;
          cursor: pointer;
          transition: var(--btn-transition);
          position: relative;
        }
        .init-btn span {
          letter-spacing: var(--btn-letter-spacing);
          transition: var(--btn-transition);
          box-sizing: border-box;
          position: relative;
          background: inherit;
        }
        .init-btn span::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          background: inherit;
          color: var(--hover-btn-color);
        }
        .init-btn:hover {
          background: var(--btn-hover-bg);
          color: var(--hover-btn-color);
          box-shadow: 0 0 15px rgba(255, 140, 66, 0.4);
        }
        .init-btn:hover span {
          color: var(--hover-btn-color);
        }
        .init-btn:hover span::before {
          animation: chitchat linear both var(--btn-animation-duration);
        }
      `}} />
      <button className="init-btn font-mono text-xs font-bold tracking-widest uppercase">
        <span>INITIALIZE</span>
      </button>
    </>
  );
}
