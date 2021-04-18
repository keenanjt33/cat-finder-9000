import React from 'react';
import { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bg-secondary">
          <p className="max-w-xl p-5 sm:p-20 md:p-30">
            <em>This is a work of fiction. Names, characters, places and incidents either are products of the author’s imagination or are used fictitiously. Any resemblance to actual events or locales or persons, living or dead, is entirely coincidental.</em>
          </p>
        </footer>
      </div>
    );
  }
}

export default Footer;
