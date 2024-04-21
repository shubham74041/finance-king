// import { useHistory } from "react-router-dom";

const ProductCard = () => {
  // const history = useHistory();
  const handleClick = () => {
    const profileURL = "https://t.me/Piyush";
    window.open(profileURL, "_blank");
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        borderRadius: "5px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <h3 style={{ marginTop: "10px", marginLeft: "20px" }}>Product</h3>
      <div
        className="product-card"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className="product-image"
          style={{
            marginLeft: "20px",
            marginTop: "0px",
            marginBottom: "10px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product"
            width={150}
            height={150}
          />
        </div>
        <div
          className="product-details"
          style={{
            marginLeft: "30px",
            textAlign: "justify",
            display: "flex",
            paddingTop: "20px",
            // flexDirection: "column",
            // justifyContent: "flex-start",
            // alignItems: "flex-start",
          }}
        >
          <div style={{ flexDirection: "column" }}>
            <p>Price</p>
            <p>&#8377; 1500</p>
            <p>Daily</p>
            <p>&#8377; 200.00</p>
          </div>
          <div
            style={{
              margin: "0px 40px 20px 0px",
              paddingLeft: "60px",
            }}
          >
            <p>Cycle</p>
            <p>50 days</p>
            <p style={{}}>Hourly</p>
            <p>&#8377; 120.00</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          color: "red",
          border: "1px solid red",

          width: "80px",
          height: "30px",
          borderRadius: "15px",
          cursor: "pointer",
        }}
      >
        Invest
      </button>
    </div>
  );
};

export default ProductCard;
