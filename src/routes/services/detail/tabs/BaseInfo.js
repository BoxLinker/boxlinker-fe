import React from 'react';
import { SaveableSelect } from 'components/FieldSelect';
import { SaveableToggle } from 'components/FieldToggle';
import Ports from './Ports';

/* eslint-disable react/no-multi-comp */
// const logger = console;
const imageList = [
  {
    label: 'index.boxlinker.com/boxlinker/nginx:latest',
    value: 'index.boxlinker.com/boxlinker/nginx:latest',
  },
  {
    label: 'index.boxlinker.com/boxlinker/nginx:alpine',
    value: 'index.boxlinker.com/boxlinker/nginx:alpine',
  },
];

const replicasList = [1, 2, 3, 4, 5].map(i => ({
  label: `${i}`,
  value: `${i}`,
}));

class BaseInfoTab extends React.Component {
  onSaveImage = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 3000);
    });
  onSaveRollingUpdate = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 3000);
    });
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <SaveableSelect
              name="imageName"
              label="镜像"
              data={imageList}
              value="index.boxlinker.com/boxlinker/nginx:latest"
              onSave={this.onSaveImage}
            />
            <hr className="bord-no" />
            <SaveableSelect
              name="replicas"
              label="副本数"
              data={replicasList}
              value="1"
              onSave={this.onSaveImage}
            />
          </div>
          <div className="col-md-6">
            <SaveableToggle
              name="rollingUpdate"
              label="自动更新"
              onSave={this.onSaveRollingUpdate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr className="bord-no" />
            <Ports
              data={[
                {
                  id: 1,
                  port: '8080',
                  protocol: 'TCP',
                  path: '/test',
                },
                {
                  id: 2,
                  port: '5678',
                  protocol: 'HTTP',
                  path: '/test',
                },
                {
                  id: 4,
                  port: '8080',
                  protocol: 'TCP',
                  path: '/test',
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BaseInfoTab;
