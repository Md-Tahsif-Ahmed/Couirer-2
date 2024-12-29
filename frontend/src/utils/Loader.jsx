import React from 'react';
import Lottie from 'react-lottie';
import animationData from './loader.json'; // Adjust the path based on your file structure

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-screen">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
};

export default Loader;
