import './Hub.css'

import images from '../../utils/images/images'
import requireAuth from '../../utils/use-cases/requireAuth';

import Header from '../../utils/components/Header';
import Title from '../../utils/components/Title';

import Card from '../components/Card.jsx';


function Hub() {
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <div className="title-container">
          <Title greenTitle={'Apps'} blueTitle={'Hub'} className="title" />
        </div>
        <div className="crossbar-container">
          <img src={images.crossbar} className='crossbar' />
          <span></span>
        </div>
        <div className="cards-container">
          <Card icon={images.survey} title={'Survey'} message={'Let us know your experience today in DHG.'} button={'Take Survey'} direct={'survey'} />
          <Card icon={images.dashboard} title={'Dashboard'} message={'Check the performance of the medical centers'} button={'See More'} direct={'dashboard'} />
          <Card icon={images.admin} title={'Admin'} message={'Manage users and centers online.'} button={'Admin Access'} direct={'admin'} />
          <Card icon={images.data} title={'Data'} message={'Clean, Lookup and download app data'} button={'Go to Data'} direct={'data'} />
        </div>
      </div>
    </>
  );
}

export default requireAuth(Hub)