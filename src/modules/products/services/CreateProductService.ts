import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Porduct";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, description, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with the name ' + name)
    }

    const product = productRepository.create({
      name,
      description,
      price,
      quantity
    });

    await productRepository.save(product);

    return product;
  };
};
