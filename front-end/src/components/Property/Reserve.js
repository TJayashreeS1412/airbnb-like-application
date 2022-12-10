import React from 'react';
const Reserve = (props) =>{

    return(
        <div class="reserveCard">
            <form>
                <div class="dates-block">
                    <form class="fromDateClass" action="/action_page.php">
                        <label class="fromDateLabel" for="fromDate">From</label>
                        <input type="date" id="fromDate" name="fromDate" />
                    </form>
                    <form class="toDateClass" action="/action_page.php">
                        <label class="toDateLabel" for="toDate">To</label>
                        <input type="date" id="toDate" name="toDate" />
                    </form>
                </div>
                <div class="feeBlock">                    
                    <div class="cleaningFeeBlock col-5 form-group">
                        <label class="cleaningFeeLabel" for="cleaningFee">Cleaning Fee</label>
                        <input type="number" readonly class="form-control" id="cleaningFee" />
                    </div>
                    <div class="taxBlock col-5 form-group">
                        <label class="taxFeeLabel" for="taxFee">Tax Fee</label>
                        <input type="number" readonly class="form-control" id="taxFee" />
                    </div>
                    <div class="nightlyFeeBlock col-5 form-group">
                        <label class="nightlyFeeLabel" for="totalNightlyFee">Total Nightly Fee</label>
                        <input type="number" readonly class="form-control" id="totalNightlyFee" />
                    </div>
                </div>
                <button id="submit-reserve" type="submit" class="btn btn-primary">Reserve</button>
            </form>
        </div>
    );
}

export default Reserve;