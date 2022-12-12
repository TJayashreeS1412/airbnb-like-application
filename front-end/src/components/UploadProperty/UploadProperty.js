import React from "react";
import { useNavigate } from "react-router-dom";

const UploadProperty = (props) => {
  const navigate = useNavigate();
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
      imageFile.push(document.getElementById("formFile").value);
      console.log(imageFile);

      const nightlyFee = parseInt(
        document.getElementById("inputNightlyFee").value
      );
      const cleaningFee = parseInt(
        document.getElementById("inputCleaningFee").value
      );
      const tax = parseInt(document.getElementById("inputTax").value);
      const desc = document.getElementById("inputDesc").value;

      let response = await fetch("http://localhost:3000/api/properties", {
        method: "POST",

        // Upon removing headers, null values will get pushed to DB
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostId: sessionStorage.getItem("userId"),
          title: title,
          description: desc,
          images: imageFile,
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
        }),
      });
      if (response.status == 200) {
        console.log("Property added Successfully");
        navigate("/home");
      } else {
        console.log("Adding Property Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="app-body">
      <form class="row g-3 m-4" onSubmit={formSubmitHandler}>
        <div class="prop_upload_topmenu">
          <div class="col-md-6">
            <label for="inputTitle" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Tiffany's haven"
            />
          </div>
          <div class="prop_type_radio">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Metropolitan
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault1"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Countryside
              </label>
            </div>
          </div>
          <div class="house_type_radio">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault2"
                id="flexRadioDefault3"
              />
              <label class="form-check-label" for="flexRadioDefault3">
                Private accommodation
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault2"
                id="flexRadioDefault4"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault4">
                Shared place
              </label>
            </div>
          </div>
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">
            House number
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input type="text" class="form-control" id="inputCity" />
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">
            State
          </label>
          <input type="text" class="form-control" id="inputState" />
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">
            Zip
          </label>
          <input type="text" class="form-control" id="inputZip" />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Upload Images
          </label>
          <input class="form-control" type="text" id="formFile" />
        </div>
        <div class="col-12">
          <label for="inputDesc" class="form-label">
            Description
          </label>
          <input type="text" class="form-control" id="inputDesc" />
        </div>
        <div class="amenities">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="AC" />
            <label class="form-check-label" for="flexCheckDefault">
              Air Conditioning
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="fireplace"
            />
            <label class="form-check-label" for="flexCheckChecked">
              Fireplace
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="hairdryer"
            />
            <label class="form-check-label" for="flexCheckChecked">
              Hair Dryer
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="pet_friendly"
            />
            <label class="form-check-label" for="flexCheckChecked">
              Pet Friendly
            </label>
          </div>
        </div>
        <div class="fee-block">
          <div class="col-md-2 me-2">
            <label for="inputNightlyFee" class="form-label">
              Price per night
            </label>
            <input type="number" class="form-control" id="inputNightlyFee" />
          </div>
          <div class="col-md-2 me-2">
            <label for="inputCleaningFee" class="form-label">
              Cleaning fee
            </label>
            <input type="number" class="form-control" id="inputCleaningFee" />
          </div>
          <div class="col-md-2 me-2">
            <label for="inputTax" class="form-label">
              Tax
            </label>
            <input type="number" class="form-control" id="inputTax" />
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProperty;
