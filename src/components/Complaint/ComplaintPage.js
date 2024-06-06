import "./ComplaintPage.css";
import telegramIcon from "../icons/icons8-telegram-100.png";

const ComplaintPage = () => {
  return (
    <div className="support">
      <h3 className="support-heading">Complaint Here</h3>
      <p className="support-text">For any help, contact us on Telegram:</p>
      <a
        href="https://t.me/Rajjowinhelp"
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
          <p className="support-link-text">Official Telegram</p>
        </div>
      </a>
    </div>
  );
};

export default ComplaintPage;
