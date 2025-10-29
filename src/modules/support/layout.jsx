import  Button  from 'antd';
import  Link  from 'react-router-dom';

const SupportLayout = () => 
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Support System</h1>
            <Link to="/support/new">
                <Button type="primary">Create New Ticket</Button>
            </Link>
        </div>
    );
;

export default SupportLayout;