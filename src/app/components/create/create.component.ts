import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Form {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  age: FormControl<number | null>;
}

@Component({
  selector: 'app-create',
  standalone: false,
  
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  @Output() formSubmittedEvent = new EventEmitter<void>();

  is_edit: boolean; 

  form: FormGroup<Form>;

  constructor(
    private user_service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup<Form>({
      name: new FormControl<string | null>(this.data.user?.name, [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string | null>(this.data.user?.email, [Validators.required, Validators.email]),
      age: new FormControl<number | null>(this.data.user?.age, [Validators.min(18)]),
    });
    this.is_edit = data.is_edit;
  }

  save() {
    console.log(this.data);
    
    let form_value = this.form.value;

    const cleaned_value = {
      name: form_value.name || '',
      email: form_value.email || '',
      age: form_value.age || 0, 
    };

    if (!this.is_edit) {
      this.user_service.createUser(cleaned_value).subscribe(
        (data) => {
          console.log(data);
          this.formSubmittedEvent.emit();
        }
      )
    }
    else {
      this.user_service.updateUser(this.data.user.id, cleaned_value).subscribe(
        (data) => {
          console.log(data);
          this.formSubmittedEvent.emit();
        }
      )
    }
  }
}
