import React, { useEffect } from 'react';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage } from '../../components'

function HomePage() {

  useEffect(() => {

  }, [])
  return (
    <div className="row">
      <div className="col-sm-12">
        <FunkyTitle text="Home" />
      </div>

      <div className="col-sm-12">
        content section
      </div>

    </div>
  )
}

export default withPage(HomePage);
