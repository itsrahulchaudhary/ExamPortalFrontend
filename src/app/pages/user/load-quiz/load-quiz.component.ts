import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }
  categoryId: any;
  quizzes: any;
  ngOnInit(): void {
    //this.categoryId = this._route.snapshot.params.catId;
    this._route.params.subscribe((params)=>{
      this.categoryId = params.catId;
      console.log(this.categoryId);
      if (this.categoryId == 0) {
        console.log("Load all the Quiz...");
        this._quiz.quizzes().subscribe((data) => {
          this.quizzes = data;
          console.log(this.quizzes);
        },
          (error) => {
            // swal or snackBar
            console.log(error);
            alert("error in loading");
          }
        );
      } else {
        //this.quizzes=[];
        console.log("Load specific Quiz...");
        this._quiz.getQuizzesofCategory(this.categoryId).subscribe((data)=>{
          this.quizzes=data;
        },
        (error)=>{
          alert("Error in loading quiz data");
        }
        );
      }
    });

 
  }

}
