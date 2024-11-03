export interface UserRegisterDto {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    credentials: {
        username: string;
        password: string;
    }
}

export interface UserLoginDTO {
    username: string;
    password: string;
}

export interface UserDTO {
    id: number;
    name: string;
    email: string;
}