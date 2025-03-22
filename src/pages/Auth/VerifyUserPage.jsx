import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { verifyUser } from "../../axios/userAxios";
import { Container, Spinner, Stack } from "react-bootstrap";
import useLaoder from "../../hooks/useLoading";

const VerifyUserPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // Extract the info from URL
  const [params] = useSearchParams();

  const userEmail = params.get("email");
  const token = params.get("token");
  console.log("userEmail", userEmail, token);

  // For Loading
  const { isLoading, startLoading, stopLoading } = useLaoder();

  // Send Request to API for verifying the user
  const verifyUserEmail = async () => {
    startLoading();
    const result = await verifyUser(userEmail, token);

    stopLoading();

    // Handle error
    if (result.status === "error") {
      toast.error(result.message);
      setIsEmailVerified(false);
    }

    // Success
    toast.success(result.message);
    setIsEmailVerified(true);
  };

  useEffect(() => {
    if (userEmail && token) {
      verifyUserEmail();
    }
  }, [token, userEmail]);

  return (
    <Container>
      {isLoading && (
        <Stack
          gap={4}
          className="vh-100 justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="primary" role="status" />

          <p>Verifying email, Please wait ....</p>
        </Stack>
      )}

      {/* What should be shown when error
    What should be shown when success */}
      {!!isEmailVerified && (
        <Stack
          gap={2}
          className="vh-100 justify-content-center align-items-center"
        >
          <p>Could not verify the account!!</p>
        </Stack>
      )}

      {isEmailVerified && (
        <Stack
          gap={2}
          className="vh-100 justify-content-center align-items-center"
        >
          <div className="my-4">
            <lord-icon
              src="https://cdn.lordicon.com/twsqddew.json"
              trigger="in"
              delay="100"
              state="in-reveal"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>

          <p>Email successfully verified, You can login now.</p>

          <Link to="/" className="btn btn-lg btn-outline-primary">
            Login Now
          </Link>
        </Stack>
      )}
    </Container>
  );
};

export default VerifyUserPage;
