import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
const SearchComponent = () => {

    const { query } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (value) => {
        let current = searchParams.get('filter')
        if (current)
            setSearchParams({ query: value, filter: current })
        else
            setSearchParams({ query: value })

    }

    const handleSelect = (value) => {
        if (value !== 'All') {
            let current = searchParams.get('query')
            if (current)
                setSearchParams({ query: current, filter: value })
            else
                setSearchParams({ filter: value })

        } else {
            let current = searchParams.get('query')
            if (current)
                setSearchParams({ query: current })
            else
                setSearchParams({ })
        }
    }
    return (
        <div className="searchBox">
            <div className="input-group" style={{ width: "70%", boxShadow: "none" }}>
                <input type="text" className="form-control" placeholder="Search any destination ..." style={{boxShadow:"none", borderRadius:"4px"}} aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={(event) => handleChange(event.target.value)} />
               
                <div className='ms-1'>
                    <select class="form-select" aria-label="Default select example" onChange={(event) => handleSelect(event.target.value)}>
                        <option selected value="All">No Filter</option>
                        <option value="city">City</option>
                        <option value="type">Property Type</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
export default SearchComponent;