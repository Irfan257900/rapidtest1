import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets } from './supportActions';
import CustomGrid from '../../CustomGrid';

const SupportDashboard = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.support.tickets);
  const loading = useSelector((state) => state.support.loading);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const columns = [
    { title: 'Ticket ID', dataIndex: 'id', key: 'id' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' }
  ];

  return (
    <div className='support-dashboard'>
      <h2 className='text-2xl font-bold mb-4'>My Tickets</h2>
      <CustomGrid data={tickets} columns={columns} loading={loading} />
    </div>
  );
};

export default SupportDashboard;
content_dispatch: fetchTickets(
content_useEffect: () => {
    dispatch(fetchTickets(
content_useSelector: (state) => state.support.loading