import  List  from '../../core/grid.component/index.js';
import  fetchMyTickets  from './httpServices';
import  message  from 'antd';

const MyTickets = () => 
    const loadTickets = async () => 
        const result = await fetchMyTickets();
        // handle result
        message.success("Tickets loaded successfully");
    ;

    useEffect(() => 
        loadTickets();
    , []);

    return (
        <div className="my-6">
            <h2 className="text-xl font-semibold">My Tickets</h2>
            <List url="support/tickets/my" columns=[ title: 'Subject', dataIndex: 'subject' ,  title: 'Status', dataIndex: 'status' ] />
        </div>
    );
;

export default MyTickets;


        loadTickets(