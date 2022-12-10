import React from 'react';
// import logo from '../assets/Jake-1.avif'

const ReservePropCard = (props) => {
    return(
        <>
            <div class="reserve-props">
                <div class="booking-details-head">
                    <div class="prop-image">            
                        <img src="{logo}" alt="..." />
                    </div>
                    <div class="booking-details">
                        <h5 class="card-title">Dane's House</h5>
                        <div class="duration-stay-from">
                            <label class="fromDate"> From </label>
                            <input type="text" id="inputFromDate"/>
                        </div>
                        <div class="duration-stay-to">
                            <label class="toDate"> to </label>
                            <input type="text" id="inputToDate"/>
                        </div>
                        <div class="feedback-rating">
                            <label class="rating"> Rating </label>
                            <input type="number" id="inputRating" />
                        </div>
                        <div class="feedback-comment">
                            <label class="comment"> Comments </label>
                            <textarea rows="6" type="text" id="inputComment" />
                        </div>
                    </div>
                </div>
                <div class="post-button-reserve-class">
                    <button class="post-button-reserve">
                        Post
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReservePropCard;