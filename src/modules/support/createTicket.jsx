import  Form, Input, Select, Button, message  from 'antd';
import  createTicket  from './httpServices';
import  validations  from '../../core/shared/validations.js';

const CreateTicket = () => 
    const [form] = Form.useForm();

    const onFinish = (values) => 
        createTicket(values, () => 
            message.success('Ticket created successfully!');
            form.resetFields();
        , (error) => 
            message.error(error);
        );
    ;

    return (
        <div className="my-6">
            <h2 className="text-xl font-semibold">New Ticket</h2>
            <Form form=form onFinish=onFinish>
                <Form.Item name="subject" label="Subject" rules=[validations.requiredValidator()]>
                    <Input placeholder="Enter ticket subject" />
                </Form.Item>
                <Form.Item name="description" label="Description" rules=[validations.requiredValidator()]>
                    <Input.TextArea placeholder="Describe your issue" rows=4 />
                </Form.Item>
                <Form.Item name="priority" label="Priority" rules=[validations.requiredValidator()]>
                    <Select placeholder="Select priority">
                        <Select.Option value="Low">Low</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="High">High</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="category" label="Category" rules=[validations.requiredValidator()]>
                    <Select placeholder="Select category">
                        <Select.Option value="Hardware">Hardware</Select.Option>
                        <Select.Option value="Software">Software</Select.Option>
                        <Select.Option value="Account Access">Account Access</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit Ticket</Button>
                </Form.Item>
            </Form>
        </div>
    );
;

export default CreateTicket;