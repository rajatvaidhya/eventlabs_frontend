import React from "react";
import "./Footer.css";
import applestore from "../images/applestore.png";
import playstore from "../images/playstore.png";
import logo from "../images/main-logo-png.png"

const Footer = () => {
  return (
    <div className="main-footer-div">
      <div className="top-footer-div">
        <div className="top-left-footer">
          <div>
            <h2>Quick Links</h2>
            <p>About us</p>
            <p>Contact us</p>
            <p>Privacy Policy</p>
            <p>Donate</p>
          </div>

          <div>
            <h2>Team</h2>
            <p>Who we are</p>
            <p>Developers</p>
            <p>Blogs</p>
            <p>Partner with us</p>
          </div>

          <div>
          <h2>Generals</h2>

            <p>Work with us</p>
            <p>Investor relations</p>
            <p>Security terms</p>
            <p>Sitemap</p>
          </div>

          <div>
          <h2>Privacy</h2>

            <p>Report fraud</p>
            <p>List your business</p>
            <p>Search nearby</p>
            <p>Help center</p>
          </div>
        </div>

        <div className="top-right-footer">
          <div className="hyperlinks">
            <div className="social-logo">
              <img src={applestore} alt="image" />
            </div>

            <div className="social-logo">
              <img src={playstore} alt="image" />
            </div>

            <div className="social-links">
              <i className="fa-brands fa-meta"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>

          <div>
            <h2>Subscribe to Newsletter!</h2>
            <input type="email" placeholder="Your email"/>
            <p>Don't miss out on the opportunity to be part of our community and stay connected with us.</p>
          </div>
        </div>
      </div>

      <div className="bottom-footer-div">

        <div>
            <h1>Designed And Developed By - </h1>
            <p>Ishani, Pureshwar, Pushti, Rajat, Usha</p>
        </div>

        <div className="site-logo">
            <p>&#169; All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
