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
import Login from './Components/Login/LogIn';
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
import ViewCorporateCustomr from "./Components/ViewCustomers/ViewCorporateCustomr";
import IndivisualCustomers from "./Components/ViewCustomers/IndivisualCustomers";
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


function App() {
  return (
    <>
      {/* <CustomerInquiry/>
  <ShareDetails/>
  <Startenddetails /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          {/* <Route path='/signup' element={< Signup/>} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/sharedetails" element={<ShareDetails />} />
          <Route path="/viewsharedetails" element={<ViewShareDetails />} />
          <Route path="/startenddetails" element={<Startenddetails />} />
          <Route path="/allocatetrip" element={<AllocateTrip />} />
          <Route path="/viewallocatetrip" element={<ViewAllocateTrip />} />
          <Route path="/updateduty" element={<UpdateDuty />} />
          <Route path="/viewupdateduty" element={<ViewUpdateDuty />} />
          <Route path="/addcustomerpayment" element={<AddPayment />} />
          <Route
            path="/viewcustomerpayment"
            element={<ViewCustomerPayment />}
          />
          <Route path="/companyrate" element={<CustomerRate />} />
          <Route path="/viewcompanyrate" element={<ViewCustomerRate />} />
          {/* <Route path='/indivisualcustomerrate'  element={<IndivisualCustomerRate/>}/> */}
          <Route path="/vendorrate" element={<VendorRate />} />
          <Route path="/viewvendorrate" element={<ViewVendorRate />} />
          <Route path="/customerenquiry" element={<CustomerEnquiry />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/vendorpayment" element={<VendorPayment />} />
          <Route path="/Viewvendorpayment" element={<ViewVendorPayment />} />
          <Route path="/customerinvoice" element={<CustomerInvoice />} />
          <Route path="/vendorinvoice" element={<VendorInvoice />} />
          <Route
            path="/customerinvoicemonthly"
            element={<CustomerInvoiceMonthly />}
          />
          <Route
            path="/vendorinvoicemonthly"
            element={<VendorInvoiceMonthly />}
          />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/master" element={<MasterCorporateCustomer />} />
          <Route path="/addvendor" element={<AddVendor />} />
          <Route path="/viewcustomer" element={<ViewCustomer />} />
          <Route path="/viewvendor" element={<ViewVendor />} />
          <Route
            path="/viewcustomerenquiry"
            element={<ViewCustomerEnquiry />}
          />
          <Route path="/addtrip" element={<AddTrip />} />
          <Route path="/viewtrip" element={<ViewTrip />} />
          <Route path="/adddriver" element={<AddDriver />} />
          <Route path="/viewdriver" element={<ViewDriver />} />
          <Route
            path="/viewdetailsfromdriver"
            element={<ViewDriverDetails />}
          />
          <Route path="/Customer" element={<Customer />} />
          <Route
            path="/viewcorporatecustomer"
            element={<ViewCorporateCustomr />}
          />
          <Route
            path="/indivisualcustomers"
            element={<IndivisualCustomers />}
          />
          <Route
            path="/viewvendorpayment/:_id"
            element={<ViewDetailsPayment />}
          />
          <Route
            path="/viewcustomerpayment/:_id"
            element={<ViewDetailsCustomerPayment />}
          />
          <Route path="/customerreport" element={<CustomerReport />} />
          <Route
            path="/monthlycustomerreport"
            element={<MonthlyCustomerReport />}
          />
          <Route path="/tripdetailsreport" element={<TripDetailsReport />} />
          <Route path="/vendorreport" element={<VendorReport />} />
          <Route path="/corporatecustomermonthly" element={<CorporateInvoiceMonthly />} />
          <Route path="/viewmaster" element={<ViewMaster />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
