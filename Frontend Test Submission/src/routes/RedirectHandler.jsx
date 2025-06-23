import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "../logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/redirect/${shortcode}`);
        const data = await res.json();

        if (data?.originalUrl) {
          await log("frontend", "info", "redirect", `Redirecting to ${data.originalUrl}`);
          window.location.href = data.originalUrl; 
        } else {
          await log("frontend", "error", "redirect", "Shortcode not found");
          navigate("/"); 
        }
      } catch (error) {
        await log("frontend", "error", "redirect", `Failed to redirect: ${error.message}`);
        navigate("/");
      }
    };

    redirect();
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
