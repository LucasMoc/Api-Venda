import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Porduct";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({ id, name, description, price, quantity}: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if(!product){
      throw new AppError('Product not found');
    };

    const productExists = await productRepository.findByName(name);

    if(productExists && name != product.name) {
      throw new AppError('There is already a product with the name ' + name)
    };

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  };
};
