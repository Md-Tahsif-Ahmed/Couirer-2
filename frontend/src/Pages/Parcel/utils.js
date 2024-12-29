// src/utils/emailService.js
import emailjs from '@emailjs/browser';

// const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;service_d6ufdt5
// const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const serviceID = 'service_8iam5rd';
const publicKey = 'WJSYNUeNyzZtaUYAS';

// Send Confirmation Email to User
export const sendUserConfirmationEmail = (sname, rname, semail, remail, parcelId, sphone,rphone, saddress, raddress, weight, codAmount) => {
  const templateID = 'template_mufyuov';

  const templateParams = {
    sname,
    rname,
    semail,
    remail,
    parcelId,
    sphone,
    rphone,
    saddress,
    raddress,
    // district,
    // thana,
    weight,
    codAmount,
    // exchange: exchange ? 'Yes' : 'No',
  };

  return emailjs.send(serviceID, templateID, templateParams, publicKey);
};

// Send Notification Email to Admin
export const sendAdminNotificationEmail = (sname, rname, semail, remail, parcelId, sphone,rphone, saddress, raddress, weight, codAmount) => {
  const templateID = 'template_mufyuov';

  const templateParams = {
    sname,
    rname,
    semail,
    remail,
    parcelId,
    sphone,
    rphone,
    saddress,
    raddress,
    // district,
    // thana,
    weight,
    codAmount,
    // exchange: exchange ? 'Yes' : 'No',
  };

  return emailjs.send(serviceID, templateID, templateParams, publicKey);
};
