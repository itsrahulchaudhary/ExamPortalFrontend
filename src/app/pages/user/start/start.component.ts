import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private locationstr: LocationStrategy, private _route: ActivatedRoute, private _ques: QuestionService) { }
  qId: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  mod: any = "aaa";
  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this.loadQuestions();
    this.preventBackButton();
  }
  loadQuestions() {
    this._ques.getQuestionsOfQuizForTest(this.qId).subscribe((data) => {
      console.log(data);
      this.questions = data;
      this.questions.forEach((q: any) => {
        q['givenAnswer'] = '';
      });
    },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading of Questions of Quiz', 'error');
      }
    )
  }

  public preventBackButton() {
    history.pushState(null, location.href);
    this.locationstr.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  public submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e) => {
      // calculation
      if (e.isConfirmed) {
        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswers++;
            let markSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += markSingle;
          }
          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }
        });
        console.log("Correct Answer : " + this.correctAnswers);
        console.log("Marks Got " + this.marksGot);
        console.log("Attempted " + this.attempted);

      }
    });
  }

}
