import { ShowProductService } from '../../../services/ShowProductService';
import { Request, Response } from "express";
import { ListProductService } from "../../../services/ListProductService";
import { CreateProductService } from '../../../services/CreateProductService';
import { UpdateProductService } from '../../../services/UpdateProductService';
import { DeleteProductService } from '../../../services/DeleteProductService';

export default class ProductsController {

  public async index(req: Request, res: Response): Promise<Response> {
    const LsitProducts = new ListProductService();

    const products = await LsitProducts.execute();

    return res.json(products);
  };

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showPorduct = new ShowProductService();

    const product = await showPorduct.execute({ id });

    return res.json(product);
  };

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      description,
      price,
      quantity
    });

    return res.json(product);
  };

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, description, price, quantity } = req.body;
    const { id } = req.params;
    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      description,
      price,
      quantity
    });

    return res.json(product);
  };

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletePorduct = new DeleteProductService();

    await deletePorduct.execute({ id });

    return res.json([]);
  };
}
