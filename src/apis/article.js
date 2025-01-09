
import { http } from "../utils"

export function getChannelAPI () {
    return http({
        url: '/channels',
        method: 'GET'
    })
}

export function getArticleById (id) {
    return http({
        url: `/mp/articles/${id}`
    })
}

export function getArticleListAPI (params) {
    return http({
        url: "/mp/articles",
        method: 'GET',
        params
    })
}

