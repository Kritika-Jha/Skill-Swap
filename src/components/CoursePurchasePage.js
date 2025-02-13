import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CoursePurchasePage.css";
import Header from './Header';
import Footer from './Footer';


const CoursePurchasePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    window.scrollTo(0, 0); // Scrolls to the top
  }, [userId]);

  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardname: '',
    cardnumber: '',
    expmonth: '',
    expyear: '',
    cvv: '',
    sameadr: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/courses/success");
  };

  return (
    <div className="main-page">
      <Header />
      <div className="content">
        <section className="purchase">
          <h1>Purchasing a Course</h1>
          <div className="row">
            <div className="col-75">
              <div className="container">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-50">
                      <h3>Billing Address</h3>
                      <label htmlFor="fname">
                        <i className="fa fa-user"></i> Full Name *
                      </label>
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="John M. Doe"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">
                        <i className="fa fa-envelope"></i> Email *
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="adr">
                        <i className="fa fa-address-card-o"></i> Address
                      </label>
                      <input
                        type="text"
                        id="adr"
                        name="address"
                        placeholder="542 W. 15th Street"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      <label htmlFor="city">
                        <i className="fa fa-institution"></i> City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                      />

                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="state">State</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="NY"
                            value={formData.state}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-50">
                          <label htmlFor="zip">Zip</label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="10001"
                            value={formData.zip}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-50">
                      <h3>Payment Details</h3>
                      <label htmlFor="cname">Name on Card *</label>
                      <input
                        type="text"
                        id="cname"
                        name="cardname"
                        placeholder="John More Doe"
                        value={formData.cardname}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="ccnum">Credit Card Number *</label>
                      <input
                        type="text"
                        id="ccnum"
                        name="cardnumber"
                        placeholder="1111-2222-3333-4444"
                        value={formData.cardnumber}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="expmonth">Expiry Month *</label>
                      <input
                        type="text"
                        id="expmonth"
                        name="expmonth"
                        placeholder="September"
                        value={formData.expmonth}
                        onChange={handleChange}
                        required
                      />
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="expyear">Expiry Year *</label>
                          <input
                            type="text"
                            id="expyear"
                            name="expyear"
                            placeholder="2018"
                            value={formData.expyear}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-50">
                          <label htmlFor="cvv">CVV *</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="352"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.sameadr}
                      name="sameadr"
                      onChange={(e) => setFormData((prevData) => ({ ...prevData, sameadr: e.target.checked }))}
                    />{' '}
                    Shipping address same as billing
                  </label>
                  <input type="submit" value="Purchase and Enroll" className="btn" />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePurchasePage;
