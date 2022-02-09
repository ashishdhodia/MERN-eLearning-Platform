import { useState, useContext } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast.error("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className='jumbotron bg-primary text-center square'>
        Become Instructor
      </h1>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 text-lg-center'>
            <div className='p-4'>
              <UserSwitchOutlined className='display-1 pb-3' />
              <br />
              <h2>Setup payout to publish course on platform</h2>
              <p className='lead text-warning'>
                Platform partners with stripe to transfer earning to your bank
                account
              </p>
              <Button
                className='mb-3'
                type='primary'
                block
                shape='round'
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size='large'
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>
              <p className='lead'>
                You will be redireected to stripe to complete onboarding
                process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;