import React from 'react'
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const db = getFirestore(app);
function Jury() {
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
            if (localStorage.getItem('signin') === 'false' || localStorage.getItem('signin') === null) navigate('/');
            else if (localStorage.getItem('signin') === 'true' && localStorage.getItem('admin') === 'true') {
                document.getElementById('admin-link').classList.remove('disabled')
                document.getElementById('admin-link').classList.add('enabled')
            }
        };
        updateNav();
    }, []);


    const acceptShortlist = async (e, user) => {
        if (e.target.checked) {
            alert(
                "Are you sure you want to shortlist "
            );

            const userRef = collection(db, "users");
            getDocs(userRef).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.data()["registrationNumber"] === user["registrationNumber"]) {
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
                    if (doc.data()["registrationNumber"] === user["registrationNumber"]) {
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
            <Navbar />
            <div className="container">
                <p className="h3 my-3">Jury Page</p>
                <p className="h5 my-4">
                    This is the Jury Page. Here you can view the submissions of the participants and shortlist them.<br /><br />
                    1. Click on the view button to view the submission of the participant.<br />
                    2. Click on the radio button to shortlist or reject the participant.<br />
                    3. Once enough submissions, refresh the page to view the updated shortlisted status.
                </p>
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
                            // can add {user['shortlist'] === null || user['shortlist'] === false} to the if condition
                            if (user['verified'] === true) {
                                return (
                                    <tr>
                                        <th scope='row'>{user["registrationNumber"]}</th>
                                        <td>
                                            <a href={user["submission_url"]} target="_blank" rel="noreferrer">View</a>
                                        </td>
                                        <td>
                                            {user["shortlist"] ? (<p>Shortlisted</p>) : (<p>Not Shortlisted</p>)}
                                        </td>
                                        <td>
                                            <input
                                                type='radio'
                                                name={'shortlist' + user["registrationNumber"]}
                                                onChange={(e) => acceptShortlist(e, user)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name={'shortlist' + user["registrationNumber"]}
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