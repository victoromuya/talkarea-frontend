import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import ArticleList from './components/ArticleList';
import Form from './components/Form'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method':'GET', headers:{
        'Content-type':'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp =>setArticles(resp))
    .catch(error => console.log(error))
  }, [])


  let history = useNavigate()

    useEffect(() => {
      if(!token['mytoken']){
        // history('/') 
        window.location.href = '/'
      }
    }, [token])

  const editbtn = (articles) =>{
    setEditArticle(articles)
  }

  const updatedInformation = (article) =>{
    const new_article =  articles.map(myarticle => {
      if(myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle;
      }
    }
      )
      setArticles(new_article)
  }

  const insertArticleForm = () =>{
    setEditArticle({title:"", description:""})
  }

  const InsertedInformation = (article) =>{
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteBtn = (article) =>{
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false
      }
      return true
    })

    setArticles(new_articles)
  }

  const logoutBtn = () => {
    removeToken(['mytoken'])
  }

  

  return (
    <div className="App">
      
      <div className="row">
        <div className="col">
          <h1>TalkArea</h1>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={insertArticleForm}>Insert Article</button>
        </div>

        <div className="col">
          <button className="btn btn-primary" onClick={logoutBtn}>Logout</button>
        </div>
      </div>

      <br/>
      <br/>

      <ArticleList articles = {articles} editbtn={editbtn} deleteBtn={deleteBtn}/>
      
      {editArticle ? <Form article={editArticle} updatedInformation={updatedInformation} 
      InsertedInformation={InsertedInformation}/> : null}
      

    </div>
  );
}

export default App;
