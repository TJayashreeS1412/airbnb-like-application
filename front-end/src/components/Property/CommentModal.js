import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import "./property.scss"

const CommentModal = ({propertyId}) => {

    const [userComments, setUserComments] = useState({userId:"abc@gmail.com"})

    const ratingChanged = (newRating) => {
        setUserComments({ ...userComments, rating: newRating })
    };

    const onCommentsChange = (comments) => {
        setUserComments({ ...userComments, comments: comments })
    };

    const handleClick = () =>{
        setUserComments({ ...userComments,commentedDate: new Date(),propertyId:propertyId})

        console.log(userComments)
        //callApi
    }
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">User Comments</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='mb-3'>
                            <span>Rating</span>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control comments-textarea" placeholder="Leave a comment here" id="floatingTextarea" maxlength="300" onChange={(event)=>onCommentsChange(event.target.value)}></textarea>
                            <label for="floatingTextarea">Enter Comments</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommentModal;