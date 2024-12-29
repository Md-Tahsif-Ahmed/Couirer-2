import React from 'react';

const features = [
  {
    title: "Package Pickup & Delivery",
    description: `Users can schedule deliveries by providing package details (size, weight, address). 
    Agent service will pick up the parcel and deliver it to the specified location.`,
    image: "https://img.freepik.com/premium-vector/delivery-man-delivering-parcel-scooter-vector-illustration_852896-30546.jpg?w=826",
  },
  {
    title: "Real-Time Tracking",
    description: `Users can track their packages in real-time using a tracking ID. Current location, status updates, 
    and estimated delivery times will be displayed.`,
    image: "https://img.freepik.com/premium-photo/3d-smartphone-with-map-compass_58466-490.jpg?w=740",
  },
  {
    title: "Cost Estimation",
    description: `A dynamic cost calculator based on package dimensions, weight, and delivery distance.`,
    image: "https://img.freepik.com/premium-photo/business-concept-image-hand-holding-marker-write-cost-control-isolated-white_21336-3369.jpg?w=996",
  },
  {
    title: "Notification Alert Service",
    description: `Email and SMS notifications for delivery updates, such as pickup, transit, and delivery status.`,
    image: "https://img.freepik.com/premium-photo/3d-bell-alert-notification-icon-isolated-white-background-3d-render-illustration_670693-36.jpg?w=740",
  },
  {
    title: "Past History",
    description: `Logged-in users can view their past deliveries and shipment details in the user panel.`,
    image: "https://img.freepik.com/premium-photo/3d-shopping-cart-with-cash-receipt_58466-3764.jpg?w=740",
  },
  {
    title: "Agent Service",
    description: `A dedicated service for agents to handle package pickups and deliveries.`,
    image: "https://img.freepik.com/premium-photo/young-naked-seductive-woman-feeling-sexual-seductively-girl-with-beautiful-skin_909708-10011.jpg?w=900",
  },
];

const FeaturesCard = () => {
  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center bg-white">
        {features.map((feature, index) => (
          <div key={index} className="card card-compact bg-white w-70 shadow-xl">
            <figure>
              <img className="w-70 h-60"src={feature.image} alt={feature.title} />
            </figure>
            <div className="card-body text-black">
              <h2 className="card-title font-bold">{feature.title}</h2>
              <p>{feature.description}</p>
              <div className="card-actions justify-end">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition-all duration-200 font-bold">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;
