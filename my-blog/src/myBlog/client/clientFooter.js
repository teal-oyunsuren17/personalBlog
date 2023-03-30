import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
export function ClientFooter() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "black",
          opacity: "0.87",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <div>
          <Link to={`https://www.instagram.com`}>
            <BsInstagram size={50} />
          </Link>
        </div>
        <div>
          <Link to={`https://www.facebook.com`}>
            <FaFacebookSquare size={50} />
          </Link>
        </div>
      </div>
    </>
  );
}
