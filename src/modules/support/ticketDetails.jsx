import  message  from 'antd';
import  fetchTicketDetails  from './httpServices';
import  useParams  from 'react-router-dom';

const TicketDetails = () => 
    const  ticketId  = useParams();

    const loadTicketDetails = async () => 
        const ticket = await fetchTicketDetails(ticketId);
        // handle ticket
        message.success("Ticket details loaded");
    ;

    useEffect(() => 
        loadTicketDetails();
    , []);

    return (
        <div className="my-6">
            <h2 className="text-xl font-semibold">Ticket Details</h2>
            <p>Loading...</p>
        </div>
    );
;

export default TicketDetails;



        loadTicketDetails(