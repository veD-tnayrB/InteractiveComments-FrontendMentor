import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';

import Comment from './Comment';
import CommentInput from './CommentInput';
import './comments.scss';

import { UserContext } from '../../contexts/userContext';
import getComments from '../../api/comments';


const Comments = () => {
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
    const { currentUser } = useContext(UserContext);

    // Verify if there data before and otherwise get the data from a 'API'
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('comments'))) {
            getComments().then(data => {
                setComments(data);
            })
        }
    }, []);

    // Save the changes on localStorage everytime comments state change
    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments))
    }, [comments])

    // This works for add and reply to comments
    const addComment = (comment, parentId = null, replyingToUser = null) => {
        setComments(prevComments => (
            [...prevComments,
                {
                    id: uniqid(),
                    content: comment,
                    createdAt: 'now', // fix this
                    parentId: parentId,
                    replyingTo: replyingToUser,
                    score: 0,
                    peopleWhoMarkedLikes: [],
                    user: {
                        image: {
                            png: currentUser.image.png,
                            webp: currentUser.image.webp
                        },
                    username: currentUser.username
                    }
                }
            ]
        ))
    }

    // This is made for edit comments
    const editComment = (newComment, commentToEditId) => {
        setComments(prevComments => (
            prevComments.map(comment => (
                comment.id === commentToEditId ? 
                {
                    ...comment,
                    content: newComment
                } : 
                comment
            ))
        ))
    }

    // This obviously delete the comment passed (for id)
    const deleteComment = (commentToDeleteId) => {
        setComments(prevComments => (
            prevComments.filter(comment => comment.id !== commentToDeleteId)
        ))
    }

    // This apply one "like" to a comment
    const changeScore = (commentId, increase) => {
        setComments(prevComments => (
            prevComments.map(comment => (
                comment.id === commentId ?
                {
                    ...comment,
                    score: increase ? comment.score + 1 : comment.score - 1,

                    peopleWhoMarkedLikes: increase ?
                    [...comment.peopleWhoMarkedLikes, currentUser.id] :
                    comment.peopleWhoMarkedLikes.filter(userId => userId !== currentUser.id)
                } :
                comment
            ))
        ))
    }

    // This get the root comments (they are no reply's from another comment)
    const getMainComments = comments.filter(comment => comment.parentId == null);

    const commentElements = getMainComments.map(comment => (
        <Comment 
         key={comment.id}
         currentUser={currentUser}
         comment={comment}
         loadedComments={comments}
         addComment={addComment}
         editComment={editComment}
         deleteComment={deleteComment}
         changeScore={changeScore}
        />
    ));

    return (
        <section className="comment-section">
            <ul className="comment-list">
                {
                    commentElements || 

                    <h1>
                        Opps, looks like there's no comment here yet,
                        maybe you should be the first one!
                    </h1>
                }
            </ul>

            <CommentInput
             nameLabel="SEND"
             placeholder="Add a comment..."
             handleSubmit={addComment} 
            />
        </section>
    )
}

export default Comments;