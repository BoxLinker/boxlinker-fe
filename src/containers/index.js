import React from 'react';
import Loadable from 'react-loadable';
import LoadingComp from '../components/Loadable';
import Layout from '../components/Layout';

// export { default as Dashboard } from './Dashboard';
// export { default as Services } from './Services';
// export { default as Images } from './Images';
// export { default as Volumes } from './Volumes';
// export { default as Login } from './Login';

const load = (asyncImport, props = { layout: true }) => {
  const Comp = Loadable({
    loader: asyncImport,
    loading: LoadingComp,
  });
  return class extends React.Component {
    render() {
      const { layout } = props;
      if (!layout) {
        return <Comp {...this.props} />;
      }
      const { location } = this.props;
      return (
        <Layout location={location}>
          <Comp {...this.props} />
        </Layout>
      );
    }
  };
};

export const Services = load(() => import('./Services/list'));
export const ServiceDetail = load(() => import('./Services/detail'));
export const ServiceCreate = load(() => import('./Services/create'));
export const Dashboard = load(() => import('./Dashboard'));
export const Images = load(() => import('./Images'));
export const Volumes = load(() => import('./Volumes'));
export const User = load(() => import('./User'));
export const CICD = load(() => import('./CICD/list'));
export const CICDBuilding = load(() => import('./CICD/building'));

export const Login = load(() => import('./Login'), { layout: false });
export const Reg = load(() => import('./Reg'), { layout: false });
export const Forgot = load(() => import('./Forgot'), { layout: false });
export const ResetPass = load(() => import('./ResetPass'), { layout: false });
