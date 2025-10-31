import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKpis, resetState, fetchRecentActivityGraphData } from "../../reducers/banks.reducer";
import { Outlet } from "react-router";
import Overview from "./overview";
import PageHeader from "../../core/shared/page.header";
import CustomButton from "../../core/button/button";
import TransactionExportModal from "./transaction.export.modal";

const Banks = () => {
  const dispatch = useDispatch();
  const breadcrumb = useSelector((state) => state.banks.breadCrumbLists);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchKpis({ showLoading: true }));
    dispatch(fetchRecentActivityGraphData());
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const handleExportModalClose = () => {
    setIsExportModalOpen(false);
  };

  return (
    <>
      <PageHeader showBreadcrumb={true} breadcrumbList={breadcrumb} />
      <div className="flex justify-between items-center mb-4">
        <Overview />
        <CustomButton type="primary" onClick={handleExportClick}>
          Export Transactions
        </CustomButton>
      </div>
      <Outlet />
      <TransactionExportModal
        isOpen={isExportModalOpen}
        onClose={handleExportModalClose}
      />
    </>
  );
};

export default Banks;
