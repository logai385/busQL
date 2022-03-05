import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "./pages/Dashboard/Dashboard";
import SignDocument from "./pages/SignDocument/SignDocument";
import AddSignDocument from "./pages/SignDocument/AddSignDocument";
import Line from "./pages/Line/Line";
import Login from "./pages/Auth/Login";
import Landing from "./pages/Layout/Landing";
import AuthContextProvider from "./Context/AuthContext";
import DashboardTemplate from "./templates/Dashboard/DashboardTemplate";
import LineCU from "./pages/Line/LineCU";
import Transporters from "./pages/ManagementBus/Transporters";
import TransporterCU from "./pages/ManagementBus/TransporterCU";


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch({ type: "SET_HISTORY", history: history });
  return (
    <AuthContextProvider>
      <Switch>
        <DashboardTemplate exact path="/dashboard" component={Dashboard} />
        
        <DashboardTemplate exact path="/lines" component={Line} />
        <DashboardTemplate exact path="/documents/" component={SignDocument} />
        <DashboardTemplate exact path="/buses/" component={Transporters} />
        <DashboardTemplate
          exact
          path="/documents/:action"
          component={AddSignDocument}
        />
        <DashboardTemplate
          exact
          path="/lines/:action"
          component={LineCU}
        />
         <DashboardTemplate
          exact
          path="/buses/:action"
          component={TransporterCU}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
