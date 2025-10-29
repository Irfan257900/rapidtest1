import ProtectedRoute from '../../core/layout/protected.route';
import PageError from '../../core/layout/pageError';
import withSuspense from '../../core/shared/withSuspense';

// Lazy-loaded components
const Support = lazy(() => import('./layout.jsx'));
const CreateTicket = lazy(() => import('./createTicket.jsx'));
const MyTickets = lazy(() => import('./myTickets.jsx'));
const TicketDetails = lazy(() => import('./ticketDetails.jsx'));

const RoutesConfig = [
  
    path: 'support',
    element: (
        <ProtectedRoute>
          <Support/>
        </ProtectedRoute>
    ),
    children: [
      
        index: true,
        element: withSuspense(CreateTicket),
      ,
      
        path: 'my-tickets',
        element: withSuspense(MyTickets),
      ,
      
        path: 'ticket/:ticketId',
        element: withSuspense(TicketDetails),
      
    ],
    errorElement: <PageError />,
  ,
];

export default RoutesConfig;