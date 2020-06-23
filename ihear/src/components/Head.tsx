import React from 'react';
import { Helmet } from 'react-helmet';
import * as theme from './theme';

export const globalStyleSheet = `
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 1em;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.FONT_FAMILY_SANS};
    font-weight: ${theme.FONT_WEIGHT_REGULAR};
    position: relative;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: ${theme.TEXT_COLOR};
    font-weight: 400;
    line-height: 1.45;
  }

  input, button, optgroup, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    background-color: inherit;
    font: inherit;
    margin: 0;
  }

  p {margin-bottom: 1.3em;}

  h1, h2, h3, h4 {
    margin: 0.414em 0 0.5em;
    font-weight: inherit;
    line-height: 1.2;
  }

  h1 {
    margin-top: 0;
    font-size: 3.157em;
  }

  h2 {font-size: 2.369em;}

  h3 {font-size: 1.777em;}

  h4 {font-size: 1.333em;}

  small, .font_small {font-size: 0.75em;}

  ::placeholder {
    font-size: 1em;
    color: ${theme.PLACEHOLDER_COLOR};
  }

  a:link,
  a:visited,
  a:active,
  a:hover {
    color: ${theme.TEXT_COLOR};
  }

  svg {
    overflow: overlay;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(255, 255, 255, 0);
    -webkit-border-radius: 100px;
  }
  ::-webkit-scrollbar:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.65);
    -webkit-border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 200, 200, 0.75);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgba(200, 200, 200, 0.80);
  }

  ::-webkit-scrollbar-thumb:vertical {
    min-height: 10px;
  }
  ::-webkit-scrollbar-thumb:horizontal {
    min-width: 10px;
  }
  .tippy-touch {
    cursor: pointer !important;
  }
  .tippy-notransition {
    transition: none !important;
  }
  .tippy-popper {
    max-width: 400px;
    -webkit-perspective: 800px;
    perspective: 800px;
    z-index: 9999;
    outline: 0;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    pointer-events: none;
  }
  .tippy-popper.html-template {
    max-width: 96%;
    max-width: calc(100% - 20px);
  }
  .tippy-popper[x-placement^='top'] [x-arrow] {
    border-top: 7px solid #333;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    bottom: -7px;
    margin: 0 9px;
  }
  .tippy-popper[x-placement^='top'] [x-arrow].arrow-small {
    border-top: 5px solid #333;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -5px;
  }
  .tippy-popper[x-placement^='top'] [x-arrow].arrow-big {
    border-top: 10px solid #333;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    bottom: -10px;
  }
  .tippy-popper[x-placement^='top'] [x-circle] {
    -webkit-transform-origin: 0 33%;
    transform-origin: 0 33%;
  }
  .tippy-popper[x-placement^='top'] [x-circle].enter {
    -webkit-transform: scale(1) translate(-50%, -55%);
    transform: scale(1) translate(-50%, -55%);
    opacity: 1;
  }
  .tippy-popper[x-placement^='top'] [x-circle].leave {
    -webkit-transform: scale(0.15) translate(-50%, -50%);
    transform: scale(0.15) translate(-50%, -50%);
    opacity: 0;
  }
  .tippy-popper[x-placement^='top'] .tippy-tooltip.light-theme [x-circle] {
    background-color: #fff;
  }
  .tippy-popper[x-placement^='top'] .tippy-tooltip.light-theme [x-arrow] {
    border-top: 7px solid #fff;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
  }
  .tippy-popper[x-placement^='top']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-small {
    border-top: 5px solid #fff;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  .tippy-popper[x-placement^='top']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-big {
    border-top: 10px solid #fff;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
  .tippy-popper[x-placement^='top'] .tippy-tooltip.transparent-theme [x-circle] {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .tippy-popper[x-placement^='top'] .tippy-tooltip.transparent-theme [x-arrow] {
    border-top: 7px solid rgba(0, 0, 0, 0.7);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
  }
  .tippy-popper[x-placement^='top']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-small {
    border-top: 5px solid rgba(0, 0, 0, 0.7);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  .tippy-popper[x-placement^='top']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-big {
    border-top: 10px solid rgba(0, 0, 0, 0.7);
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
  .tippy-popper[x-placement^='top'] [data-animation='perspective'] {
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
  }
  .tippy-popper[x-placement^='top'] [data-animation='perspective'].enter {
    opacity: 1;
    -webkit-transform: translateY(-10px) rotateX(0);
    transform: translateY(-10px) rotateX(0);
  }
  .tippy-popper[x-placement^='top'] [data-animation='perspective'].leave {
    opacity: 0;
    -webkit-transform: translateY(0) rotateX(90deg);
    transform: translateY(0) rotateX(90deg);
  }
  .tippy-popper[x-placement^='top'] [data-animation='fade'].enter {
    opacity: 1;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  .tippy-popper[x-placement^='top'] [data-animation='fade'].leave {
    opacity: 0;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  .tippy-popper[x-placement^='top'] [data-animation='shift'].enter {
    opacity: 1;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  .tippy-popper[x-placement^='top'] [data-animation='shift'].leave {
    opacity: 0;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  .tippy-popper[x-placement^='top'] [data-animation='scale'].enter {
    opacity: 1;
    -webkit-transform: translateY(-10px) scale(1);
    transform: translateY(-10px) scale(1);
  }
  .tippy-popper[x-placement^='top'] [data-animation='scale'].leave {
    opacity: 0;
    -webkit-transform: translateY(0) scale(0);
    transform: translateY(0) scale(0);
  }
  .tippy-popper[x-placement^='bottom'] [x-arrow] {
    border-bottom: 7px solid #333;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    top: -7px;
    margin: 0 9px;
  }
  .tippy-popper[x-placement^='bottom'] [x-arrow].arrow-small {
    border-bottom: 5px solid #333;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    top: -5px;
  }
  .tippy-popper[x-placement^='bottom'] [x-arrow].arrow-big {
    border-bottom: 10px solid #333;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    top: -10px;
  }
  .tippy-popper[x-placement^='bottom'] [x-circle] {
    -webkit-transform-origin: 0 -50%;
    transform-origin: 0 -50%;
  }
  .tippy-popper[x-placement^='bottom'] [x-circle].enter {
    -webkit-transform: scale(1) translate(-50%, -45%);
    transform: scale(1) translate(-50%, -45%);
    opacity: 1;
  }
  .tippy-popper[x-placement^='bottom'] [x-circle].leave {
    -webkit-transform: scale(0.15) translate(-50%, -5%);
    transform: scale(0.15) translate(-50%, -5%);
    opacity: 0;
  }
  .tippy-popper[x-placement^='bottom'] .tippy-tooltip.light-theme [x-circle] {
    background-color: #fff;
  }
  .tippy-popper[x-placement^='bottom'] .tippy-tooltip.light-theme [x-arrow] {
    border-bottom: 7px solid #fff;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-small {
    border-bottom: 5px solid #fff;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-big {
    border-bottom: 10px solid #fff;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.transparent-theme
    [x-circle] {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.transparent-theme
    [x-arrow] {
    border-bottom: 7px solid rgba(0, 0, 0, 0.7);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-small {
    border-bottom: 5px solid rgba(0, 0, 0, 0.7);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  .tippy-popper[x-placement^='bottom']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-big {
    border-bottom: 10px solid rgba(0, 0, 0, 0.7);
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='perspective'] {
    -webkit-transform-origin: top;
    transform-origin: top;
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='perspective'].enter {
    opacity: 1;
    -webkit-transform: translateY(10px) rotateX(0);
    transform: translateY(10px) rotateX(0);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='perspective'].leave {
    opacity: 0;
    -webkit-transform: translateY(0) rotateX(-90deg);
    transform: translateY(0) rotateX(-90deg);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='fade'].enter {
    opacity: 1;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='fade'].leave {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='shift'].enter {
    opacity: 1;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='shift'].leave {
    opacity: 0;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='scale'].enter {
    opacity: 1;
    -webkit-transform: translateY(10px) scale(1);
    transform: translateY(10px) scale(1);
  }
  .tippy-popper[x-placement^='bottom'] [data-animation='scale'].leave {
    opacity: 0;
    -webkit-transform: translateY(0) scale(0);
    transform: translateY(0) scale(0);
  }
  .tippy-popper[x-placement^='left'] [x-arrow] {
    border-left: 7px solid #333;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    right: -7px;
    margin: 6px 0;
  }
  .tippy-popper[x-placement^='left'] [x-arrow].arrow-small {
    border-left: 5px solid #333;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    right: -5px;
  }
  .tippy-popper[x-placement^='left'] [x-arrow].arrow-big {
    border-left: 10px solid #333;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    right: -10px;
  }
  .tippy-popper[x-placement^='left'] [x-circle] {
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
  }
  .tippy-popper[x-placement^='left'] [x-circle].enter {
    -webkit-transform: scale(1) translate(-50%, -50%);
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
  .tippy-popper[x-placement^='left'] [x-circle].leave {
    -webkit-transform: scale(0.15) translate(-50%, -50%);
    transform: scale(0.15) translate(-50%, -50%);
    opacity: 0;
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.light-theme [x-circle] {
    background-color: #fff;
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.light-theme [x-arrow] {
    border-left: 7px solid #fff;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
  .tippy-popper[x-placement^='left']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-small {
    border-left: 5px solid #fff;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .tippy-popper[x-placement^='left']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-big {
    border-left: 10px solid #fff;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.transparent-theme [x-circle] {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.transparent-theme [x-arrow] {
    border-left: 7px solid rgba(0, 0, 0, 0.7);
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
  .tippy-popper[x-placement^='left']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-small {
    border-left: 5px solid rgba(0, 0, 0, 0.7);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .tippy-popper[x-placement^='left']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-big {
    border-left: 10px solid rgba(0, 0, 0, 0.7);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .tippy-popper[x-placement^='left'] [data-animation='perspective'] {
    -webkit-transform-origin: right;
    transform-origin: right;
  }
  .tippy-popper[x-placement^='left'] [data-animation='perspective'].enter {
    opacity: 1;
    -webkit-transform: translateX(-10px) rotateY(0);
    transform: translateX(-10px) rotateY(0);
  }
  .tippy-popper[x-placement^='left'] [data-animation='perspective'].leave {
    opacity: 0;
    -webkit-transform: translateX(0) rotateY(-90deg);
    transform: translateX(0) rotateY(-90deg);
  }
  .tippy-popper[x-placement^='left'] [data-animation='fade'].enter {
    opacity: 1;
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  .tippy-popper[x-placement^='left'] [data-animation='fade'].leave {
    opacity: 0;
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  .tippy-popper[x-placement^='left'] [data-animation='shift'].enter {
    opacity: 1;
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }
  .tippy-popper[x-placement^='left'] [data-animation='shift'].leave {
    opacity: 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  .tippy-popper[x-placement^='left'] [data-animation='scale'].enter {
    opacity: 1;
    -webkit-transform: translateX(-10px) scale(1);
    transform: translateX(-10px) scale(1);
  }
  .tippy-popper[x-placement^='left'] [data-animation='scale'].leave {
    opacity: 0;
    -webkit-transform: translateX(0) scale(0);
    transform: translateX(0) scale(0);
  }
  .tippy-popper[x-placement^='right'] [x-arrow] {
    border-right: 7px solid #333;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    left: -7px;
    margin: 6px 0;
  }
  .tippy-popper[x-placement^='right'] [x-arrow].arrow-small {
    border-right: 5px solid #333;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    left: -5px;
  }
  .tippy-popper[x-placement^='right'] [x-arrow].arrow-big {
    border-right: 10px solid #333;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    left: -10px;
  }
  .tippy-popper[x-placement^='right'] [x-circle] {
    -webkit-transform-origin: -50% 0;
    transform-origin: -50% 0;
  }
  .tippy-popper[x-placement^='right'] [x-circle].enter {
    -webkit-transform: scale(1) translate(-50%, -50%);
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
  .tippy-popper[x-placement^='right'] [x-circle].leave {
    -webkit-transform: scale(0.15) translate(-50%, -50%);
    transform: scale(0.15) translate(-50%, -50%);
    opacity: 0;
  }
  .tippy-popper[x-placement^='right'] .tippy-tooltip.light-theme [x-circle] {
    background-color: #fff;
  }
  .tippy-popper[x-placement^='right'] .tippy-tooltip.light-theme [x-arrow] {
    border-right: 7px solid #fff;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
  .tippy-popper[x-placement^='right']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-small {
    border-right: 5px solid #fff;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .tippy-popper[x-placement^='right']
    .tippy-tooltip.light-theme
    [x-arrow].arrow-big {
    border-right: 10px solid #fff;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .tippy-popper[x-placement^='right']
    .tippy-tooltip.transparent-theme
    [x-circle] {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .tippy-popper[x-placement^='right'] .tippy-tooltip.transparent-theme [x-arrow] {
    border-right: 7px solid rgba(0, 0, 0, 0.7);
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
  .tippy-popper[x-placement^='right']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-small {
    border-right: 5px solid rgba(0, 0, 0, 0.7);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  .tippy-popper[x-placement^='right']
    .tippy-tooltip.transparent-theme
    [x-arrow].arrow-big {
    border-right: 10px solid rgba(0, 0, 0, 0.7);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .tippy-popper[x-placement^='right'] [data-animation='perspective'] {
    -webkit-transform-origin: left;
    transform-origin: left;
  }
  .tippy-popper[x-placement^='right'] [data-animation='perspective'].enter {
    opacity: 1;
    -webkit-transform: translateX(10px) rotateY(0);
    transform: translateX(10px) rotateY(0);
  }
  .tippy-popper[x-placement^='right'] [data-animation='perspective'].leave {
    opacity: 0;
    -webkit-transform: translateX(0) rotateY(90deg);
    transform: translateX(0) rotateY(90deg);
  }
  .tippy-popper[x-placement^='right'] [data-animation='fade'].enter {
    opacity: 1;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  .tippy-popper[x-placement^='right'] [data-animation='fade'].leave {
    opacity: 0;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  .tippy-popper[x-placement^='right'] [data-animation='shift'].enter {
    opacity: 1;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
  .tippy-popper[x-placement^='right'] [data-animation='shift'].leave {
    opacity: 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  .tippy-popper[x-placement^='right'] [data-animation='scale'].enter {
    opacity: 1;
    -webkit-transform: translateX(10px) scale(1);
    transform: translateX(10px) scale(1);
  }
  .tippy-popper[x-placement^='right'] [data-animation='scale'].leave {
    opacity: 0;
    -webkit-transform: translateX(0) scale(0);
    transform: translateX(0) scale(0);
  }
  .tippy-popper .tippy-tooltip.transparent-theme {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .tippy-popper .tippy-tooltip.transparent-theme[data-animatefill] {
    background-color: transparent;
  }
  .tippy-popper .tippy-tooltip.light-theme {
    color: #26323d;
    box-shadow: 0 4px 20px 4px rgba(0, 20, 60, 0.1),
      0 4px 80px -8px rgba(0, 20, 60, 0.2);
    background-color: #fff;
  }
  .tippy-popper .tippy-tooltip.light-theme[data-animatefill] {
    background-color: transparent;
  }
  .tippy-tooltip {
    position: relative;
    color: #fff;
    border-radius: 3px;
    text-align: left;
    will-change: transform;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #333;
  }
  .tippy-tooltip--small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  .tippy-tooltip--big {
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
  }
  .tippy-tooltip[data-animatefill] {
    overflow: hidden;
    background-color: transparent;
  }
  .tippy-tooltip[data-interactive] {
    pointer-events: auto;
  }
  .tippy-tooltip[data-inertia] {
    transition-timing-function: cubic-bezier(0.53, 2, 0.36, 0.85);
  }
  .tippy-tooltip [x-arrow] {
    position: absolute;
    width: 0;
    height: 0;
  }
  .tippy-tooltip [x-circle] {
    position: absolute;
    will-change: transform;
    background-color: #333;
    border-radius: 50%;
    width: 130%;
    width: calc(110% + 2rem);
    left: 50%;
    top: 50%;
    z-index: -1;
    overflow: hidden;
    transition: all ease;
  }
  .tippy-tooltip [x-circle]:before {
    content: '';
    padding-top: 90%;
    float: left;
  }
  @media (max-width: 450px) {
    .tippy-popper {
      max-width: 96%;
      max-width: calc(100% - 20px);
    }
  }
  `;

class Head extends React.PureComponent<{
  title: string;
}> {
  render() {
    const { title } = this.props;
    console.log(`Welcome to the Configit iHear demo 👂`);
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="og:title" content="Configit A/S" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.PUBLIC_URL}/favicon.png`}
          />
        </Helmet>

        <style
          dangerouslySetInnerHTML={{
            __html: globalStyleSheet,
          }}
        />
      </>
    );
  }
}

export default Head;
