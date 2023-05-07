import React from "react";
import "../Styles/Admin.css";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);

function Admin() {
  const usersRef = collection(db, "users");
  const [users, setUsers] = React.useState([]);
  const usersTempArray = [];
  React.useEffect(() => {
    getDocs(usersRef).then((snapshot) => {
      usersTempArray.length = 0;
      snapshot.docs.forEach((doc) => {
        usersTempArray.push(doc.data());
      });
      setUsers(usersTempArray);
    });
  }, []);
  const handleVerification = async (e, user) => {
    if (e.target.checked) {
      alert(
        "Are you sure you want to verify this user? Once verified, you cannot undo this action."
      );
      const userRef = collection(db, "users");
      getDocs(userRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data()["registrationNumber"] == user["registrationNumber"]) {
            updateDoc(doc.ref, {
              verified: true,
            });
          }
        });
      });
    //   window.location.reload();
    //   console.log(user);
    }
  };

  const rejectShortlist = async (e, user) => {
    if (e.target.checked) {
        alert(
            "Are you sure you want to reject "
        );

        const userRef = collection(db, "users");
        getDocs(userRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if (doc.data()["registrationNumber"] == user["registrationNumber"]) {
                    updateDoc(doc.ref, {
                        shortlist: false,
                    });
                }
            });
        });
    }
};

  return (
    <div className="container">
      <p className="h3 my-3">Admin Portal</p>
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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            if (user["submission"] == 1) {
              return (
                <tr>
                  <th scope="row">{user["registrationNumber"]}</th>
                  <td>{user["name"]}</td>
                  <td>{user["email"]}</td>
                  <td>{user["dob"]}</td>
                  <td>{user["number"]}</td>
                  <td>
                    <a href={user["aadhar_url"]} target="_blank">
                      View
                    </a>
                  </td>
                  <td>
                    <a href={user["submission_url"]} target="_blank">
                      View
                    </a>
                  </td>
                  <td>
                    {user["verified"] == true ? (
                      <p>Verified</p>
                    ) : ( <p>Not Verified</p>
                    )}
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={'eligible'+user["registrationNumber"]}
                      onChange={(e) => handleVerification(e, user)}/>
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={'eligible'+user["registrationNumber"]}
                      onChange={(e) => rejectShortlist(e, user)}/>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
