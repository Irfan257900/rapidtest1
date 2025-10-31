import { appClientMethods, websocketClient } from "./http.clients"

// WebSocket Handling
export const connectWebSocket = (onMessageReceived) => {
    websocketClient.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        onMessageReceived(notification);
    };

    websocketClient.onopen = () => {
        console.log('WebSocket connected');
    };

    websocketClient.onclose = () => {
        console.log('WebSocket disconnected');
    };

    websocketClient.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

export const disconnectWebSocket = () => {
    websocketClient.close();
};


export const readNotification = async (onSuccess,  obj, appName) => {
    try {
        const data = await appClientMethods.put(`read`, obj)
        onSuccess(data)
    } catch (error) {

    }
}

export const fetchNotifications = async (setState, appName) => {
    setState((prev) => ({ ...prev, loading: true }))
    try {
        const data = await appClientMethods.get(`notifications?pageSize=10&pageNo=1&search=all`)
        setState((prev) => ({ ...prev, data }))
    } catch (error) {
        setState((prev) => ({ ...prev, error: error.message }))
    } finally {
        setState((prev) => ({ ...prev, loading: false }))
    }
}


async function fetchNotificationAll(setLoader, setData, setError, urlParams, setSelectedNotification, setPage) {
    setLoader(true);
    const { searchValue, pageNo, pageSize, currentData, categoryFilter, priorityFilter } = urlParams
    try {
        // Add category and priority filters to the API call
        let url = `notifications?pageSize=${pageSize}&pageNo=${pageNo}&search=${searchValue}`;
        if (categoryFilter) {
            url += `&category=${categoryFilter}`;
        }
        if (priorityFilter) {
            url += `&priority=${priorityFilter}`;
        }
        const response = await appClientMethods.get(url);
        setData([...currentData, ...response]);
        pageNo === 1 && setSelectedNotification(response?.[0]);
        setPage(pageNo);
    } catch (error) {
        setError(error.message)
    } finally {
        setLoader(false);
    }
}

// New functions for notification actions (mark as read, delete, archive)
export const markAsRead = async (notificationId) => {
    try {
        await appClientMethods.put(`notifications/${notificationId}/read`);
    } catch (error) {
        console.error("Error marking as read:", error);
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        await appClientMethods.delete(`notifications/${notificationId}`);
    } catch (error) {
        console.error("Error deleting notification:", error);
    }
};

export const archiveNotification = async (notificationId) => {
    try {
        await appClientMethods.put(`notifications/${notificationId}/archive`);
    } catch (error) {
        console.error("Error archiving notification:", error);
    }
};


export { fetchNotificationAll }