import React, { useState, useCallback } from "react";
import { Modal, DatePicker, Select, Checkbox, Button, Alert } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../../reducers/banks.reducer";
import AppAlert from "../../core/shared/appAlert";
import CustomButton from "../../core/button/button";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionExportModal = ({ isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState(null);
  const [exportFormat, setExportFormat] = useState("CSV");
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [exportHistory, setExportHistory] = useState([]);
  const { data: { accounts } } = useSelector((store) => store.banks);
  const dispatch = useDispatch();

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleFormatChange = (value) => {
    setExportFormat(value);
  };

  const handleTransactionTypeChange = (checkedValues) => {
    setTransactionTypes(checkedValues);
  };

  const handleAccountChange = (checkedValues) => {
    setSelectedAccounts(checkedValues);
  };

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);

    // Simulate export process (replace with actual API call)
    try {
      // Validate input
      if (!dateRange || dateRange.length !== 2) {
        throw new Error("Please select a valid date range.");
      }

      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");

      // Construct export parameters
      const exportParams = {
        startDate,
        endDate,
        format: exportFormat,
        transactionTypes,
        accounts: selectedAccounts,
      };

      // Simulate API call
      await simulateExport(exportParams);

      // Update export history
      const newExport = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        params: exportParams,
        downloadLink: "#", // Replace with actual download link
      };
      setExportHistory([newExport, ...exportHistory]);

      // Simulate email notification
      simulateEmailNotification();

      onClose();
    } catch (error) {
      setExportError(error.message);
    } finally {
      setExporting(false);
    }
  };

  const simulateExport = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure based on some condition
        if (params.format === "PDF" && params.transactionTypes.includes("Withdrawal")) {
          reject(new Error("PDF export with Withdrawal type is not supported."));
        } else {
          resolve();
        }
      }, 2000);
    });
  };

  const simulateEmailNotification = () => {
    // In a real application, you would trigger an email notification here
    console.log("Email notification sent!");
  };

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage([{ key: "kpis", message: "" }]));
  }, []);

  return (
    <Modal
      title="Export Transactions"
      open={isOpen}
      onCancel={onClose}
      footer={
        [<CustomButton key="cancel" onClick={onClose}>Cancel</CustomButton>,
        <CustomButton
          key="export"
          type="primary"
          loading={exporting}
          onClick={handleExport}
        >
          Export
        </CustomButton>]
      }
    >
      {exportError && (
        <div className="mx-2">
          <div className="alert-flex withdraw-alert fiat-alert">
            <AppAlert
              type="error"
              description={exportError}
              showIcon
              closable
              afterClose={clearError}
            />
          </div>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date Range:</label>
        <RangePicker onChange={handleDateRangeChange} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Export Format:</label>
        <Select defaultValue={exportFormat} style={{ width: "100%" }} onChange={handleFormatChange}>
          <Option value="CSV">CSV</Option>
          <Option value="Excel">Excel</Option>
          <Option value="PDF">PDF</Option>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Transaction Types:</label>
        <Checkbox.Group
          options={["Deposit", "Withdrawal", "Transfer", "Payment"]}
          onChange={handleTransactionTypeChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Accounts:</label>
        <Checkbox.Group style={{ width: "100%" }} onChange={handleAccountChange}>
          {accounts?.bankAccounts?.map((account) => (
            <Checkbox key={account.id} value={account.id}>
              {account.currency} - {account.accountNumber}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <div>
        <h3>Export History</h3>
        {exportHistory.length === 0 ? (
          <p>No exports yet.</p>
        ) : (
          <ul>
            {exportHistory.map((item) => (
              <li key={item.id}>
                {item.date} - Format: {item.params.format}, Types: {item.params.transactionTypes.join(", ")}
                <a href={item.downloadLink} target="_blank" rel="noopener noreferrer">Download</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default TransactionExportModal;
