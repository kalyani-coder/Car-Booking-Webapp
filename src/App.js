import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Login from "./Components/Login/LogIn";
import AppLayout from "./AppLayout";

import Home from "./Components/Home/Home";
import ShareDetails from "./Components/ShareDetails/ShareDetails";
import ViewShareDetails from "./Components/ShareDetails/ViewShareDetails";
import Startenddetails from "./Components/StartEndDetails/Startenddetails";
import AllocateTrip from "./Components/AllocateTrip/AllocateTrip";
import ViewAllocateTrip from "./Components/AllocateTrip/ViewAllocateTrip";
import UpdateDuty from "./Components/UpdateDutySlip/UpdateDuty";
import ViewUpdateDuty from "./Components/UpdateDutySlip/ViewUpdateDuty";
import AddPayment from "./Components/AddPayment/AddPayment";
import ViewCustomerPayment from "./Components/AddPayment/ViewCustomerPayment";
import VendorPayment from "./Components/VendorPayment/VendorPayment";
import ViewVendorPayment from "./Components/VendorPayment/ViewVendorPayment";
import CustomerInvoice from "./Components/CustomerInvoice/CustomerInvoice";
import VendorInvoice from "./Components/VendorInvoice/VendorInvoice";
import CustomerInvoiceMonthly from "./Components/CustomerInvoiceMonthly/CustomerInvoiceMonthly";
import VendorInvoiceMonthly from "./Components/VendorInvoiceMonthly/VendorInvoiceMonthly";
import AddCustomer from "./Components/AddCustomer/AddCustomer";
import AddVendor from "./Components/AddVendor/AddVendor";
import ViewCustomer from "./Components/AddCustomer/ViewCustomer";
import ViewVendor from "./Components/AddVendor/ViewVendor";
import CustomerRate from "./Components/AddRate/CustomerRate";
import ViewCustomerRate from "./Components/AddRate/ViewCustomerRate";
import VendorRate from "./Components/AddRate/VendorRate";
import ViewVendorRate from "./Components/AddRate/ViewVendorRate";
import CustomerEnquiry from "./Components/CustomerEnquiry/CustomerEnquiry";
import ViewCustomerEnquiry from "./Components/CustomerEnquiry/ViewCustomerEnquiry";
import AddTrip from "./Components/Trip/Add Trip";
import ViewTrip from "./Components/Trip/ViewTrip";
import AddDriver from "./Components/Driver/AddDriver";
import ViewDriver from "./Components/Driver/ViewDriver";
import ViewDriverDetails from "./Components/StartEndDetails/ViewDriverDetails";
import Customer from "./Components/CustomerEnquiry/Customer";
import ViewDetailsPayment from "./Components/VendorPayment/ViewDetailsPayment";
import ViewDetailsCustomerPayment from "./Components/AddPayment/ViewDetailsCustomerPayment";
import CustomerReport from "./Components/GenerateReport/CustomerReport";
import TripDetailsReport from "./Components/GenerateReport/TripDetailsReport";
import MonthlyCustomerReport from "./Components/GenerateReport/MonthlyCustomerReport";
import VendorReport from "./Components/VendorReport/VendorReport";
import MasterCorporateCustomer from "./Components/Master/MasterCorporateCustomer";
import CorporateInvoiceMonthly from "./Components/CustomerInvoice/CorporateInvoiceMonthly";
import ViewMaster from "./Components/Master/ViewMaster";
import ViewCorporateCustomer from "./Components/AddRate/ViewCorporateCustomer";
import ViewIndivisualCustomer from "./Components/AddRate/ViewIndivisualCustomer";
import PublicRoute from "./Components/ProtectedRoute/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute element={<Login />} restrictedPath="/home" />} />
        <Route path="/*" element={<AppLayout />}>
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="sharedetails"
            element={<ProtectedRoute element={<ShareDetails />} />}
          />
          <Route
            path="viewsharedetails"
            element={<ProtectedRoute element={<ViewShareDetails />} />}
          />
          <Route
            path="startenddetails"
            element={<ProtectedRoute element={<Startenddetails />} />}
          />
          <Route
            path="allocatetrip"
            element={<ProtectedRoute element={<AllocateTrip />} />}
          />
          <Route
            path="viewallocatetrip"
            element={<ProtectedRoute element={<ViewAllocateTrip />} />}
          />
          <Route
            path="updateduty"
            element={<ProtectedRoute element={<UpdateDuty />} />}
          />
          <Route
            path="viewupdateduty"
            element={<ProtectedRoute element={<ViewUpdateDuty />} />}
          />
          <Route
            path="addcustomerpayment"
            element={<ProtectedRoute element={<AddPayment />} />}
          />
          <Route
            path="viewcustomerpayment"
            element={<ProtectedRoute element={<ViewCustomerPayment />} />}
          />
          <Route
            path="corporatecustomer"
            element={<ProtectedRoute element={<CustomerRate />} />}
          />
          <Route
            path="vendorrate"
            element={<ProtectedRoute element={<VendorRate />} />}
          />
          <Route
            path="viewvendorrate"
            element={<ProtectedRoute element={<ViewVendorRate />} />}
          />
          <Route
            path="customerenquiry"
            element={<ProtectedRoute element={<CustomerEnquiry />} />}
          />
          <Route
            path="vendorpayment"
            element={<ProtectedRoute element={<VendorPayment />} />}
          />
          <Route
            path="viewvendorpayment"
            element={<ProtectedRoute element={<ViewVendorPayment />} />}
          />
          <Route
            path="customerinvoice"
            element={<ProtectedRoute element={<CustomerInvoice />} />}
          />
          <Route
            path="vendorinvoice"
            element={<ProtectedRoute element={<VendorInvoice />} />}
          />
          <Route
            path="customerinvoicemonthly"
            element={<ProtectedRoute element={<CustomerInvoiceMonthly />} />}
          />
          <Route
            path="vendorinvoicemonthly"
            element={<ProtectedRoute element={<VendorInvoiceMonthly />} />}
          />
          <Route
            path="addcustomer"
            element={<ProtectedRoute element={<AddCustomer />} />}
          />
          <Route
            path="master"
            element={<ProtectedRoute element={<MasterCorporateCustomer />} />}
          />
          <Route
            path="addvendor"
            element={<ProtectedRoute element={<AddVendor />} />}
          />
          <Route
            path="viewcustomer"
            element={<ProtectedRoute element={<ViewCustomer />} />}
          />
          <Route
            path="viewvendor"
            element={<ProtectedRoute element={<ViewVendor />} />}
          />
          <Route
            path="viewcustomerenquiry"
            element={<ProtectedRoute element={<ViewCustomerEnquiry />} />}
          />
          <Route
            path="addtrip"
            element={<ProtectedRoute element={<AddTrip />} />}
          />
          <Route
            path="viewtrip"
            element={<ProtectedRoute element={<ViewTrip />} />}
          />
          <Route
            path="adddriver"
            element={<ProtectedRoute element={<AddDriver />} />}
          />
          <Route
            path="viewdriver"
            element={<ProtectedRoute element={<ViewDriver />} />}
          />
          <Route
            path="viewdetailsfromdriver"
            element={<ProtectedRoute element={<ViewDriverDetails />} />}
          />
          <Route
            path="customer"
            element={<ProtectedRoute element={<Customer />} />}
          />
          <Route
            path="viewvendorpayment/:_id"
            element={<ProtectedRoute element={<ViewDetailsPayment />} />}
          />
          <Route
            path="viewcustomerpayment/:_id"
            element={
              <ProtectedRoute element={<ViewDetailsCustomerPayment />} />
            }
          />
          <Route
            path="customerreport"
            element={<ProtectedRoute element={<CustomerReport />} />}
          />
          <Route
            path="monthlycustomerreport"
            element={<ProtectedRoute element={<MonthlyCustomerReport />} />}
          />
          <Route
            path="tripdetailsreport"
            element={<ProtectedRoute element={<TripDetailsReport />} />}
          />
          <Route
            path="vendorreport"
            element={<ProtectedRoute element={<VendorReport />} />}
          />
          <Route
            path="corporatecustomermonthly"
            element={<ProtectedRoute element={<CorporateInvoiceMonthly />} />}
          />
          <Route
            path="viewmaster"
            element={<ProtectedRoute element={<ViewMaster />} />}
          />
          <Route
            path="viewcorporatecustomer"
            element={<ProtectedRoute element={<ViewCorporateCustomer />} />}
          />
          <Route
            path="viewindivisualcustomer"
            element={<ProtectedRoute element={<ViewIndivisualCustomer />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
