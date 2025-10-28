import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketDetails, addComment } from './supportActions';

const TicketDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.support.currentTicket);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchTicketDetails(id));
  }, [dispatch, id]);

  const handleCommentSubmit = () => {
    dispatch(addComment(id, comment));
    setComment('');
  };

  return (
    <div className='ticket-details'>
      <h2 className='text-2xl font-bold mb-4'>Ticket ID: {ticket.id}</h2>
      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <div className='comments-section mt-4'>
        <h3 className='text-xl'>Comments:</h3>
        <div>{ticket.comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))}</div>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='border rounded p-2 mt-2' placeholder='Add a comment...'></textarea>
        <button onClick={handleCommentSubmit} className='bg-primary text-white px-4 py-2 mt-2'>Reply</button>
      </div>
    </div>
  );
};

export default TicketDetails;
content_dispatch: addComment(id, comment
content_map: (c, index) => (
          <p key={index}>{c}</p>
        
content_setComment: e.target.value
content_useEffect: () => {
    dispatch(fetchTicketDetails(id
content_useSelector: (state) => state.support.currentTicket
content_useState: ''