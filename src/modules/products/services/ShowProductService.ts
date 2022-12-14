import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Porduct";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  };
};
