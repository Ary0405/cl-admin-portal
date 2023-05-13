import React from "react";
import "../Styles/Admin.css";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import Navbar from "./Navbar";
const db = getFirestore(app);

function Admin() {
  const usersRef = collection(db, "users");
  const [users, setUsers] = React.useState([]);
  const usersTempArray = [];
  const navigate = useNavigate();
  React.useEffect(() => {
    getDocs(usersRef).then((snapshot) => {
      usersTempArray.length = 0;
      snapshot.docs.forEach((doc) => {
        usersTempArray.push(doc.data());
      });
      setUsers(usersTempArray);
    });
    const updateNav = () => {
      if (
        localStorage.getItem("signin") === "false" ||
        localStorage.getItem("signin") === null
      )
        navigate("/");
      else if (
        localStorage.getItem("signin") === "true" &&
        localStorage.getItem("admin") === "true"
      ) {
        document.getElementById("admin-link").classList.remove("disabled");
        document.getElementById("admin-link").classList.add("enabled");
        document.getElementById("jury-link").classList.remove("disabled");
        document.getElementById("jury-link").classList.add("enabled");
      } else navigate("/jury");
    };
    updateNav();
  }, []);
  const handleVerification = async (e, user) => {
    if (e.target.checked) {
      alert(
        "Are you sure you want to verify this user? Once verified, you cannot undo this action."
      );
      const userRef = collection(db, "users");
      getDocs(userRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()["registrationNumber"] === user["registrationNumber"]) {
            updateDoc(doc.ref, {
              verified: true,
              eligible: true,
            });
          }
        });
      });
      //   window.location.reload();
      //   console.log(user);
    }
  };
  const handleUnVerification = async (e, user) => {
    if (e.target.checked) {
      alert("Are you sure you want to unverify this user?");

      const userRef = collection(db, "users");
      getDocs(userRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()["registrationNumber"] === user["registrationNumber"]) {
            updateDoc(doc.ref, {
              verified: false,
              eligible: null,
            });
          }
        });
      });
    }
  };
  const rejectShortlist = async (e, user) => {
    if (e.target.checked) {
      alert("Are you sure you want to reject ");

      const userRef = collection(db, "users");
      getDocs(userRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()["registrationNumber"] === user["registrationNumber"]) {
            updateDoc(doc.ref, {
              shortlist: false,
              verified: false,
              eligible: false,
            });
          }
        });
      });
    }
  };

  const handleClick = () => {
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{"display" : "flex" , "justifyContent" : "space-between" , "alignItems" : "center"}}>
          <p className="h3 my-3">Admin Portal</p>
          <button onClick={handleClick} className="btn btn-primary">Update List</button>
        </div>
        <p className="h5 my-4">Registraions Recieved : {users.length}</p>
        <p className="h5 my-4">Submissions - </p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Registration ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gov ID</th>
              <th scope="col">Submission </th>
              <th scope="col">Verification status</th>
              <th scope="col">Eligible</th>
              <th scope="col">Un Eligible</th>
              <th scope="col">Marked as unverified</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              if (user["submission"] === 1 && user["eligible"] !== false) {
                return (
                  <tr>
                    <th scope="row">{user["registrationNumber"]}</th>
                    <td>{user["name"]}</td>
                    <td>{user["email"]}</td>
                    <td>{user["dob"]}</td>
                    <td>{user["number"]}</td>
                    <td>
                      <a
                        href={user["aadhar_url"]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <a
                        href={user["submission_url"]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      {user["verified"] === true ? (
                        <p>Verified</p>
                      ) : (
                        <p>Not Verified</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={"eligible" + user["registrationNumber"]}
                        onChange={(e) => handleVerification(e, user)}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={"eligible" + user["registrationNumber"]}
                        onChange={(e) => rejectShortlist(e, user)}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={"eligible" + user["registrationNumber"]}
                        onChange={(e) => handleUnVerification(e, user)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <br />
        <hr />
        <p className="h5 my-4">Marked Uneligible - </p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Registration ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gov ID</th>
              <th scope="col">Submission </th>
              <th scope="col">Verification status</th>
              <th scope="col">Marked as unverified</th>
              {/* <th scope="col">Un Eligible</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              if (user["submission"] === 1 && user["eligible"] === false) {
                return (
                  <tr>
                    <th scope="row">{user["registrationNumber"]}</th>
                    <td>{user["name"]}</td>
                    <td>{user["email"]}</td>
                    <td>{user["dob"]}</td>
                    <td>{user["number"]}</td>
                    <td>
                      <a
                        href={user["aadhar_url"]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <a
                        href={user["submission_url"]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      {user["eligible"] === false ? (
                        <p>Marked Uneligible</p>
                      ) : (
                        <p>Not Verified</p>
                      )}
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={"eligible" + user["registrationNumber"]}
                        onChange={(e) => handleUnVerification(e, user)}
                      />
                    </td>
                    {/* <td>
                      <input
                        type="radio"
                        name={"eligible" + user["registrationNumber"]}
                        onChange={(e) => rejectShortlist(e, user)}
                      />
                    </td> */}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
