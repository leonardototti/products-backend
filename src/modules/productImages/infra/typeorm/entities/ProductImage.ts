import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { PrimaryEntity } from "@shared/infra/typeorm/PrimaryEntity";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

@Entity("productImages")
export class ProductImage extends PrimaryEntity {
  @Column({ name: "path" })
  path: string;

  @Column({ name: "product_id" })
  product_id: string;

  @OneToOne(() => Product, product => product.image)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
