import React from 'react';
import Logo from './Logo.js';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="flex flex-wrap items-center justify-between bg-purple-300">
        <a href='/' className="flex items-center flex-shrink-0 mr-6 text-black ">
          <Logo className="w-8 h-8 mr-2"/>
         <span className="text-xl font-semibold tracking-tight">Cat Finder 9000</span>
       </a>
        <a href='//github.com' className="items-end mx-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={20}
            height={20}
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
      </nav>
    );
  }
}

export default NavBar;
      /*
      <div className="flex flex-wrap items-center px-6 py-2 bg-white lg:px-16 lg:py-0">
        <div className="">
          <a
            href="/# "
            className=""
          >
            --------- -
          </a>
          <a
            href="/# "
            className=""
          >
            Home Finder
          </a>
          <a
            href="/#who_we_are"
            className=""
          >
            Who We Are
          </a>
          <a
            href="/#contact_us "
            className=""
          >
            Contact Us
          </a>
          {this.props.authenticated ? (
            <button
              onClick={this.props.deauthenticate}
              className=""
            >
              Logout
            </button>
          ) : (
            <a
              href="/"
              className=""
            >
              Login
            </a>
          )}
          <a
            href="/"
            className=""
          >
            <Logo />
          </a>
        </div>
      </div>
      */
