import "./FollowPage.css";
import telegramIcon from "../icons/icons8-telegram-100.png";

const FollowPage = () => {
  return (
    <div className="support">
      <h3 className="support-heading">Follow Us</h3>
      <p className="support-text">Follow our telegram official page:</p>
      <a
        href="https://tttttt.me/Rajjowin_Official"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="support-link">
          <img
            src={telegramIcon}
            alt="telegram"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "5px",
              marginBottom: "5px",
            }}
          />
          <p className="support-link-text">Telegram</p>
        </div>
      </a>
    </div>
  );
};

export default FollowPage;
