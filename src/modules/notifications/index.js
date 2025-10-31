import { useCallback, useEffect, useState } from "react";
import ListDetailLayout from "../../core/module.layouts/listdetail.layout";
import moment from "moment";
import AppEmpty from "../../core/shared/appEmpty";
import { getNotificationIcon } from "../../utils/app.config";
import { fetchNotificationAll, markAsRead, deleteNotification, archiveNotification, connectWebSocket, disconnectWebSocket } from "./http.services";
import { replaceExtraSpaces } from "../../core/shared/validations";
import { useSelector } from "react-redux";
import { useToast } from '../../core/shared/toast';

const Notifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const mode = "view";
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const { showToast } = useToast();

  const userProfileInfo = useSelector((store)=>store?.userConfig?.details);

  const breadCrumbList = [
    { id: "1", title: "Notifications" },
  ];

  useEffect(() => {
    if (userProfileInfo?.id) {
      fetchNotifications();
    }

    // WebSocket connection
    const handleNotification = (notification) => {
      setNotifications(prevNotifications => [notification, ...prevNotifications]);
      showToast({
        message: `New Notification: ${notification.message}`,
        type: 'info',
      });
    };

    connectWebSocket(handleNotification);

    return () => {
      disconnectWebSocket();
    };
  }, [userProfileInfo, showToast]);

   const fetchNotifications = async (
      currentData = [],
      pageToFetch = 1,
      searchValue = searchInput || 'all',
      category = categoryFilter,
      priority = priorityFilter
    ) => {
      const urlParams = {
        searchValue: searchValue,
        pageNo: pageToFetch,
        pageSize: pageSize,
        currentData,
        categoryFilter: category,
        priorityFilter: priority
      }
      await fetchNotificationAll(setLoading, setNotifications, setError, urlParams, setSelectedNotification, setPage);
    };

      const fetchNextPage = useCallback(async (pageToFetch) => {
        await fetchNotifications(notifications, pageToFetch + 1)
      }, [notifications]);

  const handleSelectedNotification=useCallback((item)=>{
    setSelectedNotification(item)
  },[]);
 
  const ItemRow = useCallback(({ data,handleListModalClose }) => {
    const handleMarkAsRead = async (e) => {
      e.stopPropagation();
      await markAsRead(data.id);
      // Optimistically update the UI
      setNotifications(prev => prev.map(notification =>
        notification.id === data.id ? { ...notification, read: true } : notification
      ));
      if (selectedNotification?.id === data.id) {
        setSelectedNotification({ ...selectedNotification, read: true });
      }
    };

    const handleDelete = async (e) => {
      e.stopPropagation();
      await deleteNotification(data.id);
      setNotifications(prev => prev.filter(notification => notification.id !== data.id));
      if (selectedNotification?.id === data.id) {
        setSelectedNotification(null);
      }
    };

    const handleArchive = async (e) => {
      e.stopPropagation();
      await archiveNotification(data.id);
      setNotifications(prev => prev.filter(notification => notification.id !== data.id));
      if (selectedNotification?.id === data.id) {
        setSelectedNotification(null);
      }
    };

    return (
      <ListDetailLayout.ListItem
        data={data}
        itemFields={{
          id: "id",
          title: "action",
        }}
        logoType={"custom"}
        hasLogo={true}
        customLogo={<span className={`icon ${getNotificationIcon(data?.action)}`}></span>}
        selectedRow={selectedNotification}
        onItemSelect={handleSelectedNotification }
        hasStatusBadge={true}
        metaClassName={"icon-start"}
        handleListModalClose={handleListModalClose}
      ><div><p className="text-xs font-medium text-summaryLabelGrey !text-start my-1 w-[272px] break-words whitespace-pre-line">{data?.message}</p>
          <p className="text-[10px] font-normal text-paraColor !text-start">  {data?.date ? moment.utc(data?.date).local().format("DD MMM YY hh:mmA") : "NA"}</p>
          <div className="flex space-x-2">
            <button onClick={handleMarkAsRead} className="text-blue-500 text-xs">{data?.read ? 'Mark Unread' : 'Mark Read'}</button>
            <button onClick={handleDelete} className="text-red-500 text-xs">Delete</button>
            <button onClick={handleArchive} className="text-gray-500 text-xs">Archive</button>
          </div>
          </div></ListDetailLayout.ListItem>
    );
  },[selectedNotification,getNotificationIcon,handleSelectedNotification]);

  const handleSearch = useCallback((value) => {
    value = replaceExtraSpaces(value);
    setSearchInput(value);
    fetchNotifications([], 1, value || 'all');
  }, []);

  const handleCategoryFilter = useCallback((value) => {
    setCategoryFilter(value);
    fetchNotifications([], 1, searchInput || 'all', value, priorityFilter);
  }, [searchInput, priorityFilter]);

  const handlePriorityFilter = useCallback((value) => {
    setPriorityFilter(value);
    fetchNotifications([], 1, searchInput || 'all', categoryFilter, value);
  }, [searchInput, categoryFilter]);

  return (
    <div className="notification-list">
      <ListDetailLayout
        breadCrumbList={breadCrumbList}
        ListHeader={<ListDetailLayout.ListHeader title="All" showAdd={false} />}
        ListComponent={
          <ListDetailLayout.List
            list={notifications || []}
            ItemComponent={ItemRow}
            onSearch={handleSearch}
            onSearchInput={setSearchInput}
            showAlert={error !== ""}
           alterMessage={error}
            searchValue={searchInput}
            pageSize={pageSize}
            currentPage={page}
            fetchNext={fetchNextPage}
            searchPlaceholder="Search Notifications"
            loading={loading}
            setShowAlert={setError}
          />
        }
        ViewHeader={
          mode === "view" && selectedNotification ? (
            <ListDetailLayout.ViewHeader
              logoType="custom"
              logoBg=""
              logo={<span className={`icon scale-150 ${getNotificationIcon(selectedNotification?.action)}`}></span>}
              title={selectedNotification?.action}
              // metaData={`${selectedNotification?.notifiedDate} | ${selectedNotification?.message}`}
              showActions={false}
            />
          ) : <>
          </>
        }
        children={
                    !selectedNotification ? (
            <AppEmpty />
          ) : (
            <div className="rounded-sm py-3 mt-5 h-[90%]">
              <p className="text-base text-subTextColor font-normal mb-2">
                {selectedNotification?.message}
              </p>
              <p className="text-sm text-subTextColor font-normal mb-2">Additional Details</p>
              <ul className="!list-disc pl-6">
                {/* <li className="text-xs text-paraColor mb-2">
                  <span className="font-normal">Transaction ID:</span>{" "}
                  <span className="font-medium">
                    {selectedNotification?.transactionid || "NA"}
                  </span>
                </li> */}
                <li className="text-xs text-paraColor">
                  <span className="font-normal">Date:</span>{" "}
                  <span className="font-medium">
                    {selectedNotification?.date
                      ? moment
                        .utc(selectedNotification?.date)
                        .local()
                        .format("DD MMM YY hh:mmA")
                      : "NA"}
                  </span>
                </li>
              </ul>
              {/* Category and Priority Display */}
              <p className="text-sm text-subTextColor font-normal mt-4">Category: {selectedNotification?.category || 'N/A'}</p>
              <p className="text-sm text-subTextColor font-normal">Priority: {selectedNotification?.priority || 'N/A'}</p>
            </div>
          )
        }
      />
      {/* Category and Priority Filters */}
      <div className="flex space-x-4 p-4">
        <select value={categoryFilter} onChange={(e) => handleCategoryFilter(e.target.value)} className="border rounded p-2">
          <option value="">All Categories</option>
          <option value="system">System</option>
          <option value="security">Security</option>
          <option value="marketing">Marketing</option>
        </select>
        <select value={priorityFilter} onChange={(e) => handlePriorityFilter(e.target.value)} className="border rounded p-2">
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default Notifications;
