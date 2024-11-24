import { Entity, Column, OneToOne } from "typeorm";
import { PrimaryEntity } from "@shared/infra/typeorm/PrimaryEntity";
import { ProductImage } from "@modules/productImages/infra/typeorm/entities/ProductImage";

@Entity("products")
export class Product extends PrimaryEntity {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "price", type: "numeric" })
  price: number;

  @Column({ name: "quantity" })
  quantity: number;

  @Column({ name: "is_active", default: true })
  is_active: boolean;

  @OneToOne(() => ProductImage, productImage => productImage.product)
  image: ProductImage;
}
