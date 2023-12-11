import { useLocation } from "react-router-dom";
// para ter acesso a querystring
import { useMemo } from "react";
// nao altera o estado do componente 

export function useQuery() {

    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search]) 
    // dessa forma conseguimos extrair os dados como objeto, similar ao useEffect
}