import React from 'react';
const SearchComponent = () => {

    return (
        <div className="searchBox">
            <div className="input-group" style={{ width: "70%", boxShadow: "none" }}>
                <input type="text" className="form-control" placeholder="Search any destination ..." aria-label="Input group example" aria-describedby="btnGroupAddon" />
                <div className="input-group-text" id="btnGroupAddon" style={{ backgroundColor: "#2484C6" }}>
                    <i class="bi bi-search" style={{ color: "#fff" }}></i>
                </div>
            </div>
        </div>
    );
}
export default SearchComponent;