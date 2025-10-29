import  deriveErrorMessage  from '../../core/shared/deriveErrorMessage';

export const createTicket = async (ticketData, onSuccess, onError) => 
    try 
        const response = await appClientMethods.post('support/tickets', ticketData);
        onSuccess(response);
     catch (error) 
        onError?.(deriveErrorMessage(error));
    
;

export const fetchMyTickets = async (onSuccess, onError) => 
    try 
        const response = await appClientMethods.get('support/tickets/my');
        onSuccess(response);
     catch (error) 
        onError?.(deriveErrorMessage(error));
    
;

export const fetchTicketDetails = async (ticketId, onSuccess, onError) => 
    try 
        const response = await appClientMethods.get(`support/tickets/$ticketId`);
        onSuccess(response);
     catch (error) 
        onError?.(deriveErrorMessage(error));
    
;