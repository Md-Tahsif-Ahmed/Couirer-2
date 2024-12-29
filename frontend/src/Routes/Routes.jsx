import { createBrowserRouter } from "react-router-dom";

import Hompage from "../Pages/Hompage";
import Home from "../components/Home";
import HomeCover from "../components/HomeCover";
import UserDashboard from "../Pages/UserDashboard";
import Login from "../components/LoginSignUp/Login";
import Signup from "../components/LoginSignUp/Signup";
import Addparcel from "../Pages/Parcel/Addparcel";
import Label from "../Pages/Parcel/Label";
import Invoice from "../Pages/Parcel/Invoice";
import Pricing from "../components/Pricing/Pricing";
import PricingCal from "../Pages/Pricing/PricingCal";
import UploadPage from "../Pages/Bulk/Uploadpage";
import DataDisplay from "../Pages/Bulk/DataDisplay";
import ConsignmentDisplay from "../Pages/Consignments/ConsignmentDisplay";
import ConDetails from "../Pages/Consignments/ConDetails";
import UpdateParcel from "../Pages/Parcel/UpdateParcel";
import HistoryDisplay from "../Pages/User/HistoryDisplay";
import AdminDashboard from "../Admin_Panel/AdminDashboard";
import Apage from "../Admin_Panel/Apage";
import UserDisplay from "../Admin_Panel/Pages/UserDisplay";
import UpdateUser from "../Admin_Panel/Pages/User/Updateuser";
import PendingParcel from "../Admin_Panel/Pages/Status/PendingParcel";
import ApprovalParcel from "../Pages/Consignments/ApprovalParcel";
import CancellParcel from "../Pages/Consignments/CancellParcel";
import Profile from "../components/userProfile/Profile";
import BoyDashboard from "../Delivary_Boy/BoyDashboard";
import Bpage from "../Delivary_Boy/Bpage";
import ReadyParcel from "../Delivary_Boy/Pages/Parcels/ReadyParcel";
import AboutPage from "../components/About/AboutPage";
import TrackParcel from "../components/track/TrackParcel";
import Support from "../components/support/Support";
import PricingSet from "../Admin_Panel/Pages/Pricing/PricingSet";
import AsignedParcel from "../Delivary_Boy/Pages/Parcels/AsignedParcel";
import Pickup from "../Delivary_Boy/Pages/Parcels/Pickup";
import PriceUpload from "../Admin_Panel/Pages/Pricing/PriceUpload";
import Delevered from "../Delivary_Boy/Pages/Parcels/Delevered";
import AccountBoy from "../Delivary_Boy/Pages/Account/AccountBoy";
import Diposite from "../Admin_Panel/Pages/Status/Diposite";
import Casheer from "../Admin_Panel/Pages/Cash/Casheer";
import Marchantwise from "../Admin_Panel/Pages/Cash/Marchantwise";
import MarchantAcc from "../Pages/User/marchantAcc/MarchantAcc";

import PartialDelivery from "../Delivary_Boy/Pages/Parcels/PartialDelivery";

import Branches from "../components/branches/Branches";
import MarchantClaim from "../Admin_Panel/Pages/marchant-claim/MarchantClaim";
import ClaimApproved from "../Admin_Panel/Pages/marchant-claim/claimApproved";
import InReview from "../Admin_Panel/Pages/Status/InReview";
import ParcelReview from "../Admin_Panel/Pages/Status/InReview/ParcelReview";
import AddBoy from "../Admin_Panel/Pages/User/AddBoy/AddBoy";
import ProtectedRoute from "./ProtectedRoute";
import Performance from "../Delivary_Boy/Pages/Performance/Performance";
import Opage from "../Data_Operator/Opage";
 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <HomeCover />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "track-parcel",
        element: <TrackParcel />,
      },
      {
        path: "Marchant-support",
        element: <Support />,
      },

      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "branches",
        element: <Branches />,
      },
      // User routes part..............
      {
        path: "userboard",
        element: <UserDashboard />,
        children: [
          {
            path: "userpage",
            element: <ProtectedRoute><Hompage /></ProtectedRoute>,
          },
          {
            path: "addparcel",
            element: <Addparcel />,
          },
          {
            path: "marchant-account",
            element: <MarchantAcc />,
          },
          
          {
            path: "updateparcel/:id",
            element: <UpdateParcel />,
          },
          {
            path: "label/:id",
            element: <Label />,
          },
          {
            path: "invoice/:id",
            element: <Invoice />,
          },
          {
            path: "price",
            element: <PricingCal />,
          },
          {
            path: "fileup",
            element: <UploadPage />,
          },
          {
            path: "imported",
            element: <DataDisplay />,
          },
          {
            path: "con-details",
            element: <ConsignmentDisplay />,
          },
          {
            path: "con-unique/:id",
            element: <ConDetails />,
          },
          {
            path: "user-history/:email",
            element: <HistoryDisplay />,
          },
          {
            path: 'approval',
            element: <ApprovalParcel></ApprovalParcel>
          },
          {
            path: 'reject',
            element: <CancellParcel></CancellParcel>,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          
        ],
      },
      // Admin routes..................part
      {
        path: "adminboard",
        element: <AdminDashboard />,
        children: [
          {
            path: "adminpage",
            element: <Apage />,
          },
          {
            path: 'user-display',
            element: <UserDisplay></UserDisplay>
          },
          {
            path: 'update-user/:id',
            element: <UpdateUser></UpdateUser>
          },
          {
            path: 'in_review',
            element: <InReview></InReview>,
          },
          {
            path: 'pending',
            element: <PendingParcel></PendingParcel>,
          },
          {
            path: 'pricing-set',
            element: <PricingSet></PricingSet>,
          },
          {
            path: 'price-uploading',
            element: <PriceUpload></PriceUpload>,
          },
          {
            path: 'diposite',
            element: <Diposite></Diposite>,
          },
          {
            path: 'casheer',
            element: <Casheer></Casheer>
          },
          {
            path: 'wise',
            element: <Marchantwise></Marchantwise>,
          },
          {
            path: 'marchant-claim',
            element: <MarchantClaim></MarchantClaim>,
          },
          {
            path: 'claim-approved',
            element: <ClaimApproved></ClaimApproved>
          },
          {
            path: 'parcel-review/:email',
            element: <ParcelReview></ParcelReview>
          },
          {
            path: 'add-delivery-boy',
            element: <AddBoy></AddBoy>
          }
        ],
      },
      // Delivery Boy routes
      {
        path: "boyboard",
        element: <BoyDashboard></BoyDashboard>,
        children: [
          {
            path: "boypage",
            element: <Bpage></Bpage>
          },
          {
            path: "ready",
            element: <ReadyParcel></ReadyParcel>,
          },
          {
            path:"asign",
            element: <AsignedParcel></AsignedParcel>,
          },
          {
            path: "pickup",
            element: <Pickup></Pickup>,
          },
          {
            path: "delevered",
            element: <Delevered></Delevered>,
          },
          {
            path: "partial-deli",
            element: <PartialDelivery></PartialDelivery>,
          },
          {
            path: "boy-account",
            element: <AccountBoy></AccountBoy>
          },
          {
            path: 'performance',
            element: <Performance />,
          }
          
       
        ],
      },

        // Data operator routes
         {
          path: "boyboard",
          element: <BoyDashboard></BoyDashboard>,
          children: [
            {
              path: "operatorpage",
              element: <Opage></Opage>
            },
            // {
            //   path: "ready",
            //   element: <ReadyParcel></ReadyParcel>,
            // },
             
           
            
         
          ],
        },
    ],
  },
]);

export default router;
