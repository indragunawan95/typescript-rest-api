import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
export interface UserCRUD {
    list: (limit: number, page: number) => Promise<CreateUserDto[]>;
    create: (resource: CreateUserDto) => Promise<string>;
    putById: (id: string, resource: PutUserDto) => Promise<string>;
    readById: (id: string) => Promise<CreateUserDto | undefined>;
    deleteById: (id: string) => Promise<string>;
    patchById: (id: string, resource: PatchUserDto) => Promise<string>;
}
