import React, { useEffect, useState } from 'react';
import { withPage } from '../../components';
import './styles.css';

function ActPage({ match }) {

  const [data, setData] = useState([]);

  useEffect(() => {



  }, []);

  return (
    <div className="act__container">
      <h1>Act Page</h1>
    </div>
  );
}
export default withPage(ActPage)
