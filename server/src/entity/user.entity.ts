import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  googleId: string;

  @Column({ default: UserRoles.USER })
  role: string;

  @Column()
  @IsNotEmpty({ message: "The name is required" })
  name: string;

  @Column()
  @IsNotEmpty({ message: "The email is required" })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password_hash: string;
}
