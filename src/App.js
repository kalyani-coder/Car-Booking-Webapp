// import logo from './logo.svg';
import './App.css';
import CustomerInquiry from './Components/CustomerInquiry/CustomerInquiry';
import ShareDetails from './Components/ShareDetails/ShareDetails';
import Startenddetails from './Components/StartEndDetails/Startenddetails';
import TripDetails from './Components/TripDetails/TripDetails';
import UpdateDuty from './Components/UpdateDutySlip/UpdateDuty';
import AddPayment from './Components/AddPayment/AddPayment'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Components/Login/LogIn';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import VendorPayment from './Components/VendorPayment/VendorPayment';
import CustomerInvoice from './Components/CustomerInvoice/CustomerInvoice';
import VendorInvoice from './Components/VendorInvoice/VendorInvoice';
import CustomerInvoiceMonthly from './Components/CustomerInvoiceMonthly/CustomerInvoiceMonthly';
import VendorInvoiceMonthly from './Components/VendorInvoiceMonthly/VendorInvoiceMonthly';
import Signup from './Components/SignUp/SignUp';




function App() {
  return (
    <>
  {/* <CustomerInquiry/>
  <ShareDetails/>
  <Startenddetails /> */}
  <Router>
   
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={< Signup/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/sharedetails' element={<ShareDetails/>}/>
    <Route path='/startenddetails' element={<Startenddetails/>}/>
    <Route path='/tripdetails' element={<TripDetails/>} />
    <Route path='/updateduty'  element={<UpdateDuty/>}/>
    <Route path='/addpayment'  element={<AddPayment/>}/>
    <Route path='/customerenquire'  element={<CustomerInquiry/>}/>
    <Route path='/sidebar'  element={<Sidebar/>}/>
    <Route path='/vendorpayment' element={<VendorPayment/>} />
    <Route path='/customerinvoice' element={<CustomerInvoice/>} />
    <Route path='/vendorinvoice' element={<VendorInvoice/>} />
    <Route path='/customerinvoicemonthly' element={<CustomerInvoiceMonthly/>} />
    <Route path='/vendorinvoicemonthly' element={<VendorInvoiceMonthly/>} />


  </Routes>
  </Router>
    </>
    
  );
}

export default App;
