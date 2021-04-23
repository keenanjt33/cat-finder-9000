import React from 'react';
import { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="flex flex-wrap justify-around bg-secondary">
          <p className="max-w-md p-5 sm:p-10">
            <em>This site is for demonstration purposes only. Names and places are either are products of the author’s imagination or are used fictitiously. Any resemblance to actual locales, persons or cats, living or dead, is entirely coincidental.</em>
          </p>
          <p className="p-5 sm:p-10">
            Copyright &copy;{' '}
            {new Date().getFullYear()}
            {' '}Keenan Tullis, All Rights Reserved
            <br/>
            <br/>
            Source code can be found on <a className="underline" href="https://github.com/keenanjt33/cat-finder-9000">Github</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Footer;
