import { Rol } from './rol';

export class User {

    id?: number;	
	isAdmin?: boolean;	
	username?: string;	
	fullname?: string;
	password?: string;
	passwordr?: string;
	email?: string;
	emailr?: string;
	cellphone?: string;
	commentUser?: string;
	status?: string;
	area?: string;
	company?: string;
	roleIds?: number
	roles?: Rol;
    createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;


	// NUEVA API
	UserId: number;
	UserName: string;
	Email: string;
	PasswordHash: string;
	SecurityStamp?: string;
	PhoneNumber?: string;
	CreateDate?: string;
	CreateUser?: string;
	UpdateDate?: string;
	UpdateUser?: string;
    
}



