
export type GrantedAuthority = {authority:string}

export class ResponseLogin {

    token:string
    user: string
    authorities: GrantedAuthority[]

}
