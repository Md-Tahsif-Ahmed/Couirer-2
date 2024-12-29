import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const feedbacks = [
  {
    name: "John Doe",
    designation: "CEO, ABC Company",
    feedback: "2000 Courier has the best service I’ve experienced. They handle my packages with great care and always deliver on time. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    designation: "Managing Director, XYZ Ltd.",
    feedback: "The real-time tracking and cost estimation feature of 2000 Courier make my delivery process seamless. A trustworthy and reliable courier service!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Johnson",
    designation: "Entrepreneur",
    feedback: "I am impressed with 2000 Courier’s efficiency and professionalism. Their notification alerts keep me informed, and their team is very responsive.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Emma Brown",
    designation: "Product Manager, DEF Inc.",
    feedback: "Excellent service! 2000 Courier provides a quick and reliable delivery solution. Their real-time tracking is extremely helpful.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "Liam Wilson",
    designation: "Freelancer",
    feedback: "I’ve been using 2000 Courier for months, and their efficiency is unmatched. I appreciate the regular updates on my packages.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3, // 3 items for large screens
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2, // 2 items for medium screens
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2, // 2 items for tablets
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // 1 item for small screens
  },
};

const MarchantFeedbackCarousel = () => {
  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Marchant Feedback</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        showDots={true}
        arrows={true}
        itemClass="px-4"
      >
        {feedbacks.map((feedback, index) => (
          <div key={index} className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center">
            <img
              src={feedback.image}
              alt={feedback.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{feedback.name}</h3>
            <p className="text-gray-500">{feedback.designation}</p>
            <p className="text-gray-700 text-center mt-4">{feedback.feedback}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MarchantFeedbackCarousel;
