import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  frmData: FormGroup;

  SelectedfavouriteGameIdList: Array<any> = [];
  uploadedFiles: string[] = [];


  favouriteGames: Array<any> = [
    { id: 1, name: 'FootBall', isActive: true },
    { id: 2, name: 'Cricket', isActive: true },
    { id: 3, name: 'Hocky', isActive: false },
    { id: 4, name: 'Tenis', isActive: true },
    { id: 5, name: 'BolyBall', isActive: false },
    { id: 6, name: 'Kabady', isActive: true },
  ];

  Groups: Array<any> = [
    { id: 1, name: 'Science', isActive: false },
    { id: 2, name: 'Commerce', isActive: true },
    { id: 3, name: 'Atrs', isActive: false },
  ];

  Countries: Array<any> = [
    { id: 1, name: 'Bangladesh' },
    { id: 2, name: 'England' },
    { id: 3, name: 'India' },
    { id: 4, name: 'Pakisthan' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.frmData = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      DateOfBirth: new FormControl('', Validators.required),
      favouriteGame: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.frmData.controls;
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedFiles.push(event.target.files[i]);
    }
  }

  onCheckboxChange(id, name, event) {
    if (event.target.checked) {
      this.SelectedfavouriteGameIdList.push({ Id: id, Name: name });
    } else {
      for (var i = 0; i < this.favouriteGames.length; i++) {
        if (this.SelectedfavouriteGameIdList[i] == id) {
          this.SelectedfavouriteGameIdList.splice(i, 1);
        }
      }
    }
  }

  SaveData() {
    var formData: any = new FormData();

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('file[]', this.uploadedFiles[i]);
    }


    formData.append('Name', this.frmData.value.Name);
    formData.append('DateOfBirth', this.frmData.value.DateOfBirth);
    formData.append('favouriteGame[]', this.SelectedfavouriteGameIdList);
    formData.append('Country', this.frmData.value.Country);
    formData.append('group', this.frmData.value.group);


   // value
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    });


  }
}
