import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { formatDate } from "../../utils/helperFunction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReservationCard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/reservations/reservation?userId=" +
          sessionStorage.getItem("userId")
      )
      .then(function (response) {
        // handle success

        if (response.status == 200) {
          const { data } = response;
          if (data) {
            console.log("reservations:    ", data);
            setReservations(data);
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const checkforCancellation = () => {
    var date = new Date();
    console.log(date);
  }

  return (
    <>
      <div className="properties">
        <div className="cards">
          {reservations &&
            reservations.length > 0 &&
            reservations.map((reservation, index) => {
              return (
                <div className="card mb-3">
                  <div
                    id={"carouselExampleIndicators" + index}
                    className="carousel slide"
                    data-bs-interval="false"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicatorsA"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicatorsA"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicatorsA"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner" style={{ width: "100%" }}>
                      {reservation.images &&
                        reservation.images.length > 0 &&
                        reservation.images.map((image, imageIndex) => {
                          return (
                            <div
                              className={`carousel-item ${
                                imageIndex == 0 ? `active` : ``
                              }`}
                              key={image}
                            >
                              <img
                                src={image}
                                className="d-block w-100"
                                alt="..."
                              />
                            </div>
                          );
                        })}
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={"#carouselExampleIndicators" + index}
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={"#carouselExampleIndicators" + index}
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="card-body property-card-body"
                    key={index}
                    onClick={() => navigate(`/property/${reservation.propId}`)}
                  >
                    <div className="card-title ">
                      <h5 className="">{reservation.title}</h5>
                    </div>
                    <span>{reservation.address.street}, {reservation.address.city}, {reservation.address.state}, </span>
                    <div className="d-flex flex-col justify-content-between">
                      <div className="mt-2">
                        <div className="mb-2 fs-6">
                          <b>Check-in Date</b>
                        </div>
                        <span>{formatDate(reservation.startDate)}</span>
                      </div>
                      <div className="mt-2">
                        <div className="mb-2 fs-6">
                          <b>Checkout Date</b>
                        </div>
                        <span>{formatDate(reservation.endDate)}</span>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary m-3" onClick={checkforCancellation()}>Cancel Reservation</button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ReservationCard;
