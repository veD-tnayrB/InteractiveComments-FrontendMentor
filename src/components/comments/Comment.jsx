import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

// Images import
import deleteIcon from '../../assets/images/icon-delete.svg';
import editIcon from '../../assets/images/icon-edit.svg';
import replyIcon from '../../assets/images/icon-reply.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';

import CommentInput from './CommentInput';

const Comment = ({ comment, loadedComments, addComment, editComment, deleteComment, changeScore }) => {
    const { currentUser } = useContext(UserContext);
    const [action, setAction] = useState(null);
    const itsFromUser = comment.user.username === currentUser.username;
    const itsLikedFromTheCurrentUser = comment.peopleWhoMarkedLikes.some(person => person === currentUser.id);
    
    
    // This handle the function to be executed based on the currentAction
    const handleAction = (text) => {
        if (action === 'REPLY') {
            addComment(text, comment.id, comment.user.username);

        } else if (action === 'UPDATE') {
            editComment(text, comment.id, comment.repyingTo);

        }

        setAction(null); // This close the input when the action be finished
    }
    
    // This is made for show the replies of each comment
    const replies = loadedComments.filter(reply => reply.parentId === comment.id);

    const repliesElements = replies.map(reply => (
        <Comment
            key={reply.id}
            comment={reply}
            loadedComments={loadedComments}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            changeScore={changeScore}
        />
    ))

    return (
        <> 
            <li className="comment-item">
                <article className="comment-card">

                    <div className="like-indicator">
                        <button 
                         className="plus-button"
                         onClick={() => changeScore(comment.id, true)}
                         disabled={itsLikedFromTheCurrentUser}
                        >

                            <img 
                             src={plusIcon}
                             alt="plus icon" 
                            />

                        </button>

                        <span>{comment.score}</span>

                        <button 
                         className="minus-button"
                         onClick={() => changeScore(comment.id, false)}
                         disabled={!itsLikedFromTheCurrentUser}
                        >

                            <img 
                             src={minusIcon}
                             alt="minus icon" 
                            />

                        </button>
                    </div>

                    <div className="info-section">
                        <div className="basic-info">
                            <img 
                             src={comment.user.image.webp}
                             alt={`${comment.user.username} profile`} 
                            />
                                 
                            <span className="username">{comment.user.username}</span>
                            {itsFromUser && <span className="you-badge">you</span>}
                            <span className="created-at">{comment.createdAt}</span>
                        </div>

                        {
                            itsFromUser ?

                            <div className="action-container">
                                <button
                                 className="delete-button"
                                 onClick={() => setAction('DELETE')}
                                >
                                    <img
                                     src={deleteIcon}
                                     alt="delete icon"
                                    />
                                    <span>Delete</span>
                                </button>

                                <button
                                 onClick={() => setAction('UPDATE')}
                                >
                                    <img
                                     src={editIcon}
                                     alt="edit icon"
                                    />
                                    <span>Edit</span>
                                </button>
                            </div>

                            :

                            <div className="action-container">
                                <button
                                 onClick={() => setAction('REPLY')}
                                >
                                    <img
                                     src={replyIcon}
                                     alt="reply icon"
                                    />
                                    <span>Reply</span>
                                </button>
                            </div>
                        }

                        <div className="comment-container">
                            <p className="comment-content">

                                {
                                    comment.replyingTo &&
                                    <span className="parent-user">
                                        @{comment.replyingTo} 
                                    </span>
                                }
                                 
                                {comment.content}
                            </p>
                        </div>
                    </div>
                </article>
            

                {   
                    action && action !== 'DELETE' &&

                    <CommentInput
                     nameLabel={action}
                     handleSubmit={handleAction} />
                }
            </li>

            {
                replies.length > 0 &&
                <div className="replies-section">
                    {repliesElements}
                </div>
            }

            {
                action === 'DELETE' &&
                <div className="modal-container">
                    <article className="modal-window">
                        <h2>Delete comment</h2>

                        <p>
                            Are you sure you want to delete this comment?
                            This will remove the comment and can't be undone.
                        </p>

                        <div className="action-container">
                            <button
                             onClick={() => setAction(null)}
                             className="cancel-button"
                            >
                                NO, CANCEL
                            </button>

                            <button
                             onClick={() => {
                                deleteComment(comment.id);
                                setAction(null);
                             }}
                             className="delete-button"
                             >
                                YES, DELETE
                            </button>
                        </div>
                    </article>
                </div>
            }
        </>
    )
}

export default Comment;