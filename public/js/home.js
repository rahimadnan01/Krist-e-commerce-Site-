const products = async () => {
  let response = await fetch("http://localhost:3000/api/v1/products");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }else{
    console.log("failed to fetch api")
  }
};
products();
