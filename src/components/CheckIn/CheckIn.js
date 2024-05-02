import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";
const CheckIn = () => {
  return (
    <div className="checkIn-container">
      <div className="check_title">
        <span className="title_check">Check-in</span>
        <span className="title_check2">Get rewards</span>
      </div>
      <div className="img_check">
        <img src={CheckInIcon} alt="checkIn-img" />
      </div>
    </div>
  );
};

export default CheckIn;
