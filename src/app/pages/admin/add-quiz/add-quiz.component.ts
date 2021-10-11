import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [
    {
      "cid": 0,
      "title": ""
    }
  ];
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    }
  }

  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data: any) => {
      // categories load
      this.categories = data;
      console.log(this.categories);
    },
      (error: any) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", 'error');
      }
    );
  }

  // add quiz
  addQuiz() {
    console.log(this.quizData);
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', { duration: 3000 });
      return;
    }
    
    // validation...

    //call server

    this._quiz.addQuiz(this.quizData).subscribe((data) => {
      console.log('aaaaaaaaaaaa');
      Swal.fire('Success !!','Quiz is added successfully','success');
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid: ''
        }
      }
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!','Server error','error');
    }
    )


  }

}
