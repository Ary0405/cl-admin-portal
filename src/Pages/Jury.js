import React from 'react'
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
function Jury() {
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
    },[]);

    const acceptShortlist = async (e, user) => {
        if (e.target.checked) {
          alert(
            "Are you sure you want to shortlist " 
          );

          const userRef = collection(db, "users");
          getDocs(userRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (doc.data()["registrationNumber"] == user["registrationNumber"]) {
                updateDoc(doc.ref, {
                  shortlist: true,
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
        <>
            <div className="container">
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Registration ID</th>
                            <th scope='col'>Submission</th>
                            <th scope='col'>Shortlist Status</th>
                            <th scope='col'>Accept</th>
                            <th scope='col'>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            if(user["submission"] == 1){
                                return (
                                    <tr>
                                        <th scope='row'>{user["registrationNumber"]}</th>
                                        <td>
                                            <a href={user["submission_url"]} target="_blank">View</a>
                                        </td>
                                        <td>
                                            {user["shortlist"] ? (<p>Shortlisted</p>):(<p>Not Shortlisted</p>)}
                                        </td>
                                        <td>
                                            <input
                                                type='radio'
                                                name= {'shortlist'+user["registrationNumber"]}
                                                onChange={(e) => acceptShortlist(e, user)} 
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name={'shortlist'+user["registrationNumber"]}
                                                type='radio'
                                                onChange={(e) => rejectShortlist(e, user)}
                                            />
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Jury