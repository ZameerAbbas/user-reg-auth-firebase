import "./verifyEmail.css";
import { useAuthValue } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";
import {useHistory} from 'react-router-dom'

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [time, setTime] = useState(60);

  const {setTimeActive} = useAuthValue()
  const {timeActive, } = useAuthValue()

  const resendEmailVerification = () => {
    setButtonDisabled(true);
    sendEmailVerification(auth.currentUser).then(() => {
      setTimeActive(true)
      history.push('/verify-email')
    })
  };

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time]);


  const history = useHistory()
  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          history.push('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [history, currentUser])

  return (
    <div className="center">
      <div className="verifyEmail">
        <h1>Verify your Email Address</h1>
        <p>
          <strong>
            A Verification email has been sent to:{" "}
            <span>{currentUser?.email}</span>{" "}
          </strong>
          <br />
        </p>
        <span>Follow the instruction in the email to verify your account</span>
        <button onClick={resendEmailVerification} disabled={timeActive}>
          Resend Email {timeActive && time}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
