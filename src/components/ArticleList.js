import React from 'react'
import './ArticleList.css'
import APIService from './APIService'

function ArticleList(props) {

    const editbtn = (article) =>{
        props.editbtn(article)
    }

    const deleteBtn = (article) =>{
      APIService.DeleteArticle(article.id)
      .then(() => props.deleteBtn(article))
      
    }

  return (
    <div>
    {props.articles && props.articles.map(article => {
        return (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>

            <div className='row'>
                <div className="col-md-1">
                    <button className="btn btn-primary" onClick={() => editbtn(article)}>Update</button>
                </div>

                <div className="col">
                    <button onClick={ () => deleteBtn(article)} className="btn btn-danger">Delete</button>
                </div>
            </div>
            <hr className="hrclass" />
          </div>
        )
      })}
      
    </div>
  )
}

export default ArticleList
