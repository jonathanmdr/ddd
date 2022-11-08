import Product from "../entity/product";

export default class ProductService {

    public static increasePrice(products: Product[], percentToIncrease: number): void {
        products.forEach((product: Product): void => {
            const newPrice: number = product.price + ((product.price * percentToIncrease) / 100);
            product.changePrice(newPrice);
        });
    }

}