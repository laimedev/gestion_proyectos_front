import { Permissions } from './permissions';

export class Rol {

    id: number;
	name: string;
	displayName: string;
	description: string;
	
	roleUser: number[];
	
	permissions: Permissions[];
}
