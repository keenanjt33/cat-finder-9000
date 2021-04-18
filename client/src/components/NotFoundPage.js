import React from 'react';
import { Link } from '@reach/router';

const NotFoundPage = () => (
  <div className="" style={{ paddingTop: 150 + 'px' }}>
    <h2>
      404 - <Link to="/">Go home</Link>
    </h2>
  </div>
);

export default NotFoundPage;
