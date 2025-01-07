export function groupByProduct(cart) {
    return cart.reduce((acc, item) => {
      const existingItem = acc.find(i => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
  }
  
  export function getCartTotal(products) {
    return products.reduce((acc, product) => {
      let price;
      if (product.typical_price_range && Array.isArray(product.typical_price_range) && product.typical_price_range.length > 1) {
        price = parseFloat(product.typical_price_range[1].replace(/[^0-9.]/g, ''));
      } else if (product.price) {
        price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      } else {
        price = 65.9; // fallback price
      }
      return acc + (isNaN(price) ? 0 : price * product.quantity);
    }, 0);
  }
  
  