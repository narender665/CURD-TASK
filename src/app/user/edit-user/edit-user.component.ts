import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private userService: UserService, private location: Location, private commonService: CommonServiceService) { }

  form!: FormGroup;
  id!: string;
  submitted: boolean = false;
  dropdownList: any;
  dropdownSettings: any;
  getData(): Array<any> {
    return [
      { item_id: 1, hvalue: 'Reading', },
      { item_id: 2, hvalue: 'Playing', },
      { item_id: 3, hvalue: 'Drawing', },
      { item_id: 4, hvalue: 'Travelling', },
      { item_id: 5, hvalue: 'Singing ', },

    ];
  }
  ngOnInit(): void {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'hvalue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    console.log('hi')

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      hobbies: ['', Validators.required],
      address: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    })
    this.id = this.route.snapshot.params['id'];
    this.userService.getById(this.id)
      .subscribe(x => {
        this.form.patchValue(x)
      }
      );
  }
  get f() { return this.form.controls; }
  get address() {
    return this.form.get('address') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.commonService.getClone())
      this.createUser()
    else
      this.updateUser()
  }

  private updateUser() {
    this.commonService.setClone(false);
    this.userService.update(this.id, this.form.value)
      .subscribe(() => {
        this.router.navigate(['/'], { relativeTo: this.route });
      })
  }
  private createUser() {
    this.userService.create(this.form.value)
      .subscribe(() => {
        console.log(this.form.value)
        this.router.navigate(['/'], { relativeTo: this.route });
      })

  }

  getObjectListFromData(ids: string | any[]) {
    return this.getData().filter(item => ids.includes(item.item_id))
  }

  setDefaultSelection() {
    let item = this.getData()[0];
    this.form.patchValue({
      hobbies: [{
        item_id: item['item_id'],
        hvalue: item['hvalue']
      }]
    })
  }

  cancel() {
    // this.location.back();
    this.router.navigate(['../../'], { relativeTo: this.route });

  }
}
