import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //  get All Quiz
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  // delete quiz
  public deleteQuiz(qid: any) {
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get the single quiz
  public getQuiz(qId:any){
  return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  // update Quiz
  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  // get quizzes of category
  public getQuizzesofCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

}