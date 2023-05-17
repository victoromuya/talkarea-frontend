

export default class APIService{
    static UpdateArticle(article_id, body){
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
             'method':'PUT',
             headers: {
                'Content-type':'application/json',
                'Authorization': 'Token 18037f43bc9ae2941d58d559de6b1c5e1425d7be'
             },
             body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertArticle(body){

        return fetch(`http://127.0.0.1:8000/api/articles/`, {
             'method':'POST',
             headers: {
                'Content-type':'application/json',
                'Authorization': 'Token 18037f43bc9ae2941d58d559de6b1c5e1425d7be'
             },
             body:JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static DeleteArticle(article_id){
        return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
             'method':'DELETE',
             headers: {
                'Content-type':'application/json',
                'Authorization': 'Token 18037f43bc9ae2941d58d559de6b1c5e1425d7be'
             }
             
        }) 
    }
}