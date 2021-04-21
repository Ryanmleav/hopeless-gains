import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUser } from "../redux/userReducer";
import { useHistory } from "react-router-dom";

const AuthHandler = ({ getUser }) => {
  const history = useHistory();
  useEffect(() => {
    axios
      .get("/auth/me")
      .then((res) => {
        console.log(res.data);
        getUser(res.data);
      })
      .catch((err) => history.push("/"));
  }, []);
  return null;
};
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(AuthHandler);
