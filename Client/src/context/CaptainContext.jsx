import { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState({
    _id: '',
    fullName: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    email: '',
    isAvailable: false,
    vehicle: {
      colour: '',
      plateNumber: '',
      capacity: '',
      vehicleType: ''
    },
    location: {
      lat: null,
      long: null
    }
  });

  return (
    <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;