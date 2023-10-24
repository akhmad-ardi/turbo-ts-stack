import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./CreateUser.dto";
import { IsEmpty } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmpty()
  confirmPassword: string;
}
