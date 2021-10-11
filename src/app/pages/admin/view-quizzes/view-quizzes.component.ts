import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
 
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
 

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [{
    "qid": "",
    "title": "",
    "description": "",
    "maxMarks": 0,
    "numberOfQuestions": 0,
    "active": "",
    "category": {
      "title": ""
    }
  }];


  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error', 'error');
      }
    );
  }
  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        //alert(qId)
        this._quiz.deleteQuiz(qId).subscribe((data) => {
          this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qId);
          Swal.fire('Success !!', 'Quiz Deleted', 'success');
        },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in deleting Quiz', 'error');
          }
        )
      }
    });
  }


}


