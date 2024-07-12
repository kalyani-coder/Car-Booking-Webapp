// import logo from './logo.svg';
import "./App.css";
import CustomerEnquiry from "./Components/CustomerEnquiry/CustomerEnquiry";
import ShareDetails from "./Components/ShareDetails/ShareDetails";
import Startenddetails from "./Components/StartEndDetails/Startenddetails";
import AllocateTrip from "./Components/AllocateTrip/AllocateTrip";
import ViewAllocateTrip from "./Components/AllocateTrip/ViewAllocateTrip";
import UpdateDuty from "./Components/UpdateDutySlip/UpdateDuty";
import AddPayment from "./Components/AddPayment/AddPayment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/LogIn";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";
import VendorPayment from "./Components/VendorPayment/VendorPayment";
import ViewVendorPayment from "./Components/VendorPayment/ViewVendorPayment";
import CustomerInvoice from "./Components/CustomerInvoice/CustomerInvoice";
import VendorInvoice from "./Components/VendorInvoice/VendorInvoice";
import CustomerInvoiceMonthly from "./Components/CustomerInvoiceMonthly/CustomerInvoiceMonthly";
import VendorInvoiceMonthly from "./Components/VendorInvoiceMonthly/VendorInvoiceMonthly";
// import Signup from './Components/SignUp/SignUp';
import AddCustomer from "./Components/AddCustomer/AddCustomer";
import AddVendor from "./Components/AddVendor/AddVendor";
import ViewCustomer from "./Components/AddCustomer/ViewCustomer";
import ViewVendor from "./Components/AddVendor/ViewVendor";
import CustomerRate from "./Components/AddRate/CustomerRate";
import ViewCustomerRate from "./Components/AddRate/ViewCustomerRate";
import VendorRate from "./Components/AddRate/VendorRate";
import ViewVendorRate from "./Components/AddRate/ViewVendorRate";
import ViewCustomerEnquiry from "./Components/CustomerEnquiry/ViewCustomerEnquiry";
import AddTrip from "./Components/Trip/Add Trip";
import ViewTrip from "./Components/Trip/ViewTrip";
import ViewShareDetails from "./Components/ShareDetails/ViewShareDetails";
import ViewUpdateDuty from "./Components/UpdateDutySlip/ViewUpdateDuty";
import AddDriver from "./Components/Driver/AddDriver";
import ViewDriver from "./Components/Driver/ViewDriver";
import ViewCustomerPayment from "./Components/AddPayment/ViewCustomerPayment";
import ViewDriverDetails from "./Components/StartEndDetails/ViewDriverDetails";
import Customer from "./Components/CustomerEnquiry/Customer";
// import ViewCorporateCustomr from "./Components/ViewCustomers/ViewCorporateCustomr";
// import IndivisualCustomers from "./Components/ViewCustomers/IndivisualCustomers";
import ViewDetailsPayment from "./Components/VendorPayment/ViewDetailsPayment";
import ViewDetailsCustomerPayment from "./Components/AddPayment/ViewDetailsCustomerPayment";
import CustomerReport from "./Components/GenerateReport/CustomerReport";
import TripDetailsReport from "./Components/GenerateReport/TripDetailsReport";
import MonthlyCustomerReport from "./Components/GenerateReport/MonthlyCustomerReport";
import VendorReport from "./Components/VendorReport/VendorReport";
// import IndivisualCustomerRate from './Components/AddRate/IndivisualCustomerRate';
import MasterCorporateCustomer from "./Components/Master/MasterCorporateCustomer";
import CorporateInvoiceMonthly from "./Components/CustomerInvoice/CorporateInvoiceMonthly";
import ViewMaster from "./Components/Master/ViewMaster";
import ViewCorporateCustomer from "./Components/AddRate/ViewCorporateCustomer";
import ViewIndivisualCustomer from "./Components/AddRate/ViewIndivisualCustomer";
import { BrowserRouter } from "react-router-dom";
import SideNavbar from "./Components/SideBarCardBooking/SideBarCardBooking";
import { navigation } from "./Components/SideBarCardBooking/NavLink";
import React, { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(true);

  const toggleSideNavbar = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };
  const contentMargin = isSideNavbarOpen ? "lg:ml-80 md:ml-20" : "lg:ml-16 16";

  return (
    <>
      <BrowserRouter>
        <SideNavbar
          navigation={navigation}
          isSideNavbarOpen={isSideNavbarOpen}
          toggleSideNavbar={toggleSideNavbar}
          setIsSideNavbarOpen={setIsSideNavbarOpen}
        />
        {/* <Sidebar/> */}
        <div
          className={`flex-1 overflow-x-hidden ms-14 ${contentMargin} duration-700 `}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/sharedetails"
              element={<ProtectedRoute element={<ShareDetails />} />}
            />
            <Route
              path="/viewsharedetails"
              element={<ProtectedRoute element={<ViewShareDetails />} />}
            />
            <Route
              path="/startenddetails"
              element={<ProtectedRoute element={<Startenddetails />} />}
            />
            <Route
              path="/allocatetrip"
              element={<ProtectedRoute element={<AllocateTrip />} />}
            />
            <Route
              path="/viewallocatetrip"
              element={<ProtectedRoute element={<ViewAllocateTrip />} />}
            />
            <Route
              path="/updateduty"
              element={<ProtectedRoute element={<UpdateDuty />} />}
            />

            <Route
              path="/viewupdateduty"
              element={<ProtectedRoute element={<ViewUpdateDuty />} />}
            />
            <Route
              path="/addcustomerpayment"
              element={<ProtectedRoute element={<AddPayment />} />}
            />
            <Route
              path="/viewcustomerpayment"
              element={<ProtectedRoute element={<ViewCustomerPayment />} />}
            />
            <Route
              path="/corporatecustomer"
              element={<ProtectedRoute element={<CustomerRate />} />}
            />
            <Route
              path="/vendorrate"
              element={<ProtectedRoute element={<VendorRate />} />}
            />
            <Route
              path="/viewvendorrate"
              element={<ProtectedRoute element={<ViewVendorRate />} />}
            />
            <Route
              path="/customerenquiry"
              element={<ProtectedRoute element={<CustomerEnquiry />} />}
            />
            <Route path="/sidebar" element={<Sidebar />} />

            <Route
              path="/vendorpayment"
              element={<ProtectedRoute element={<VendorPayment />} />}
            />
            <Route
              path="/Viewvendorpayment"
              element={<ProtectedRoute element={<ViewVendorPayment />} />}
            />
            <Route
              path="/customerinvoice"
              element={<ProtectedRoute element={<CustomerInvoice />} />}
            />
            <Route
              path="/vendorinvoice"
              element={<ProtectedRoute element={<VendorInvoice />} />}
            />
            <Route
              path="/customerinvoicemonthly"
              element={<ProtectedRoute element={<CustomerInvoiceMonthly />} />}
            />
            <Route
              path="/vendorinvoicemonthly"
              element={<ProtectedRoute element={<VendorInvoiceMonthly />} />}
            />
            <Route
              path="/addcustomer"
              element={<ProtectedRoute element={<AddCustomer />} />}
            />
            <Route
              path="/master"
              element={<ProtectedRoute element={<MasterCorporateCustomer />} />}
            />
            <Route
              path="/addvendor"
              element={<ProtectedRoute element={<AddVendor />} />}
            />
            <Route
              path="/viewcustomer"
              element={<ProtectedRoute element={<ViewCustomer />} />}
            />
            <Route
              path="/viewvendor"
              element={<ProtectedRoute element={<ViewVendor />} />}
            />

            <Route
              path="/viewcustomerenquiry"
              element={<ProtectedRoute element={<ViewCustomerEnquiry />} />}
            />
            <Route
              path="/addtrip"
              element={<ProtectedRoute element={<AddTrip />} />}
            />
            <Route
              path="/viewtrip"
              element={<ProtectedRoute element={<ViewTrip />} />}
            />
            <Route
              path="/adddriver"
              element={<ProtectedRoute element={<AddDriver />} />}
            />
            <Route
              path="/viewdriver"
              element={<ProtectedRoute element={<ViewDriver />} />}
            />
            <Route
              path="/viewdetailsfromdriver"
              element={<ProtectedRoute element={<ViewDriverDetails />} />}
            />
            <Route
              path="/Customer"
              element={<ProtectedRoute element={<Customer />} />}
            />
            <Route
              path="/viewvendorpayment/:_id"
              element={<ProtectedRoute element={<ViewDetailsPayment />} />}
            />
            <Route
              path="/viewcustomerpayment/:_id"
              element={
                <ProtectedRoute element={<ViewDetailsCustomerPayment />} />
              }
            />
            <Route
              path="/customerreport"
              element={<ProtectedRoute element={<CustomerReport />} />}
            />
            <Route
              path="/monthlycustomerreport"
              element={<ProtectedRoute element={<MonthlyCustomerReport />} />}
            />
            <Route
              path="/tripdetailsreport"
              element={<ProtectedRoute element={<TripDetailsReport />} />}
            />
            <Route
              path="/vendorreport"
              element={<ProtectedRoute element={<VendorReport />} />}
            />
            <Route
              path="/corporatecustomermonthly"
              element={<ProtectedRoute element={<CorporateInvoiceMonthly />} />}
            />
            <Route
              path="/viewmaster"
              element={<ProtectedRoute element={<ViewMaster />} />}
            />
            <Route
              path="/viewcorporatecustomer"
              element={<ProtectedRoute element={<ViewCorporateCustomer />} />}
            />
            <Route
              path="/viewindivisualcustomer"
              element={<ProtectedRoute element={<ViewIndivisualCustomer />} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
