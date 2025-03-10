//booking-system/frontend/src/pages/Booking.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import moment from 'moment';
import Swal from 'sweetalert2';

const Booking = () => {
    const { courtId, startDate, endDate } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [court, setCourt] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

    const start = moment(startDate, 'DD-MM-YYYY HH:mm');
    const end = moment(endDate, 'DD-MM-YYYY HH:mm');

    const startTime = moment(startDate, 'DD-MM-YYYY HH:mm').format('hh:mm A');
    const endTime = moment(endDate, 'DD-MM-YYYY HH:mm').format('hh:mm A');

    const totalHours = moment.duration(end.diff(start)).asHours();

    const displayDate = moment(startDate, 'DD-MM-YYYY HH:mm').format('dddd, DD-MM-YYYY, hh:mm A');

    useEffect(() => {
        if (!localStorage.getItem("currentUser")) {
            Swal.fire({
                title: 'Error',
                text: 'Please Login as a user',
                icon: 'error',
                confirmButtonText: 'Close',
                willClose: () => {
                    window.location.href = "/login";
                }
            });
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courts/getCourtById`, { courtId });

                if (response.status !== 200) {
                    throw new Error('Network response was not OK');
                }

                setCourt(response.data);
                setIsLoading(false);

                const totalHours = moment.duration(end.diff(start)).asHours();
                setTotalAmount(totalHours * response.data.price);
            } catch (error) {
                setError(true);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courtId]);

    async function payNow() {
        if (totalHours > 2) {
            Swal.fire({
                title: 'Error',
                text: 'Booking duration cannot exceed 2 hours.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            return;
        }

        const bookingDetails = {
            court,
            userId: JSON.parse(localStorage.getItem("currentUser"))._id,
            startDate,
            endDate,
            maxPlayers: court.maxPlayers,
            totalHours,
            totalAmount
        };
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/bookings/bookingCourt`,
                bookingDetails
            );

            setIsLoading(false);

            Swal.fire({
                title: 'Successful',
                text: 'Your court has been successfully booked!',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(() => {
                window.location.href = "/profile";
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Error in booking',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    }

    return (
        <div className="m-5">
            {isLoading ? (<h1 className="loading-text"><Loader /></h1>) : court ? (
                <div className="row payment-row">
                    <div className="col-md-5">
                        <h1>{court.name}</h1>
                        <hr />
                        <img src={court.imgURLs[1]} className="small-img" alt="Court" />
                        <p>Location : {court.location}</p>
                    </div>

                    <div className="col-md-5">
                        <div className="payment-section">
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem("currentUser"))?.name || "Guest"}</p>
                                <p>Date : {displayDate}</p>
                                <p>Play Time : {startTime} to {endTime}</p>
                                <p>Max Players : {court.maxPlayers} people</p>
                                <p className="p-text">{court.description}</p>
                            </b>
                        </div>

                        <div className="payment-section">
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total hours : {totalHours}</p>
                                <p>Per Hour : ₹{court.price}</p>
                                <p>Total Amount : ₹{totalAmount}</p>
                            </b>
                        </div>

                        <div className="btn-area">
                            <button onClick={payNow} className="btn btn-primary">Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}
        </div>
    );
}

export default Booking;
