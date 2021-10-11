import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snak: MatSnackBar) { }
  qId: any;
  qTitle: any;
  questions: any = [];
  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data: any) => {
      console.log(data);
      this.questions = data;
    },
      (error) => {

      }
    );
    //console.log(this.qId);
    // console.log(this.qTitle);
  }

  public deleteQuestion(qid: any) {
    //alert(qid);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure want to Delete this question ?'
    }).then((result) => {
     // alert("test");
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe((data) => {
          Swal.fire('Success', 'Question Added Add another one', 'success');
          this._snak.open('Question delete', '', { duration: 3000 })
          this.questions = this.questions.filter((q: any) => q.quesId != qid);
        },
          (error) => {
            console.log(error);
            this._snak.open('Error in deleting question', '', { duration: 3000 })
          }
        );

      }
    });
  }

}
