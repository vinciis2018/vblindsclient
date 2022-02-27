import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
// pages
import { 
  Home, 
  koiiHome, 
  Nft, 
  Artist, 
  Assets, 
  Screens, 
  Channels, 
  Shops, 
  AssetDetails,
  ScreenDetails,
  ChannelDetails,
  ShopDetails,
  AdvertDetails,
  AssetEdit,
  ScreenEdit,
  ChannelEdit,
  ShopEdit,
  AdvertEdit,
  MapBox,
  Signin,
  Signup,
  Dashboard,
  UserProfile,
  Wallet
} from "pages";
// ui
import { AppLayout } from "components/layouts";

export const Routes = () => {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Home} layout={AppLayout} />
        <PublicRoute exact path="/assets" component={Assets} layout={AppLayout} />
        <PublicRoute exact path="/screens" component={Screens} layout={AppLayout} />
        <PublicRoute exact path="/channels" component={Channels} layout={AppLayout} />
        <PublicRoute exact path="/shops" component={Shops} layout={AppLayout} />

        <PublicRoute exact path="/asset/:id" component={AssetDetails} layout={AppLayout} />
        <PrivateRoute exact path="/screen/:id" component={ScreenDetails} layout={AppLayout} />
        <PublicRoute exact path="/channel/:id" component={ChannelDetails} layout={AppLayout} />
        <PublicRoute exact path="/shop/:id" component={ShopDetails} layout={AppLayout} />

        <PublicRoute exact path="/video/:id/:txId" component={AdvertDetails} layout={AppLayout} />

        <PublicRoute exact path="/asset/:id/edit" component={AssetEdit} layout={AppLayout} />
        <PublicRoute exact path="/screen/:id/edit" component={ScreenEdit} layout={AppLayout} />
        <PublicRoute exact path="/channel/:id/edit" component={ChannelEdit} layout={AppLayout} />
        <PublicRoute exact path="/shop/:id/edit" component={ShopEdit} layout={AppLayout} />

        
        <PublicRoute exact path="/editCampaign/:id/:screenId" component={AdvertEdit} layout={AppLayout} />
        
        <PublicRoute exact path="/dashboard" component={Dashboard} layout={AppLayout} />
        <PublicRoute exact path="/userProfile/:id?" component={UserProfile} layout={AppLayout} />
        <PublicRoute exact path="/wallet/:walletId?/:id?" component={Wallet} layout={AppLayout} />


        <PublicRoute exact path="/mapbox" component={MapBox} layout={AppLayout} />
        <PublicRoute exact path="/signin" component={Signin} layout={AppLayout} />
        <PublicRoute exact path="/signup" component={Signup} layout={AppLayout} />
        

        <PublicRoute exact path="/koii" component={koiiHome} layout={AppLayout} />
        <PublicRoute exact path="/nft/:id" component={Nft} layout={AppLayout} />
        <PublicRoute exact path="/artist/:id" component={Artist} layout={AppLayout} />
      </Switch>
    </>
  );
};
