import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import TrackBanner from './TrackBanner';
import Certificate from './Certificate';

function TrackParcel() {
  return (
    <div className='bg-white pt-8'>
        <Navbar />
        <TrackBanner />
        <Certificate />
        <Footer />
    </div>
  )
}

export default TrackParcel