import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EditProperty = (props) => {


    const [propertyDetails, setPropertyDetails] = useState({})

    useEffect(() => {
        let editablePropDetails = sessionStorage.getItem('editProperty')

        if (editablePropDetails) {
            setPropertyDetails(JSON.parse(editablePropDetails))
        }
        console.log(JSON.parse(editablePropDetails))
    }, [sessionStorage.getItem('editProperty')])


    let formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const title = document.getElementById("inputTitle").value;
            let radio_prop_type;
            if (document.getElementById("flexRadioDefault1").checked) {
                radio_prop_type = "metropolitan";
            } else if (document.getElementById("flexRadioDefault2").checked) {
                radio_prop_type = "countryside";
            }
            let radio_house_type;
            if (document.getElementById("flexRadioDefault3").checked) {
                radio_house_type = "private";
            } else if (document.getElementById("flexRadioDefault4").checked) {
                radio_house_type = "shared";
            }
            const address1 = document.getElementById("inputAddress").value;
            const address2 = document.getElementById("inputAddress2").value;
            const city = document.getElementById("inputCity").value;
            const state = document.getElementById("inputState").value;
            const zip = document.getElementById("inputZip").value;
            const ac = document.getElementById("AC").checked;
            const fireplace = document.getElementById("fireplace").checked;
            const hairdryer = document.getElementById("hairdryer").checked;
            const pet_friendly = document.getElementById("pet_friendly").checked;

            var imageFile = [];
            imageFile.concat(document.getElementById("formFile").value);
            console.log(imageFile);

            const nightlyFee = parseInt(
                document.getElementById("inputNightlyFee").value
            );
            const cleaningFee = parseInt(
                document.getElementById("inputCleaningFee").value
            );
            const tax = parseInt(document.getElementById("inputTax").value);
            const desc = document.getElementById("inputDesc").value;

            let reqBody = {
                hostId: sessionStorage.getItem("userId"),
                title: title,
                description: desc,
                price: {
                    base_fee: nightlyFee,
                    cleaning_fee: cleaningFee,
                    taxes: tax,
                },
                avgRating: 0,
                userReview: [],
                houseType: radio_house_type,
                maxGuests: 4,
                bedrooms: 2,
                beds: 2,
                baths: 2.5,
                address: {
                    street: address1,
                    apt: address2,
                    city: city,
                    state: state,
                    zip: zip,
                    country: "USA",
                },
                amenities: {
                    AC: ac,
                    hair_dryer: hairdryer,
                    fireplace: fireplace,
                    pet_friendly: pet_friendly,
                },
                houseRules: [
                    "Check-in: 5:00 PM - 8:00 PM",
                    "Checkout before 10:00 AM",
                ],
                reservations: [],
                isAvailable: true,
            }


            axios.put(`http://localhost:3000/api/properties/${propertyDetails.propId}`, reqBody).then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("Property added Successfully");
                    sessionStorage.removeItem('editProperty')
                    window.location.href = "/profile"
                } else {
                    console.log("Adding Property Failed");
                }
            })

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = ()=>{
        console.log("delete");
        axios.delete(`http://localhost:3000/api/properties/${propertyDetails.propId}`).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                console.log("Property deleted Successfully");
                sessionStorage.removeItem('editProperty')
                window.location.href = "/profile"
            } else {
                console.log("Deleting Property Failed");
            }
        })
    }

    return (
        <div className="app-body">
            <form className="row g-3 m-4" onSubmit={formSubmitHandler}>
                <div className="prop_upload_topmenu">
                    <div className="col-md-6">
                        <label for="inputTitle" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            placeholder="Tiffany's haven"
                            defaultValue={propertyDetails?.title}
                        />
                    </div>
                    <div className="prop_type_radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault1"
                                id="flexRadioDefault1"
                            />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Metropolitan
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault1"
                                id="flexRadioDefault2"
                                checked
                            />
                            <label className="form-check-label" for="flexRadioDefault2">
                                Countryside
                            </label>
                        </div>
                    </div>
                    <div className="house_type_radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault2"
                                id="flexRadioDefault3"
                                checked={propertyDetails?.houseType === 'private' ? true : false}

                            />
                            <label className="form-check-label" for="flexRadioDefault3">
                                Private accommodation
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault2"
                                id="flexRadioDefault4"
                                checked={propertyDetails?.houseType === 'shared' ? true : false}
                            />
                            <label className="form-check-label" for="flexRadioDefault4">
                                Shared place
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        defaultValue={propertyDetails?.address?.street}
                    />
                </div>
                <div className="col-12">
                    <label for="inputAddress2" className="form-label">
                        House number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                        defaultValue={propertyDetails?.address?.apt}
                    />
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">
                        City
                    </label>
                    <input type="text" className="form-control" id="inputCity"
                        defaultValue={propertyDetails?.address?.city}
                    />
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">
                        State
                    </label>
                    <input type="text" className="form-control" id="inputState"
                        defaultValue={propertyDetails?.address?.state}
                    />
                </div>
                <div className="col-md-2">
                    <label for="inputZip" className="form-label">
                        Zip
                    </label>
                    <input type="text" className="form-control" id="inputZip"
                        defaultValue={propertyDetails?.address?.zipcode}
                    />
                </div>
                <div className="mb-3">
                    <label for="formFile" className="form-label">
                        Upload Images
                    </label>
                    <input className="form-control" type="file" id="formFile" />
                </div>
                <div className="col-12">
                    <label for="inputDesc" className="form-label">
                        Description
                    </label>
                    <input type="text" className="form-control" id="inputDesc"
                        defaultValue={propertyDetails?.description}
                    />
                </div>
                <div className="amenities">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="AC"
                            checked={propertyDetails?.ameneties?.airConditioning} />
                        <label className="form-check-label" for="flexCheckDefault">
                            Air Conditioning
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="fireplace"
                            checked={propertyDetails?.ameneties?.hotTub}
                        />
                        <label className="form-check-label" for="flexCheckChecked">
                            Fireplace
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="hairdryer"
                            checked={propertyDetails?.ameneties?.hairDryer}
                        />
                        <label className="form-check-label" for="flexCheckChecked">
                            Hair Dryer
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="pet_friendly"
                            checked={propertyDetails?.ameneties?.petFriendly}
                        />
                        <label className="form-check-label" for="flexCheckChecked">
                            Pet Friendly
                        </label>
                    </div>
                </div>
                <div className="fee-block">
                    <div className="col-md-2 me-2">
                        <label for="inputNightlyFee" className="form-label">
                            Price per night
                        </label>
                        <input type="number" className="form-control" id="inputNightlyFee"
                            defaultValue={propertyDetails?.price?.base_fee}
                        />
                    </div>
                    <div className="col-md-2 me-2">
                        <label for="inputCleaningFee" className="form-label">
                            Cleaning fee
                        </label>
                        <input type="number" className="form-control" id="inputCleaningFee"
                            defaultValue={propertyDetails?.price?.cleaning_fee}
                        />
                    </div>
                    <div className="col-md-2 me-2">
                        <label for="inputTax" className="form-label">
                            Tax
                        </label>
                        <input type="number" className="form-control" id="inputTax"
                            defaultValue={propertyDetails?.price?.taxes}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6 col-md-2">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                    <div className="col-6 col-md-2">
                        <button type="button" className="btn btn-primary" onClick={()=>handleDelete()}>
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProperty;
