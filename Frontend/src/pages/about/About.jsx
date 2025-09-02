import React from 'react'
import about from '../../img/about1.jpeg'

const About = () => {
  return (
    <div>
     <div class="container-fluid py-5  bg-light"  style={{marginTop:'100px'}}>
  <div class="container py-5">
    <div class="row g-5 align-items-center">
     
      <div class="col-lg-6">
        <div class="position-relative">
          <img src={about} class="img-fluid rounded shadow" style={{width:'100%', height:'450px'}} alt="Event Management"/>
          <div class="position-absolute top-50 start-50 translate-middle bg-primary text-white px-4 py-2 rounded">
            <h5 class="mb-0 text-white">10+ Years of Experience</h5>
          </div>
        </div>
      </div>

     
      <div class="col-lg-6">
        <h1 class="mb-4">About Our Event Management System</h1>
        <p class="mb-4">
          Our <strong>Event Management System</strong> is a complete solution for 
          planning, organizing, and managing events of all sizes. 
          From booking venues and scheduling programs to managing attendees, 
          tickets, and payments — everything is handled seamlessly.
        </p>
        <p class="mb-4">
          Whether it’s a <em>wedding, conference, concert, or corporate event</em>, 
          our system ensures smooth coordination, better communication, and 
          professional execution. 
        </p>

       
        <div class="row g-3 mb-4">
          <div class="col-sm-6">
            <div class="d-flex align-items-center">
              <i class="fa fa-calendar-check fa-2x text-primary me-3"></i>
              <h6 class="mb-0">Easy Event Booking</h6>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-center">
              <i class="fa fa-users fa-2x text-primary me-3"></i>
              <h6 class="mb-0">Attendee Management</h6>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-center">
              <i class="fa fa-credit-card fa-2x text-primary me-3"></i>
              <h6 class="mb-0">Secure Payments</h6>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-center">
              <i class="fa fa-chart-line fa-2x text-primary me-3"></i>
              <h6 class="mb-0">Real-time Reports</h6>
            </div>
          </div>
        </div>

      
        <a href="#" class="btn btn-primary px-5 py-3  text-white rounded-pill">
          Learn More
        </a>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default About
