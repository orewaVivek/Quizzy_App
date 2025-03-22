const errorStyle = {
    height: "60px",
    width: "400px",
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better visibility
    color:"black",
    fontWeight:"bold",
  };

export default function Errorr() {
  return (
    <div style={errorStyle}>
        😬 Oops! there was an error fetching questions
    </div>
  );
}
