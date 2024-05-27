export async function getInfo() {
    const response = await fetch(`https://dummyjson.com/products`);
    if (!response.ok) {
      throw new Error("Ошибка сервера");
    }
    const data = await response.json();
    return data.products;
  }