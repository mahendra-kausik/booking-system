import { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import "./Court.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Courts = ({ court, startDate, endDate }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const isBookingAvailable = startDate && endDate;

    const handleBookNowClick = (event) => {
        if (!isBookingAvailable) {
            event.preventDefault();

            Swal.fire({
                title: 'Sorry!',
                text: 'Please select a date and time range first.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    };

    return (
        <div className="row bs">

            <div className="col-md-4">
                <img src={court?.imgURLs[0]} className="small-img" />
            </div>

            <div className="col-md-7">
                <h1>{court.name}</h1>
                <p>Price : ₹{court.price}</p>
                <p>Max Players : {court.maxPlayers} people</p>
                <p>Location : {court.location}</p>

                <div className="view-details">
                    <Link to={isBookingAvailable ? `/book/${court._id}/${startDate}/${endDate}` : '#'} onClick={handleBookNowClick}>
                        <button className="btn btn-primary m-2">Book Now</button>
                    </Link>
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>{court.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Carousel prevLabel="" nextLabel="">
                        {court.imgURLs.map((img, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100 detail-img" src={img} />
                                    <Carousel.Caption>
                                        <h3>{court.name}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <p>{court.description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Link to={`/book/${court._id}/${startDate}/${endDate}`}>
                        <button className="btn btn-primary m-2" onClick={handleBookNowClick}>Book Now</button>
                    </Link>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Courts;




