import React from 'react';
import AppForm from './AppForm';

class BodyContent extends React.Component {
  render() {
    return (
      <div className="col-md-9 pos-rel">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <AppForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BodyContent;
