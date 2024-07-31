import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function Verify() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/verify?token=${token}`,
      );
      const { success } = await res.json();
      if (success) {
        navigate("/login");
      }
    };
    verify();
  }, []);
  const user = localStorage.getItem("email");
  const handleResend = async () => {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/resend?email=${user}`,
    ).then(console.log("Email has been sent successfully"));
  };
  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center">
      <div className="bg-white w-[70vw] flex flex-col justify-center items-center gap-9 text-center py-9 text-gray-500 max-sm:w-full">
        <h1 className="text-3xl">Please verify your email</h1>
        <p>
          You &apos;re almost there! We sent an email to <br />
          <strong>{user}</strong>
        </p>
        <p>
          Click on the link in that email to complete your signup. <br /> If you
          don &apos;t see it , you may need to <strong>check your spam </strong>
          folder
        </p>
        <div className="flex flex-col gap-5">
          <p>Still can &apos;t find the email?</p>
          <button
            className="bg-blue-700 text-white rounded-md py-3 shadow-md font-medium hover:bg-blue-800 transition ease-in"
            onClick={handleResend}
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
