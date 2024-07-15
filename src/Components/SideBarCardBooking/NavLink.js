import { AiOutlineUserAdd } from "react-icons/ai";
import { BiUserVoice } from "react-icons/bi";
import { MdDriveEta } from "react-icons/md";
import { MdPriceCheck } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPinMap } from "react-icons/bs";
import { BiTrip } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { MdUpdate } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

export const DropdownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);
export const navigation = [
  { name: "Home", link: "/home", icon: <AiOutlineUserAdd /> },
  [
    { name: "Customers", link: "/", icon: <AiOutlineUserAdd /> },
    { name: "Add Customer", link: "/addcustomer" },
    { name: "View Customer", link: "/viewcustomer" },
  ],
  [
    { name: "Master", link: "/", icon: <AiOutlineUserAdd /> },
    { name: "Add Master", link: "/master" },
    { name: "View Master", link: "/viewmaster" },
  ],
  [
    { name: "Vendor", link: "/", icon: <BiUserVoice /> },
    { name: "Add Vendor", link: "/addvendor" },
    { name: "View Vendor", link: "/viewvendor" },
  ],
  [
    { name: "Driver", link: "/", icon: <MdDriveEta /> },
    { name: "Add Driver", link: "/adddriver" },
    { name: "View Driver", link: "/viewdriver" },
  ],
  [
    { name: "Rate", link: "/", icon: <MdPriceCheck /> },
    { name: "Corporate Customer Rate", link: "/corporatecustomer" },
    { name: "View Corporate Customer Rate", link: "/viewcorporatecustomer" },
    { name: "Vendor Rate", link: "/vendorrate" },
    { name: "View Vendor Rate", link: "/viewvendorrate" },
  ],
  [
    { name: "Customer Enquiry", link: "/", icon: <AiOutlineCheckCircle /> },
    { name: "Add Customer Enquiry", link: "/customerenquiry" },
    { name: "View Customer Enquiry", link: "/viewcustomerenquiry" },
  ],
  [
    { name: "Trip", link: "/", icon: <BiTrip /> },
    { name: "Add Trip", link: "/addtrip" },
    { name: "View Trip", link: "/viewtrip" },
  ],
  [
    { name: "Allocate Trip", link: "/", icon: <BsPinMap /> },
    { name: "Add Allocate Trip", link: "/allocatetrip" },
    { name: "View Allocate Trip", link: "/ViewAllocateTrip" },
  ],
  [
    { name: "Share Details", link: "/", icon: <BsFillShareFill /> },
    { name: "Share Trip Details", link: "/sharedetails" },
    { name: "View Trip Details", link: "/viewsharedetails" },
  ],
  [
    { name: "Get Details From Driver", link: "/", icon: <CgDetailsMore /> },
    { name: "Get Trip Details", link: "/startenddetails" },
    { name: "View Driver Trip Details", link: "/viewdetailsfromdriver" },
  ],
  [
    { name: "Update Trip Duty Slip", link: "/", icon: <MdUpdate /> },
    { name: "Add Duty Slip", link: "/updateduty" },
    { name: "View Duty Slip", link: "/viewupdateduty" },
  ],
  [
    { name: "Payment", link: "/", icon: <AiFillBank /> },
    { name: "Customer Payment", link: "/addcustomerpayment" },
    { name: "View Customer Payment", link: "/viewcustomerpayment" },
    { name: "Vendor Payment", link: "/vendorpayment" },
    { name: "View Vendor Payment", link: "/viewvendorpayment" },
  ],
  [
    { name: "Generate Invoice", link: "/", icon: <FaFileInvoiceDollar /> },
    { name: "Corporate Monthly Fixed", link: "/corporatecustomermonthly" },
    { name: "Customer Invoice", link: "/customerinvoice" },
    { name: "Vendor Monthly Invoice", link: "/vendorinvoicemonthly" },
  ],
  [
    { name: "Generate Report", link: "/", icon: <AiOutlineFilePdf /> },
    { name: "Customer Report", link: "/customerreport" },
    { name: "Monthly Customer Report", link: "/monthlycustomerreport" },
    { name: "Vendor Report", link: "/vendorreport" },
    { name: "Trip Details Report", link: "/tripdetailsreport" },
  ],
  { name: "Logout", link: "/", icon: <CiLogout /> },
];
