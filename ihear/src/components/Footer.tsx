import React from 'react';
import * as theme from './theme';
import { ReactComponent as FacebookIcon } from './Icons/Facebook.svg';
import { ReactComponent as TwitterIcon } from './Icons/Twitter.svg';
import { ReactComponent as InstagramIcon } from './Icons/Instagram.svg';
import TextInput from './TextInput';
import Button from './Button';

function Footer() {
  return (
    <div className="footer">
      <div className="left">
        <div className="title">Subscribe to our newsletter</div>
        <div className="content">
          Don't miss out on our latest products, deals, and news!
        </div>
        <div className="text-input">
          <TextInput placeholder="Enter your email address" />
          <div>&nbsp;&nbsp;&nbsp;</div>
          <Button color="light" onClick={() => {}}>
            Subscribe
          </Button>
        </div>
      </div>
      <div className="right">
        <div className="title">Follow us</div>
        <div className="icon">
          <FacebookIcon width="16px" height="16px" stroke="currentColor" />
          &nbsp; Facebook
        </div>
        <div className="icon">
          <TwitterIcon width="16px" height="16px" stroke="currentColor" />
          &nbsp; Twitter
        </div>
        <div className="icon">
          <InstagramIcon width="16px" height="16px" stroke="currentColor" />
          &nbsp; Instagram
        </div>
      </div>
      <style jsx>{`
        .footer {
          padding: 30px 50px 100px 50px;
          display: flex;

          background: ${theme.GRAY_COLOR_LIGHT};
          margin: 0 -20px 0px -20px;
        }
        .left {
          flex: 2;
          margin-right: 60px;
        }
        .right {
          flex: 1;
          line-height: 26px;
        }
        .icon {
          display: flex;
          align-items: center;
        }
        .title {
          text-transform: uppercase;
          color: ${theme.BLUEGRAY_COLOR_MEDIUM};
          margin-bottom: 12px;
        }
        .text-input {
          margin-top: 24px;
          width: 450px;
          display: flex;
          flex-direction: row;
        }

        @media screen and (max-width: 800px) {
          .footer {
            flex-direction: column;
          }
          .left {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
}
export default Footer;
