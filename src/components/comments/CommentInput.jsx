import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const CommentInput = ({ handleSubmit, nameLabel, placeholder = '' }) => {
    const [commentContent, setCommentContent] = useState('');
    const { currentUser } = useContext(UserContext);

    // This send the current value of the textarea commponent to a function passed as parameter
    const sendComment = (e) => {
        e.preventDefault();
        handleSubmit(commentContent);
        setCommentContent('');
    }

    return (
        <div className="form-container">
            <form onSubmit={sendComment} className="form">
                <img 
                 src={currentUser.image.webp}
                 alt={`${currentUser.username}`} 
                />
                <textarea
                    placeholder={placeholder}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <button type="submit">
                    {nameLabel}
                </button>
            </form>
        </div>
    )
}

export default CommentInput;