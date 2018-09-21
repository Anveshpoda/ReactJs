/* eslint-disable */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import Fankick from './Dashboard/Fankick';
import Agent from './Dashboard/Agent';
import Dashboard from './Dashboard/Dashboard';
import CreateChallenge from './challenges/CreateChallenge';
import ClosedChallenge from './challenges/ClosedChallenge';
import QueuedChallenge from './challenges/QueuedChallenge';
import RunningChallenge from './challenges/RunningChallenge';
import EditContest from './challenges/EditContest';
import PermissionReq from './userManagement/PermissionsReq';
import ReqPermissions from './userManagement/ReqPermissions';
import ManageFankickAccount from './userManagement/ManageFankickAccount';
import ContentPacks from './fun2win/Fun2Win';
import FunWinpage from './fun2win/Fun2WinPage';
// import CreateFun2Win from './fun2win/CreateFun2Win';
import ClosedFun2Win from './fun2win/ClosedFun2Win';
import QueuedFun2Win from './fun2win/QueuedFun2Win';
import RunningFun2Win from './fun2win/RunningFun2Win';
//import EditFun2Win from './fun2win/EditFun2Win';
import CreateFun2WinNew from './fun2winNew/CreateFun2WinNew';
import EditFun2Win from './editfun2winNew/EditFun2WinNew';
import FanCoins from './fancoins/fanCoinsConf';
import PushNotifications from './pushnotifications/PushNotifications';
import PredefinedNotifications from './pushnotifications/PredefinedNotifications';
import CustomNotifications from './pushnotifications/CustomNotifications';
import ScheduledNotifications from './pushnotifications/ScheduledNotifications';
import AllSent from './pushnotifications/AllSent';
//-------FanClubs--//
import FanClubs from './fanclubs/FanClubs';
import CreateFanClub from './fanclubs/CreateFanClub';
import EditFanClub from './fanclubs/EditFanClub';
import ViewFanClubs from './fanclubs/ViewFanClubs';
//-----FunClubs---//
import FunClubs from './funclubs/FunClubs';
import CreateFunClub from './funclubs/CreateFunClub';
import CreateFunClubJoke from './funclubs/CreateFunClubJoke';
import FunClubListAll from './funclubs/FunClubListAll';
import FunDemo from './funclubs/FunDemo';
//----Coupons--//
import Coupons from './coupons/Coupons';
//import CouponsList from './coupons/CouponsList';
import OpenCoupons from './coupons/AvailableList';
import RedeemedCouponsList from './coupons/RedeemedList';
import AvilableCouponsList from './coupons/AvailableList';
import RedeemCoupons from './coupons/RedeemedDashboard';
// import AddNewCoupon from './coupons/AddCoupon';

import AddNewCoupon from './coupons/newcopuons/AddNewCoupon';
//----Celebrities---//
import Celebrities from './celebrities/Celebrities';
import ViewCelebrity from './celebrities/ViewCelebrity';
import EditCelebrity from './celebrities/EditCelebrityDetails';
import CreateNewCelebrity from './celebrities/CreateNewCelebrity';
//----Celebrities---//
import Reports from './Reports/ReportsDashBoard';
import Calendar from './Calendar/FullCalendar';
import CalenderTask from './Calendar/CalenderTask';
import CalenderEvent from './Calendar/CalenderEvent';
//---Newcalender-----//
import Newcalendar from './NewCalendar/CalendarDashboard';
import CreateEvent from './NewCalendar/CreateEvent';
import CreateTask from './NewCalendar/CreateTask';

//-- Elections --//

import ElectioMain from './Elections/Election';
//import Elections from './Elections/Createelections';
import UpComingElection from './Elections/UpComingElection';
import RunningElection from './Elections/RunningElection';
import NewCreateElection from './Elections/NewCreateElection';


import NewElectiondashboard from './Polling/NewElectiondashboard';
import NewRunningElectionDashboard from './Polling/NewRunningElectionDashboard';
import NewUpcomingElectionDashboard from './Polling/NewUpcomingElectionDashboard';

import Polling from './Polling/Election';
import PollUpComingElection from './Polling/UpComingElection';
import PollRunningElection from './Polling/RunningElection';
import CreateNewElection from './Polling/CreateNewElection';

//-- Crud --//

import crud from './crud/crudDashboard';
import Createdata from './crud/Createdata';


//-- Compose Message --//

import ComposingMessages from './ComposingMessages/MessageCentre';
import MailPage from './ComposingMessages/MailPage';
import MessageCenterReview from './ComposingMessages/MessageCenterReview';
import comments from './ComposingMessages/comments';


//----Blogs----//
import BlogPage from './Blog/BlogPage';
import BlogTypes from './Blog/BlogTypes';
import EditBlogTypes from './Blog/EditBlogTypes';
import BlogView from './Blog/BlogView';
import ShowBlog from './Blog/ShowBlog';
import CreateBlog from './Blog/CreateBlog';
//---web challenges---//
import WebliveChallenge from './WebChallenges/WebliveChallenge';
//----user management --//
import UsersDashBoard from './userManagementNew/UsersDashBoard';
//-content curator ----//
import Curation from './contentCurator/Curation';
import JunkLibrary from './contentCurator/JunkLibrary';
import FeaturedLibrary from './contentCurator/FeaturedLibrary';
import ContentCuratorNew from './contentCurator/ContentCuratorNew';

//--newcontent-curator---//
import Newcontentcurator from './newcontentcurator/Newcontentcurator';
import CuratorLibrary from './newcontentcurator/CuratorLibrary';
import BlockUser from './newcontentcurator/BlockUser';

//-Creative Management----//
import CreativeManagementDashboard from './CreativeManagementScreen/CreativeManagementDashboard';
import UploadCreative from './CreativeManagementScreen/UploadCreative';


//RedefinedFun2Win Fun2Win //
import fun2WinRedefinedpage from './RedefinedFun2Win/fun2WinRedefinedpage';
import CreateFun2WinNewPage from './RedefinedFun2Win/CreateFun2WinNewPage';
import EditFun2WinPage from './RedefinedFun2WinEdit/EditFun2WinPage';
import RunningRedefinedFun2Win from './RedefinedFun2Win/RunningRedefinedFun2Win';
import QueuedRedefinedFun2Win from './RedefinedFun2Win/QueuedRedefinedFun2Win';
import ClosedRedefinedFun2Win from './RedefinedFun2Win/ClosedRedefinedFun2Win';




//Socialmediaposts////So
import ScoialMediaPostsDashboard from './Socialmediaposts/ScoialMediaPostsDashboard';
import CreateSocialMediapost from './Socialmediaposts/CreateSocialMediapost';
import EditSocialMediaPost from './Socialmediaposts/EditSocialMediaPost';



//SocialmediapostsContests//
import SocialMediaDashboard from './SocialmediapostsContests/SocialMediaDashboard';
import SocialMediaCreateContest from './SocialmediapostsContests/SocialMediaCreateContest';
import SocialMediaEditContest from './SocialmediapostsContests/SocialMediaEditContest';
import SocialMediaRunning from './SocialmediapostsContests/SocialMediaRunning';
import SocialMediaUpcoming from './SocialmediapostsContests/SocialMediaUpcoming';

import Pagenotfound from './Pagenotfound';




const requireAuth = (nextState, replace, callback) => {
    //const { user: { authenticated }} = store.getState();
    const authenticated = sessionStorage.getItem('isLogged')
    console.log("authenticated", (!authenticated))
    if (!authenticated) {
        console.log("Bindu")
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
    callback();
};
const redirectAuth = (nextState, replace, callback) => {
    // const { user: { authenticated }} = store.getState();
    const authenticated = sessionStorage.getItem('isLogged')
    if (authenticated) {
        replace({
            pathname: '/fankick'
        });
    }
    callback();
};
const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} onEnter={redirectAuth} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            <Route path="/resetpassword/:userId" component={ResetPassword} />
            <Route path="/fankick" component={Fankick} onEnter={requireAuth} />
            <Route path="/agent" component={Agent} onEnter={requireAuth} />
            <Route path="/fankick/create-challenge" component={CreateChallenge} onEnter={requireAuth} />
            <Route path="/fankick/closed-challenge" component={ClosedChallenge} onEnter={requireAuth} />
            <Route path="/fankick/Queued-challenge" component={QueuedChallenge} onEnter={requireAuth} />
            <Route path="/fankick/Running-challenge" component={RunningChallenge} onEnter={requireAuth} />
            <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
            <Route path="/fankick/:_id" component={EditContest} onEnter={requireAuth} />
            <Route path="/permisions-requests" component={PermissionReq} onEnter={requireAuth} />
            <Route path="/requests-permisions" component={ReqPermissions} onEnter={requireAuth} />
            <Route path="/fun2win" component={ContentPacks} onEnter={requireAuth} />
            <Route path="/fun2win/fun2Winpage" component={ContentPacks} onEnter={requireAuth} />
            <Route path="/fun2win/create-fun2win" component={CreateFun2WinNew} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage/createFun2WinNewPage" component={CreateFun2WinNewPage} onEnter={requireAuth} />

            <Route path="/fun2win/closed-fun2win" component={ClosedFun2Win} onEnter={requireAuth} />
            <Route path="/fun2win/queued-fun2win" component={QueuedFun2Win} onEnter={requireAuth} />
            <Route path="/fun2win/running-fun2win" component={RunningFun2Win} onEnter={requireAuth} />
            {/* <Route path="/fun2win/:_id" component={EditFun2Win} onEnter={requireAuth} /> */}
            <Route path="/fun2win/:_id" component={EditFun2Win} onEnter={requireAuth} />
            <Route path="/manage-fankick-account" component={ManageFankickAccount} onEnter={requireAuth} />
            <Route path="/fancoins" component={FanCoins} onEnter={requireAuth} />
            <Route path="/push-notifications" component={AllSent} onEnter={requireAuth} />
            <Route path="/push-notifications/predefined-notifications" component={PredefinedNotifications} onEnter={requireAuth} />
            <Route path="/push-notifications/create" component={PushNotifications} onEnter={requireAuth} />
            <Route path="/push-notifications/:_id/type/:type" component={PushNotifications} onEnter={requireAuth} />
            <Route path="/push-notifications/custom-notifications" component={CustomNotifications} onEnter={requireAuth} />
            <Route path="/push-notifications/scheduled-notifications" component={ScheduledNotifications} onEnter={requireAuth} />

            {/* <Route path="/CreateFun2WinNew" component={CreateFun2WinNew} onEnter={requireAuth} /> */}
            <Route path="/fan-clubs" component={FanClubs} onEnter={requireAuth} />
            <Route path="/fan-clubs/CreateFanClub" component={CreateFanClub} onEnter={requireAuth} />
            <Route path="/fan-clubs/:celebrityName" component={ViewFanClubs} onEnter={requireAuth} />
            <Route path="/fan-clubs/editfanclub/:_id" component={EditFanClub} onEnter={requireAuth} />
            <Route path="/allcoupons" component={Coupons} onEnter={requireAuth} />
            {/* <Route path="/allcoupons/opend-coupons" component={OpenCoupons} onEnter={requireAuth} /> */}
            <Route path="/allcoupons/redeemed" component={RedeemCoupons} onEnter={requireAuth} />
            <Route path="/allcoupons/redeem-coupons/:name" component={RedeemedCouponsList} onEnter={requireAuth} />
            <Route path="/allcoupons/:name" component={AvilableCouponsList} onEnter={requireAuth} />
            <Route path="/allcoupons/add-coupon" component={AddNewCoupon} onEnter={requireAuth} />

            <Route path="/allcoupons/AddNewCoupon" component={AddNewCoupon} onEnter={requireAuth} />
            {/* <Route path="/viewcoupons" component={CouponsList} onEnter={requireAuth} /> */}
            <Route path="/fun-clubs" component={FunClubs} onEnter={requireAuth} />
            <Route path="/fun-clubs/CreateFunClub" component={CreateFunClub} onEnter={requireAuth} />
            <Route path="/fun-clubs/CreateFunClubJoke" component={CreateFunClubJoke} onEnter={requireAuth} />
            <Route path="/fun-clubs/:_id" component={FunClubListAll} onEnter={requireAuth} />
            <Route path="/fun-clubs/FunDemo" component={FunDemo} onEnter={requireAuth} />
            <Route path="/celebritydata" component={Celebrities} onEnter={requireAuth} />
            <Route path="/celebritydata/ViewCelebrity/:_id" component={ViewCelebrity} onEnter={requireAuth} />
            <Route path="/celebritydata/EditCelebrity/:_id" component={EditCelebrity} onEnter={requireAuth} />
            <Route path="/celebritydata/create-celebrity" component={CreateNewCelebrity} onEnter={requireAuth} />
            <Route path="/calendar" component={Calendar} onEnter={requireAuth} />
            <Route path="/calendar/CalenderEvent" component={CalenderEvent} onEnter={requireAuth} />
            <Route path="/calendar/CalenderTask" component={CalenderTask} onEnter={requireAuth} />

            <Route path="/WebliveChallenge" component={WebliveChallenge} onEnter={requireAuth} />

            <Route path="/reports" component={Reports} onEnter={requireAuth} />

            <Route path="/NewCalendar" component={Newcalendar} onEnter={requireAuth} />
            <Route path="/NewCalendar/CreateEvent" component={CreateEvent} onEnter={requireAuth} />
            <Route path="/NewCalendar/CreateTask" component={CreateTask} onEnter={requireAuth} />
            {/* <Route path="/ElectioMain/elections/:_id" component={Elections} onEnter={requireAuth} />  */}


            {/*------ Old Polling---------*/}
            <Route path="/ElectioMain/NewCreateElection" component={NewCreateElection} onEnter={requireAuth} />
            <Route path="/ElectioMain/NewCreateElection/:_id" component={NewCreateElection} onEnter={requireAuth} />
            <Route path="/ElectioMain" component={ElectioMain} onEnter={requireAuth} />
            <Route path="/ElectioMain/UpComingElection" component={UpComingElection} onEnter={requireAuth} />
            <Route path="/ElectioMain/RunningElection" component={RunningElection} onEnter={requireAuth} />
            <Route path="/ElectioMain/NewElectiondashboard" component={NewElectiondashboard} onEnter={requireAuth} />
            <Route path="/ElectioMain/NewRunningElectionDashboard" component={NewRunningElectionDashboard} onEnter={requireAuth} />
            <Route path="/ElectioMain/NewUpcomingElectionDashboard" component={NewUpcomingElectionDashboard} onEnter={requireAuth} />

            {/*------ New Polling---------*/}

            <Route path="/Polling" component={Polling} onEnter={requireAuth} />
            <Route path="/Polling/UpComingElection" component={PollUpComingElection} onEnter={requireAuth} />
            <Route path="/Polling/RunningElection" component={PollRunningElection} onEnter={requireAuth} />
            <Route path="/Polling/CreateNewElection" component={CreateNewElection} onEnter={requireAuth} />
            <Route path="/Polling/CreateNewElection/:_id" component={CreateNewElection} onEnter={requireAuth} />
            <Route path="/Polling/NewElectiondashboard" component={NewElectiondashboard} onEnter={requireAuth} />
            <Route path="/Polling/NewRunningElectionDashboard" component={NewRunningElectionDashboard} onEnter={requireAuth} />
            <Route path="/Polling/NewUpcomingElectionDashboard" component={NewUpcomingElectionDashboard} onEnter={requireAuth} />


            <Route path="/crudDashboard" component={crud} onEnter={requireAuth} />
            <Route path="/crudDashboard/Createdata" component={Createdata} onEnter={requireAuth} />
            <Route path="/crudDashboard/Editdata/movies/:id" component={Createdata} onEnter={requireAuth} />
            <Route path="/mailPage/:id" component={MailPage} onEnter={requireAuth} />

            <Route path="/messageCenterReview/:module/:id" component={MessageCenterReview} onEnter={requireAuth} />

            <Route path="/MessageCentre" component={ComposingMessages} onEnter={requireAuth} />
            <Route path="/comments" component={ComposingMessages} onEnter={requireAuth} />

            <Route path="/SocialMedia" component={ScoialMediaPostsDashboard} onEnter={requireAuth} />
            <Route path="/SocialMedia/CreateSocialMediapost" component={CreateSocialMediapost} onEnter={requireAuth} />
            <Route path="/SocialMedia/EditSocialMediaPost" component={CreateSocialMediapost} onEnter={requireAuth} />
            {/* <Route path="/SocialMedia/CreateSocialMediapost" component={CreateSocialMediapost} onEnter={requireAuth} />
            <Route path="/SocialMedia/EditSocialMediaPost" component={CreateSocialMediapost} onEnter={requireAuth} />*/}


            <Route path="/SocialMediaDashboard" component={SocialMediaDashboard} onEnter={requireAuth} />

            <Route path="/SocialmediapostsContests/SocialMediaCreateContest" component={SocialMediaCreateContest} onEnter={requireAuth} />
            <Route path="/SocialmediapostsContests/SocialMediaEditContest/:id" component={SocialMediaEditContest} onEnter={requireAuth} />

            <Route path="/SocialmediapostsContests/SocialMediaRunning" component={SocialMediaRunning} onEnter={requireAuth} />
            <Route path="/SocialmediapostsContests/SocialMediaUpcoming" component={SocialMediaUpcoming} onEnter={requireAuth} />



            <Route path="/blogPage" component={BlogPage} onEnter={requireAuth} />
            <Route path="/blogTypes" component={BlogTypes} onEnter={requireAuth} />
            <Route path="/editBlogTypes/:id" component={EditBlogTypes} onEnter={requireAuth} />
            <Route path="/blogView" component={BlogView} onEnter={requireAuth} />
            <Route path="/showBlog/:id" component={ShowBlog} onEnter={requireAuth} />
            <Route path="/createblog" component={CreateBlog} onEnter={requireAuth} />

            <Route path="/users" component={UsersDashBoard} />

            <Route path="/creativeManagementDashboard" component={CreativeManagementDashboard} onEnter={requireAuth} />
            <Route path="/uploadCreative" component={UploadCreative} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage/editFun2WinNewPage/:id" component={EditFun2WinPage} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage" component={fun2WinRedefinedpage} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage/RunningRedefinedFun2Win" component={RunningRedefinedFun2Win} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage/QueuedRedefinedFun2Win" component={QueuedRedefinedFun2Win} onEnter={requireAuth} />
            <Route path="/fun2WinRedefinedpage/ClosedRedefinedFun2Win" component={ClosedRedefinedFun2Win} onEnter={requireAuth} />

             <Route path="/newcontentcurator/BlockUser" component={BlockUser} onEnter={requireAuth} />
              <Route path="/newcontentcurator/CuratorLibrary" component={CuratorLibrary} onEnter={requireAuth} />
            <Route path="/newcontentcurator" component={Newcontentcurator} onEnter={requireAuth} />
              <Route path="/Pagenotfound" component={Pagenotfound} onEnter={requireAuth} />
        
            <Route path="/Curation" component={Curation} onEnter={requireAuth} />
            <Route path="/Curation/JunkLibrary" component={JunkLibrary} onEnter={requireAuth} />
            <Route path="/Curation/FeaturedLibrary" component={FeaturedLibrary} onEnter={requireAuth} />
            <Route path="/Curation/ContentCuratorNew" component={ContentCuratorNew} onEnter={requireAuth} />
            {/* <Route path="/*" component={Fankick} onEnter={requireAuth} /> */}
            <Route path="/*" component={Pagenotfound} onEnter={requireAuth} />
        </Route>
    </Router>
);
export default Routes;
/* eslint-disable */