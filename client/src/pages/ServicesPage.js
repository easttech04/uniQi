import React from 'react';
import Card from '../components/Card';
import './ServicesPage.css';

const ServicesPage = () => {
  const airportServices = [
    { title: "X-Ray Machines", description: "Advanced screening solutions for airport security." },
    { title: "Fire Alarm Systems", description: "Comprehensive fire detection and alarm systems." },
    { title: "CCTV Surveillance", description: "High-definition video surveillance for terminal security." },
    { title: "Car Parking Systems", description: "Automated and efficient car park management solutions." },
    { title: "Network Infrastructure", description: "Robust and scalable network backbones for airports." },
    { title: "Electrical Works", description: "Complete electrical design, installation, and maintenance." },
    { title: "Point of Sale (POS) Systems", description: "Modern POS solutions for retail and concessions." },
    { title: "Tenant Management Systems", description: "Streamlined systems for managing airport tenants." },
    { title: "Passenger Booking Solutions", description: "User-friendly passenger booking and facilitation platforms." },
  ];

  const industrialServices = [
    { title: "Management Systems", description: "Customized management systems to optimize operations." },
    { title: "Machinery Spare Parts", description: "Reliable sourcing and supply of industrial machinery parts." },
    { title: "Protective Equipment", description: "High-quality personal protective equipment (PPE) supply." },
  ];

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <p className="services-intro">
        At UniQi, we provide a comprehensive range of solutions tailored for both the aviation and industrial sectors. Our expertise ensures reliability, efficiency, and safety.
      </p>

      <div className="service-section">
        <h2>Airport Terminal Facilities</h2>
        <div className="card-grid">
          {airportServices.map((service, index) => (
            <Card key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </div>

      <div className="service-section">
        <h2>Industrial Solutions</h2>
        <div className="card-grid">
          {industrialServices.map((service, index) => (
            <Card key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
