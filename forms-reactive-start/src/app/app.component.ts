import { Component ,OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
          'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null,[Validators.required, Validators.email])
    }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //*ngFor="let hobbyControl of controls; let i = index"
  // get controls() {
  //   return (this.signupForm.get('hobbies') as FormArray).controls;
  // }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
      (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //writing own validator here
  forbiddenNames(control: FormControl):{[s: string]:boolean}{
    //checks if its part of array, will return -1 if it is not part
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

}
