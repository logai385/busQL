import { Route, Redirect } from "react-router-dom";
import Footer from "../../components/Footers/Footer";
import Navbar from "../../components/Headers/Navbar";
import MainSidebar from "../../components/Sidebars/MainSidebar";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Spinner } from "react-bootstrap";
const DashboardTemplate = (props) => {
  const { component: Component, ...rest } = props;
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {    
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>  isAuthenticated ?
         (
          <div className="wrapper">
            <Navbar />
            <MainSidebar />
            <Component {...routeProps} />
          <Footer />

          </div>
        ):(<Redirect to="/login" />)
      }
    />
  );
};
export default DashboardTemplate;