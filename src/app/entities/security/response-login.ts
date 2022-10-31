
export type GrantedAuthority = {authority:string}

export class ResponseLogin {

    token:string
    user: string
    role: string
    id: string
    authorities: GrantedAuthority[]

}
