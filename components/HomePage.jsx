import ProductCard from "./ProductCard";

const HomePage = () => {
  return (
    <>
      <div
        className="home-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Home</h3>
      </div>

      <div
        style={{
          backgroundColor: "green",
          borderRadius: "5px",
          marginLeft: "10px",
          marginRight: "10px",
          position: "relative",
          color: "white",
        }}
      >
        <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            userId
          </p>
          <p>123456789</p>
        </div>

        <div style={{ marginBottom: "20px", marginLeft: "20px" }}>
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            Balance
          </p>
          <p>&#8377; 10.00</p>
        </div>
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "40px",
            width: "100px",
            height: "30px",
            borderRadius: "20px",
            backgroundColor: "white",
            color: "green",
            border: "none",
            cursor: "pointer",
          }}
        >
          Withdraw
        </button>
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            right: "40px",
            width: "100px",
            height: "30px",
            borderRadius: "20px",
            backgroundColor: "white",
            color: "green",
            border: "none",
            cursor: "pointer",
          }}
        >
          Recharge
        </button>
      </div>

      <ProductCard />
      <br />
      <ProductCard />
      <br />
      <ProductCard />
      <br />
      <ProductCard />
      <br />
      <ProductCard />
    </>
  );
};
export default HomePage;
